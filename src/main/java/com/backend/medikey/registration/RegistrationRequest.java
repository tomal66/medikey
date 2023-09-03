package com.backend.medikey.registration;

public record RegistrationRequest(
        String firstName,
        String lastName,
        String email,
        String phone,
        String password,
        String role) {
}