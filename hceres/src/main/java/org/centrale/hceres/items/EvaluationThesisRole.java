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
@Table(name = "evaluation_thesis_role")
@NamedQueries({
    @NamedQuery(name = "EvaluationThesisRole.findAll", query = "SELECT e FROM EvaluationThesisRole e"),
    @NamedQuery(name = "EvaluationThesisRole.findByEvaluationThesisRoleId", query = "SELECT e FROM EvaluationThesisRole e WHERE e.evaluationThesisRoleId = :evaluationThesisRoleId"),
    @NamedQuery(name = "EvaluationThesisRole.findByEvaluationThesisRoleName", query = "SELECT e FROM EvaluationThesisRole e WHERE e.evaluationThesisRoleName = :evaluationThesisRoleName")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationThesisRole implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "evaluation_thesis_role_id")
    private Integer evaluationThesisRoleId;
    @Size(max = 256)
    @Column(name = "evaluation_thesis_role_name")
    private String evaluationThesisRoleName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "evaluationThesisRoleId")
    private List<EvaluationThesis> evaluationThesisList;

}