package com.innerroot.repository;

import com.innerroot.model.LessonProgress;
import com.innerroot.model.User;
import com.innerroot.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonProgressRepository extends JpaRepository<LessonProgress, String> {
    List<LessonProgress> findByUser(User user);
    Optional<LessonProgress> findByUserAndLesson(User user, Lesson lesson);
}
