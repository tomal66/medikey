package com.backend.medikey.service;

import com.backend.medikey.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getUsers();

    /*Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    void saveUserVerificationToken(User theUser, String verificationToken);
    String validateToken(String theToken);*/

    Optional<Object> findById(Long userId);
}
