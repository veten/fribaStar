package com.example.fribaStar;

import org.springframework.stereotype.Component;

@Component
public class FribaDAO {

	public String getResult(String input) {
		return "Service works. Got input: " + input;
	}

}
