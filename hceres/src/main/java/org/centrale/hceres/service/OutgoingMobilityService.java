package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.repository.OutgoingMobilityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class OutgoingMobilityService {

    /**
     * Instanciation
     */
    @Autowired
    private ResearchRepository researchRepo;
    @Autowired
    private OutgoingMobilityRepository OutgoingMobilityRepository;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;

    public Iterable<OutgoingMobility> getOutgoingMobilitys(){
        return OutgoingMobilityRepository.findAll();
    }


    public Optional<OutgoingMobility> getOutgoingMobility(final Integer id) {
        return OutgoingMobilityRepository.findById(id);
    }

    public void deleteOutgoingMobility(final Integer id) {
        OutgoingMobilityRepository.deleteById(id);
    }


    public OutgoingMobility saveOutgoingMobility(HttpServletRequest request) {
        OutgoingMobility OutgoingMobilityToSave = new OutgoingMobility();

        // The person concerned :
        OutgoingMobilityToSave.setNamePersonConcerned(request.getParameter("OutgoingMobilityName"));

        // Arrival date
        String arrivalDate = request.getParameter("arrival_date");
        OutgoingMobilityToSave.setArrivalDate(getDateFromString(arrivalDate, "yyyy-MM-dd"));

        // Departure Date :
        String departureDate = request.getParameter("departure_date");
        OutgoingMobilityToSave.setDepartureDate(getDateFromString(departureDate, "yyyy-MM-dd"));

        // Duration :
        OutgoingMobilityToSave.setDuration(Integer.parseInt(request.getParameter("duration")));

        // Host lab Name:
        OutgoingMobilityToSave.setHostLabName(request.getParameter("host_lab_name"));

        // Host lab Location:
        OutgoingMobilityToSave.setHostLabLocation(request.getParameter("host_lab_location"));

        // Pi partner:
        OutgoingMobilityToSave.setPiPartner(request.getParameter("pi_partner"));

        // Project Title:
        OutgoingMobilityToSave.setProjectTitle(request.getParameter("project_title"));

        // Associated Funding:
        OutgoingMobilityToSave.setAssociatedFunding(request.getParameter("associated_funding"));

        // Number of publication:
        OutgoingMobilityToSave.setNbPublications(Integer. parseInt(request.getParameter("nb_publications")));

        // Publication Reference:
        OutgoingMobilityToSave.setPublicationReference(request.getParameter("publication_reference"));

        // Strategic Reccuring Collab:
        OutgoingMobilityToSave.setStrategicRecurringCollab(Boolean.parseBoolean(request.getParameter("strategic_recurring_collab")));

        // Status:
        OutgoingMobilityToSave.setActiveProject(Boolean.parseBoolean(request.getParameter("active_project")));

        // Status:
        OutgoingMobilityToSave.setUmrCoordinated(Boolean.parseBoolean(request.getParameter("umr_coordinated")));

        // Status:
        OutgoingMobilityToSave.setAgreementSigned(Boolean.parseBoolean(request.getParameter("agreement_signed")));

        // Activity :
        Activity activity = new Activity();
        TypeActivity typeActivity = typeActivityLevelRepo.getById(21);
        activity.setIdTypeActivity(typeActivity);

        // Add activity to researchers list :
        String researcherIdStr = request.getParameter("researcherId");
        int researcherId = -1;
        if(researcherIdStr!=null) {
            try {
                researcherId = Integer.parseInt(researcherIdStr);
            } catch (Exception e) {
                System.out.print("Hello Error I caught you!!");
            }
        }

        Optional<Researcher> researcherOp = researchRepo.findById(researcherId);
        Researcher researcher = researcherOp.get();

        Collection<Activity> activityCollection = researcher.getActivityCollection();
        activityCollection.add(activity);
        researcher.setActivityCollection(activityCollection);

        // Add OutgoingMobility to Researcher activities :
        Collection<Researcher> activityResearch = activity.getResearcherCollection();
        if (activityResearch == null) {
            activityResearch = new ArrayList<Researcher>();
        }
        activityResearch.add(researcher);
        activity.setResearcherCollection(activityResearch);

        Activity savedActivity = activityRepo.save(activity);
        OutgoingMobilityToSave.setActivity(savedActivity);


        // Added OutgoingMobility Id :
        Integer idOutgoingMobility = activity.getIdActivity();
        OutgoingMobilityToSave.setIdActivity(idOutgoingMobility);


        // Persist OutgoingMobility object to the data base :
        OutgoingMobility saveOutgoingMobility = OutgoingMobilityRepository.save(OutgoingMobilityToSave);

        return saveOutgoingMobility;
    }

    // Util function to convert string to date
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