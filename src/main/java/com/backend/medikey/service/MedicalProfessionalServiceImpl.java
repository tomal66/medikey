package com.backend.medikey.service;

import com.backend.medikey.dto.MedicalProfessionalDto;
import com.backend.medikey.model.Hospital;
import com.backend.medikey.model.MedicalProfessional;
import com.backend.medikey.model.User;
import com.backend.medikey.repository.HospitalRepository;
import com.backend.medikey.repository.MedicalProfessionalRepository;
import com.backend.medikey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MedicalProfessionalServiceImpl implements MedicalProfessionalService {

    @Autowired
    private MedicalProfessionalRepository medicalProfessionalRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public MedicalProfessionalDto save(MedicalProfessionalDto medicalProfessionalDto) {
        MedicalProfessionalDto dto = convertToDto(medicalProfessionalRepository.save(convertToEntity(medicalProfessionalDto)));
        return dto;
    }

    @Override
    public MedicalProfessionalDto findById(Long id) {
        return convertToDto(medicalProfessionalRepository.findByMpId(id));
    }

    @Override
    public MedicalProfessionalDto findByUserId(Long id) {
        return convertToDto(medicalProfessionalRepository.findByUser_UserId(id));
    }

    @Override
    public List<MedicalProfessionalDto> findAll() {
        List<MedicalProfessional> medicalProfessionals = medicalProfessionalRepository.findAll();
        return medicalProfessionals.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public MedicalProfessionalDto update(MedicalProfessionalDto medicalProfessionalDto) {
        MedicalProfessional medicalProfessional = medicalProfessionalRepository.findByMpId(medicalProfessionalDto.getMpId());
        medicalProfessional.setFirstName(medicalProfessionalDto.getFirstName());
        medicalProfessional.setLastName(medicalProfessionalDto.getLastName());
        medicalProfessional.setPhone(medicalProfessionalDto.getPhone());
        medicalProfessional.setEmail(medicalProfessionalDto.getEmail());
        medicalProfessionalRepository.save(medicalProfessional);
        return convertToDto(medicalProfessional);
    }

    @Override
    public List<MedicalProfessionalDto> findByHospital(Long hospitalId){
        List<MedicalProfessional> medicalProfessionals = medicalProfessionalRepository.findAllByHospital_HospitalId(hospitalId);
        return medicalProfessionals.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public void delete(Long id) {
        medicalProfessionalRepository.deleteById(id);
    }

    private MedicalProfessionalDto convertToDto(MedicalProfessional medicalProfessional) {
        MedicalProfessionalDto dto = new MedicalProfessionalDto();
        if(medicalProfessional.getMpId()!=null) {
            dto.setMpId(medicalProfessional.getMpId());
        }
        dto.setFirstName(medicalProfessional.getFirstName());
        dto.setLastName(medicalProfessional.getLastName());
        dto.setEmail(medicalProfessional.getEmail());
        dto.setPhone(medicalProfessional.getPhone());
        dto.setUserId(medicalProfessional.getUser().getUserId());
        dto.setHospitalId(medicalProfessional.getHospital().getHospitalId());
        return dto;
    }

    // Convert to Entity
    private MedicalProfessional convertToEntity(MedicalProfessionalDto medicalProfessionalDto) {
        MedicalProfessional entity = new MedicalProfessional();
        if(medicalProfessionalDto.getMpId()!=null) {
            entity.setMpId(medicalProfessionalDto.getMpId());
        }
        entity.setFirstName(medicalProfessionalDto.getFirstName());
        entity.setLastName(medicalProfessionalDto.getLastName());
        entity.setEmail(medicalProfessionalDto.getEmail());
        entity.setPhone(medicalProfessionalDto.getPhone());
        User user = userRepository.findByUserId(medicalProfessionalDto.getUserId());
        entity.setUser(user);
        Hospital hospital = hospitalRepository.findByHospitalId(medicalProfessionalDto.getHospitalId());
        entity.setHospital(hospital);

        return entity;
    }
}