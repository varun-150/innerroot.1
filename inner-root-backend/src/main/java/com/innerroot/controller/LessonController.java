package com.innerroot.controller;

import com.innerroot.model.Lesson;
import com.innerroot.model.LessonProgress;
import com.innerroot.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons() {
        return ResponseEntity.ok(lessonService.getAllLessons());
    }

    @GetMapping("/{dayNumber}")
    public ResponseEntity<Lesson> getLessonByDay(@PathVariable Integer dayNumber) {
        return lessonService.getLessonByDay(dayNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{lessonId}/complete")
    public ResponseEntity<Void> completeLesson(@PathVariable String lessonId, @RequestParam String userId) {
        lessonService.completeLesson(userId, lessonId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/progress/{userId}")
    public ResponseEntity<List<LessonProgress>> getUserProgress(@PathVariable String userId) {
        return ResponseEntity.ok(lessonService.getUserProgress(userId));
    }
}
