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

import java.io.Serializable;
import java.util.List;
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
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "public_outreach_type")
@NamedQueries({
    @NamedQuery(name = "PublicOutreachType.findAll", query = "SELECT p FROM PublicOutreachType p"),
    @NamedQuery(name = "PublicOutreachType.findByPublicOutreachTypeId", query = "SELECT p FROM PublicOutreachType p WHERE p.publicOutreachTypeId = :publicOutreachTypeId"),
    @NamedQuery(name = "PublicOutreachType.findByPublicOutreachTypeName", query = "SELECT p FROM PublicOutreachType p WHERE p.publicOutreachTypeName = :publicOutreachTypeName")})
public class PublicOutreachType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "public_outreach_type_id")
    private Integer publicOutreachTypeId;
    @Size(max = 256)
    @Column(name = "public_outreach_type_name")
    private String publicOutreachTypeName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "publicOutreachTypeId")
    private List<PublicOutreach> publicOutreachList;

    /**
     *
     */
    public PublicOutreachType() {
    }

    /**
     *
     * @param publicOutreachTypeId
     */
    public PublicOutreachType(Integer publicOutreachTypeId) {
        this.publicOutreachTypeId = publicOutreachTypeId;
    }

    /**
     *
     * @return
     */
    public Integer getPublicOutreachTypeId() {
        return publicOutreachTypeId;
    }

    /**
     *
     * @param publicOutreachTypeId
     */
    public void setPublicOutreachTypeId(Integer publicOutreachTypeId) {
        this.publicOutreachTypeId = publicOutreachTypeId;
    }

    /**
     *
     * @return
     */
    public String getPublicOutreachTypeName() {
        return publicOutreachTypeName;
    }

    /**
     *
     * @param publicOutreachTypeName
     */
    public void setPublicOutreachTypeName(String publicOutreachTypeName) {
        this.publicOutreachTypeName = publicOutreachTypeName;
    }

    /**
     *
     * @return
     */
    public List<PublicOutreach> getPublicOutreachList() {
        return publicOutreachList;
    }

    /**
     *
     * @param publicOutreachList
     */
    public void setPublicOutreachList(List<PublicOutreach> publicOutreachList) {
        this.publicOutreachList = publicOutreachList;
    }

    /**
     *
     * @return
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (publicOutreachTypeId != null ? publicOutreachTypeId.hashCode() : 0);
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
        if (!(object instanceof PublicOutreachType)) {
            return false;
        }
        PublicOutreachType other = (PublicOutreachType) object;
        if ((this.publicOutreachTypeId == null && other.publicOutreachTypeId != null) || (this.publicOutreachTypeId != null && !this.publicOutreachTypeId.equals(other.publicOutreachTypeId))) {
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
        return "org.centrale.hceres.items.PublicOutreachType[ publicOutreachTypeId=" + publicOutreachTypeId + " ]";
    }
    
}
