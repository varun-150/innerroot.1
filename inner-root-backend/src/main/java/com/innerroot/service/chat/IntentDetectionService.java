package com.innerroot.service.chat;

import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class IntentDetectionService {
    public String detectIntent(String message) {
        log.info("Intent Detection: analyzing message");
        String lowerMsg = message.toLowerCase();
        
        if (lowerMsg.contains("heritage") || lowerMsg.contains("culture") || lowerMsg.contains("india") || 
            lowerMsg.contains("ancient") || lowerMsg.contains("history") || lowerMsg.contains("monument")) {
            return "HERITAGE_QUERY";
        } else if (lowerMsg.contains("wellness") || lowerMsg.contains("meditation") || lowerMsg.contains("yoga") || 
                   lowerMsg.contains("ayurveda") || lowerMsg.contains("peace") || lowerMsg.contains("spirit")) {
            return "WELLNESS_QUERY";
        } else if (lowerMsg.contains("who are you") || lowerMsg.contains("aura") || lowerMsg.contains("help")) {
            return "IDENTITY_QUERY";
        }
        
        return "GENERAL_QUERY";
    }
}
