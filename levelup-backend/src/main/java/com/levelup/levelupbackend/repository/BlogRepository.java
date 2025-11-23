package com.levelup.levelupbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.levelupbackend.model.Blog;

public interface BlogRepository extends JpaRepository<Blog, Long> {
}
