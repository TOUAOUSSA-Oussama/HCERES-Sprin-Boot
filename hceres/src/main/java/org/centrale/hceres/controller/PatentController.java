package org.centrale.hceres.controller;

import org.centrale.hceres.items.Patent;
import org.centrale.hceres.service.PatentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhos:3000")
public class PatentController {

    @Autowired
    private PatentService patentService;

    @GetMapping("/Patents")
    public Iterable<Patent> getPatents() {
        return patentService.getPatents();
    }


    @GetMapping("/Patents/{id}")
    public Patent getPatent(@PathVariable("id") final Integer id) {
        Optional<Patent> Patent = patentService.getPatent(id);
        if(Patent.isPresent()) {
            return Patent.get();
        } else {
            return null;
        }
    }

    @PostMapping(value = "/AddPatent")
    public Patent createPatent(@RequestBody Map<String, Object> request) {
        return patentService.savePatent(request);
    }

    @DeleteMapping("/deletePatent/{id}")
    public void deletePatent(@PathVariable("id") final Integer id) {
        patentService.deletePatent(id);
    }

}
