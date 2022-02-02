package org.centrale.hceres.repository;
import org.centrale.hceres.model.Researcher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// permet d'executer les requetes sur la base de donnees
@Repository
public interface ResearchRepository extends CrudRepository<Researcher, Integer>{

}
