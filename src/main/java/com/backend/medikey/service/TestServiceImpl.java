package com.backend.medikey.service;

import com.backend.medikey.model.Test;
import com.backend.medikey.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // creates a constructor for all final fields
public class TestServiceImpl implements TestService {

    private final TestRepository testsRepository;

    @Override
    public Test createTest(Test test) {

        return null;
    }

    @Override
    public Test getTestById(Long testId) {
        return (Test) testsRepository.findById(testId).orElse(null);
    }

    @Override
    public List<Test> getTestsByUserId(Long userId) {
        return testsRepository.findByUserId(userId); // 200 OK, body contains list of tests
    }

    @Override
    public Test updateTest(Long testId, Test updatedTest) {

        Optional<Object> existingTest = testsRepository.findById(testId);
         if (existingTest.isPresent()) {
             Test testToUpdate = (Test) existingTest.get();
             // Update the fields of testToUpdate with values from updatedTest
            // Save the updated test to the repository
             return testsRepository.save(testToUpdate);
         }

        return null;
    }

    @Override
    public void deleteTest(Long testId) {
        testsRepository.deleteById(testId);
    }
}