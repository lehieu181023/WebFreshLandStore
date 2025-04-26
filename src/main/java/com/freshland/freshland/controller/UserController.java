package com.freshland.freshland.controller;

import com.freshland.freshland.model.User;
import com.freshland.freshland.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user")
    public String Index(Model model){
        model.addAttribute("user",userService.getAllUsers());
        return "user/user";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/create")
    public String Create(Model model){
        model.addAttribute("user", new User());
        return "user/update";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/update/{id}")
    public String Update(@PathVariable Integer id, Model model) {
        User user = userService.getUserOrNull(id);
        user.setPassword(null);
        model.addAttribute("user",user);
        return "user/update";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/user/save")
    public String Save(@ModelAttribute User user){
        userService.saveUser(user);
        return "redirect:/user";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/delete/{id}")
    public String delete(@PathVariable Integer id){
        userService.deleteUser(id);
        return "redirect:/user";
    }

}
