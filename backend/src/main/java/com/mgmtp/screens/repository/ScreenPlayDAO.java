package com.mgmtp.screens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.mgmtp.screens.entity.ScreenPlayEntity;

public interface ScreenPlayDAO extends JpaRepository<ScreenPlayEntity, Integer> {

	ScreenPlayEntity getScreenPlayEntityByName(@Param("name") String name);

}
