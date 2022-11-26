/* --------------------------------------------------------------------------------
 * Projet HCERES
 * 
 * Gestion de données pour l'HCERES
 * 
 * Ecole Centrale Nantes - laboratoire CRTI
 * Avril 2021
 * L LETERTRE, S LIMOUX, JY MARTIN
 * -------------------------------------------------------------------------------- */
package org.centrale.hceres.items;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "reviewing_journal_articles")
/*@NamedQueries({
    @NamedQuery(name = "ReviewingJournalArticles.findAll", query = "SELECT r FROM ReviewingJournalArticles r"),
    @NamedQuery(name = "ReviewingJournalArticles.findByIdActivity", query = "SELECT r FROM ReviewingJournalArticles r WHERE r.idActivity = :idActivity"),
    @NamedQuery(name = "ReviewingJournalArticles.findByYear", query = "SELECT r FROM ReviewingJournalArticles r WHERE r.year = :year"),
    @NamedQuery(name = "ReviewingJournalArticles.findByNbReviewedArticles", query = "SELECT r FROM ReviewingJournalArticles r WHERE r.nbReviewedArticles = :nbReviewedArticles"),
    @NamedQuery(name = "ReviewingJournalArticles.findByImpactFactor", query = "SELECT r FROM ReviewingJournalArticles r WHERE r.impactFactor = :impactFactor")})*/
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewingJournalArticles implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private Integer idActivity;
    @Column(name = "year")
    private Integer year;
    @Column(name = "nb_reviewed_articles")
    private Integer nbReviewedArticles;
    @Column(name = "impact_factor")
    private BigDecimal impactFactor;
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @OneToOne(optional = false, cascade = CascadeType.ALL)
    private Activity activity;
    @JoinColumn(name = "journal_id", referencedColumnName = "journal_id")
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    private Journal journalId;

}