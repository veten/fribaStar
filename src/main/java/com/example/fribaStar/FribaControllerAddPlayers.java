package com.example.fribaStar;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class FribaControllerAddPlayers {

	@GetMapping("/addPlayers")
	public String addPlayersForm(Model model)
	{
		model.addAttribute("player", new Player());
		return "addPlayers";
	}
	
//	@PostMapping("/addPlayers")
//	public String addPlayersSubmit(@ModelAttribute Player player)
//	{
//		System.out.println(player.toString());
//		return "addPlayers";
//	}
	
}
