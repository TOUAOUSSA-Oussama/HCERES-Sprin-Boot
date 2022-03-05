package org.centrale.hceres.controller;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.SeiIndustrialRDContract;
import org.centrale.hceres.service.SeiIndustrialRDContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SeiIndustrialRDContractController {

		
	/**
	 * instanciation
	 */
	@Autowired
	private SeiIndustrialRDContractService seiIndustrialRDContractService;
	
	/**
	 * ajouter un elmt a la base de donnees
	 * @param education : l'elmt a ajouter
	 * @return l'elmt ajoute
	 */
	@RequestMapping(value = "/AddSeiIndustrialRDContract", method=RequestMethod.POST)
	public SeiIndustrialRDContract createSeiIndustrialRDContract(HttpServletRequest request) {
		return seiIndustrialRDContractService.saveSeiIndustrialRDContract(request);
	}
}
