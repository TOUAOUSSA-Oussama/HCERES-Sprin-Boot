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
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import java.util.List;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
//import org.centrale.tools.Utilities;
import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "researcher")
@NamedQueries({
    @NamedQuery(name = "Researcher.findAll", query = "SELECT r FROM Researcher r"),
    @NamedQuery(name = "Researcher.findByResearcherId", query = "SELECT r FROM Researcher r WHERE r.researcherId = :researcherId"),
    @NamedQuery(name = "Researcher.findByResearcherSurname", query = "SELECT r FROM Researcher r WHERE r.researcherSurname = :researcherSurname"),
    @NamedQuery(name = "Researcher.findByResearcherName", query = "SELECT r FROM Researcher r WHERE r.researcherName = :researcherName"),
    @NamedQuery(name = "Researcher.findByResearcherEmail", query = "SELECT r FROM Researcher r WHERE r.researcherEmail = :researcherEmail"),
    @NamedQuery(name = "Researcher.findByResearcherOrcid", query = "SELECT r FROM Researcher r WHERE r.researcherOrcid = :researcherOrcid"),
    @NamedQuery(name = "Researcher.findByResearcherLogin", query = "SELECT r FROM Researcher r WHERE r.researcherLogin = :researcherLogin"),
    @NamedQuery(name = "Researcher.findByResearcherPassword", query = "SELECT r FROM Researcher r WHERE r.researcherPassword = :researcherPassword")})
