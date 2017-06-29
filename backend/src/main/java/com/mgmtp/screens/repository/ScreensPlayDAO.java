package com.mgmtp.screens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mgmtp.screens.model.ScreensPlay;

public interface ScreensPlayDAO extends JpaRepository<ScreensPlay, Integer> {

	@Query("SELECT s FROM ScreensPlay s WHERE s.name = :name")
	ScreensPlay getScreensPlayByName(@Param("name") String name);

}
