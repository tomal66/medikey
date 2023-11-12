package com.backend.medikey.service;

import com.backend.medikey.dto.TestDto;
import com.backend.medikey.model.Test;

import java.util.List;
import java.util.Optional;

public interface TestService {
    TestDto createTest(TestDto testDto);
    TestDto getTestById(Long testId);
    List<TestDto> getTestsByPatient(Long patientId);
    TestDto updateTest(Long testId, TestDto updatedTestDto);

    void deleteTest(Long testId); // delete a test

    //List<Test> getTestsByUserId(Long userId);
}
