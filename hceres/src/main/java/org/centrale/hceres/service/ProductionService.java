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
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.ResearchRepository;
import org.centrale.hceres.repository.TypeActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.Data;

//items
import org.centrale.hceres.items.ToolProductType;
import org.centrale.hceres.items.ToolProduct;
import org.centrale.hceres.items.ToolProductInvolvment;
import org.centrale.hceres.items.ToolProductInvolvmentPK;
import org.centrale.hceres.items.ToolProductRole;
//repository
import org.centrale.hceres.repository.ProductionRepository;
import org.centrale.hceres.repository.ProductInvolvmentRepository;
import org.centrale.hceres.repository.ProductRoleRepository;
import org.centrale.hceres.repository.ProductTypeRepository;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class ProductionService {
	
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
    private ProductionRepository prodRepo;
    @Autowired
    private ProductInvolvmentRepository prodInvolRepo;
    @Autowired
    private ProductRoleRepository prodRoleRepo;
    @Autowired
    private ProductTypeRepository prodTypeRepo;

    /**
	 * permet de retourner la liste
	 */
	public Iterable<ToolProduct> getToolProduct(){
		return prodRepo.findAll();
	}

	/**
	 * retourner l'elmt selon son id
	 * @param id : id de l'elmt
	 * @return : elmt a retourner
	 */
	public Optional<ToolProduct> getToolProduct(final Integer id) { 
		return prodRepo.findById(id); 
	}

	/**
	 * supprimer l'elmt selon son id
	 * @param id : id de l'elmt
	 */
	public void deleteToolProduct(final Integer id) {
		prodRepo.deleteById(id);
	}
	
	/**
	 * permet d'ajouter un elmt
	 * @return : l'elemt ajouter a la base de donnees
	 */
	public ToolProduct saveToolProduct(HttpServletRequest request) {
		
		ToolProduct productionTosave = new ToolProduct();
		
		// toolProductNam :
		productionTosave.setToolProductNam(request.getParameter("toolProductNam"));

		// toolProductCreation
		String dateString = request.getParameter("toolProductCreation");
		productionTosave.setToolProductCreation(getDateFromString(dateString, "yyyy-MM-dd"));

		// toolProductAuthors
		productionTosave.setToolProductAuthors(request.getParameter("toolProductAuthors"));

		// toolProductDescription
		productionTosave.setToolProductDescription(request.getParameter("toolProductDescription"));

		// ToolProductType
		ToolProductType productType = new ToolProductType();
		productType.setToolProductTypeName(request.getParameter("toolProductTypeName"));
		ToolProductType saveproductType = prodTypeRepo.save(productType);
		productionTosave.setToolProductTypeId(saveproductType);
		
		// Activity :
		Activity activity = new Activity();
		TypeActivity typeActivity = typeActivityLevelRepo.getById(9);
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
		productionTosave.setActivity(savedActivity);

		// Id de l'production :
		Integer idProduction = activity.getIdActivity();
		productionTosave.setIdActivity(idProduction);
				
		// Enregistrer production dans la base de données :
		ToolProduct saveProduction = prodRepo.save(productionTosave);
		
		return saveProduction;
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












