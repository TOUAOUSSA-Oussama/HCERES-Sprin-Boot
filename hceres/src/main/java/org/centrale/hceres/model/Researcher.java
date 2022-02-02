/* --------------------------------------------------------------------------------
 * Projet HCERES
 * 
 * Gestion de données pour l'HCERES
 * 
 * Ecole Centrale Nantes - laboratoire CRTI
 * Avril 2021
 * L LETERTRE, S LIMOUX, JY MARTIN
 * -------------------------------------------------------------------------------- */
package org.centrale.hceres.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "researcher")
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
    
    
    // getters et setters
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
    @Override
    public String toString() {
        return "Researcher[ researcherId=" + researcherId + " " + researcherSurname + " " + researcherEmail + " ]";
    }

 

}
