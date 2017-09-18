package com.example.fribaStar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FribaController {

	@Autowired
	private FribaService service;
	
	@CrossOrigin
	@RequestMapping(value = "/test", consumes = "application/json")
	public String testRest(@RequestBody String input) {
		return service.getResult(input);
	}
	
}
