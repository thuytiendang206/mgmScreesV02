package com.mgmtp.screens.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.mgmtp.screens.model.AppParameter;
import com.mgmtp.screens.model.ScreensApp;
import com.mgmtp.screens.model.ScreensPlay;

public class Utility {

	public static String convertScreensPlayToJSON(ScreensPlay screensPlay) {
		JSONObject output = new JSONObject();
		JSONArray screensApps = new JSONArray();
		try {
			for (ScreensApp item : screensPlay.getScreensApps()) {
				screensApps.put(convertScreensAppToJSON(item));
			}
			output.put("name", screensPlay.getName());
			output.put("display-time", screensPlay.getDisplayTime());
			output.put("animation-type", screensPlay.getAnimationType());
			output.put("screens-apps", screensApps);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return output.toString();
	}

	private static String convertScreensAppToJSON(ScreensApp screensApp) {
		JSONObject output = new JSONObject();
		JSONObject params = new JSONObject();
		try {
			output.put("type", screensApp.getType());
			for (AppParameter item : screensApp.getParameters()) {
				params.put(item.getKey(), item.getValue());
			}
			output.put("params", params);
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return output.toString();
	}

}
