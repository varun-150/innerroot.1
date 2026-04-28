package com.innerroot;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.innerroot.dto.LoginRequest;
import com.innerroot.model.User;
import com.innerroot.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import jakarta.servlet.http.Cookie;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testAdminLogin() throws Exception {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("akurivarun@gmail.com");
        loginRequest.setPassword("Wazir@150");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.role").value("ADMIN"))
                .andExpect(cookie().exists("jwt"));
    }

    @Test
    public void testUserLogin() throws Exception {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("user@innerroot.com");
        loginRequest.setPassword("User@123");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.role").value("USER"))
                .andExpect(cookie().exists("jwt"));
    }

    @Test
    public void testAdminAuthorization() throws Exception {
        // 1. Login as Admin
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("akurivarun@gmail.com");
        loginRequest.setPassword("Wazir@150");

        String response = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andReturn().getResponse().getContentAsString();

        Cookie jwtCookie = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andReturn().getResponse().getCookie("jwt");

        // 2. Access Admin API
        mockMvc.perform(get("/api/admin/users")
                .cookie(jwtCookie))
                .andExpect(status().isOk());
    }

    @Test
    public void testUserAuthorizationDeniedForAdminApi() throws Exception {
        // 1. Login as User
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("user@innerroot.com");
        loginRequest.setPassword("User@123");

        Cookie jwtCookie = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andReturn().getResponse().getCookie("jwt");

        // 2. Attempt to access Admin API
        mockMvc.perform(get("/api/admin/users")
                .cookie(jwtCookie))
                .andExpect(status().isForbidden());
    }
}
