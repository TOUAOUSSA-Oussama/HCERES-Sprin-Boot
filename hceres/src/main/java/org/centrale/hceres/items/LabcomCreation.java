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
@Table(name = "labcom_creation")
@NamedQueries({
    @NamedQuery(name = "LabcomCreation.findAll", query = "SELECT l FROM LabcomCreation l"),
    @NamedQuery(name = "LabcomCreation.findByIdActivity", query = "SELECT l FROM LabcomCreation l WHERE l.idActivity = :idActivity"),
    @NamedQuery(name = "LabcomCreation.findByLabcomCreationName", query = "SELECT l FROM LabcomCreation l WHERE l.labcomCreationName = :labcomCreationName"),
    @NamedQuery(name = "LabcomCreation.findByContractStartDate", query = "SELECT l FROM LabcomCreation l WHERE l.contractStartDate = :contractStartDate"),
    @NamedQuery(name = "LabcomCreation.findByNameCompanyInvolved", query = "SELECT l FROM LabcomCreation l WHERE l.nameCompanyInvolved = :nameCompanyInvolved"),
    @NamedQuery(name = "LabcomCreation.findByTitleProject", query = "SELECT l FROM LabcomCreation l WHERE l.titleProject = :titleProject"),
    @NamedQuery(name = "LabcomCreation.findByContractEndDate", query = "SELECT l FROM LabcomCreation l WHERE l.contractEndDate = :contractEndDate"),
    @NamedQuery(name = "LabcomCreation.findByAssociatedPubliRef", query = "SELECT l FROM LabcomCreation l WHERE l.associatedPubliRef = :associatedPubliRef")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LabcomCreation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private Integer idActivity;
    @Size(max = 256)
    @Column(name = "labcom_creation_name")
    private String labcomCreationName;
    @Column(name = "contract_start_date")
    @Temporal(TemporalType.DATE)
    private Date contractStartDate;
    @Size(max = 256)
    @Column(name = "name_company_involved")
    private String nameCompanyInvolved;
    @Size(max = 256)
    @Column(name = "title_project")
    private String titleProject;
    @Column(name = "contract_end_date")
    @Temporal(TemporalType.DATE)
    private Date contractEndDate;
    @Size(max = 256)
    @Column(name = "associated_publi_ref")
    private String associatedPubliRef;
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Activity activity;

}