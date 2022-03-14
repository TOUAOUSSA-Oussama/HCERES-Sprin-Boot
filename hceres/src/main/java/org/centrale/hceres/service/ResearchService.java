package org.centrale.hceres.service;

import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.repository.ResearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class ResearchService {
	
	/**
	 * Instanciation de ResearchRepository
	 */
	@Autowired
	private ResearchRepository researchRepo;
	
	/**
	 * permet d'avoir la liste des chercheurs
	 */
	public Iterable<Researcher> getResearchers(){
		return researchRepo.findAll();
	}
	
	/**
	 * supprimer l'elmt selon son id
	 * @param id : id de l'elmt
	 */
	public void deleteResearcher(final Integer id) {
		researchRepo.deleteById(id);
	}
}
