package com.innerroot.controller;

import com.innerroot.service.JourneyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v2/journey")
@RequiredArgsConstructor
public class JourneyController {

    private final JourneyService journeyService;

    @GetMapping("/today")
    public ResponseEntity<Map<String, Object>> getTodaysJourney(@RequestParam(required = false) String userId) {
        return ResponseEntity.ok(journeyService.getTodaysJourney(userId));
    }
}
