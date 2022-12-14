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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "education_level")
@NamedQueries({
    @NamedQuery(name = "EducationLevel.findAll", query = "SELECT e FROM EducationLevel e"),
    @NamedQuery(name = "EducationLevel.findByEducationLevelId", query = "SELECT e FROM EducationLevel e WHERE e.educationLevelId = :educationLevelId"),
    @NamedQuery(name = "EducationLevel.findByEducationLevelName", query = "SELECT e FROM EducationLevel e WHERE e.educationLevelName = :educationLevelName")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "educationLevelId")
    private List<Education> educationList;

}