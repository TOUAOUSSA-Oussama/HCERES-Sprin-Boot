package org.centrale.hceres.repository.publication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.centrale.hceres.items.PublicationType;

public interface PublicationTypeRepository extends JpaRepository<PublicationType, Integer> {
}
