package com.backend.medikey.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "time_slot")
public class TimeSlot {

    @ManyToOne // Many time slots can belong to one doctor
    private Doctor doctor;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timeSlotId;

    @ManyToOne // Many time slots can belong to one hospital
    @JoinColumn(name = "hospitalId") // This is the foreign key, which is the primary key of the hospital table
    private Hospital hospital;
    @Enumerated(EnumType.STRING)
    @Column(name = "day", nullable = false)
    private DayOfWeek day;
    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;
    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;
    @Column(name = "duration", nullable = false)
    private Integer duration; // Duration in minutes

    // Ensure that the start time is before the end time
    @PrePersist
    @PreUpdate
    public void validateTimes() {
        if (startTime.isAfter(endTime) || startTime.equals(endTime)) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
    }
}