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
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "team_referent")
@NamedQueries({
    @NamedQuery(name = "TeamReferent.findAll", query = "SELECT t FROM TeamReferent t"),
    @NamedQuery(name = "TeamReferent.findByTeamReferentId", query = "SELECT t FROM TeamReferent t WHERE t.teamReferentId = :teamReferentId"),
    @NamedQuery(name = "TeamReferent.findByTeamReferentStart", query = "SELECT t FROM TeamReferent t WHERE t.teamReferentStart = :teamReferentStart"),
    @NamedQuery(name = "TeamReferent.findByTeamReferentEnd", query = "SELECT t FROM TeamReferent t WHERE t.teamReferentEnd = :teamReferentEnd")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamReferent implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "team_referent_id")
    private Integer teamReferentId;
    @Column(name = "team_referent_start")
    @Temporal(TemporalType.DATE)
    private Date teamReferentStart;
    @Column(name = "team_referent_end")
    @Temporal(TemporalType.DATE)
    private Date teamReferentEnd;
    @JoinColumn(name = "researcher_id", referencedColumnName = "researcher_id")
    @ManyToOne(optional = false)
    private Researcher researcherId;
    @JoinColumn(name = "team_id", referencedColumnName = "team_id")
    @ManyToOne(optional = false)
    private Team teamId;

}