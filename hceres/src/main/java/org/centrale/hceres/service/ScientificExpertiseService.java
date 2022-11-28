package org.centrale.hceres.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.ScientificExpertise;

import org.centrale.hceres.items.ScientificExpertiseType;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.ScientificExpertiseTypeRepository;
import org.centrale.hceres.repository.ScientificExpertiseRepository;
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
public class ScientificExpertiseService {
	
	/**
	 * Instanciation
	 */
	@Autowired
	private ResearchRepository researchRepo;
	@Autowired
	private ScientificExpertiseRepository scientificExpertiseRepo;
	@Autowired
	private ScientificExpertiseTypeRepository scientificExpertiseTypeRepository;
	@Autowired
	private ActivityRepository activityRepo;
	@Autowired
	private TypeActivityRepository typeActivityLevelRepo;

	/**
	 * permet de retourner la liste
	 */
	public List<Activity> getScientificExpertises(){
		return activityRepo.findByIdTypeActivity(TypeActivity.IdTypeActivity.SCIENTIFIC_EXPERTISE.getId());
	}

	/**
	 * supprimer l'elmt selon son id
	 * @param id : id de l'elmt
	 */
	public void deleteScientificExpertise(final Integer id) {
		scientificExpertiseRepo.deleteById(id);
	}

	/**
	 * permet d'ajouter un elmt
	 * @return : l'elemt ajouter a la base de donnees
	 */
	@Transactional
	public Activity saveScientificExpertise(@RequestBody Map<String, Object> request) {
		
		ScientificExpertise ScientificExpertiseTosave = new ScientificExpertise();
		
		// setStartDate :
		String dateString = (String)request.get("ScientificExpertiseStartDate");
		ScientificExpertiseTosave.setStartDate(getDateFromString(dateString, "yyyy-MM-dd"));

		// setEndDate :
		String dateString2 = (String)request.get("ScientificExpertiseEndDate");
		ScientificExpertiseTosave.setEndDate(getDateFromString(dateString2, "yyyy-MM-dd"));

		// setDescription :
		ScientificExpertiseTosave.setDescription((String)request.get("ScientificExpertiseDescription"));
		
		
		// ScientificExpertiseType : 
		ScientificExpertiseType ScientificExpertiseType = new ScientificExpertiseType();
		ScientificExpertiseType.setNameChoice((String)request.get("ScientificExpertiseTypeName"));
		ScientificExpertiseType saveScientificExpertiseType = scientificExpertiseTypeRepository.save(ScientificExpertiseType);
		ScientificExpertiseTosave.setScientificExpertiseTypeId(saveScientificExpertiseType);
		
		// Activity : 
		Activity activity = new Activity();
		TypeActivity typeActivity = typeActivityLevelRepo.getById(TypeActivity.IdTypeActivity.SCIENTIFIC_EXPERTISE.getId());
		activity.setTypeActivity(typeActivity);
		//Activity savedActivity = activityRepo.save(activity);
		//ScientificExpertiseTosave.setActivity(savedActivity);
		
		// ajouter cette activité à la liste de ce chercheur :

		Integer researcherId = RequestParser.parseInt(request.get("researcherId"));
        Optional<Researcher> researcherOp = researchRepo.findById(researcherId);
        Researcher researcher = researcherOp.get();

		List<Activity> activityList = researcher.getActivityList();
        activityList.add(activity);
        researcher.setActivityList(activityList);


		 // Add this activity to the reasearcher :
		 List<Researcher> activityResearch = activity.getResearcherList();
		 if (activityResearch == null) {
			 activityResearch = new ArrayList<Researcher>();
		 }
		 activityResearch.add(researcher);
		 activity.setResearcherList(activityResearch);
 
		 Activity savedActivity = activityRepo.save(activity);
		 ScientificExpertiseTosave.setActivity(savedActivity);
		  // Created platform id :
		  Integer idSE = activity.getIdActivity();
		  ScientificExpertiseTosave.setIdActivity(idSE);
		// Enregistrer ScientificExpertise dans la base de données :
		ScientificExpertise saveScientificExpertise = scientificExpertiseRepo.save(ScientificExpertiseTosave);

		savedActivity.setScientificExpertise(saveScientificExpertise);
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



