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

import lombok.Data;

/**
 *
 * @author kwyhr
 */
/*
@Entity
@Table(name = "education_level")
public class EducationLevel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "education_level_id")
    private Integer educationLevelId;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "education_level_name")
    private String educationLevelName;
    
    // les constructeurs :
    /**
    *
    */
    /*
   public EducationLevel() {
   }

   /**
    *
    * @param educationLevelId
    */
    /*
   public EducationLevel(Integer educationLevelId) {
       this.educationLevelId = educationLevelId;
   }

   /**
    *
    * @param educationLevelId
    * @param educationLevelName
    */
    /*
   public EducationLevel(Integer educationLevelId, String educationLevelName) {
       this.educationLevelId = educationLevelId;
       this.educationLevelName = educationLevelName;
   }

    // getters et setters :
    /**
     *
     * @return
     */
    /*
    public Integer getEducationLevelId() {
        return educationLevelId;
    }

    /**
     *
     * @param educationLevelId
     */
    /*
    public void setEducationLevelId(Integer educationLevelId) {
        this.educationLevelId = educationLevelId;
    }

    /**
     *
     * @return
     */
    /*
    public String getEducationLevelName() {
        return educationLevelName;
    }

    /**
     *
     * @param educationLevelName
     */
    /*
    public void setEducationLevelName(String educationLevelName) {
        this.educationLevelName = educationLevelName;
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
        if (!(object instanceof EducationLevel)) {
            return false;
        }
        EducationLevel other = (EducationLevel) object;
        if ((this.educationLevelId == null && other.educationLevelId != null) || (this.educationLevelId != null && !this.educationLevelId.equals(other.educationLevelId))) {
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
        return "org.centrale.hceres.items.EducationLevel[ educationLevelId=" + educationLevelId + " ]";
    }
    
}
*/