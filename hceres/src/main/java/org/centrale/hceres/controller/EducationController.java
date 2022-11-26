package org.centrale.hceres.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Education;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

// Controller permet de receptionner la requete http depuis le client, envoyer cette requete a service pour la traiter, puis retouner la reponse
// la reponse sera sous format JSON (il s'agit d'une REST API)
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EducationController {
	
	/**
	 * instanciation
	 */
	@Autowired
	private EducationService eduService;


	/**
	 * return a list of activities of education type only
	 */
	@GetMapping(value ="/Educations")
	public List<Activity> getEducations() {
		return eduService.getEducations();
	}

	/**
	 * ajouter un elmt a la base de donnees
	 * @return l'elmt ajoute
	 */
	@PostMapping(value ="/AddEducation")
	public Education createEducation(@RequestBody Map<String, Object> request) {
		return eduService.saveEducation(request);
	}
}
