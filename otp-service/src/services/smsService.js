/**
 * SMS Service — Abstraction layer for Twilio, AWS SNS, and console (dev) providers.
 * Switch providers via SMS_PROVIDER env var.
 */
class SMSService {
  constructor() {
    this.provider = process.env.SMS_PROVIDER || 'console';
  }

  async send(phone, message) {
    switch (this.provider) {
      case 'twilio':
        return this._sendViaTwilio(phone, message);
      case 'sns':
        return this._sendViaSNS(phone, message);
      case 'console':
        return this._sendViaConsole(phone, message);
      default:
        throw new Error(`Unknown SMS provider: ${this.provider}`);
    }
  }

  // ─── Console (dev only) ────────────────────────────────
  async _sendViaConsole(phone, message) {
    console.log('┌──────────────────────────────────────┐');
    console.log(`│  📱 SMS to: ${phone}`);
    console.log(`│  📨 Message: ${message}`);
    console.log('└──────────────────────────────────────┘');
    return { provider: 'console', messageId: `dev-${Date.now()}` };
  }

  // ─── Twilio ────────────────────────────────────────────
  async _sendViaTwilio(phone, message) {
    const twilio = require('twilio');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    console.log(`[Twilio] SMS sent: ${result.sid}`);
    return { provider: 'twilio', messageId: result.sid };
  }

  // ─── AWS SNS ───────────────────────────────────────────
  async _sendViaSNS(phone, message) {
    const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
    const client = new SNSClient({
      region: process.env.AWS_REGION || 'ap-south-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    const result = await client.send(new PublishCommand({
      Message: message,
      PhoneNumber: phone,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    }));

    console.log(`[SNS] SMS sent: ${result.MessageId}`);
    return { provider: 'sns', messageId: result.MessageId };
  }
}

module.exports = new SMSService();
