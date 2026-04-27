package com.innerroot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.innerroot.config.AIConfig;
import com.innerroot.config.WebhookConfig;
import com.innerroot.config.AppProperties;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.innerroot.repository.UserRepository;
import com.innerroot.model.User;

@SpringBootApplication
@EnableConfigurationProperties({AIConfig.class, WebhookConfig.class, AppProperties.class})
public class InnerRootApplication {

    public static void main(String[] args) {
        SpringApplication.run(InnerRootApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("user@login.com").isEmpty()) {
                User admin = User.builder()
                        .name("Master User")
                        .email("user@login.com")
                        .password(passwordEncoder.encode("user_login"))
                        .role(User.Role.ADMIN)
                        .provider(User.AuthProvider.LOCAL)
                        .build();
                userRepository.save(admin);
                System.out.println("==============================================");
                System.out.println("Seeded USER_LOGIN Credentials: user@login.com / user_login");
                System.out.println("==============================================");
            }
        };
    }
}
