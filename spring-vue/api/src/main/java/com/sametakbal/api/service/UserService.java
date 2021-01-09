package com.sametakbal.api.service;

import com.sametakbal.api.model.User;

import java.util.List;

public interface UserService{
    User saveUser(User user);

    User findByUsername(String username);

    List<User> findAllUsers();
}
