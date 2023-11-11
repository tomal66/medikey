package com.backend.medikey.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;
import com.backend.medikey.dto.MailRequest;
import com.backend.medikey.dto.MailResponse;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;


import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private Configuration config;

    public MailResponse sendEmail(MailRequest request, Map<String, Object> model) {
        MailResponse response = new MailResponse();
        MimeMessage message = sender.createMimeMessage();
        try {
            // set mediaType
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            // add attachment
            //helper.addAttachment("logo.png", new ClassPathResource("logo.png"));

            Template t = config.getTemplate("email-template.ftl");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

            helper.setTo(request.getTo());
            helper.setText(html, true);
            helper.setSubject(request.getSubject());
            helper.setFrom(request.getFrom());
            sender.send(message);

            response.setMessage("mail send to : " + request.getTo());
            response.setStatus(Boolean.TRUE);

        } catch (MessagingException | IOException | TemplateException e) {
            response.setMessage("Mail Sending failure : "+e.getMessage());
            response.setStatus(Boolean.FALSE);
        }

        return response;
    }

    public MailResponse sendEmail(MailRequest request, Map<String, Object> model, String qrCodeString) {
        MailResponse response = new MailResponse();
        MimeMessage message = sender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            // Generate QR Code
            ByteArrayOutputStream stream = generateQRCode(qrCodeString);
            byte[] bytes = stream.toByteArray();

            // Encode bytes to Base64 and prepare them for inline embedding
            String base64Image = Base64.getEncoder().encodeToString(bytes);
            model.put("qrCodeBase64", base64Image);  // You'll reference this in your FTL as ${qrCodeBase64}

            // Add QR Code as an attachment
            helper.addAttachment("qr-code.png", new ByteArrayResource(bytes), "image/png");

            Template t = config.getTemplate("appointment-mail.ftl");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

            helper.setTo(request.getTo());
            helper.setText(html, true);
            helper.setSubject(request.getSubject());
            helper.setFrom(request.getFrom());
            sender.send(message);

            response.setMessage("mail sent to: " + request.getTo());
            response.setStatus(Boolean.TRUE);

        } catch (MessagingException | IOException | TemplateException | WriterException e) {
            response.setMessage("Mail Sending failure: " + e.getMessage());
            response.setStatus(Boolean.FALSE);
        }

        return response;
    }


    public ByteArrayOutputStream generateQRCode(String qrCodeText) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, 500, 500);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        return pngOutputStream;
    }



}