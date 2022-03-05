package org.centrale.hceres.controller;

import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.service.ResearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;




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
	@GetMapping("Api/Researchers")
	public Iterable<Researcher> getResearchers() {
		return rs.getResearchers();
	}
}
