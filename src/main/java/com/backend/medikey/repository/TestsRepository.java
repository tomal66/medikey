package com.backend.medikey.repository;

import com.backend.medikey.model.Tests;

import java.util.List;
import java.util.Optional;

public interface TestsRepository {
    void deleteById(Long testId);

    List<Tests> findByUserId(Long userId);

    Optional<Object> findById(Long testId);

    Tests save(Tests testToUpdate);
}
