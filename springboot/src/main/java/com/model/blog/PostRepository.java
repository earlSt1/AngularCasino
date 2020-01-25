package com.model.blog;

import java.util.List;

import com.model.user.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface PostRepository extends CrudRepository<Post, Integer> {  
    List<Post> findByAuthor(long authorId);
}