package com.backend.medikey.service;

import com.backend.medikey.model.User;
import com.backend.medikey.registration.RegistrationRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getUsers();
    User registerUser(RegistrationRequest request);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    void saveUserVerificationToken(User theUser, String verificationToken);
    String validateToken(String theToken);

    Optional<Object> findById(Long userId);
}
