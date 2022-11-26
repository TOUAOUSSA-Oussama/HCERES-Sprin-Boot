package org.centrale.hceres.repository;

import org.centrale.hceres.items.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedQuery;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer>{

    // using jpa repository convention => no need to explicite named query
    List<Activity> findByIdTypeActivity(Integer idTypeActivity);
}
