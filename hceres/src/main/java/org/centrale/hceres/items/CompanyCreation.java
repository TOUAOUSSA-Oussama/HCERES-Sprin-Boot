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
@Table(name = "company_creation")
@NamedQueries({
    @NamedQuery(name = "CompanyCreation.findAll", query = "SELECT c FROM CompanyCreation c"),
    @NamedQuery(name = "CompanyCreation.findByIdActivity", query = "SELECT c FROM CompanyCreation c WHERE c.idActivity = :idActivity"),
    @NamedQuery(name = "CompanyCreation.findByCompanyCreationName", query = "SELECT c FROM CompanyCreation c WHERE c.companyCreationName = :companyCreationName"),
    @NamedQuery(name = "CompanyCreation.findByCompanyCreationDate", query = "SELECT c FROM CompanyCreation c WHERE c.companyCreationDate = :companyCreationDate"),
    @NamedQuery(name = "CompanyCreation.findByCompanyCreationActive", query = "SELECT c FROM CompanyCreation c WHERE c.companyCreationActive = :companyCreationActive")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyCreation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private Integer idActivity;
    @Size(max = 256)
    @Column(name = "company_creation_name")
    private String companyCreationName;
    @Column(name = "company_creation_date")
    @Temporal(TemporalType.DATE)
    private Date companyCreationDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "company_creation_active")
    private boolean companyCreationActive;
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Activity activity;

}