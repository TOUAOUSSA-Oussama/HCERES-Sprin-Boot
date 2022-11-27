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
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "type_activity")
@NamedQueries({
    @NamedQuery(name = "TypeActivity.findAll", query = "SELECT t FROM TypeActivity t"),
    @NamedQuery(name = "TypeActivity.findByIdTypeActivity", query = "SELECT t FROM TypeActivity t WHERE t.idTypeActivity = :idTypeActivity"),
    @NamedQuery(name = "TypeActivity.findByNameType", query = "SELECT t FROM TypeActivity t WHERE t.nameType = :nameType")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeActivity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_type_activity")
    private Integer idTypeActivity;
    
    @Size(max = 256)
    @Column(name = "name_type")
    private String nameType;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeActivity")
    @JsonIgnore
    private List<Activity> activityList;

    @Getter
    public enum IdTypeActivity{
        EDUCATION(12),
        SR_AWARD(29);


        int id;
        IdTypeActivity(int id) {
            this.id = id;
        }
    }
}