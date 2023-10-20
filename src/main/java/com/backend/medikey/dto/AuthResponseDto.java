package com.backend.medikey.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String accessToken;
    private String tokenType = "Bearer ";
    private String username;
    private String role;
    private Long userId;
    private Object userDetails;

    public AuthResponseDto(String accessToken, String username, String role, Long userId, Object userDetails)
    {
        this.accessToken = accessToken;
        this.username = username;
        this.role = role;
        this.userId = userId;
        this.userDetails = userDetails;
    }

}
