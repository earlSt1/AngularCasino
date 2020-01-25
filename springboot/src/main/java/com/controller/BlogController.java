package com.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.model.blog.Comment;
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
        return new ResponseEntity<Iterable<Post>>(postRepository.findAllByOrderByCreatedDesc(),HttpStatus.OK);
    }

    @RequestMapping(value = "/post/{id}", method = RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Post> getPost(@PathVariable int id){
        Optional<Post> result = postRepository.findById(id);
        if (result.isPresent()){
            return ResponseEntity.ok(result.get());
        }
        return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);    
    }

    @RequestMapping(value = "/post/add", method = RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addPost(@RequestBody Post post,Authentication authentication){
        post.setAuthor(userRepository.findByUsername(authentication.getName()));
        post.setCreated(new Date());
        postRepository.save(post);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/post/delete", method = RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deletePost(@RequestParam int id,Authentication authentication){
        Post toDelete = postRepository.findById(id).get();
        //Only delete posts the user had published
        if (toDelete != null && authentication.getName().equals(toDelete.getAuthor().getUsername())){
            postRepository.deleteById(id);  
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @RequestMapping(value = "/post/{postId}/comments", method = RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Comment>> getPostComments(@PathVariable Integer postId){
        List<Comment> comments = commentRepository.findByParentPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @RequestMapping(value = "/post/{postId}/comment/add", method = RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addComment(@PathVariable int postId, @RequestBody Comment comment, Authentication authentication){
        comment.setAuthor(userRepository.findByUsername(authentication.getName()));
        Post p = postRepository.findById(postId).get();
        comment.setParentPost(p);
        comment.setCreated(new Date());
        commentRepository.save(comment);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/user/comments", method = RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Comment>> getUserComments(Authentication authentication){
        List<Comment> comments = commentRepository.findAllCommentByAuthorUsername(authentication.getName());
        return ResponseEntity.ok(comments);
    }

    @RequestMapping(value = "/comment/{id}", method = RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteComment(@RequestParam int id,Authentication authentication){
        Comment toDelete = commentRepository.findById(id).get();
        //Only delete comments the user had published
        if (toDelete != null && authentication.getName().equals(toDelete.getAuthor().getUsername())){
            commentRepository.deleteById(id);  
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}