public class Researcher implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "researcher_id")
    private Integer researcherId;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "researcher_surname")
    private String researcherSurname;
    
    @Size(max = 256)
    @Column(name = "researcher_name")
    private String researcherName;
    
    @Size(max = 256)
    @Column(name = "researcher_email")
    private String researcherEmail;
    
    @Size(max = 256)
    @Column(name = "researcher_orcid")
    private String researcherOrcid;
    
    @Size(max = 256)
    @Column(name = "researcher_login")
    private String researcherLogin;
    
    @Size(max = 1024)
    @Column(name = "researcher_password")
    private String researcherPassword;
    @JsonIgnore
    @ManyToMany(mappedBy = "researcherList")
    private List<Nationality> nationalityList;
    @JsonIgnore
    @ManyToMany(mappedBy = "researcherList")
    private List<Activity> activityList;
    @JsonIgnore
    @OneToMany(mappedBy = "researcherId")
    private List<Connection> connectionList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcherId")
    private List<Contract> contractList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcherId")
    private List<TeamReferent> teamReferentList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcherId")
    private List<Supervisor> supervisorList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcherId")
    private List<PhdStudent> phdStudentList;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "researcher")
    private Admin admin;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcherId")
    private List<BelongsTeam> belongsTeamList;

    /**
     *
     */
    public Researcher() {
    }

    /**
     *
     * @param researcherId
     */
    public Researcher(Integer researcherId) {
        this.researcherId = researcherId;
    }

    /**
     *
     * @param researcherId
     * @param researcherSurname
     */
    public Researcher(Integer researcherId, String researcherSurname) {
        this.researcherId = researcherId;
        this.researcherSurname = researcherSurname;
    }

    /**
     *
     * @return
     */
    public Integer getResearcherId() {
        return researcherId;
    }

    /**
     *
     * @param researcherId
     */
    public void setResearcherId(Integer researcherId) {
        this.researcherId = researcherId;
    }

    /**
     *
     * @return
     */
    public String getResearcherSurname() {
        return researcherSurname;
    }

    /**
     *
     * @param researcherSurname
     */
    public void setResearcherSurname(String researcherSurname) {
        this.researcherSurname = researcherSurname;
    }

    /**
     *
     * @return
     */
    public String getResearcherName() {
        return researcherName;
    }

    /**
     *
     * @param researcherName
     */
    public void setResearcherName(String researcherName) {
        this.researcherName = researcherName;
    }

    /**
     *
     * @return
     */
    public String getResearcherEmail() {
        return researcherEmail;
    }

    /**
     *
     * @param researcherEmail
     */
    public void setResearcherEmail(String researcherEmail) {
        this.researcherEmail = researcherEmail;
    }

    /**
     *
     * @return
     */
    public String getResearcherOrcid() {
        return researcherOrcid;
    }

    /**
     *
     * @param researcherOrcid
     */
    public void setResearcherOrcid(String researcherOrcid) {
        this.researcherOrcid = researcherOrcid;
    }

    /**
     *
     * @return
     */
    public String getResearcherLogin() {
        return researcherLogin;
    }

    /**
     *
     * @param researcherLogin
     */
    public void setResearcherLogin(String researcherLogin) {
        this.researcherLogin = researcherLogin;
    }

    /**
     *
     * @return
     */
    public String getResearcherPassword() {
        return researcherPassword;
    }

    /**
     *
     * @param researcherPassword
     */
    public void setResearcherPassword(String researcherPassword) {
        this.researcherPassword = researcherPassword;
    }

    /**
     *
     * @return
     */
    public List<Nationality> getNationalityList() {
        return nationalityList;
    }

    /**
     *
     * @param nationalityList
     */
    public void setNationalityList(List<Nationality> nationalityList) {
        this.nationalityList = nationalityList;
    }

    /**
     *
     * @return
     */
    public List<Activity> getActivityList() {
        return activityList;
    }

    /**
     *
     * @param activityList
     */
    public void setActivityList(List<Activity> activityList) {
        this.activityList = activityList;
    }

    /**
     *
     * @return
     */
    public List<Connection> getConnectionList() {
        return connectionList;
    }

    /**
     *
     * @param connectionList
     */
    public void setConnectionList(List<Connection> connectionList) {
        this.connectionList = connectionList;
    }

    /**
     *
     * @return
     */
    public List<Contract> getContractList() {
        return contractList;
    }

    /**
     *
     * @param contractList
     */
    public void setContractList(List<Contract> contractList) {
        this.contractList = contractList;
    }

    /**
     *
     * @return
     */
    public List<TeamReferent> getTeamReferentList() {
        return teamReferentList;
    }

    /**
     *
     * @param teamReferentList
     */
    public void setTeamReferentList(List<TeamReferent> teamReferentList) {
        this.teamReferentList = teamReferentList;
    }

    /**
     *
     * @return
     */
    public List<Supervisor> getSupervisorList() {
        return supervisorList;
    }

    /**
     *
     * @param supervisorList
     */
    public void setSupervisorList(List<Supervisor> supervisorList) {
        this.supervisorList = supervisorList;
    }

    /**
     *
     * @return
     */
    public List<PhdStudent> getPhdStudentList() {
        return phdStudentList;
    }

    /**
     *
     * @param phdStudentList
     */
    public void setPhdStudentList(List<PhdStudent> phdStudentList) {
        this.phdStudentList = phdStudentList;
    }

    /**
     *
     * @return
     */
    public Admin getAdmin() {
        return admin;
    }

    /**
     *
     * @param admin
     */
    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    /**
     *
     * @return
     */
    public List<BelongsTeam> getBelongsTeamList() {
        return belongsTeamList;
    }

    /**
     *
     * @param belongsTeamList
     */
    public void setBelongsTeamList(List<BelongsTeam> belongsTeamList) {
        this.belongsTeamList = belongsTeamList;
    }

    /**
     *
     * @return
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (researcherId != null ? researcherId.hashCode() : 0);
        return hash;
    }

    /**
     *
     * @param object
     * @return
     */
    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Researcher)) {
            return false;
        }
        Researcher other = (Researcher) object;
        if ((this.researcherId == null && other.researcherId != null) || (this.researcherId != null && !this.researcherId.equals(other.researcherId))) {
            return false;
        }
        return true;
    }

    /**
     *
     * @return
     */
    @Override
    public String toString() {
        return "org.centrale.hceres.items.Researcher[ researcherId=" + researcherId + " ]";
    }

    /**
     * Extra elements
     */
    /**
     * Get current contract
     *
     * @return
     */
//    public Contract getCurrentContract() {
//        if (this.contractList == null) {
//            return null;
//        } else {
//            Date now = Utilities.getCurrentDate();
//            for (Contract temp : this.contractList) {
//                Date start = temp.getStartContract();
//                Date end = temp.getEndContract();
//                if (((start == null) || (start.before(now))) && ((end == null) || (end.after(now)))) {
//                    return temp;
//                }
//            }
//            return null;
//        }
    }

    /**
     * Get Current team
     *
     * @return
     */
//    public BelongsTeam getCurrentBelongsTeam() {
//        if (this.belongsTeamList == null) {
//            return null;
//        } else {
//            Date now = Utilities.getCurrentDate();
//            for (BelongsTeam temp : belongsTeamList) {
//                Date start = temp.getOnboardingDate();
//                Date end = temp.getLeavingDate();
//                if (((start == null) || (start.before(now))) && ((end == null) || (end.after(now)))) {
//                    return temp;
//                }
//            }
//            return null;
//        }
//    }

    /**
     * Get Current laboratory
     *
     * @return
     */
//    public Laboratory getCurrentLaboratory() {
//        BelongsTeam current = getCurrentBelongsTeam();
//        if ((current != null) && (current.getTeamId() != null)) {
//            return current.getTeamId().getLaboratoryId();
//        }
//        return null;
//    }

