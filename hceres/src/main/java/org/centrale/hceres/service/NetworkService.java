package org.centrale.hceres.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Network;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.NetworkRepository;
import org.centrale.hceres.repository.ResearchRepository;
import org.centrale.hceres.repository.TypeActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.Data;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class NetworkService {
	
	/**
	 * Instanciation
	 */
	@Autowired
	private ResearchRepository researchRepo;
	@Autowired
	private NetworkRepository NetworkRepo;
	@Autowired
	private ActivityRepository activityRepo;
	@Autowired
	private TypeActivityRepository typeActivityLevelRepo;
	
	/**
	 * permet de retourner la liste
	 */
	public Iterable<Network> getNetworks(){
		return NetworkRepo.findAll();
	}
	
	/**
	 * retourner l'elmt selon son id
	 * @param id : id de l'elmt
	 * @return : elmt a retourner
	 */
	public Optional<Network> getNetwork(final Integer id) { 
		return NetworkRepo.findById(id); 
	}
	
	/**
	 * supprimer l'elmt selon son id
	 * @param id : id de l'elmt
	 */
	public void deleteNetwork(final Integer id) {
		NetworkRepo.deleteById(id);
	}
	
	/**
	 * permet d'ajouter un elmt
	 * @return : l'elemt ajouter a la base de donnees
	 */
	public Network saveNetwork(HttpServletRequest request) {
		
		Network NetworkTosave = new Network();
		
		// NetworkCourseName :
		NetworkTosave.setNameNetwork(request.getParameter("networkName"));
		
		// NetworkStartDate :
		String dateString = request.getParameter("startDate");
		NetworkTosave.setStartDate(getDateFromString(dateString, "yyyy-MM-dd"));
		
		// ActiveNetwork :
		NetworkTosave.setActiveNetwork(Boolean.parseBoolean(request.getParameter("activeNetwork")));

        // setAssociatedFunding :
		NetworkTosave.setAssociatedFunding(request.getParameter("associatedFunding"));

        // setNbResultingPublications :
		NetworkTosave.setNbResultingPublications(Integer.parseInt(request.getParameter("nbResultingPublications")));

        // setRefResultingPublications :
		NetworkTosave.setRefResultingPublications(request.getParameter("ref_resulting_publications"));

        // setUmrCoordinated :
		NetworkTosave.setUmrCoordinated(Boolean.parseBoolean(request.getParameter("umr_coordinated")));

           // setAgreementSigned :
		NetworkTosave.setAgreementSigned(Boolean.parseBoolean(request.getParameter("agreement_signed")));
		
	    // Activity : 
		Activity activity = new Activity();
		TypeActivity typeActivity = typeActivityLevelRepo.getById(14);
		activity.setIdTypeActivity(typeActivity);
		
		// ajouter cette activité à la liste de ce chercheur :
		String researcherIdStr = request.getParameter("researcherId");
		int researcherId = -1;
		researcherId = Integer.parseInt(researcherIdStr);
		Optional<Researcher> researcherOp = researchRepo.findById(researcherId);
		Researcher researcher = researcherOp.get();
		
		Collection<Activity> activityCollection = researcher.getActivityCollection();
		activityCollection.add(activity);
		researcher.setActivityCollection(activityCollection);
		
		// Ajouter cette activité au chercheur :
		Collection<Researcher> activityResearch = activity.getResearcherCollection();
		if (activityResearch == null) {
			activityResearch = new ArrayList<Researcher>();
		}
		activityResearch.add(researcher);
		activity.setResearcherCollection(activityResearch);
		
		Activity savedActivity = activityRepo.save(activity);
		NetworkTosave.setActivity(savedActivity);
		
		// Id de l'Network :
		Integer idNetwork = activity.getIdActivity();
		NetworkTosave.setIdActivity(idNetwork);
				
		// Enregistrer Network dans la base de données :
		Network saveNetwork = NetworkRepo.save(NetworkTosave);
		
		return saveNetwork;
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














