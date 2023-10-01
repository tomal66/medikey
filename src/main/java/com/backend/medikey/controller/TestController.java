package com.backend.medikey.controller;

import com.backend.medikey.model.Test;
import com.backend.medikey.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor // creates a constructor for all final fields
@RequestMapping("/test") // base path, all methods will be under this path
public class TestController {

    private final TestService testsService;

    @PostMapping("/create")
    public ResponseEntity<Test> createTest(@Validated @RequestBody Test test) {
        Test createdTest = testsService.createTest(test); // 201 CREATED
        return ResponseEntity.ok(createdTest); // 200 OK, body contains created test
    }

    @GetMapping("/{testId}")
    public ResponseEntity<Test> getTestById(@PathVariable Long testId) {
        Test test = testsService.getTestById(testId); // 200 OK, body contains test
        if (test != null) {
            return ResponseEntity.ok(test);
        } else {
            return ResponseEntity.notFound().build(); // 404 NOT FOUND, body is empty
        }
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Test>> getTestsByUserId(@PathVariable String username) {
        List<Test> userTests = testsService.getTestsByUsername(username); // 200 OK, body contains list of tests
        return ResponseEntity.ok(userTests);
    }

    @PutMapping("/{testId}")
    public ResponseEntity<Test> updateTest(@PathVariable Long testId, @Validated @RequestBody Test updatedTest) { // 200 OK, body contains updated test
        Test test = testsService.updateTest(testId, updatedTest);
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
