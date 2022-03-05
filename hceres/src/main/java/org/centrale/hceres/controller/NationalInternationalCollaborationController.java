package org.centrale.hceres.controller;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.NationalInternationalCollaboration;
import org.centrale.hceres.service.NationalInternationalCollaborationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NationalInternationalCollaborationController {

	/**
	 * instanciation
	 */
	@Autowired
	private NationalInternationalCollaborationService nationalInternationalCollaborationService;
	
	/**
	 * ajouter un elmt a la base de donnees
	 * @param education : l'elmt a ajouter
	 * @return l'elmt ajoute
	 */
	@RequestMapping(value = "/AddNationalInternationalCollaboration", method=RequestMethod.POST)
	public NationalInternationalCollaboration createNationalInternationalCollaboration(HttpServletRequest request) {
		return nationalInternationalCollaborationService.saveNationalInternationalCollaboration(request);
	}
}
