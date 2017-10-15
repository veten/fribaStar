package com.example.fribaStar;

import java.util.Vector;

import org.springframework.stereotype.Repository;

@Repository
public class FribaDAO {

	Vector<Player> players = new Vector<Player>(4,4);
	
	public String getResult() {
		return "Service works!!!";
	}

	public void addPlayer(Player newPlayer) throws Exception
	{
		players.add(newPlayer);
	}
	
}
