package org.centrale.hceres.repository;

import org.centrale.hceres.items.OutgoingMobility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutgoingMobilityRepository extends JpaRepository<OutgoingMobility, Integer> {
}

