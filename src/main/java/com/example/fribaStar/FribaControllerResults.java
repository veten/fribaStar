package com.example.fribaStar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FribaControllerResults {
		
	@GetMapping("/{url:results$}")
	public String results() {
		return "results";
	}

}
