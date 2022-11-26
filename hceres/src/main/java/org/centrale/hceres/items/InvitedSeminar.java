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
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "invited_seminar")
@NamedQueries({
    @NamedQuery(name = "InvitedSeminar.findAll", query = "SELECT i FROM InvitedSeminar i"),
    @NamedQuery(name = "InvitedSeminar.findByIdActivity", query = "SELECT i FROM InvitedSeminar i WHERE i.idActivity = :idActivity"),
    @NamedQuery(name = "InvitedSeminar.findByTitleSeminar", query = "SELECT i FROM InvitedSeminar i WHERE i.titleSeminar = :titleSeminar"),
    @NamedQuery(name = "InvitedSeminar.findByDate", query = "SELECT i FROM InvitedSeminar i WHERE i.date = :date"),
    @NamedQuery(name = "InvitedSeminar.findByLocation", query = "SELECT i FROM InvitedSeminar i WHERE i.location = :location"),
    @NamedQuery(name = "InvitedSeminar.findByInvitedBy", query = "SELECT i FROM InvitedSeminar i WHERE i.invitedBy = :invitedBy")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvitedSeminar implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private Integer idActivity;
    @Size(max = 256)
    @Column(name = "title_seminar")
    private String titleSeminar;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    @Size(max = 256)
    @Column(name = "location")
    private String location;
    @Size(max = 256)
    @Column(name = "invited_by")
    private String invitedBy;
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Activity activity;

}