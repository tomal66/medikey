package com.backend.medikey.repository;

import com.backend.medikey.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    Optional<User> findUserByUserId(Long userId);
    Boolean existsByUsername(String username);
}
