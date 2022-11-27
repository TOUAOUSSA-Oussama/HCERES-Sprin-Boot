package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PlatformService {

    @Autowired
    PlatformRepository platformRepository;
    @Autowired
    private ResearchRepository researchRepo;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;


    public List<Activity> getPlatforms(){
        return activityRepo.findByIdTypeActivity(TypeActivity.IdTypeActivity.PLATFORM.getId());
    }


    public Optional<Platform> getPlatform(final Integer id) {
        return platformRepository.findById(id);
    }


    public void deletePlatform(final Integer id) {
        platformRepository.deleteById(id);
    }

    public Activity savePlatform(@RequestBody Map<String, Object> request) {

        Platform platfomToSave = new Platform();

        // Creation Date
        try {
        platfomToSave.setCreationDate(getDateFromString((String)request.get("creationDate"), "yyyy-MM-dd"));}
        catch (Exception e){
            platfomToSave.setCreationDate(getDateFromString("2022-03-05", "yyyy-MM-dd"));
        }

        // Description
        platfomToSave.setDescription((String)request.get("description"));

        // Managers
        platfomToSave.setManagers((String)request.get("managers"));

        // Affiliation
        platfomToSave.setAffiliation((String)request.get("affiliation"));

        // Labellisation
        platfomToSave.setLabellisation((String)request.get("labellisation"));

        // Open Private Researches
        platfomToSave.setOpenPrivateResearchers(Boolean.valueOf((String)request.get("openPrivateResearchers")));


        // Activity :
        Activity activity = new Activity();
        TypeActivity typeActivity = typeActivityLevelRepo.getById(TypeActivity.IdTypeActivity.PLATFORM.getId());
        activity.setTypeActivity(typeActivity);

        // Add this activity to the researcher activity list :
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
        platfomToSave.setActivity(savedActivity);


        // Created platform id :
        Integer idPlatform = activity.getIdActivity();
        platfomToSave.setIdActivity(idPlatform);

        // Persist Platform to database :
        Platform savePlatform = platformRepository.save(platfomToSave);
        savedActivity.setPlatform(savePlatform);
        return savedActivity;
    }

    // Date to String
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
