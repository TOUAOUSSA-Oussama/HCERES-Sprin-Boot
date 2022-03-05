package org.centrale.hceres.controller;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.OralCommunication;
import org.centrale.hceres.service.OralCommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OralCommunicationController {
		
	/**
	 * instanciation
	 */
	@Autowired
	private OralCommunicationService communicationService;
	
	/**
	 * ajouter un elmt a la base de donnees
	 * @param education : l'elmt a ajouter
	 * @return l'elmt ajoute
	 */
	@RequestMapping(value = "/AddOralCommunication", method=RequestMethod.POST)
	public OralCommunication createOralCommunication(HttpServletRequest request) {
		return communicationService.saveOralCommunication(request);
	}
}
