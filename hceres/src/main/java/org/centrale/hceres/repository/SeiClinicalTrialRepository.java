package org.centrale.hceres.repository;
import org.centrale.hceres.items.SeiClinicalTrial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// permet d'executer les requetes sur la base de donnees
@Repository
public interface SeiClinicalTrialRepository extends JpaRepository<SeiClinicalTrial, Integer> {

}
