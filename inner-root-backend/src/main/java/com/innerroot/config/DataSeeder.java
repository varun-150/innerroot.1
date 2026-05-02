package com.innerroot.config;

import com.innerroot.model.*;
import com.innerroot.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final HeritageSiteRepository heritageSiteRepository;
    private final WisdomQuoteRepository wisdomQuoteRepository;
    private final WellnessContentRepository wellnessContentRepository;
    private final LessonRepository lessonRepository;

    @Bean
    public CommandLineRunner seedLessons() {
        return args -> {
            if (lessonRepository.count() == 0) {
                // 1. Seed Heritage Sites
                HeritageSite hampi = HeritageSite.builder()
                        .name("Hampi: The City of Victory")
                        .location("Karnataka")
                        .description("Once the capital of the Vijayanagara Empire, Hampi is a surreal landscape of boulders and temple ruins. A 14th-century marvel that was one of the largest and richest cities in the world.")
                        .imageUrl("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1000")
                        .category("Sacred Architecture")
                        .rating(4.9)
                        .build();

                HeritageSite varanasi = HeritageSite.builder()
                        .name("Varanasi: The Eternal City")
                        .location("Uttar Pradesh")
                        .description("The spiritual heart of India, where the Ganges flows and life meets eternity. One of the oldest continuously inhabited cities in the world.")
                        .imageUrl("https://images.unsplash.com/photo-1561359313-0639acd44cb1?auto=format&fit=crop&q=80&w=1000")
                        .category("Living Heritage")
                        .rating(5.0)
                        .build();

                HeritageSite konark = HeritageSite.builder()
                        .name("Konark Sun Temple")
                        .location("Odisha")
                        .description("A 13th-century chariot of the Sun God, carved in stone with 24 wheels and 7 horses. A masterpiece of Kalinga architecture and celestial alignment.")
                        .imageUrl("https://images.unsplash.com/photo-1620241608701-94feaf242fc5?auto=format&fit=crop&q=80&w=1000")
                        .category("Temple Wonders")
                        .rating(4.8)
                        .build();

                heritageSiteRepository.saveAll(List.of(hampi, varanasi, konark));

                // 2. Seed Wisdom Quotes
                WisdomQuote q1 = WisdomQuote.builder()
                        .quote("You have the right to work, but for the work's sake only. You have no right to the fruits of work.")
                        .source("Bhagavad Gita 2.47")
                        .theme("Karma Yoga")
                        .build();

                WisdomQuote q2 = WisdomQuote.builder()
                        .quote("As the sun illuminates the entire world, so does the indwelling soul illuminate the entire body.")
                        .source("Bhagavad Gita 13.34")
                        .theme("Self-Realization")
                        .build();

                wisdomQuoteRepository.saveAll(List.of(q1, q2));

                // 3. Seed Wellness Practices
                WellnessContent p1 = WellnessContent.builder()
                        .title("Sama Vritti (Box Breathing)")
                        .type("Breathing")
                        .description("A simple technique to calm the nervous system and focus the mind before starting your day.")
                        .duration("2 min")
                        .difficulty("Beginner")
                        .build();

                WellnessContent p2 = WellnessContent.builder()
                        .title("Om Chanting")
                        .type("Mantra")
                        .description("Resonating the primordial sound to align your internal vibrations with the cosmic rhythm.")
                        .duration("3 min")
                        .difficulty("Beginner")
                        .build();

                wellnessContentRepository.saveAll(List.of(p1, p2));

                // 4. Seed Lessons
                Lesson l1 = Lesson.builder()
                        .title("The Echoes of Vijayanagara")
                        .heritageSite(hampi)
                        .wisdomQuote(q1)
                        .practice(p1)
                        .dayNumber(1)
                        .difficulty("Beginner")
                        .build();

                Lesson l2 = Lesson.builder()
                        .title("Ganga: The River of Life")
                        .heritageSite(varanasi)
                        .wisdomQuote(q2)
                        .practice(p2)
                        .dayNumber(2)
                        .difficulty("Beginner")
                        .build();

                lessonRepository.saveAll(List.of(l1, l2));

                System.out.println("V2.0 Core Content Seeded Successfully!");
            }
        };
    }
}
