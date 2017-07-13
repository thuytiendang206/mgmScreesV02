package com.mgmtp.screens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mgmtp.screens.constant.ResponseStatus;
import com.mgmtp.screens.model.ScreenPlayDTO;
import com.mgmtp.screens.service.ScreenPlayService;

@RestController
@RequestMapping("/admin/api/screenplay")
public class AdminController {

	@Autowired
	private ScreenPlayService screenPlayService;

	@RequestMapping()
	public ResponseEntity<List<ScreenPlayDTO>> getAll() {
		List<ScreenPlayDTO> screenPlays = screenPlayService.findAll(true);
		if (screenPlays == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(screenPlays);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<String> addScreensPlay(@RequestBody ScreenPlayDTO request) {
		screenPlayService.addNewScreenPlay(request);
		return ResponseEntity.ok(ResponseStatus.SUCCESS);
	}

	@RequestMapping(value = "/{name}")
	public ResponseEntity<ScreenPlayDTO> getScreensPlay(@PathVariable String name) {
		ScreenPlayDTO screenPlay = screenPlayService.findByName(name, true);
		if (screenPlay == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(screenPlay);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<String> updateScreensPlay(@RequestBody ScreenPlayDTO request, @PathVariable int id) {
		if (!screenPlayService.isExist(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseStatus.ERROR);
		}
		screenPlayService.updateScreenPlay(id, request);
		return ResponseEntity.ok(ResponseStatus.SUCCESS);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteScreensPlay(@PathVariable int id) {
		if (!screenPlayService.isExist(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseStatus.ERROR);
		}
		screenPlayService.deleteById(id);
		return ResponseEntity.ok(ResponseStatus.SUCCESS);
	}

}
