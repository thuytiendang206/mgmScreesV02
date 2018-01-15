package com.mgmtp.screens.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class UserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Integer id;

    private final String email;

    private final String password;

    public UserDTO(@JsonProperty("id") Integer id, @JsonProperty("email") String email,
                   @JsonProperty("password") String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public Integer getId() { return id; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

}
