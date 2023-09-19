package com.backend.medikey.service;

import com.backend.medikey.model.Tests;
import com.backend.medikey.repository.TestsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // creates a constructor for all final fields
public class TestsServiceImpl implements TestsService {

    private final TestsRepository testsRepository;

    @Override
    public Tests createTest(Tests test) {

        return null;
    }

    @Override
    public Tests getTestById(Long testId) {
        return (Tests) testsRepository.findById(testId).orElse(null);
    }

    @Override
    public List<Tests> getTestsByUserId(Long userId) {
        return testsRepository.findByUserId(userId); // 200 OK, body contains list of tests
    }

    @Override
    public Tests updateTest(Long testId, Tests updatedTest) {

        Optional<Object> existingTest = testsRepository.findById(testId);
         if (existingTest.isPresent()) {
             Tests testToUpdate = (Tests) existingTest.get();
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
