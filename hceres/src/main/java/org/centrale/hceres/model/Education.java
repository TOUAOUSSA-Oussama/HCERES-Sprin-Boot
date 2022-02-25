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
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
/*
@Entity
@Table(name = "education")
public class Education implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private Integer idActivity;
    
    @Basic(optional = false)
    @NotNull
    @Size(max = 256)
    @Column(name = "education_course_name")
    private String educationCourseName;
    
    @Column(name = "education_completion")
    @Temporal(TemporalType.DATE)
    private Date educationCompletion;
    
    @Size(max = 2147483647)
    @Column(name = "education_description")
    private String educationDescription;
    
    @Column(name = "education_level_id")
    private Integer educationLevelId;
    
    @Size(max = 256)
    @Column(name = "education_formation")
    private String educationFormation;
    
    @Column(name = "education_involvment_id")
    private Integer educationInvolvmentId;
    
    private static String educationInvolvmentText = "";
    
    private static String educationLevelText = "";
    
    // constructeurs :
    /**
     *
     */
    /*
    public Education() {
    }

    /**
     *
     * @param idActivity
     */
    /*
    public Education(Integer idActivity) {
        this.idActivity = idActivity;
    }
    
    // getters et setters :

    /**
     *
     * @return
     */
    /*
    public Integer getIdActivity() {
        return idActivity;
    }

    /**
     *
     * @param idActivity
     */
    /*
    public void setIdActivity(Integer idActivity) {
        this.idActivity = idActivity;
    }

    /**
     *
     * @return
     */
    /*
    public String getEducationCourseName() {
        return educationCourseName;
    }

    /**
     *
     * @param educationCourseName
     */
    /*
    public void setEducationCourseName(String educationCourseName) {
        this.educationCourseName = educationCourseName;
    }

    /**
     *
     * @return
     */
    /*
    public Date getEducationCompletion() {
        return educationCompletion;
    }

    /**
     *
     * @param educationCompletion
     */
    /*
    public void setEducationCompletion(Date educationCompletion) {
        this.educationCompletion = educationCompletion;
    }

    /**
     *
     * @return
     */
    /*
    public String getEducationDescription() {
        return educationDescription;
    }

    /**
     *
     * @param educationDescription
     */
    /*
    public void setEducationDescription(String educationDescription) {
        this.educationDescription = educationDescription;
    }

    /**
     *
     * @return
     */
    /*
    public String getEducationFormation() {
        return educationFormation;
    }

    /**
     *
     * @param educationFormation
     */
    /*
    public void setEducationFormation(String educationFormation) {
        this.educationFormation = educationFormation;
    }

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
    
    

    public String getEducationInvolvmentText() {
		return educationInvolvmentText;
	}

	public void setEducationInvolvmentText(String educationInvolvmentText) {
		Education.educationInvolvmentText = educationInvolvmentText;
	}

	public String getEducationLevelText() {
		return educationLevelText;
	}

	public void setEducationLevelText(String educationLevelText) {
		this.educationLevelText = educationLevelText;
	}

	/**
     *
     * @return
     */
    /*
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idActivity != null ? idActivity.hashCode() : 0);
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
        if (!(object instanceof Education)) {
            return false;
        }
        Education other = (Education) object;
        if ((this.idActivity == null && other.idActivity != null) || (this.idActivity != null && !this.idActivity.equals(other.idActivity))) {
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
        return "org.centrale.hceres.items.Education[ idActivity=" + idActivity + " ]";
    }
    
}
*/