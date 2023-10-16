package com.backend.medikey.controller;

import com.backend.medikey.dto.LoginDto;
import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.dto.RegisterDto;
import com.backend.medikey.dto.AuthResponseDto;
import com.backend.medikey.model.User;
import com.backend.medikey.repository.UserRepository;
import com.backend.medikey.security.JWTGenerator;
import com.backend.medikey.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTGenerator jwtGenerator;
    @Autowired
    private PatientService patientService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto)
    {
        if(userRepository.existsByUsername(registerDto.getUsername())){
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        }
        //registerDto.setRole("ROLE_USER");

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(registerDto.getRole());
        userRepository.save(user);

        return new ResponseEntity<>("User registration success!", HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        String username = jwtGenerator.getUsernameFromJWT(token);
        String role = userRepository.findByUsername(username).getRole();
        Long userId = userRepository.findByUsername(username).getUserId();

        return new ResponseEntity<>(new AuthResponseDto(token, username, role, userId), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("getUser")
    public ResponseEntity<?> getUser(@RequestParam Long userId, @RequestParam String role) {
        Object userDetails = null;

        switch (role) {
            case "ROLE_PATIENT":
                // Fetch patient details using the patient service
                PatientDto patientDto = patientService.getPatientByUserId(userId);
                if (patientDto != null) {
                    userDetails = patientDto;
                }
                break;

            // Add similar conditions for other roles

            default:
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (userDetails != null) {
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
