package org.centrale.hceres.controller;

import org.centrale.hceres.items.OutgoingMobility;
import org.centrale.hceres.service.OutgoingMobilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

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

    @RequestMapping(value = "/AddOutgoingMobility", method= RequestMethod.POST)
    public OutgoingMobility createOutgoingMobility(HttpServletRequest request) {
        return OutgoingMobilityService.saveOutgoingMobility(request);
    }

    @DeleteMapping("/deletOutgoingMobility/{id}")
    public void deleteOutgoingMobility(@PathVariable("id") final Integer id) {
        OutgoingMobilityService.deleteOutgoingMobility(id);
    }

}
