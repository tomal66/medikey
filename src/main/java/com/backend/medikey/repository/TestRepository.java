package com.backend.medikey.repository;

import com.backend.medikey.model.Test;

import java.util.List;
import java.util.Optional;

public interface TestRepository {
    void deleteById(Long testId);

    List<Test> findByUserId(Long userId);

    Optional<Object> findById(Long testId);

    Test save(Test testToUpdate);
}
