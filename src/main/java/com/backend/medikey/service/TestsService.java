package com.backend.medikey.service;

import com.backend.medikey.model.Tests;

import java.util.List;
import java.util.Optional;

public interface TestsService {
    Tests createTest(Tests test);
    Tests getTestById(Long testsId);
    List<Tests> getTestsByUserId(Long userId); // get all tests for a user

    Tests updateTest(Long testId, Tests updatedTest);

    void deleteTest(Long testId); // delete a test
}
