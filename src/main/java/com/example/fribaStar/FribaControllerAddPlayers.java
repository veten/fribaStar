package com.example.fribaStar;

import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FribaControllerAddPlayers {

	@GetMapping("/addPlayers")
	public String addPlayersForm(Model model)
	{
		model.addAttribute("player", new Player());
		return "addPlayers";
	}
	
	//@RequestMapping(path = "/addPlayers", produces = "application/json", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping(path = "/addPlayers", method = RequestMethod.POST)
	public @ResponseBody String addPlayersSubmit(@RequestBody Map<String, Object> player) throws Exception
	{	
		System.out.println(player);
		return "{\"Lisays\":\"toimii\"}" ;
	}
	
}
