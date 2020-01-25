package com.model.blog;

import java.util.List;

import org.springframework.data.repository.CrudRepository;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> findAllCommentByAuthorUsername(String username);
    List<Comment> findAllByOrderByCreatedDesc();
    List<Comment> findByParentPostId(Integer parentPostId);
}