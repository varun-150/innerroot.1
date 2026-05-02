package com.innerroot.config;

import com.innerroot.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.http.HttpStatus;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )
                .authorizeHttpRequests(auth -> auth
                        // 1. Auth & Public System Endpoints
                        .requestMatchers("/api/auth/login", "/api/auth/register", "/api/auth/google", "/api/auth/refresh", "/api/auth/logout").permitAll()
                        .requestMatchers("/api/otp/**", "/api/health", "/api/contact/**").permitAll()
                        .requestMatchers("/h2-console/**", "/ws/**").permitAll()
                        
                        // 2. Chat History (Publicly accessible for guest sessions as per requirements)
                        .requestMatchers("/api/chat/history/**").permitAll()
                        
                        // 3. Public Read-Only Content (GET)
                        .requestMatchers(HttpMethod.GET, 
                            "/api/heritage-sites/**", 
                            "/api/wellness/**",
                            "/api/wisdom/**",
                            "/api/library/**",
                            "/api/culture/**",
                            "/api/guides/**",
                            "/api/events/**").permitAll()

                        // 4. Admin Protected Operations
                        .requestMatchers(
                            "/api/admin/**",
                            "/api/heritage-sites/**", 
                            "/api/wellness/**",
                            "/api/wisdom/**",
                            "/api/library/**",
                            "/api/culture/**",
                            "/api/guides/**",
                            "/api/events/**").hasRole("ADMIN")

                        // 5. User Protected Endpoints
                        .requestMatchers(
                            "/api/auth/me",
                            "/api/users/**", 
                            "/api/japa/**", 
                            "/api/mood/**", 
                            "/api/chat/**").authenticated()

                        // 6. Global Catch-all
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // Allow H2 console frames
        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        return http.build();
    }
}
