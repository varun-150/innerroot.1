package com.innerroot.service;

import com.innerroot.dto.*;
import com.innerroot.model.User;
import com.innerroot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email address is already registered");
        }

        // Create new user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .provider(User.AuthProvider.LOCAL)
                .role(User.Role.USER)
                .learningGoals(request.getLearningGoals())
                .usageIntent(request.getUsageIntent())
                .occupation(request.getOccupation())
                .ageGroup(request.getAgeGroup())
                .region(request.getRegion())
                .interests(request.getInterests())
                .build();

        User savedUser = userRepository.save(user);
        logger.info("New user registered: {}", savedUser.getEmail());

        return convertToAuthResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        // 1. Handle Admin Security
        if ("akurivarun@gmail.com".equalsIgnoreCase(email)) {
            logger.info("Admin login attempt detected for: {}", email);
            User admin = userRepository.findByEmail(email).orElse(null);
            if (admin == null) {
                logger.error("Admin user not found in database: {}", email);
            } else {
                boolean matches = passwordEncoder.matches(password, admin.getPassword());
                logger.info("Admin password match status: {}", matches);
            }
            
            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            } catch (Exception e) {
                logger.error("Admin authentication failed: {}", e.getMessage());
                throw new RuntimeException("Invalid admin credentials");
            }
        } else {
            // 2. Handle 'Anything/Anything' for Users
            // If user doesn't exist or password doesn't match, we auto-sync/register for testing convenience
            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            } catch (Exception e) {
                logger.info("Non-admin login failed, applying 'anything/anything' logic for: {}", email);
                return autoRegisterAndLogin(email, password);
            }
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        logger.info("User logged in: {}", user.getEmail());

        return convertToAuthResponse(user);
    }

    private AuthResponse autoRegisterAndLogin(String email, String password) {
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .name("User " + email.split("@")[0])
                    .email(email)
                    .role(User.Role.USER)
                    .provider(User.AuthProvider.LOCAL)
                    .active(true)
                    .onboardingCompleted(true)
                    .build();
            return userRepository.save(newUser);
        });

        // Update password to 'anything' provided
        user.setPassword(passwordEncoder.encode(password));
        user.setActive(true);
        User savedUser = userRepository.save(user);
        
        return convertToAuthResponse(savedUser);
    }

    private AuthResponse convertToAuthResponse(User user) {
        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getProfilePicture(),
                user.getRole().name(),
                user.getInterests(),
                user.getMeditationStreak(),
                user.getLongestStreak(),
                user.getTotalSessions(),
                user.getUnlockedBadges(),
                user.getDailyStreak(),
                user.getTotalLessonsCompleted(),
                user.getSubscriptionStatus().name());
    }

    public AuthResponse googleAuth(String email, String name, String picture, String googleId) {
        // Find or create user
        User user = userRepository.findByEmail(email).orElse(null);

        User.Role assignedRole = "akurivarun@gmail.com".equalsIgnoreCase(email) ? User.Role.ADMIN : User.Role.USER;

        if (user == null) {
            // Register new Google user
            user = User.builder()
                    .name(name)
                    .email(email)
                    .profilePicture(picture)
                    .provider(User.AuthProvider.GOOGLE)
                    .providerId(googleId)
                    .role(assignedRole)
                    .build();
            user = userRepository.save(user);
            logger.info("New Google user registered: {}", email);
        } else {
            // Update existing user's profile picture and ensure correct role
            user.setProfilePicture(picture);
            user.setName(name);
            user.setRole(assignedRole); // Ensure role is correct even on login
            user = userRepository.save(user);
        logger.info("Google user logged in: {}", email);
        }

        return convertToAuthResponse(user);
    }
}
