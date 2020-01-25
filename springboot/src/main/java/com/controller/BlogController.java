package com.controller;

import java.util.Optional;

import com.model.blog.CommentRepository;
import com.model.blog.Post;
import com.model.blog.PostRepository;
import com.model.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class BlogController {

    @Autowired
    PostRepository postRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/post/getAll", method = RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<Post>> getPosts(){
        return new ResponseEntity<Iterable<Post>>(postRepository.findAll(),HttpStatus.OK);
    }
    @RequestMapping(value = "/post/get/{id}", method = RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Post> getPost(@PathVariable int id){
        Optional<Post> result = postRepository.findById(id);
        if (result.isPresent()){
            return ResponseEntity.ok(result.get());
        }
        return new ResponseEntity<Post>(HttpStatus.NO_CONTENT);    
        
    }
    @RequestMapping(value = "/post/add", method = RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addPost(@RequestBody Post post,Authentication authentication){
        post.setAuthor(userRepository.findByUsername(authentication.getName()));
        postRepository.save(post);
        return ResponseEntity.ok().build();
    }
    @RequestMapping(value = "/post/delete", method = RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestParam int id,Authentication authentication){
        Post toDelete = postRepository.findById(id).get();
        //Only delete posts the user had published
        if (toDelete != null && authentication.getName().equals(toDelete.getAuthor().getUsername())){
            postRepository.deleteById(id);  
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}