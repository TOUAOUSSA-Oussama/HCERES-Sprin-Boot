package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.criteria.CriteriaBuilder;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class EditorialService {
    @Autowired
    EditorialRepository  editorialRepository;
    @Autowired
    private ResearchRepository researchRepo;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;
    @Autowired
    private  JournalRepository journalRepository;
    @Autowired
    private FunctionEditorialActivityRepository functionEditorialActivityRepository;


    public Iterable<EditorialActivity> getEditorials(){
        return editorialRepository.findAll();
    }


    public Optional<EditorialActivity> getEditorial(final Integer id) {
        return editorialRepository.findById(id);
    }


    public void deleteEditorial(final Integer id) {
        editorialRepository.deleteById(id);
    }

    public EditorialActivity saveEditorial(@RequestBody Map<String, Object> request) {

        EditorialActivity editorialToSave = new EditorialActivity();

        // Start Date
        editorialToSave.setStartDate(getDateFromString((String)request.get("startDate"), "yyyy-MM-dd"));

        // Start Date
        editorialToSave.setEndDate(getDateFromString((String)request.get("endDate"), "yyyy-MM-dd"));

        // Impact Factor
        String impactFactor = (String)request.get("impactFactor");
        BigDecimal impactFactorInt = new BigDecimal(impactFactor);
        editorialToSave.setImpactFactor(impactFactorInt);

        // Activity :
        Activity activity = new Activity();
        TypeActivity typeActivity = typeActivityLevelRepo.getById(5);
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
        editorialToSave.setActivity(savedActivity);

        // Created Editorial id :
        Integer idEditorial = activity.getIdActivity();
        editorialToSave.setIdActivity(idEditorial);

        // Creating journal object with given name in form (must include in future the possibility to select among the existing journals)
        String journalName = (String)request.get("journalName") ;

        if (journalRepository.findByName(journalName)==null){
            Journal journal = new Journal();
            journal.setJournalName(journalName);
            editorialToSave.setJournalId(journal);
        }
        else {
            Journal journal = journalRepository.findByName(journalName);
            editorialToSave.setJournalId(journal);
        }


        //Creating an editing function
        // Search in dataBase by function name if it doesn't exist create It
        String functionName = (String)request.get("functionName");
        if (functionEditorialActivityRepository.findByName(functionName)==null){
            FunctionEditorialActivity functionEditorialActivity = new FunctionEditorialActivity();

            // Setting the function Name
            functionEditorialActivity.setFunctionEditorialActivityName(functionName);

            // Getting existing List of editorial activities
            List<EditorialActivity> List = functionEditorialActivity.getEditorialActivityList();

            // Adding the new editorial activity to the List
            if (List == null) {
                List = new ArrayList<EditorialActivity>();
            }
            List.add(editorialToSave);
            functionEditorialActivity.setEditorialActivityList(List);

            // Persist Function editorial activity
            //functionEditorialActivityRepository.save(functionEditorialActivity);

            // Adding id to editorial activity
            editorialToSave.setFunctionEditorialActivityId(functionEditorialActivity);
        }

        else{
            FunctionEditorialActivity functionEditorialActivity = functionEditorialActivityRepository.findByName(functionName);

            // Getting existing List of editorial activities
            List<EditorialActivity> List = functionEditorialActivity.getEditorialActivityList();

            // Adding the new editorial activity to the List

            List.add(editorialToSave);
            functionEditorialActivity.setEditorialActivityList(List);

            // Persist Function editorial activity
            //functionEditorialActivityRepository.save(functionEditorialActivity);

            // Adding id to editorial activity
            editorialToSave.setFunctionEditorialActivityId(functionEditorialActivity);
        }

        // Persist Platform to database :
        EditorialActivity saveEditorial = editorialRepository.save(editorialToSave);

        return saveEditorial;


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
