package com.mgmtp.screens.service;

import com.mgmtp.screens.entity.UserEntity;
import com.mgmtp.screens.model.UserDTO;
import com.mgmtp.screens.repository.UserDAO;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;

import static com.mgmtp.screens.constant.SecurityConstants.*;

@Service()
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public boolean isExist(String email) {
        return (userDAO.getUserEntityByEmail(email) != null);
    }

    @Override
    public boolean isAdmin(String email){
        try {
            return userDAO.getUserEntityByEmail(email).isAdmin();
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public UserEntity getUserEntity (String email){ return userDAO.getUserEntityByEmail(email); }

    @Override
    public String getAccessToken(UserDTO userDto, Date expireAt ) {
        try {
            UserEntity user = userDAO.getUserEntityByEmailAndPassword(userDto.getEmail(), userDto.getPassword());
            if(user != null) {
                return Jwts.builder()
                        .setSubject(user.getEmail())
                        .setExpiration(expireAt)
                        .signWith(SignatureAlgorithm.HS256, SECRET.getBytes())
                        .compact();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    @Override
    public boolean addUser(UserDTO userDTO){
        try{
            UserEntity userEntity = new UserEntity(userDTO.getEmail(), userDTO.getPassword());
            userDAO.save(userEntity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
