package com.mgmtp.screens.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "app_parameter")
public class AppParameter implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private int id;

	@Column(name = "key", nullable = false)
	private String key;

	@Column(name = "value", nullable = false)
	private String value;

	@ManyToOne
	@JoinColumn(name = "screensapp_id", nullable = false)
	private ScreensApp screensApp;

	public AppParameter() {
	}

	public AppParameter(String key, String value, ScreensApp screensApp) {
		this.key = key;
		this.value = value;
		this.screensApp = screensApp;
	}

	public int getId() {
		return id;
	}

	public String getKey() {
		return key;
	}

	public String getValue() {
		return value;
	}

	public ScreensApp getScreensApp() {
		return screensApp;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public void setScreensApp(ScreensApp screensApp) {
		this.screensApp = screensApp;
	}

}
