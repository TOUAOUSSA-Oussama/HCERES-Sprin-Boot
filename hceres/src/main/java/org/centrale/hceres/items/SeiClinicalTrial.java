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
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
@Table(name = "sei_clinical_trial")
@NamedQueries({
    @NamedQuery(name = "SeiClinicalTrial.findAll", query = "SELECT s FROM SeiClinicalTrial s"),
    @NamedQuery(name = "SeiClinicalTrial.findByIdActivity", query = "SELECT s FROM SeiClinicalTrial s WHERE s.idActivity = :idActivity"),
    @NamedQuery(name = "SeiClinicalTrial.findByStartDate", query = "SELECT s FROM SeiClinicalTrial s WHERE s.startDate = :startDate"),
    @NamedQuery(name = "SeiClinicalTrial.findByCoordinatorPartner", query = "SELECT s FROM SeiClinicalTrial s WHERE s.coordinatorPartner = :coordinatorPartner"),
    @NamedQuery(name = "SeiClinicalTrial.findByTitleClinicalTrial", query = "SELECT s FROM SeiClinicalTrial s WHERE s.titleClinicalTrial = :titleClinicalTrial"),
    @NamedQuery(name = "SeiClinicalTrial.findByEndDate", query = "SELECT s FROM SeiClinicalTrial s WHERE s.endDate = :endDate"),
    @NamedQuery(name = "SeiClinicalTrial.findByRegistrationNb", query = "SELECT s FROM SeiClinicalTrial s WHERE s.registrationNb = :registrationNb"),
    @NamedQuery(name = "SeiClinicalTrial.findBySponsorName", query = "SELECT s FROM SeiClinicalTrial s WHERE s.sponsorName = :sponsorName"),
    @NamedQuery(name = "SeiClinicalTrial.findByIncludedPatientsNb", query = "SELECT s FROM SeiClinicalTrial s WHERE s.includedPatientsNb = :includedPatientsNb"),
    @NamedQuery(name = "SeiClinicalTrial.findByFunding", query = "SELECT s FROM SeiClinicalTrial s WHERE s.funding = :funding"),
    @NamedQuery(name = "SeiClinicalTrial.findByFundingAmount", query = "SELECT s FROM SeiClinicalTrial s WHERE s.fundingAmount = :fundingAmount")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeiClinicalTrial implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private Integer idActivity;
    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Column(name = "coordinator_partner")
    private Boolean coordinatorPartner;
    @Size(max = 256)
    @Column(name = "title_clinical_trial")
    private String titleClinicalTrial;
    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private Date endDate;
    @Size(max = 256)
    @Column(name = "registration_nb")
    private String registrationNb;
    @Size(max = 256)
    @Column(name = "sponsor_name")
    private String sponsorName;
    @Column(name = "included_patients_nb")
    private Integer includedPatientsNb;
    @Size(max = 256)
    @Column(name = "funding")
    private String funding;
    @Column(name = "funding_amount")
    private Integer fundingAmount;

    @JsonIgnore
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @OneToOne(optional = false, cascade = CascadeType.ALL)
    private Activity activity;

}