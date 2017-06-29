package com.mgmtp.screens.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mgmtp.screens.model.ScreensPlay;
import com.mgmtp.screens.repository.ScreensPlayDAO;
import com.mgmtp.screens.util.Utility;

@RestController
public class ScreensPlayController {

	@Autowired
	private ScreensPlayDAO screensPlayDAO;

	@RequestMapping(value = "/screensplay", method = RequestMethod.GET)
	public ModelAndView getScreensplayView() {
		ModelAndView model = new ModelAndView("screensplay");
		model.addObject("screensplayList", screensPlayDAO.findAll());
		return model;
	}

	@RequestMapping(value = "/api/screensplay={name}", method = RequestMethod.GET)
	public String getScreensPlayJSON(@PathVariable String name) {
		ScreensPlay screensPlay = screensPlayDAO.getScreensPlayByName(name);
		String output = Utility.convertScreensPlayToJSON(screensPlay);
		return output;
	}

}
