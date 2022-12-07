package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.*;

@Service
public class ReviewService {
    @Autowired
    private ReviewArticleRepository ReviewArticleRepository;
    @Autowired
    private ResearchRepository researchRepo;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;
    @Autowired
    private JournalRepository journalRepository;

    /**
     * permet de retourner la liste
     */
    public List<Activity> getReviewArticle(){
        return activityRepo.findByIdTypeActivity(TypeActivity.IdTypeActivity.REVIEWING_JOURNAL_ARTICLES.getId());
    }

    /**
     * supprimer l'elmt selon son id
     * @param id : id de l'elmt
     */
    public void deleteReviewArticle(final Integer id) {
        ReviewArticleRepository.deleteById(id);
    }

    @Transactional
    public Activity saveReviewArticle(@RequestBody Map<String, Object> request) {

        ReviewArticle reviewToSave = new ReviewArticle();

        // Year
        Integer year = Integer.parseInt((String) request.get("year"));
        reviewToSave.setYear(year);

        // nb_reviewed_articles
        Integer nbReviewedArticles = Integer.parseInt((String) request.get("nbReviewedArticles"));
        reviewToSave.setNbReviewedArticles(nbReviewedArticles);

        // impact_factor

        BigDecimal impactFactor = new BigDecimal((String) request.get("impactFactor"));
        reviewToSave.setImpactFactor(impactFactor);

        // Activity :
        Activity activity = new Activity();
        TypeActivity typeActivity = typeActivityLevelRepo.getById(TypeActivity.IdTypeActivity.REVIEWING_JOURNAL_ARTICLES.getId());
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
        reviewToSave.setActivity(savedActivity);

        // Created Editorial id :
        Integer idReview = activity.getIdActivity();
        reviewToSave.setIdActivity(idReview);

        // Creating journal object with given name in form (must include in future the possibility to select among the existing journals)
        String journalName = (String) request.get("journalName");

        if (journalRepository.findByName(journalName) == null) {
            Journal journal = new Journal();
            journal.setJournalName(journalName);
            reviewToSave.setJournalId(journal);
        } else {
            Journal journal = journalRepository.findByName(journalName);
            reviewToSave.setJournalId(journal);
        }

        // Persist Platform to database :
        ReviewArticle saveReview = ReviewArticleRepository.save(reviewToSave);
        savedActivity.setReviewArticle(saveReview);
        return savedActivity;

    }
}
