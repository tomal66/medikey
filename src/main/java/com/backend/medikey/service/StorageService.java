package com.backend.medikey.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.backend.medikey.dto.MailRequest;
import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.dto.TestDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.model.Test;
import com.backend.medikey.repository.DoctorRepository;
import com.backend.medikey.repository.TestRepository;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class StorageService {
    private final String bucketName = "medikey-storage";
    @Autowired
    private AmazonS3 s3Client;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private TestService testService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private HospitalService hospitalService;
    @Autowired
    private EmailService emailService;

    public String uploadFile(MultipartFile file, String category, Long id) {
        if (!"doctors".equals(category) && !"reports".equals(category)) {
            throw new IllegalArgumentException("Invalid category. Allowed categories are 'doctors' and 'reports'.");
        }

        if (id == null) {
            throw new IllegalArgumentException("The ID must not be null.");
        }

        String originalFileName = file.getOriginalFilename();
        String fileKey = category + "/" + id + "/" + originalFileName;
        File fileObject = convertMultipartFileToFile(file);

        // Upload file to S3
        s3Client.putObject(new PutObjectRequest(bucketName, fileKey, fileObject));
        fileObject.delete(); // Make sure to delete the local file after upload

        // Set the filename in the corresponding entity
        if ("doctors".equals(category)) {
            Doctor doctor = doctorRepository.findByUser_UserId(id);
            doctor.setProfileImage(originalFileName);
            doctorRepository.save(doctor);
        } else if ("reports".equals(category)) {
            TestDto testDto = testService.getTestById(id);
            PatientDto patientDto = patientService.getPatientById(testDto.getPatientId());
            MailRequest mailRequest = new MailRequest();
            mailRequest.setFrom("medikey.health@gmail.com");
            mailRequest.setTo(patientDto.getEmail());
            mailRequest.setSubject("Test Report Available");
            Map<String, Object> model = new HashMap<>();
            model.put("patientName", patientDto.getFirstName());
            model.put("testType", testDto.getTestType());
            model.put("hospitalName", hospitalService.findByHospitalId(testDto.getTestLocationId()).getName());
            model.put("doctorName", testDto.getDoctorName());

            emailService.sendEmailWithAttachment(mailRequest, model, file);
        }

        return "File Uploaded: " + fileKey;
    }

    public byte[] downloadFile(String category, Long id, String fileName) throws IOException {

        String fileKey = category + "/" + id + "/" + fileName;

        // Get the object from S3 using the constructed file key
        S3Object s3Object = s3Client.getObject(bucketName, fileKey);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        byte[] content = IOUtils.toByteArray(inputStream);
        inputStream.close(); // It's important to close the stream after use

        return content;
    }


    public String deleteFile(String category, Long id, String fileName){
        String fileKey = category + "/" + id + "/" + fileName;
        s3Client.deleteObject(bucketName, fileKey);
        if ("doctors".equals(category)) {
            Doctor doctor = doctorRepository.findByUser_UserId(id);
            doctor.setProfileImage(null);
            doctorRepository.save(doctor);
        }
        return fileName+" removed ...";
    }

    private File convertMultipartFileToFile(MultipartFile file){
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Unable to convert file", e);
        }
        return convertedFile;
    }

}
