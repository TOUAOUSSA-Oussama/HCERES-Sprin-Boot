package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.repository.CompanyCreationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CompanyCreationService {

    /**
     * Instanciation
     */
    @Autowired
    private ResearchRepository researchRepo;
    @Autowired
    private CompanyCreationRepository CompanyCreationRepository;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;

    public List<org.centrale.hceres.items.CompanyCreation> getCompanyCreations(){
        return CompanyCreationRepository.findAll();
    }


    public Optional<CompanyCreation> getCompanyCreation(final Integer id) {
        return CompanyCreationRepository.findById(id);
    }

    public void deleteCompanyCreation(final Integer id) {
        CompanyCreationRepository.deleteById(id);
    }


    public CompanyCreation saveCompanyCreation(HttpServletRequest request) {
        CompanyCreation CompanyCreationToSave = new CompanyCreation();

        // CompanyCreationTitle :
        CompanyCreationToSave.setCompanyCreationName(request.getParameter("CompanyCreationName"));

        // Creation date
        String creationDate = request.getParameter("creation_date");
        CompanyCreationToSave.setCompanyCreationDate(getDateFromString(creationDate, "yyyy-MM-dd"));

        // is the Company active:
        CompanyCreationToSave.setCompanyCreationActive(Boolean.parseBoolean(request.getParameter("status")));

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

        // Add CompanyCreation to Researcher activities :
        Collection<Researcher> activityResearch = activity.getResearcherCollection();
        if (activityResearch == null) {
            activityResearch = new ArrayList<Researcher>();
        }
        activityResearch.add(researcher);
        activity.setResearcherCollection(activityResearch);

        Activity savedActivity = activityRepo.save(activity);
        CompanyCreationToSave.setActivity(savedActivity);


        // Added CompanyCreation Id :
        Integer idCompanyCreation = activity.getIdActivity();
        CompanyCreationToSave.setIdActivity(idCompanyCreation);


        // Persist CompanyCreation object to the data base :
        CompanyCreation saveCompanyCreation = CompanyCreationRepository.save(CompanyCreationToSave);

        return saveCompanyCreation;
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