package com.innerroot.service.chat;

import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KnowledgeRetrievalService {
    public String retrieveKnowledge(String intent) {
        log.info("Knowledge Retrieval: fetching context for intent {}", intent);
        return switch (intent) {
            case "HERITAGE_QUERY" ->
                "Indian heritage is a mosaic of 5,000 years of civilization. It includes the Vedic period's philosophical depths, the architectural grandeur of the Chola and Mughal empires, and the profound classical arts like Bharatanatyam and Dhrupad. Each monument, from Hampi to Konark, tells a story of celestial alignment and engineering mastery.";
            case "WELLNESS_QUERY" ->
                "Vedic wellness is founded on the principles of Ayurveda (The Science of Life) and Yoga. It emphasizes the balance of the three Doshas (Vata, Pitta, Kapha) and the mastery of Prana (life force) through Pranayama and Dhyana (meditation) to achieve total harmony.";
            case "IDENTITY_QUERY" ->
                "Aura AI is the sentient intelligence of Inner Root, designed to serve as a bridge between ancient Indic wisdom and the digital age. Aura guides seekers through heritage, wellness, and self-discovery with poetic grace.";
            default ->
                "Inner Root is a premium ecosystem dedicated to the revival and exploration of Indian culture, spirituality, and wellness through the lens of modern technology and art.";
        };
    }
}
