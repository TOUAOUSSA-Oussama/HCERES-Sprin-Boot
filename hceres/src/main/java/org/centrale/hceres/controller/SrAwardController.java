package org.centrale.hceres.controller;

import java.util.Date;
import java.util.Optional;

import org.centrale.hceres.model.SrAward;
import org.centrale.hceres.service.SrAwardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Controller permet de receptionner la requete http depuis le client, envoyer cette requete a service pour la traiter, puis retouner la reponse
// la reponse sera sous format JSON (il s'agit d'une REST API)
@RestController
public class SrAwardController {
	
	/**
	 * instanciation
	 */
	@Autowired
	private SrAwardService awardService;
	
	/**
	 * pour une requete GET pour fournir la liste 
	 * @return : la liste
	 */
	@GetMapping("/Awards")
	public Iterable<SrAward> getAward() {
		return awardService.getAwards();
	}
	
	/**
	 * avoir un elmt grace a son id
	 * @param id : id de l'elmt
	 * @return : l'elmt 
	 */
	@GetMapping("/Awards/{id}")
	public SrAward getSrAward(@PathVariable("id") final Integer id) {
		Optional<SrAward> SrAward = awardService.getAward(id);
		if(SrAward.isPresent()) {
			return SrAward.get();
		} else {
			return null;
		}
	}
	
	/**
	 * ajouter un elmt a la base de donnees
	 * @param SrAward : l'elmt a ajouter
	 * @return l'elmt ajoute
	 */
	@PostMapping("/AddSrAward")
	public SrAward createSrAward(@RequestBody SrAward SrAward) {
		return awardService.saveAward(SrAward);
	}
	
	/**
	 * Update - Update an existing element
	 * @param id - The id of the element
	 * @param SrAward - The element
	 * @return
	 */
	@PutMapping("/updateSrAward/{id}")
	public SrAward updateSrAward(@PathVariable("id") final Integer id, @RequestBody SrAward SrAward) {
		Optional<SrAward> e = awardService.getAward(id);
		if(e.isPresent()) {
			SrAward currentSrAward = e.get();
			
			String SrAwardCourseName = SrAward.getAwardeeName();
			if(SrAwardCourseName != null) {
				currentSrAward.setAwardeeName(SrAwardCourseName);
			}
			
			Date SrAwardCompletion = SrAward.getAwardDate();
			if(SrAwardCompletion != null) {
				currentSrAward.setAwardDate(SrAwardCompletion);
			}
			
			String SrAwardDescription = SrAward.getDescription();
			if(SrAwardDescription != null) {
				currentSrAward.setDescription(SrAwardDescription);
			}
			
			awardService.saveAward(currentSrAward);
			return currentSrAward;
		} else {
			return null;
		}
	}
	
	
	/**
	 * Delete - Delete an element
	 * @param id - The id of the element
	 */
	@DeleteMapping("/deleteSrAward/{id}")
	public void deleteSrAward(@PathVariable("id") final Integer id) {
		awardService.deleteAward(id);
	}
}
