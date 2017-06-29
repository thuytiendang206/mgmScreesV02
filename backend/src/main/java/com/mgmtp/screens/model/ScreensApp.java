package com.mgmtp.screens.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "screens_app")
public class ScreensApp implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private int id;

	@Column(name = "type", nullable = false)
	private String type;

	@ManyToOne
	@JoinColumn(name = "screensplay_id", nullable = false)
	private ScreensPlay screensPlay;

	@OneToMany(mappedBy = "screensApp", cascade = CascadeType.ALL)
	private List<AppParameter> parameters;

	public ScreensApp() {
	}

	public ScreensApp(String type, ScreensPlay screensPlay) {
		this.type = type;
		this.screensPlay = screensPlay;
	}

	public int getId() {
		return id;
	}

	public String getType() {
		return type;
	}

	public ScreensPlay getScreensPlay() {
		return screensPlay;
	}

	public List<AppParameter> getParameters() {
		return parameters;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setScreensPlay(ScreensPlay screensPlay) {
		this.screensPlay = screensPlay;
	}

	public void setParameters(List<AppParameter> parameters) {
		this.parameters = parameters;
	}

}
