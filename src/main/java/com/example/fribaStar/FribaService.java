package com.example.fribaStar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FribaService {

	@Autowired
	private FribaDAO dao;
	
	public String getResult(String input) {
		return dao.getResult(input);
	}

	
	
}
