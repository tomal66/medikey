package com.backend.medikey.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // all endpoints in the API
                .allowedOrigins("http://localhost:3000") // allow this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // allowed request methods
    }
}
