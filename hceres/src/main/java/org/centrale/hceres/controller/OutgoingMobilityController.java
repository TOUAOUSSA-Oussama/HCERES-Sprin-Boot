package org.centrale.hceres.controller;

import java.util.Optional;

import org.centrale.hceres.items.OutgoingMobility;
import org.centrale.hceres.service.OutgoingMobilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OutgoingMobilityController {

    @Autowired
    private OutgoingMobilityService OutgoingMobilityService;

    @GetMapping("/OutgoingMobilities")
    public Iterable<OutgoingMobility> getOutgoingMobilitys() {
        return OutgoingMobilityService.getOutgoingMobilitys();
    }


    @GetMapping("/OutgoingMobilities/{id}")
    public OutgoingMobility getOutgoingMobility(@PathVariable("id") final Integer id) {
        Optional<OutgoingMobility> OutgoingMobility = OutgoingMobilityService.getOutgoingMobility(id);
        if(OutgoingMobility.isPresent()) {
            return OutgoingMobility.get();
        } else {
            return null;
        }
    }


    @PostMapping(value = "/AddOutgoingMobility")
    public OutgoingMobility createOutgoingMobility(@RequestBody Map<String, Object> request) {
        return OutgoingMobilityService.saveOutgoingMobility(request);
    }

    @DeleteMapping("/deletOutgoingMobility/{id}")
    public void deleteOutgoingMobility(@PathVariable("id") final Integer id) {
        OutgoingMobilityService.deleteOutgoingMobility(id);
    }

}
