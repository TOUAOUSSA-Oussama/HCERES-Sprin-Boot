package org.centrale.hceres.controller;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.Network;
import org.centrale.hceres.service.NetworkService;
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
public class NetworkController {
	
	/**
	 * instanciation
	 */
	@Autowired
	private NetworkService NetService;
	
	/**
	 * pour une requete GET pour fournir la liste 
	 * @return : la liste
	 */
	@GetMapping("/Networks")
	public Iterable<Network> getNetworks() {
		return NetService.getNetworks();
	}
	
	/**
	 * avoir un elmt grace a son id
	 * @param id : id de l'elmt
	 * @return : l'elmt 
	 */
	@GetMapping("/Network/{id}")
	public Network getNetwork(@PathVariable("id") final Integer id) {
		Optional<Network> Network = NetService.getNetwork(id);
		if(Network.isPresent()) {
			return Network.get();
		} else {
			return null;
		}
	}
	
	/**
	 * ajouter un elmt a la base de donnees
	 * @param Network : l'elmt a ajouter
	 * @return l'elmt ajoute
	 */
	@RequestMapping(value = "/AddNetwork", method=RequestMethod.POST)
	public Network createNetwork(HttpServletRequest request) {
		return NetService.saveNetwork(request);
	}
	
	
	/**
	 * Delete - Delete an element
	 * @param id - The id of the element
	 */
	@DeleteMapping("/deleteNetwork/{id}")
	public void deleteNetwork(@PathVariable("id") final Integer id) {
		NetService.deleteNetwork(id);
	}
}

