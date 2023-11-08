package com.backend.medikey.controller;

import com.backend.medikey.service.StorageService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/storage")
public class StorageController {
    @Autowired
    private StorageService storageService;

    @PostMapping("/upload/{category}/{id}")
    public ResponseEntity<String> uploadFile(@PathVariable String category,
                                             @PathVariable Long id,
                                             @RequestParam("file") MultipartFile file) {
        try {
            String result = storageService.uploadFile(file, category, id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/download/{category}/{id}/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String category,
                                                          @PathVariable Long id,
                                                          @PathVariable String fileName) {
        try {
            byte[] data = storageService.downloadFile(category, id, fileName);
            ByteArrayResource resource = new ByteArrayResource(data);
            String mimeType = determineMimeType(fileName);

            return ResponseEntity.ok()
                    .contentLength(data.length)
                    .header("Content-type", mimeType)
                    .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new ByteArrayResource(new byte[0]), HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete/{category}/{id}/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String category,
                                             @PathVariable Long id,
                                             @PathVariable String fileName){
        return new ResponseEntity<>(storageService.deleteFile(category, id, fileName), HttpStatus.OK);
    }

    private String determineMimeType(String fileName) {
        String mimeType;
        // Extract the file extension and determine the MIME type
        String extension = FilenameUtils.getExtension(fileName);
        mimeType = switch (extension.toLowerCase()) {
            case "txt" -> "text/plain";
            case "pdf" -> "application/pdf";
            case "png" -> "image/png";
            case "jpg", "jpeg" -> "image/jpeg";
            default -> "application/octet-stream"; // default binary file type
        };
        return mimeType;
    }



}
