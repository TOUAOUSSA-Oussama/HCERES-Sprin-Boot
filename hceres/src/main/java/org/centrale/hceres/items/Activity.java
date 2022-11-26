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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "activity")
@NamedQueries({
    @NamedQuery(name = "Activity.findAll", query = "SELECT a FROM Activity a"),
    @NamedQuery(name = "Activity.findByIdActivity", query = "SELECT a FROM Activity a WHERE a.idActivity = :idActivity")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Activity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_activity")
    private Integer idActivity;
    
    @JoinTable(name = "activity_team", joinColumns = {
        @JoinColumn(name = "id_activity", referencedColumnName = "id_activity")}, inverseJoinColumns = {
        @JoinColumn(name = "team_id", referencedColumnName = "team_id")})
    @ManyToMany
    private List<Team> teamList;
    
    @JoinTable(name = "activity_researcher", joinColumns = {
        @JoinColumn(name = "id_activity", referencedColumnName = "id_activity")}, inverseJoinColumns = {
        @JoinColumn(name = "researcher_id", referencedColumnName = "researcher_id")})
    @ManyToMany
    private List<Researcher> researcherList;
    
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private IncomingMobility incomingMobility;
    
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Education education;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idActivity")
    private List<MailActivity> mailActivityList;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private NationalInternationalCollaboration nationalInternationalCollaboration;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Publication publication;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private ScientificExpertise scientificExpertise;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private CompanyCreation companyCreation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private LabcomCreation labcomCreation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SrAward srAward;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private PublicOutreach publicOutreach;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private ReviewingJournalArticles reviewingJournalArticles;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private EvaluationThesis evaluationThesis;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SeiNetworkUnitCreation seiNetworkUnitCreation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private ToolProduct toolProduct;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private PostDoc postDoc;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Patent patent;
    @JoinColumn(name = "id_type_activity", referencedColumnName = "id_type_activity")
    @ManyToOne(optional = false)
    private TypeActivity idTypeActivity;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Book book;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private InvitedSeminar invitedSeminar;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private MeetingCongressOrg meetingCongressOrg;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private BookChapter bookChapter;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Platform platform;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private Network network;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private InstitutionalComitee institutionalComitee;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private OutgoingMobility outgoingMobility;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private EditorialActivity editorialActivity;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SeiIndustrialRDContract seiIndustrialRDContract;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private ProjectEvaluation projectEvaluation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private LaboratoryEvaluation laboratoryEvaluation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SeiClinicalTrial seiClinicalTrial;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private OralCommunication oralCommunication;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private ResearchContractFundedPublicCharitableInst researchContractFundedPublicCharitableInst;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SeiLeadConsortiumIndustry seiLeadConsortiumIndustry;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private SeiCifreFellowship seiCifreFellowship;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "activity")
    private LearnedScientificSociety learnedScientificSociety;
}
