package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.repository.PatentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PatentService {

    /**
     * Instanciation
     */
    @Autowired
    private ResearchRepository researchRepo;
    @Autowired
    private PatentRepository PatentRepository;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;

    public Iterable<Patent> getPatents(){
        return PatentRepository.findAll();
    }


    public Optional<Patent> getPatent(final Integer id) {
        return PatentRepository.findById(id);
    }

    public void deletePatent(final Integer id) {
        PatentRepository.deleteById(id);
    }


    public Patent savePatent(HttpServletRequest request) {
        Patent PatentToSave = new Patent();

        // PatentTitle :
        PatentToSave.setTitle(request.getParameter("PatentName"));

        // registration date
        String registrationDate = request.getParameter("registration_date");
        PatentToSave.setRegistrationDate(getDateFromString(registrationDate, "yyyy-MM-dd"));

        // Filing Date :
        String filingDate = request.getParameter("filing_date");
        PatentToSave.setFilingDate(getDateFromString(filingDate, "yyyy-MM-dd"));

        // Acceptation Date :
        String acceptationDate = request.getParameter("acceptation_date");
        PatentToSave.setFilingDate(getDateFromString(acceptationDate, "yyyy-MM-dd"));

        // Licensing Date :
        String licensingDate = request.getParameter("licensing_date");
        PatentToSave.setFilingDate(getDateFromString(licensingDate, "yyyy-MM-dd"));

        // Inventors:
        PatentToSave.setInventors(request.getParameter("inventors"));

        // CoOwners:
        PatentToSave.setCoOwners(request.getParameter("co_owners"));

        // Priority number:
        PatentToSave.setPriorityNumber(Float. parseFloat(request.getParameter("priority_number")));

        // Publication number:
        PatentToSave.setPublicationNumber(request.getParameter("publication_number"));

        // Publication date:
        String publicationDate = request.getParameter("publication_date");
        PatentToSave.setPublicationDate(getDateFromString(publicationDate, "yyyy-MM-dd"));

        // Status:
        PatentToSave.setStatus(Boolean.parseBoolean(request.getParameter("status")));

        // PCT Extension Obtained:
        PatentToSave.setPctExtensionObtained(Boolean.parseBoolean(request.getParameter("pct_extension_obtained")));

        // PCT extension publication number:
        PatentToSave.setPriorityNumber(Float. parseFloat(request.getParameter("publication_number_pct_extension")));

        // PCT extension publication date:
        String publicationDatePctExtension = request.getParameter("publication_date_pct_extension");
        PatentToSave.setPublicationDatePctExtension(getDateFromString(publicationDatePctExtension, "yyyy-MM-dd"));
        
        // International extension Publication date:
        String publicationDateInternationalExtension = request.getParameter("publication_date_international_extension");
        PatentToSave.setPublicationDateInternationalExtension(getDateFromString(publicationDateInternationalExtension, "yyyy-MM-dd"));
        
        // Transfer Contract REF:
        PatentToSave.setRefTransferContract(request.getParameter("ref_transfer_contract"));

        // Company involved name:
        PatentToSave.setNameCompanyInvolved(request.getParameter("name_company_involved"));

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

        // Add Patent to Researcher activities :
        Collection<Researcher> activityResearch = activity.getResearcherCollection();
        if (activityResearch == null) {
            activityResearch = new ArrayList<Researcher>();
        }
        activityResearch.add(researcher);
        activity.setResearcherCollection(activityResearch);

        Activity savedActivity = activityRepo.save(activity);
        PatentToSave.setActivity(savedActivity);


        // Added Patent Id :
        Integer idPatent = activity.getIdActivity();
        PatentToSave.setIdActivity(idPatent);


        // Persist Patent object to the data base :
        Patent savePatent = PatentRepository.save(PatentToSave);

        return savePatent;
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