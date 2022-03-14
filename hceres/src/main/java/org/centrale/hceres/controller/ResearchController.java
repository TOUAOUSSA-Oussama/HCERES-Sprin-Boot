package org.centrale.hceres.controller;

import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.service.ResearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;

// Controller permet de receptionner la requete http depuis le client, envoyer cette requete a service pour la traiter, puis retouner la reponse
// la reponse sera sous format JSON (il s'agit d'une REST API)
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ResearchController {
	
	/**
	 * instanciation de ResearchService
	 */
	@Autowired
	private ResearchService rs;
	
	/**
	 * pour une requete GET dans localhost/researchs => fournir la liste des chercheurs
	 * le resultat est traduit automatiquement en JSON
	 * @return : liste des chercheurs
	 */
	@GetMapping("/Researchers")
	public Iterable<Researcher> getResearchers() {
		return rs.getResearchers();
	}
	
	/**
	 * Delete - Delete an element
	 * @param id - The id of the element
	 */
	@DeleteMapping("/deleteResearcher/{id}")
	public void deleteEducation(@PathVariable("id") final Integer id) {
		rs.deleteResearcher(id);
	}
}
