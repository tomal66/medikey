package com.backend.medikey.service;

import com.backend.medikey.dto.TestDto;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.Test;
import com.backend.medikey.model.User;
import com.backend.medikey.repository.HospitalRepository;
import com.backend.medikey.repository.PatientRepository;
import com.backend.medikey.repository.TestRepository;
import com.backend.medikey.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // creates a constructor for all final fields
public class TestServiceImpl implements TestService {
    @Autowired
    private final TestRepository testRepository;
    @Autowired
    private final PatientRepository patientRepository;
    @Autowired
    private final HospitalRepository hospitalRepository;

    @Override
    public TestDto createTest(TestDto testDto) {
        Test test = convertToEntity(testDto);
        Test savedTest = testRepository.save(test);
        return convertToDto(savedTest);
    }

    @Override
    public TestDto getTestById(Long testsId) {
        Test test = testRepository.findById(testsId)
                .orElseThrow(() -> new RuntimeException("Test not found")); // Customize exception as needed
        return convertToDto(test);
    }

    @Override
    public List<TestDto> getTestsByPatient(Long patientId) {
        return testRepository.findAllByPatient_PatientId(patientId).stream()
                                .map(this::convertToDto).toList();
    }

    @Override
    public TestDto updateTest(Long testId, TestDto updatedTestDto) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found")); // Customize exception as needed
        // Update fields here
        test.setTestType(updatedTestDto.getTestType());
        test.setDoctorName(updatedTestDto.getDoctorName());
        test.setTestReport(updatedTestDto.getTestReport());
        // Add other fields as necessary
        Test updatedTest = testRepository.save(test);
        return convertToDto(updatedTest);
    }

    @Override
    public void deleteTest(Long testId) {
        testRepository.deleteById(testId);
    }

    public TestDto convertToDto(Test test) {
        TestDto dto = new TestDto();
        dto.setTestId(test.getTestId());
        dto.setPatientId(test.getPatient().getPatientId());
        dto.setDateRecorded(test.getDateRecorded());
        dto.setTestLocationId(test.getTestLocation().getHospitalId());
        dto.setTestType(test.getTestType());
        dto.setDoctorName(test.getDoctorName());
        dto.setTestReport(test.getTestReport());
        return dto;
    }

    public Test convertToEntity(TestDto dto) {
        Test test = new Test();
        if (dto.getTestId() != null) {
            test.setTestId(dto.getTestId());
        }
        test.setPatient(patientRepository.findByPatientId(dto.getPatientId()));
        test.setDateRecorded(dto.getDateRecorded());
        test.setTestLocation(hospitalRepository.findByHospitalId(dto.getTestLocationId()));
        test.setTestType(dto.getTestType());
        test.setDoctorName(dto.getDoctorName());
        test.setTestReport(dto.getTestReport());
        return test;
    }
}
