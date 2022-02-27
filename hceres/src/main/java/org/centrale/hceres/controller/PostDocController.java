package org.centrale.hceres.controller;

import org.centrale.hceres.items.PostDoc;
import org.centrale.hceres.service.PostDocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
public class PostDocController {

    @Autowired
    private PostDocService postDocService;

    @GetMapping("/PostDocs")
    public Iterable<PostDoc> getPostDocs() {
        return postDocService.getPostDocs();
    }


    @GetMapping("/PostDocs/{id}")
    public PostDoc getPostDoc(@PathVariable("id") final Integer id) {
        Optional<PostDoc> postDoc = postDocService.getPostDoc(id);
        if(postDoc.isPresent()) {
            return postDoc.get();
        } else {
            return null;
        }
    }

    @RequestMapping(value = "/AddPostDoc", method= RequestMethod.POST)
    public PostDoc createPostDoc(HttpServletRequest request) {
        return postDocService.savePostDoc(request);
    }

    @DeleteMapping("/deletPostDoc/{id}")
    public void deletePostDoc(@PathVariable("id") final Integer id) {
        postDocService.deletePostDoc(id);
    }

}
