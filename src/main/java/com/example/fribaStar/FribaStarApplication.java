package com.example.fribaStar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class FribaStarApplication extends SpringBootServletInitializer {
		
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(FribaStarApplication.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(FribaStarApplication.class, args);
	}
}
