package com.freshland.freshland.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/user")
    public String Index(){
        return "user/user";
    }

    @GetMapping("/user/update")
    public String Update() {
        return "user/update";
    }

}
