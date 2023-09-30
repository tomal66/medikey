package com.backend.medikey.controller;

import com.backend.medikey.model.Visit;
import com.backend.medikey.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    @Autowired
    private VisitService visitService;

    // Get all visits
    @GetMapping
    public ResponseEntity<List<Visit>> getAllVisits() {
        return new ResponseEntity<>(visitService.getAllVisits(), HttpStatus.OK);
    }

    // Get a specific visit by ID
    @GetMapping("/{id}")
    public ResponseEntity<Visit> getVisitById(@PathVariable Long id) {
        return visitService.getVisitById(id)
                .map(visit -> new ResponseEntity<>(visit, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get all visits for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Visit>> getVisitsByUserId(@PathVariable Long userId) {
        return new ResponseEntity<>(visitService.getVisitsByUserId(userId), HttpStatus.OK);
    }

    // Get all visits on a specific date
    @GetMapping("/date/{visitDate}")
    public ResponseEntity<List<Visit>> getVisitsByVisitDate(@PathVariable Date visitDate) {
        return new ResponseEntity<>(visitService.getVisitsByVisitDate(visitDate), HttpStatus.OK);
    }

    // Get all visits to a specific hospital
    //@GetMapping("/hospital/{hospital}")
    //public ResponseEntity<List<Visit>> getVisitsByHospital(@PathVariable String hospital) {
    //    return new ResponseEntity<>(visitService.getVisitsByHospital(hospital), HttpStatus.OK);
   // }

    // Get all visits to a specific doctor
  //  @GetMapping("/doctor/{doctor}")
  //  public ResponseEntity<List<Visit>> getVisitsByDoctor(@PathVariable String doctor) {
  //      return new ResponseEntity<>(visitService.getVisitsByDoctor(doctor), HttpStatus.OK);
   //  }

    // Add a new visit
    @PostMapping
    public ResponseEntity<Visit> addVisit(@RequestBody Visit visit) {
        return new ResponseEntity<>(visitService.addVisit(visit), HttpStatus.CREATED);
    }

    // Update an existing visit
    @PutMapping("/{id}")
    public ResponseEntity<Visit> updateVisit(@PathVariable Long id, @RequestBody Visit visit) {
        // Ensure the ID from the path matches the ID of the visit object
        if (!id.equals(visit.getVisitId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(visitService.updateVisit(visit), HttpStatus.OK);
    }

    // Delete a visit by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
