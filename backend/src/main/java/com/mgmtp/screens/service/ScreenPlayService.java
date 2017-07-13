package com.mgmtp.screens.service;

import java.util.List;

import com.mgmtp.screens.model.ScreenPlayDTO;

public interface ScreenPlayService {

	boolean isExist(Integer id);

	ScreenPlayDTO findByName(String name, boolean isAdmin);

	void deleteById(Integer id);

	List<ScreenPlayDTO> findAll(boolean isAdmin);

	void addNewScreenPlay(ScreenPlayDTO screenPlayDTO);

	void updateScreenPlay(int id, ScreenPlayDTO screenPlayDTO);

}
