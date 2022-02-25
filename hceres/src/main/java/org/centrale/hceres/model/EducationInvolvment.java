/* --------------------------------------------------------------------------------
 * Projet HCERES
 * 
 * Gestion de données pour l'HCERES
 * 
 * Ecole Centrale Nantes - laboratoire CRTI
 * Avril 2021
 * L LETERTRE, S LIMOUX, JY MARTIN
 * -------------------------------------------------------------------------------- */
/*
 package org.centrale.hceres.model;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
/*
@Entity
@Table(name = "education_involvment")
public class EducationInvolvment implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "education_involvment_id")
    private Integer educationInvolvmentId;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "education_involvment_name")
    private String educationInvolvmentName;
    
    // constructeurs :
    /**
     *
     */
    /*
    public EducationInvolvment() {
    }

    /**
     *
     * @param educationInvolvmentId
     */
    /*
    public EducationInvolvment(Integer educationInvolvmentId) {
        this.educationInvolvmentId = educationInvolvmentId;
    }

    /**
     *
     * @param educationInvolvmentId
     * @param educationInvolvmentName
     */
    /*
    public EducationInvolvment(Integer educationInvolvmentId, String educationInvolvmentName) {
        this.educationInvolvmentId = educationInvolvmentId;
        this.educationInvolvmentName = educationInvolvmentName;
    }
    
    // getters et setters :
    /**
     *
     * @return
     */
    /*
    public Integer getEducationInvolvmentId() {
        return educationInvolvmentId;
    }

    /**
     *
     * @param educationInvolvmentId
     */
    /*
    public void setEducationInvolvmentId(Integer educationInvolvmentId) {
        this.educationInvolvmentId = educationInvolvmentId;
    }

    /**
     *
     * @return
     */
    /*
    public String getEducationInvolvmentName() {
        return educationInvolvmentName;
    }

    /**
     *
     * @param educationInvolvmentName
     */
    /*
    public void setEducationInvolvmentName(String educationInvolvmentName) {
        this.educationInvolvmentName = educationInvolvmentName;
    }


    /**
     *
     * @return
     */
    /*
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (educationInvolvmentId != null ? educationInvolvmentId.hashCode() : 0);
        return hash;
    }

    /**
     *
     * @param object
     * @return
     */
    /*
    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EducationInvolvment)) {
            return false;
        }
        EducationInvolvment other = (EducationInvolvment) object;
        if ((this.educationInvolvmentId == null && other.educationInvolvmentId != null) || (this.educationInvolvmentId != null && !this.educationInvolvmentId.equals(other.educationInvolvmentId))) {
            return false;
        }
        return true;
    }

    /**
     *
     * @return
     */
    /*
    @Override
    public String toString() {
        return "org.centrale.hceres.items.EducationInvolvment[ educationInvolvmentId=" + educationInvolvmentId + " ]";
    }
    
}
*/