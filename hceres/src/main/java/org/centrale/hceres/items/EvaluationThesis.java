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
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "evaluation_thesis")
@NamedQueries({
    @NamedQuery(name = "EvaluationThesis.findAll", query = "SELECT e FROM EvaluationThesis e"),
    @NamedQuery(name = "EvaluationThesis.findByIdActivity", query = "SELECT e FROM EvaluationThesis e WHERE e.idActivity = :idActivity"),
    @NamedQuery(name = "EvaluationThesis.findByYear", query = "SELECT e FROM EvaluationThesis e WHERE e.year = :year"),
    @NamedQuery(name = "EvaluationThesis.findByNameUniversity", query = "SELECT e FROM EvaluationThesis e WHERE e.nameUniversity = :nameUniversity")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationThesis implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private Integer idActivity;
    @Column(name = "year")
    private Integer year;
    @Size(max = 256)
    @Column(name = "name_university")
    private String nameUniversity;
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Activity activity;
    @JoinColumn(name = "evaluation_thesis_role_id", referencedColumnName = "evaluation_thesis_role_id")
    @ManyToOne(optional = false)
    private EvaluationThesisRole evaluationThesisRoleId;
    @JoinColumn(name = "type_thesis_id", referencedColumnName = "type_thesis_id")
    @ManyToOne(optional = false)
    private TypeThesis typeThesisId;

}