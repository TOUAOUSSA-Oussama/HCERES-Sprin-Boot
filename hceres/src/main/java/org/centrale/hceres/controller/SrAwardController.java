package org.centrale.hceres.controller;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.SrAward;
import org.centrale.hceres.service.SrAwardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// Controller permet de receptionner la requete http depuis le client, envoyer cette requete a service pour la traiter, puis retouner la reponse
// la reponse sera sous format JSON (il s'agit d'une REST API)
@RestController
public class SrAwardController {
	
	/**
	 * instanciation
	 */
	@Autowired
	private SrAwardService eduService;
	
	/**
	 * pour une requete GET pour fournir la liste 
	 * @return : la liste
	 */
	@GetMapping("/SrAwards")
	public Iterable<SrAward> getSrAwards() {
		return eduService.getSrAwards();
	}
	
	/**
	 * avoir un elmt grace a son id
	 * @param id : id de l'elmt
	 * @return : l'elmt 
	 */
	@GetMapping("/SrAward/{id}")
	public SrAward getSrAward(@PathVariable("id") final Integer id) {
		Optional<SrAward> SrAward = eduService.getSrAward(id);
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
	@RequestMapping(value = "/AddSrAward", method=RequestMethod.POST)
	public SrAward createSrAward(HttpServletRequest request) {
		return eduService.saveSrAward(request);
	}
	
	
	/**
	 * Delete - Delete an element
	 * @param id - The id of the element
	 */
	@DeleteMapping("/deleteSrAward/{id}")
	public void deleteSrAward(@PathVariable("id") final Integer id) {
		eduService.deleteSrAward(id);
	}
}

