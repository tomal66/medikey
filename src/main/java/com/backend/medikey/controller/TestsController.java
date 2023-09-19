package com.backend.medikey.controller;

import com.backend.medikey.model.Tests;
import com.backend.medikey.service.TestsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor // creates a constructor for all final fields
@RequestMapping("/tests") // base path, all methods will be under this path
public class TestsController {

    private final TestsService testsService;

    @PostMapping("/create")
    public ResponseEntity<Tests> createTest(@Validated @RequestBody Tests test) {
        Tests createdTest = testsService.createTest(test); // 201 CREATED
        return ResponseEntity.ok(createdTest); // 200 OK, body contains created test
    }

    @GetMapping("/{testId}")
    public ResponseEntity<Tests> getTestById(@PathVariable Long testId) {
        Tests test = testsService.getTestById(testId); // 200 OK, body contains test
        if (test != null) {
            return ResponseEntity.ok(test);
        } else {
            return ResponseEntity.notFound().build(); // 404 NOT FOUND, body is empty
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Tests>> getTestsByUserId(@PathVariable Long userId) {
        List<Tests> userTests = testsService.getTestsByUserId(userId); // 200 OK, body contains list of tests
        return ResponseEntity.ok(userTests);
    }

    @PutMapping("/{testId}")
    public ResponseEntity<Tests> updateTest(@PathVariable Long testId, @Validated @RequestBody Tests updatedTest) { // 200 OK, body contains updated test
        Tests test = testsService.updateTest(testId, updatedTest);
        if (test != null) {
            return ResponseEntity.ok(test);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{testId}")
    public ResponseEntity<Void> deleteTest(@PathVariable Long testId) {
        testsService.deleteTest(testId);
        return ResponseEntity.noContent().build();
    }
}
