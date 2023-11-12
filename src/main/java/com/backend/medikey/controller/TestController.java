package com.backend.medikey.controller;

import com.backend.medikey.dto.TestDto;
import com.backend.medikey.model.Test;
import com.backend.medikey.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    private final TestService testService;

    @PostMapping("/create")
    public ResponseEntity<TestDto> createTest(@Validated @RequestBody TestDto testDto) {
        TestDto createdTest = testService.createTest(testDto);
        return new ResponseEntity<>(createdTest, HttpStatus.CREATED);
    }

    @GetMapping("/{testId}")
    public ResponseEntity<TestDto> getTestById(@PathVariable Long testId) {
        TestDto testDto = testService.getTestById(testId);
        return ResponseEntity.ok(testDto);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<TestDto>> getTestsByPatient(@PathVariable Long patientId) {
        List<TestDto> tests = testService.getTestsByPatient(patientId);
        return ResponseEntity.ok(tests);
    }

    @PutMapping("/{testId}")
    public ResponseEntity<TestDto> updateTest(@PathVariable Long testId, @Validated @RequestBody TestDto updatedTestDto) {
        TestDto updatedTest = testService.updateTest(testId, updatedTestDto);
        return ResponseEntity.ok(updatedTest);
    }

    @DeleteMapping("/{testId}")
    public ResponseEntity<Void> deleteTest(@PathVariable Long testId) {
        testService.deleteTest(testId);
        return ResponseEntity.noContent().build();
    }
}
