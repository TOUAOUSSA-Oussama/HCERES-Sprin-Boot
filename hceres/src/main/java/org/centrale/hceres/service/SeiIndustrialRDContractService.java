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
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.SeiIndustrialRDContract;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.ResearchRepository;
import org.centrale.hceres.repository.SeiIndustrialRDContractRepository;
import org.centrale.hceres.repository.TypeActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Data;

@Data
@Service
public class SeiIndustrialRDContractService {
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
	private SeiIndustrialRDContractRepository seiIndustrialRDContractRepo;
	
	/**
	 * permet d'ajouter un elmt
	 * @return : l'elemt ajouter a la base de donnees
	 */
	public SeiIndustrialRDContract saveSeiIndustrialRDContract(HttpServletRequest request) {
		
		SeiIndustrialRDContract seiIndustrialRDContractToSave = new SeiIndustrialRDContract();
		
		// StartDate :
		String startDate = request.getParameter("StartDate");
		seiIndustrialRDContractToSave.setStartDate(getDateFromString(startDate, "yyyy-MM-dd"));
		
		// NameCompanyInvolved :
		seiIndustrialRDContractToSave.setNameCompanyInvolved(request.getParameter("NameCompanyInvolved"));
		
		// ProjectTitle :
		seiIndustrialRDContractToSave.setProjectTitle(request.getParameter("ProjectTitle"));
		
		// AgreementAmount :
		seiIndustrialRDContractToSave.setAgreementAmount(Integer.parseInt(request.getParameter("AgreementAmount")));
		
		// EndDate :
		String endDate = request.getParameter("EndDate");
		seiIndustrialRDContractToSave.setEndDate(getDateFromString(endDate, "yyyy-MM-dd"));
		
		// AssociatedPubliRef
		seiIndustrialRDContractToSave.setAssociatedPubliRef(request.getParameter("AssociatedPubliRef"));
		
		// Activity : 
		Activity activity = new Activity();
		TypeActivity typeActivity = typeActivityLevelRepo.getById(40);
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
		seiIndustrialRDContractToSave.setActivity(savedActivity);
		
		
		// Id de l'education :
		Integer idEducation = activity.getIdActivity();
		seiIndustrialRDContractToSave.setIdActivity(idEducation);
				
		// Enregistrer Education dans la base de données :
		SeiIndustrialRDContract seiIndustrialRDContractSaved = seiIndustrialRDContractRepo.save(seiIndustrialRDContractToSave);
		
		return seiIndustrialRDContractSaved;
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
