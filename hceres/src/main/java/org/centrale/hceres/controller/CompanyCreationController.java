package org.centrale.hceres.controller;

import org.centrale.hceres.items.CompanyCreation;
import org.centrale.hceres.service.CompanyCreationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyCreationController {

    @Autowired
    private CompanyCreationService companyCreationService;

    @GetMapping("/CompanyCreations")
    public Iterable<CompanyCreation> getCompanyCreations() {
        return companyCreationService.getCompanyCreations();
    }


    @GetMapping("/CompanyCreations/{id}")
    public CompanyCreation getCompanyCreation(@PathVariable("id") final Integer id) {
        Optional<CompanyCreation> companyCreation = companyCreationService.getCompanyCreation(id);
        if(companyCreation.isPresent()) {
            return companyCreation.get();
        } else {
            return null;
        }
    }

    @PostMapping(value = "/AddCompanyCreation")
    public CompanyCreation createCompanyCreation(@RequestBody Map<String, Object> request) {
        return companyCreationService.saveCompanyCreation(request);
    }


    @DeleteMapping("/deleteCompanyCreation/{id}")
    public void deleteCompanyCreation(@PathVariable("id") final Integer id) {
        companyCreationService.deleteCompanyCreation(id);
    }

}
