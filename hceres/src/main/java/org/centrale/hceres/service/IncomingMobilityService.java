package org.centrale.hceres.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.IncomingMobility;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.IncomingMobilityRepository;
import org.centrale.hceres.repository.ResearchRepository;
import org.centrale.hceres.repository.TypeActivityRepository;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class IncomingMobilityService {
	
	/**
	 * Instanciation
	 */
	@Autowired
	private ResearchRepository researchRepo;
	@Autowired
	private IncomingMobilityRepository incomingMobilityRepo;
	@Autowired
	private ActivityRepository activityRepo;
	@Autowired
	private TypeActivityRepository typeActivityLevelRepo;

	/**
	 * retourner l'elmt selon son id
	 * @param id : id de l'elmt
	 * @return : elmt a retourner
	 */
	public Optional<IncomingMobility> getIncomingMobility(final Integer id) {
		return incomingMobilityRepo.findById(id);
	}


	/**
	 * permet de retourner la liste
	 */
	public List<Activity> getIncomingMobilitys(){
		return activityRepo.findByIdTypeActivity(TypeActivity.IdTypeActivity.INCOMING_MOBILITY.getId());
	}

	/**
	 * supprimer l'elmt selon son id
	 * @param id : id de l'elmt
	 */
	public void deleteIncomingMobility(final Integer id) {
		incomingMobilityRepo.deleteById(id);
	}

	/**
	 * permet d'ajouter un elmt
	 * @return : l'elemt ajouter a la base de donnees
	 */
	public Activity saveIncomingMobility(@RequestBody Map<String, Object> request) {
		
		IncomingMobility IncomingMobilityTosave = new IncomingMobility();
		
		// setNameSeniorScientist :
		IncomingMobilityTosave.setNameSeniorScientist((String)request.get("nameSeniorScientist"));
		
		// setArrivalDate :
		String dateString = (String)request.get("arrivalDate");
		IncomingMobilityTosave.setArrivalDate(getDateFromString(dateString, "yyyy-MM-dd"));

        // setArrivalDate :
		String dateString2 = (String)request.get("departureDate");
		IncomingMobilityTosave.setDepartureDate(getDateFromString(dateString2, "yyyy-MM-dd"));
		
		// setDuration :
		IncomingMobilityTosave.setDuration(Integer.parseInt((String)request.get("duration")));
		
        // setNationality :
		IncomingMobilityTosave.setNationality((String)request.get("nationality"));

        // setOriginalLabName :
		IncomingMobilityTosave.setOriginalLabName((String)request.get("originalLabName"));

        // setOriginaLabLocation :
		IncomingMobilityTosave.setOriginaLabLocation((String)request.get("originaLabLocation"));

        // setPiPartner :
		IncomingMobilityTosave.setPiPartner((String)request.get("piPartner"));

        // setProjectTitle :
		IncomingMobilityTosave.setProjectTitle((String)request.get("projectTitle"));

        // setAssociatedFunding :
		IncomingMobilityTosave.setAssociatedFunding((String)request.get("associatedFunding"));

        // setPublicationReference :
		IncomingMobilityTosave.setPublicationReference((String)request.get("publicationReference"));

        // setStrategicRecurringCollab :
		IncomingMobilityTosave.setStrategicRecurringCollab(Boolean.parseBoolean((String)request.get("strategicRecurringCollab")));

        // setActiveProject :
		IncomingMobilityTosave.setActiveProject(Boolean.parseBoolean((String)request.get("activeProject")));

        // setUmrCoordinated :
		IncomingMobilityTosave.setUmrCoordinated(Boolean.parseBoolean((String)request.get("umrCoordinated")));

        // setAgreementSigned :
		IncomingMobilityTosave.setAgreementSigned(Boolean.parseBoolean((String)request.get("agreementSigned")));

	    // Activity : 
		Activity activity = new Activity();
		TypeActivity typeActivity = typeActivityLevelRepo.getById(TypeActivity.IdTypeActivity.INCOMING_MOBILITY.getId());
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
		IncomingMobilityTosave.setActivity(savedActivity);
		
		// Id de l'IncomingMobility :
		Integer idIncomingMobility = activity.getIdActivity();
		IncomingMobilityTosave.setIdActivity(idIncomingMobility);
				
		// Enregistrer IncomingMobility dans la base de données :
		IncomingMobility saveIncomingMobility = incomingMobilityRepo.save(IncomingMobilityTosave);

		// wrap all saved objects in activity
		savedActivity.setIncomingMobility(saveIncomingMobility);
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

