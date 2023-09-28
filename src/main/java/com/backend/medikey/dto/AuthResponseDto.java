package com.backend.medikey.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String accessToken;
    private String tokenType = "Bearer ";
    private String username;
    private String role;

    public AuthResponseDto(String accessToken, String username,String role)
    {
        this.accessToken = accessToken;
        this.username = username;
        this.role = role;
    }

}
