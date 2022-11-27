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
import org.centrale.hceres.items.SrAward;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.SrAwardRepository;
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
public class SrAwardService {
	
	/**
	 * Instanciation
	 */
	@Autowired
	private ResearchRepository researchRepo;
	@Autowired
	private SrAwardRepository SrAwardRepo;
	@Autowired
	private ActivityRepository activityRepo;
	@Autowired
	private TypeActivityRepository typeActivityLevelRepo;
	
	/**
	 * permet de retourner la liste
	 */
	public List<Activity> getSrAwards(){
		return activityRepo.findByIdTypeActivity(TypeActivity.IdTypeActivity.SR_AWARD.getId());
	}
	
	/**
	 * retourner l'elmt selon son id
	 * @param id : id de l'elmt
	 * @return : elmt a retourner
	 */
	public Optional<SrAward> getSrAward(final Integer id) { 
		return SrAwardRepo.findById(id); 
	}
	
	/**
	 * supprimer l'elmt selon son id
	 * @param id : id de l'elmt
	 */
	public void deleteSrAward(final Integer id) {
		SrAwardRepo.deleteById(id);
	}
	
	/**
	 * permet d'ajouter un elmt
	 * @return : l'elemt ajouter a la base de donnees
	 */
	public Activity saveSrAward(@RequestBody Map<String, Object>  request) {
		
		SrAward SrAwardTosave = new SrAward();
		
		// SrAwardCourseName :
		SrAwardTosave.setAwardeeName((String)request.get("awardeeName"));
		
		// SrAwardCompletion :
		String dateString = (String)request.get("awardDate");
		SrAwardTosave.setAwardDate(getDateFromString(dateString, "yyyy-MM-dd"));
		
		// SrAwardDescription :
		SrAwardTosave.setDescription((String)request.get("description"));
		
	    // Activity : 
		Activity activity = new Activity();
		TypeActivity typeActivity = typeActivityLevelRepo.getById(TypeActivity.IdTypeActivity.SR_AWARD.getId());
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
		SrAwardTosave.setActivity(savedActivity);
		
		// Id de l'SrAward :
		Integer idSrAward = activity.getIdActivity();
		SrAwardTosave.setIdActivity(idSrAward);
				
		// Enregistrer SrAward dans la base de données :
		SrAward saveSrAward = SrAwardRepo.save(SrAwardTosave);
		savedActivity.setSrAward(saveSrAward);
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













