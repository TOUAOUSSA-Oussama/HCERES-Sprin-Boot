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
@Table(name = "project_evaluation_category")
@NamedQueries({
    @NamedQuery(name = "ProjectEvaluationCategory.findAll", query = "SELECT p FROM ProjectEvaluationCategory p"),
    @NamedQuery(name = "ProjectEvaluationCategory.findByProjectEvaluationCategoryId", query = "SELECT p FROM ProjectEvaluationCategory p WHERE p.projectEvaluationCategoryId = :projectEvaluationCategoryId"),
    @NamedQuery(name = "ProjectEvaluationCategory.findByProjectEvaluationCategoryName", query = "SELECT p FROM ProjectEvaluationCategory p WHERE p.projectEvaluationCategoryName = :projectEvaluationCategoryName")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectEvaluationCategory implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "project_evaluation_category_id")
    private Integer projectEvaluationCategoryId;
    @Size(max = 256)
    @Column(name = "project_evaluation_category_name")
    private String projectEvaluationCategoryName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "projectEvaluationCategoryId")
    private List<ProjectEvaluation> projectEvaluationList;

}