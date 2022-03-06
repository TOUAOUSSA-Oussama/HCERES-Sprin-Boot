package org.centrale.hceres.repository;

import org.centrale.hceres.items.Patent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatentRepository extends JpaRepository<Patent, Integer> {
}
