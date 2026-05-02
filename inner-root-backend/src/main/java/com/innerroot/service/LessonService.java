package com.innerroot.service;

import com.innerroot.model.*;
import com.innerroot.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final UserRepository userRepository;

    public Optional<Lesson> getLessonByDay(Integer dayNumber) {
        return lessonRepository.findByDayNumber(dayNumber);
    }

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    @Transactional
    public void completeLesson(String userId, String lessonId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        Optional<LessonProgress> existingProgress = lessonProgressRepository.findByUserAndLesson(user, lesson);
        if (existingProgress.isEmpty()) {
            LessonProgress progress = LessonProgress.builder()
                    .user(user)
                    .lesson(lesson)
                    .completed(true)
                    .build();
            lessonProgressRepository.save(progress);

            // Update user stats
            user.setTotalLessonsCompleted(user.getTotalLessonsCompleted() + 1);
            
            // Check streak
            LocalDateTime now = LocalDateTime.now();
            if (user.getLastLessonCompletedAt() != null) {
                if (user.getLastLessonCompletedAt().toLocalDate().plusDays(1).equals(now.toLocalDate())) {
                    user.setDailyStreak(user.getDailyStreak() + 1);
                } else if (!user.getLastLessonCompletedAt().toLocalDate().equals(now.toLocalDate())) {
                    user.setDailyStreak(1);
                }
            } else {
                user.setDailyStreak(1);
            }
            
            user.setLastLessonCompletedAt(now);
            userRepository.save(user);
        }
    }

    public List<LessonProgress> getUserProgress(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return lessonProgressRepository.findByUser(user);
    }
}
