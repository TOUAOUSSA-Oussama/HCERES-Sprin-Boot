package org.centrale.hceres.repository;

import org.centrale.hceres.items.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JournalRepository extends JpaRepository<Journal, Integer> {
    @Query(value = "SELECT * FROM journal WHERE LTRIM(RTRIM(LOWER(journal_name))) LIKE LTRIM(TRTIM(LOWER(?1)))", nativeQuery = true)
    Journal findByName(String name);
}
