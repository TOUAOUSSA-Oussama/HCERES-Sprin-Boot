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

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "tool_product_involvment")
@NamedQueries({
    @NamedQuery(name = "ToolProductInvolvment.findAll", query = "SELECT t FROM ToolProductInvolvment t"),
    @NamedQuery(name = "ToolProductInvolvment.findByIdActivity", query = "SELECT t FROM ToolProductInvolvment t WHERE t.toolProductInvolvmentPK.idActivity = :idActivity"),
    @NamedQuery(name = "ToolProductInvolvment.findByToolProductRoleId", query = "SELECT t FROM ToolProductInvolvment t WHERE t.toolProductInvolvmentPK.toolProductRoleId = :toolProductRoleId"),
    @NamedQuery(name = "ToolProductInvolvment.findByToolProductInvolvmentResearchers", query = "SELECT t FROM ToolProductInvolvment t WHERE t.toolProductInvolvmentResearchers = :toolProductInvolvmentResearchers")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToolProductInvolvment implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @EmbeddedId
    protected ToolProductInvolvmentPK toolProductInvolvmentPK;
    @Size(max = 2147483647)
    @Column(name = "tool_product_involvment_researchers")
    private String toolProductInvolvmentResearchers;
    @JsonIgnore
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private ToolProduct toolProduct;
    @JsonIgnore
    @JoinColumn(name = "tool_product_role_id", referencedColumnName = "tool_product_role_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private ToolProductRole toolProductRole;

}