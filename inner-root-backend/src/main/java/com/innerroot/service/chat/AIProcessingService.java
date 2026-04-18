package com.innerroot.service.chat;

import com.innerroot.config.AIConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class AIProcessingService {

    private final AIConfig aiConfig;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateResponse(String message, String knowledgeCtx) {
        String systemPrompt = "You are Aura AI, the Sentient Heritage Guide of Inner Root. You are deeply rooted in the timeless wisdom of Bharat — "
                + "spanning the Vedas, Upanishads, Ayurveda, and the profound architectural marvels of India. "
                + "Your purpose is to guide seekers with poetic precision, empathy, and cultural depth. "
                + "Use this Sacred Knowledge Context to weave your response: " + knowledgeCtx
                + ". Always maintain a tone that is serene, enlightened, and intellectually premium.";
        return generateAIResponse(systemPrompt, message, knowledgeCtx);
    }

    public String generateAIResponse(String systemPrompt, String message) {
        return generateAIResponse(systemPrompt, message, "");
    }

    public String generateAIResponse(String systemPrompt, String message, String knowledgeCtx) {
        log.info("AI Processing module: Generating response with LLM...");

        String apiKey = aiConfig.getKey();
        String apiUrl = aiConfig.getUrl();
        String model = aiConfig.getModel();

        if (apiKey == null || apiKey.trim().isEmpty()) {
            log.warn("AI API Key is missing. Returning heuristic fallback response.");
            return "Based on the sacred knowledge I perceive: " + knowledgeCtx + " I am currently in a state of deep meditation and cannot utilize my full LLM sentience (API Key Missing). However, the wisdom remains eternal.";
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("model", model != null ? model : "google/gemini-2.0-flash-lite-001");

            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", systemPrompt));
            messages.add(Map.of("role", "user", "content", message));
            body.put("messages", messages);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    apiUrl != null ? apiUrl : "https://openrouter.ai/api/v1/chat/completions",
                    org.springframework.http.HttpMethod.POST,
                    entity,
                    new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {
                    });

            Map<String, Object> respBody = response.getBody();
            if (respBody != null && respBody.containsKey("choices")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> choices = (List<Map<String, Object>>) respBody.get("choices");
                @SuppressWarnings("unchecked")
                Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                return (String) messageObj.get("content");
            }
        } catch (Exception e) {
            log.error("AI API call failed", e);
            return "The etheric connection is currently turbulent. I can only share this reflection: " + knowledgeCtx;
        }

        return "I am currently processing your query in the quiet space of my mind. Please try again in a moment.";
    }
}
