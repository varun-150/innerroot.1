package com.innerroot.service;

import com.innerroot.model.Lesson;
import com.innerroot.model.WellnessContent;
import com.innerroot.model.WisdomQuote;
import com.innerroot.repository.LessonRepository;
import com.innerroot.repository.WellnessContentRepository;
import com.innerroot.repository.WisdomQuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JourneyService {

    private final LessonRepository lessonRepository;
    private final WisdomQuoteRepository quoteRepository;
    private final WellnessContentRepository wellnessRepository;

    public Map<String, Object> getTodaysJourney(String userId) {
        Map<String, Object> journey = new HashMap<>();

        // 1. Get the current lesson (Day 1 for now, or based on progress)
        Optional<Lesson> lesson = lessonRepository.findByDayNumber(1);
        journey.put("lesson", lesson.orElse(null));

        // 2. Get a random or daily wisdom quote
        Optional<WisdomQuote> quote = quoteRepository.findAll().stream().findFirst();
        journey.put("quote", quote.orElse(null));

        // 3. Get a recommended practice (e.g., meditation)
        Optional<WellnessContent> practice = wellnessRepository.findAll().stream()
                .filter(c -> "meditation".equalsIgnoreCase(c.getType()))
                .findFirst();
        journey.put("practice", practice.orElse(null));

        return journey;
    }
}
