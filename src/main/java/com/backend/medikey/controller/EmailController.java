package com.backend.medikey.controller;

import com.backend.medikey.dto.MailRequest;
import com.backend.medikey.dto.MailResponse;
import com.backend.medikey.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mail")
public class EmailController {
    @Autowired
    private EmailService service;

    @PostMapping("/sendingEmail")
    public MailResponse sendEmail(@RequestBody MailRequest request) {
        Map<String, Object> model = new HashMap<>();
        model.put("name", request.getName());
        model.put("role", request.getRole());
        model.put("username", request.getUsername());
        model.put("password", request.getPassword());
        return service.sendEmail(request, model);

    }
}
