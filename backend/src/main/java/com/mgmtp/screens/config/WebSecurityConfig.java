package com.mgmtp.screens.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.mgmtp.screens.constant.VMLocation;

@Configuration
public class WebSecurityConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins(VMLocation.LOCAL_URL, VMLocation.DEV_URL, VMLocation.PROD_URL)
						.allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE").allowCredentials(false)
						.maxAge(1728000);
			}
		};
	}

}
