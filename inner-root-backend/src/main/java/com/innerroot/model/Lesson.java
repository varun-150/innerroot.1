package com.innerroot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String title;

    @ManyToOne
    @JoinColumn(name = "heritage_site_id")
    private HeritageSite heritageSite;

    @ManyToOne
    @JoinColumn(name = "wisdom_quote_id")
    private WisdomQuote wisdomQuote;

    @ManyToOne
    @JoinColumn(name = "wellness_content_id")
    private WellnessContent practice;

    private Integer dayNumber; // For sequential learning

    private String difficulty; // beginner, scholar

    @CreationTimestamp
    private LocalDateTime createdAt;
}
