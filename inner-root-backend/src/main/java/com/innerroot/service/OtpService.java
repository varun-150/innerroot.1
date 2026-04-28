package com.innerroot.service;

import com.innerroot.model.Otp;
import com.innerroot.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {
    private static final Logger logger = LoggerFactory.getLogger(OtpService.class);
    private final OtpRepository otpRepository;
    private final Random random = new Random();

    @Transactional
    public String generateOtp(String email) {
        // Delete old OTPs for this email
        otpRepository.deleteByEmail(email);

        // Generate 6-digit code
        String code = String.format("%06d", random.nextInt(1000000));
        
        Otp otp = Otp.builder()
                .email(email)
                .code(code)
                .expiryTime(LocalDateTime.now().plusMinutes(10)) // Valid for 10 mins
                .build();

        otpRepository.save(otp);
        
        logger.info("Generated OTP for {}: {}", email, code);
        // In a real app, you would send this via email or SMS
        return code;
    }

    public boolean verifyOtp(String email, String code) {
        return otpRepository.findTopByEmailOrderByExpiryTimeDesc(email)
                .map(otp -> {
                    if (otp.isExpired()) {
                        logger.warn("OTP for {} has expired", email);
                        return false;
                    }
                    boolean matches = otp.getCode().equals(code);
                    if (matches) {
                        otp.setVerified(true);
                        otpRepository.save(otp);
                        logger.info("OTP verified for {}", email);
                    } else {
                        logger.warn("OTP mismatch for {}: expected {}, got {}", email, otp.getCode(), code);
                    }
                    return matches;
                })
                .orElse(false);
    }
}
