package com.mgmtp.screens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mgmtp.screens.model.ScreensApp;

public interface ScreensAppDAO extends JpaRepository<ScreensApp, Integer> {

	@Query("SELECT s FROM ScreensApp s WHERE s.screensPlay.id = :id")
	List<ScreensApp> getByScreensplayId(@Param("id") int id);

}
