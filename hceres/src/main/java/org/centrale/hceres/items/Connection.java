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
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "connection")
@NamedQueries({
    @NamedQuery(name = "Connection.findAll", query = "SELECT c FROM Connection c"),
    @NamedQuery(name = "Connection.findByConnectionCode", query = "SELECT c FROM Connection c WHERE c.connectionCode = :connectionCode"),
    @NamedQuery(name = "Connection.findByConnectionLogin", query = "SELECT c FROM Connection c WHERE c.connectionLogin = :connectionLogin"),
    @NamedQuery(name = "Connection.findByConnectionExpire", query = "SELECT c FROM Connection c WHERE c.connectionExpire = :connectionExpire"),
    @NamedQuery(name = "Connection.findByConnectionStatus", query = "SELECT c FROM Connection c WHERE c.connectionStatus = :connectionStatus")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Connection implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "connection_code")
    private String connectionCode;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "connection_login")
    private String connectionLogin;
    @Basic(optional = false)
    @NotNull
    @Column(name = "connection_expire")
    @Temporal(TemporalType.TIMESTAMP)
    private Date connectionExpire;
    @Column(name = "connection_status")
    private Integer connectionStatus;
    @JoinColumn(name = "researcher_id", referencedColumnName = "researcher_id")
    @ManyToOne
    private Researcher researcherId;

}