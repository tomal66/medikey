package com.backend.medikey.service;

import com.backend.medikey.model.Test;

import java.util.List;
import java.util.Optional;

public interface TestService {
    Test createTest(Test test);
    Test getTestById(Long testsId);
    List<Test> getTestsByUserId(Long userId); // get all tests for a user

    Test updateTest(Long testId, Test updatedTest);

    void deleteTest(Long testId); // delete a test
}
