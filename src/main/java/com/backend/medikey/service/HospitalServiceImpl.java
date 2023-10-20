package com.backend.medikey.service;

import com.backend.medikey.dto.HospitalDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.model.Hospital;
import com.backend.medikey.model.Visit;
import com.backend.medikey.repository.HospitalRepository;
import com.backend.medikey.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public Hospital save(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    @Override
    public List<Hospital> findAll() {
        return hospitalRepository.findAll();
    }

    @Override
    public Hospital findByHospitalId(Long hospitalId) {
        return hospitalRepository.findByHospitalId(hospitalId);
    }

    @Override
    public void delete(Long id) {
        hospitalRepository.deleteById(id);
    }

    @Override
    public HospitalDto findByUserId(Long userId) {
        return convertToDto(hospitalRepository.findHospitalByUser_UserId(userId));
    }

    @Override
    public List<Hospital> findByName(String name) {
        return hospitalRepository.findByName(name);
    }

    @Override
    public List<Hospital> findByCity(String city) {
        return hospitalRepository.findByCity(city);
    }

    @Override
    public List<Hospital> findByState(String state) {
        return hospitalRepository.findByState(state);
    }

    @Override
    public List<Hospital> findByCountry(String country) {
        return hospitalRepository.findByCountry(country);
    }

    @Override
    public List<Hospital> findByPostalCode(String postalCode) {
        return hospitalRepository.findByPostalCode(postalCode);
    }
    private HospitalDto convertToDto(Hospital hospital) {
        HospitalDto dto = new HospitalDto();
        dto.setHospitalId(hospital.getHospitalId());
        dto.setName(hospital.getName());
        dto.setAddress(hospital.getAddress());
        dto.setCity(hospital.getCity());
        dto.setState(hospital.getState());
        dto.setCountry(hospital.getCountry());
        dto.setPostalCode(hospital.getPostalCode());
        dto.setPhoneNumber(hospital.getPhoneNumber());
        dto.setEmail(hospital.getEmail());
        dto.setUserId(hospital.getUser().getUserId());

        if (hospital.getDoctors() != null) {
            Doctor doctor = new Doctor();
            dto.setDoctorIds(hospital.getDoctors().stream()
                    .map(Doctor::getDoctorId)
                    .collect(Collectors.toList()));
        }
        if (hospital.getVisits() != null) {
            Visit visit = new Visit();
            dto.setVisitIds(hospital.getVisits().stream()
                    .map(Visit::getVisitId)
                    .collect(Collectors.toList()));
        }
        // Add other fields as needed
        return dto;
    }
}