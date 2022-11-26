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
@Table(name = "type_consortium")
@NamedQueries({
    @NamedQuery(name = "TypeConsortium.findAll", query = "SELECT t FROM TypeConsortium t"),
    @NamedQuery(name = "TypeConsortium.findByTypeConsortiumId", query = "SELECT t FROM TypeConsortium t WHERE t.typeConsortiumId = :typeConsortiumId"),
    @NamedQuery(name = "TypeConsortium.findByTypeConsortiumName", query = "SELECT t FROM TypeConsortium t WHERE t.typeConsortiumName = :typeConsortiumName")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeConsortium implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "type_consortium_id")
    private Integer typeConsortiumId;
    @Size(max = 256)
    @Column(name = "type_consortium_name")
    private String typeConsortiumName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeConsortiumId")
    private List<SeiLeadConsortiumIndustry> seiLeadConsortiumIndustryList;

}