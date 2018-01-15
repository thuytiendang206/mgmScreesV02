package com.mgmtp.screens.service;

import com.mgmtp.screens.model.UserDTO;
import com.mgmtp.screens.entity.UserEntity;
import java.util.Date;

public interface UserService {

    boolean isExist(String email);

    boolean isAdmin(String email);

    UserEntity getUserEntity (String email);

    String getAccessToken (UserDTO user, Date expireAt);

    boolean addUser(UserDTO userDTO);

}
