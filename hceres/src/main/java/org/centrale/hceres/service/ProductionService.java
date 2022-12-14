package org.centrale.hceres.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.ResearchRepository;
import org.centrale.hceres.repository.TypeActivityRepository;
import org.centrale.hceres.util.RequestParser;
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
import org.springframework.util.AutoPopulatingList;
import org.springframework.web.bind.annotation.RequestBody;

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
    public Iterable<ToolProduct> getToolProduct() {
        return prodRepo.findAll();
    }

    /**
     * retourner l'elmt selon son id
     *
     * @param id : id de l'elmt
     * @return : elmt a retourner
     */
    public Optional<ToolProduct> getToolProduct(final Integer id) {
        return prodRepo.findById(id);
    }

    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteToolProduct(final Integer id) {
        prodRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    @Transactional
    public ToolProduct saveToolProduct(@RequestBody Map<String, Object> request) throws ParseException {

        ToolProduct productionTosave = new ToolProduct();

        ToolProductInvolvment productInvolvmentTosave = new ToolProductInvolvment();

        // toolProductNam :
        productionTosave.setToolProductNam(RequestParser.getAsString(request.get("toolProductNam")));

        // toolProductCreation
        productionTosave.setToolProductCreation(RequestParser.getAsDate(request.get("toolProductCreation")));

        // toolProductAuthors
        productionTosave.setToolProductAuthors(RequestParser.getAsString(request.get("toolProductAuthors")));

        // toolProductDescription
        productionTosave.setToolProductDescription(RequestParser.getAsString(request.get("toolProductDescription")));

        // ToolProductType
        ToolProductType productType = new ToolProductType();
        productType.setToolProductTypeName(RequestParser.getAsString(request.get("toolProductTypeName")));
        ToolProductType saveproductType = prodTypeRepo.save(productType);
        productionTosave.setToolProductTypeId(saveproductType);

        // Activity :
        Activity activity = new Activity();
        TypeActivity typeActivity = typeActivityLevelRepo.getById(9);
        activity.setTypeActivity(typeActivity);


        // get list of researcher doing this activity - currently only one is sent
        Integer researcherId = RequestParser.getAsInteger(request.get("researcherId"));
        Optional<Researcher> researcherOp = researchRepo.findById(researcherId);
        Researcher researcher = researcherOp.get();

        List<Researcher> activityResearch = new ArrayList<>();
        activityResearch.add(researcher);
        activity.setResearcherList(activityResearch);

        Activity savedActivity = activityRepo.save(activity);
        productionTosave.setActivity(savedActivity);

        // Id de la production :
        Integer idProduction = activity.getIdActivity();
        productionTosave.setIdActivity(idProduction);

        //toolProductInvolvmentResearchers
        productInvolvmentTosave.setToolProductInvolvmentResearchers(RequestParser.getAsString(request.get("toolProductInvolvmentResearchers")));

        //Add id_activity of ToolProduct
        productInvolvmentTosave.setToolProduct(productionTosave);

        //Add ToolProductRole
        ToolProductRole toolProductRole = new ToolProductRole();
        toolProductRole.setToolProductRoleName(RequestParser.getAsString(request.get("toolProductRoleName")));
        ToolProductRole saveToolProductRole = prodRoleRepo.save(toolProductRole);
        ToolProductInvolvmentPK saveProdInvoPK = new ToolProductInvolvmentPK();
        saveProdInvoPK.setToolProductRoleId(saveToolProductRole.getToolProductRoleId());
        productInvolvmentTosave.setToolProductInvolvmentPK(saveProdInvoPK);

        // Persist Production to database :
        ToolProduct saveProduction = prodRepo.save(productionTosave);

        return saveProduction;
    }
}












