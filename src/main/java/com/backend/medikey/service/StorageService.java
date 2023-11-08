package com.backend.medikey.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
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

@Service
@Slf4j
public class StorageService {
    private String bucketName = "medikey-storage";
    @Autowired
    private AmazonS3 s3Client;
    @Autowired
    private DoctorRepository doctorRepository;
    private TestRepository testRepository;
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
            Test test = testRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Test not found"));
            test.setTestReport(originalFileName);
            testRepository.save(test);
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
        } else if ("reports".equals(category)) {
            Test test = testRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Test not found"));
            test.setTestReport(null);
            testRepository.save(test);
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
