/**
 * SMS/Email Service — Abstraction layer for OTP delivery.
 * Supports: Twilio (SMS), AWS SNS (SMS), Resend (Email), Console (dev)
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
      case 'resend':
        return this._sendViaResend(phone, message);
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

  // ─── Resend (Email-based OTP) ──────────────────────────
  async _sendViaResend(phone, message) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not set');

    // Resend sends emails, so we use phone as identifier
    // but deliver to an email address if available, or use
    // a phone-to-email format for the OTP delivery
    const toEmail = process.env.RESEND_TO_EMAIL || `${phone.replace('+', '')}@innerroot.app`;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: 'Your Inner Root Login Code',
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #0a0e1a; color: #f4ebd0; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="font-size: 24px; color: #c9a84c; margin: 0;">🌿 Inner Root</h1>
              <p style="color: #888; font-size: 14px; margin-top: 8px;">Secure Login Verification</p>
            </div>
            <div style="background: #1a1f2e; border: 1px solid #c9a84c33; border-radius: 12px; padding: 32px; text-align: center;">
              <p style="color: #aaa; font-size: 14px; margin: 0 0 16px 0;">Your verification code is:</p>
              <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #c9a84c; padding: 16px; background: #0a0e1a; border-radius: 8px; border: 2px dashed #c9a84c44;">
                ${message.match(/\d{6}/)?.[0] || message}
              </div>
              <p style="color: #666; font-size: 12px; margin-top: 16px;">Valid for 5 minutes. Do not share this code.</p>
            </div>
            <p style="color: #555; font-size: 11px; text-align: center; margin-top: 24px;">
              If you didn't request this code, please ignore this email.
            </p>
          </div>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('[Resend] Error:', error);
      throw new Error(`Resend API error: ${error.message || response.statusText}`);
    }

    const result = await response.json();
    console.log(`[Resend] Email sent: ${result.id}`);
    return { provider: 'resend', messageId: result.id };
  }

  // ─── Twilio (SMS) ──────────────────────────────────────
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

  // ─── AWS SNS (SMS) ────────────────────────────────────
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
