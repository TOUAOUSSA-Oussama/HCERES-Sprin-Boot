package org.centrale.hceres.controller;

import java.util.Optional;

import org.centrale.hceres.items.OutgoingMobility;
import org.centrale.hceres.service.OutgoingMobilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
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
