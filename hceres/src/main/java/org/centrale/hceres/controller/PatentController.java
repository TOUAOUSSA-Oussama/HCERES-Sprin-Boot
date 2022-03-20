package org.centrale.hceres.controller;

import org.centrale.hceres.items.Patent;
import org.centrale.hceres.service.PatentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @RequestMapping(value = "/AddPatent", method= RequestMethod.POST)
    public Patent createPatent(HttpServletRequest request) {
        return patentService.savePatent(request);
    }

    @DeleteMapping("/deletePatent/{id}")
    public void deletePatent(@PathVariable("id") final Integer id) {
        patentService.deletePatent(id);
    }

}
