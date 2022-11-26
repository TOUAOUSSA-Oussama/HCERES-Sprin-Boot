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
@Table(name = "function_editorial_activity")
/*
@NamedQueries({
    @NamedQuery(name = "FunctionEditorialActivity.findAll", query = "SELECT f FROM FunctionEditorialActivity f"),
    @NamedQuery(name = "FunctionEditorialActivity.findByFunctionEditorialActivityId", query = "SELECT f FROM FunctionEditorialActivity f WHERE f.functionEditorialActivityId = :functionEditorialActivityId"),
    @NamedQuery(name = "FunctionEditorialActivity.findByFunctionEditorialActivityName", query = "SELECT f FROM FunctionEditorialActivity f WHERE f.functionEditorialActivityName = :functionEditorialActivityName")})
*/
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FunctionEditorialActivity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "function_editorial_activity_id")
    private Integer functionEditorialActivityId;
    @Size(max = 256)
    @Column(name = "function_editorial_activity_name")
    private String functionEditorialActivityName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "functionEditorialActivityId")
    private List<EditorialActivity> editorialActivityList;

}