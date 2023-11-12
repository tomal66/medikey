package com.backend.medikey.controller;

import com.backend.medikey.dto.MailRequest;
import com.backend.medikey.dto.MailResponse;
import com.backend.medikey.service.EmailService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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

    @PostMapping("/sendPrescriptionEmail")
    public MailResponse sendPrescriptionEmail(@RequestBody MailRequest request) {
        Map<String, Object> model = new HashMap<>();

        return service.sendPrescriptionEmail(request, model);

    }

    @GetMapping("/generate-qr-code")
    public ResponseEntity<byte[]> generateQRCodeDownload(@RequestParam String text) {
        try {
            ByteArrayOutputStream stream = service.generateQRCode(text);
            byte[] qrCodeBytes = stream.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentDispositionFormData("attachment", "qr-code.png");

            return new ResponseEntity<>(qrCodeBytes, headers, HttpStatus.OK);
        } catch (WriterException | IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
