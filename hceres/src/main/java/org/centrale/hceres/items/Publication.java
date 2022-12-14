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

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "publication")
@NamedQueries({
    @NamedQuery(name = "Publication.findAll", query = "SELECT p FROM Publication p"),
    @NamedQuery(name = "Publication.findByIdActivity", query = "SELECT p FROM Publication p WHERE p.idActivity = :idActivity"),
    @NamedQuery(name = "Publication.findByTitle", query = "SELECT p FROM Publication p WHERE p.title = :title"),
    @NamedQuery(name = "Publication.findByAuthors", query = "SELECT p FROM Publication p WHERE p.authors = :authors"),
    @NamedQuery(name = "Publication.findBySource", query = "SELECT p FROM Publication p WHERE p.source = :source"),
    @NamedQuery(name = "Publication.findByPublicationDate", query = "SELECT p FROM Publication p WHERE p.publicationDate = :publicationDate"),
    @NamedQuery(name = "Publication.findByPmid", query = "SELECT p FROM Publication p WHERE p.pmid = :pmid"),
    @NamedQuery(name = "Publication.findByImpactFactor", query = "SELECT p FROM Publication p WHERE p.impactFactor = :impactFactor")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Publication implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private Integer idActivity;
    @Size(max = 512)
    @Column(name = "title")
    private String title;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "authors")
    private String authors;
    @Size(max = 256)
    @Column(name = "source")
    private String source;
    @Column(name = "publication_date")
    @Temporal(TemporalType.DATE)
    private Date publicationDate;
    @Size(max = 16)
    @Column(name = "pmid")
    private String pmid;
    @Column(name = "impact_factor")
    private BigDecimal impactFactor;
    @JsonIgnore
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @OneToOne(optional = false, cascade = CascadeType.ALL)
    private Activity activity;
    @JsonIgnore
    @JoinColumn(name = "publication_type_id", referencedColumnName = "publication_type_id")
    @ManyToOne(optional = false)
    private PublicationType publicationTypeId;

}