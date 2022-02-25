package org.centrale.hceres.service;

import java.util.Optional;

import org.centrale.hceres.model.SrAward;
import org.centrale.hceres.repository.SrAwardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class SrAwardService {
	
	/**
	 * Instanciation
	 */
	@Autowired
	private SrAwardRepository awardRepo;
	
	/**
	 * permet de retourner la liste
	 */
	public Iterable<SrAward> getAwards(){
		return awardRepo.findAll();
	}
	
	/**
	 * retourner l'elmt selon son id
	 * @param id : id de l'elmt
	 * @return : elmt a retourner
	 */
	public Optional<SrAward> getAward(final Integer id) { 
		return awardRepo.findById(id); 
	}
	
	/**
	 * supprimer l'elmt selon son id
	 * @param id : id de l'elmt
	 */
	public void deleteAward(final Integer id) {
		awardRepo.deleteById(id);
	}
	
	/**
	 * permet d'ajouter un elmt
	 * @return : l'elemt ajouter a la base de donnees
	 */
	public SrAward saveAward(SrAward awardTosave) {
		// generer une id qui n'existe pas avant : 
		Integer idAward = awardRepo.findAll().size()-1;
		awardTosave.setIdActivity(idAward);
		// ajouter award :
		SrAward saveAward = awardRepo.save(awardTosave);
		return saveAward;
	}
}
