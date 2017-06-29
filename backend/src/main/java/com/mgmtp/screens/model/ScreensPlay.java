package com.mgmtp.screens.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "screens_play")
public class ScreensPlay implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private int id;

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@Column(name = "display_time", nullable = false)
	private int displayTime;

	@Column(name = "animation_type", nullable = false)
	private String animationType;

	@OneToMany(mappedBy = "screensPlay", cascade = CascadeType.ALL)
	private List<ScreensApp> screensApps;

	public ScreensPlay() {
	}

	public ScreensPlay(String name, int displayTime, String animationType) {
		this.name = name;
		this.displayTime = displayTime;
		this.animationType = animationType;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getDisplayTime() {
		return displayTime;
	}

	public String getAnimationType() {
		return animationType;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDisplayTime(int displayTime) {
		this.displayTime = displayTime;
	}

	public void setAnimationType(String animationType) {
		this.animationType = animationType;
	}

	public List<ScreensApp> getScreensApps() {
		return screensApps;
	}

	public void setScreensApps(List<ScreensApp> screensApps) {
		this.screensApps = screensApps;
	}

}
