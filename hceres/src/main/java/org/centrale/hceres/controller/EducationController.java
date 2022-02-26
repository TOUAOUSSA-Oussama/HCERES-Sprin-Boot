package org.centrale.hceres.controller;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.Education;
import org.centrale.hceres.service.EducationService;
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
public class EducationController {
	
	/**
	 * instanciation
	 */
	@Autowired
	private EducationService eduService;
	
	/**
	 * pour une requete GET pour fournir la liste 
	 * @return : la liste
	 */
	@GetMapping("/Educations")
	public Iterable<Education> getEducations() {
		return eduService.getEducations();
	}
	
	/**
	 * avoir un elmt grace a son id
	 * @param id : id de l'elmt
	 * @return : l'elmt 
	 */
	@GetMapping("/Education/{id}")
	public Education getEducation(@PathVariable("id") final Integer id) {
		Optional<Education> education = eduService.getEducation(id);
		if(education.isPresent()) {
			return education.get();
		} else {
			return null;
		}
	}
	
	/**
	 * ajouter un elmt a la base de donnees
	 * @param education : l'elmt a ajouter
	 * @return l'elmt ajoute
	 */
	@RequestMapping(value = "/AddEducation", method=RequestMethod.POST)
	public Education createEducation(HttpServletRequest request) {
		return eduService.saveEducation(request);
	}
	
	/**
	 * Update - Update an existing element
	 * @param id - The id of the element
	 * @param education - The element
	 * @return
	 */
//	@PutMapping("/updateEducation/{id}")
//	public Education updateEducation(@PathVariable("id") final Integer id, @RequestBody Education education) {
//		Optional<Education> e = eduService.getEducation(id);
//		if(e.isPresent()) {
//			Education currentEducation = e.get();
//			
//			String educationCourseName = education.getEducationCourseName();
//			if(educationCourseName != null) {
//				currentEducation.setEducationCourseName(educationCourseName);
//			}
//			
//			Date educationCompletion = education.getEducationCompletion();
//			if(educationCompletion != null) {
//				currentEducation.setEducationCompletion(educationCompletion);
//			}
//			
//			String educationDescription = education.getEducationDescription();
//			if(educationDescription != null) {
//				currentEducation.setEducationDescription(educationDescription);
//			}
//			
//			String educationFormation = education.getEducationFormation();
//			if(educationFormation != null) {
//				currentEducation.setEducationFormation(educationFormation);
//			}
//			
//			eduService.saveEducation(currentEducation);
//			return currentEducation;
//		} else {
//			return null;
//		}
//	}
	
	
	/**
	 * Delete - Delete an element
	 * @param id - The id of the element
	 */
	@DeleteMapping("/deleteEducation/{id}")
	public void deleteEducation(@PathVariable("id") final Integer id) {
		eduService.deleteEducation(id);
	}
}
