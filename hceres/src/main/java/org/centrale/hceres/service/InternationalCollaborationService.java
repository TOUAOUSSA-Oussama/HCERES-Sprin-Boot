package org.centrale.hceres.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Date;
import java.util.Optional;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.InternationalCollaboration;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.items.TypeCollab;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.InternationalCollaborationRepository;
import org.centrale.hceres.repository.ResearchRepository;
import org.centrale.hceres.repository.TypeActivityRepository;
import org.centrale.hceres.repository.TypeCollabRepository;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Data;
import javax.transaction.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;

@Data
@Service
public class InternationalCollaborationService {

	/**
	 * Instanciation
	 */
	@Autowired
	private ResearchRepository researchRepo;
	
	@Autowired
	private ActivityRepository activityRepo;
	
	@Autowired
	private TypeActivityRepository typeActivityLevelRepo;
	
	@Autowired
	private InternationalCollaborationRepository internationalCollaborationRepo;
	
	@Autowired
	private TypeCollabRepository typeCollabRepo;

	/**
	 * permet de retourner la liste
	 */
	public List<Activity> getInternationalCollaborations(){
		return activityRepo.findByIdTypeActivity(TypeActivity.IdTypeActivity.NATIONAL_INTERNATIONAL_COLLABORATION.getId());
	}

	/**
	 * supprimer l'elmt selon son id
	 * @param id : id de l'elmt
	 */
	public void deleteInternationalCollaboration(final Integer id) {
		internationalCollaborationRepo.deleteById(id);
	}
	
	/**
	 * permet d'ajouter un elmt
	 * @return : l'elemt ajouter a la base de donnees
	 */
	@Transactional
	public Activity saveInternationalCollaboration(@RequestBody Map<String, Object> request) {
		
		InternationalCollaboration InternationalCollaborationTosave = new InternationalCollaboration();
		
		// DateProjectStart :
		String dateProjectStart = (String)request.get("DateProjectStart");
		InternationalCollaborationTosave.setDateProjectStart(getDateFromString(dateProjectStart, "yyyy-MM-dd"));
		
		// PartnerEntity :
		InternationalCollaborationTosave.setPartnerEntity((String)request.get("PartnerEntity"));
		
		// CountryStateCity :
		InternationalCollaborationTosave.setCountryStateCity((String)request.get("CountryStateCity"));
		
		// setPiPartners :
		InternationalCollaborationTosave.setPiPartners((String)request.get("PiPartners"));
		
		// MailPartners
		InternationalCollaborationTosave.setMailPartners((String)request.get("MailPartners"));
		
		// setProjetcTitle
		InternationalCollaborationTosave.setProjetcTitle((String)request.get("ProjetcTitle"));
		
		// StrategicRecurringCollab : probleme => boolean n'est pas de type bit
		InternationalCollaborationTosave.setStrategicRecurringCollab(Boolean.valueOf((String)request.get("StrategicRecurringCollab")));
		
		// ActiveProject
		InternationalCollaborationTosave.setActiveProject(Boolean.valueOf((String)request.get("ActiveProject")));
		
		// AssociatedFunding
		InternationalCollaborationTosave.setAssociatedFunding((String)request.get("AssociatedFunding"));

		// NumberResultingPublications
		InternationalCollaborationTosave.setNumberResultingPublications(Integer.parseInt((String)request.get("NumberResultingPublications")));
		
		// RefJointPublication
		InternationalCollaborationTosave.setRefJointPublication((String)request.get("RefJointPublication"));

		// UmrCoordinated
		InternationalCollaborationTosave.setUmrCoordinated(Boolean.valueOf((String)request.get("UmrCoordinated")));
		
		
		// AgreementSigned
		InternationalCollaborationTosave.setAgreementSigned(Boolean.valueOf((String)request.get("AgreementSigned")));
		
		
		// TypeCollab :
		TypeCollab typeCollab = new TypeCollab();
		typeCollab.setNameChoice((String)request.get("NameChoice"));
		TypeCollab savedTypeCollab = typeCollabRepo.save(typeCollab);
		InternationalCollaborationTosave.setTypeCollabId(savedTypeCollab);
		
		// Activity : 
		Activity activity = new Activity();
		TypeActivity typeActivity = typeActivityLevelRepo.getById(TypeActivity.IdTypeActivity.NATIONAL_INTERNATIONAL_COLLABORATION.getId());
		activity.setTypeActivity(typeActivity);
		
		// ajouter cette activité à la liste de ce chercheur :
		Integer researcherId = RequestParser.parseInt(request.get("researcherId"));
		Optional<Researcher> researcherOp = researchRepo.findById(researcherId);
		Researcher researcher = researcherOp.get();
		
		List<Activity> activityList = researcher.getActivityList();
		activityList.add(activity);
		researcher.setActivityList(activityList);
		
		// Ajouter cette activité au chercheur :
		List<Researcher> activityResearch = activity.getResearcherList();
		if (activityResearch == null) {
			activityResearch = new ArrayList<Researcher>();
		}
		activityResearch.add(researcher);
		activity.setResearcherList(activityResearch);
		
		Activity savedActivity = activityRepo.save(activity);
		InternationalCollaborationTosave.setActivity(savedActivity);
		
		
		// Id de l'internationalCollaboration :
		Integer idInternationalCollaboration = activity.getIdActivity();
		InternationalCollaborationTosave.setIdActivity(idInternationalCollaboration);
				
		// Enregistrer InternationalCollaboration dans la base de données :
		InternationalCollaboration InternationalCollaborationSaved = internationalCollaborationRepo.save(InternationalCollaborationTosave);

		savedActivity.setInternationalCollaboration(InternationalCollaborationSaved);
		return savedActivity;
	}
	
	// Convertir une date string en Date
	public Date getDateFromString(String aDate, String format) {
        Date returnedValue = null;
        try {
            // try to convert
            SimpleDateFormat aFormater = new SimpleDateFormat(format);
            returnedValue = aFormater.parse(aDate);
        } catch (ParseException ex) {
        }
        
        if (returnedValue != null) {
            Calendar aCalendar = Calendar.getInstance();
            aCalendar.setTime(returnedValue);
        }
        return returnedValue;
    }
	
}
