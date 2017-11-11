package com.example.fribaStar;

import java.util.Iterator;
import java.util.Vector;

import org.springframework.stereotype.Repository;

@Repository
public class FribaDAO {

	Vector<Player> players = new Vector<Player>(0,4);
	
	
	public void addHoles() throws Exception
	{		
		Player player = null;
				
		for(Iterator<Player> players = this.players.iterator(); players.hasNext();)
		{
			player = players.next();			
			player.addHole(0);
		}
	}
	
	public void addPlayer(Player newPlayer) throws Exception
	{
		newPlayer.setTotal(0);
		newPlayer.addHole(0);
		players.add(newPlayer);
	}
	
	public Vector<Player> getPlayers()
	{
			return players;
	}
	
	public String getResult() {
		return "Service works!!!";
	}
	
	public void resetPlayers()
	{
		players = new Vector<Player>(0,4);
	}
	
	public void resetScores() throws Exception
	{
		Player player = null;
		
		for(Iterator<Player> players = this.players.iterator(); players.hasNext();) 
		{
			player = players.next();			
			player.setHoles(new Vector<Integer>(0,1));
			player.addHole(0);			
			player.setTotal(0);
		}
	}
	
	public void setHoles(Vector<Player> players)
	{
		Iterator<Player> newPlayers = null;
		Iterator<Player> oldPlayers = this.players.iterator();
		Player newPlayer, oldPlayer = null;
				
		for(newPlayers = players.iterator(); newPlayers.hasNext();)
		{
			newPlayer = newPlayers.next();
			oldPlayer = oldPlayers.next();
			oldPlayer.setHoles(newPlayer.getHoles());
		}				
	}
	
	public void setTotal(Vector<Player> players)
	{
		Iterator<Player> newPlayers = null;
		Iterator<Player> oldPlayers = this.players.iterator();
		Player newPlayer, oldPlayer = null;
				
		for(newPlayers = players.iterator(); newPlayers.hasNext();)
		{
			newPlayer = newPlayers.next();
			oldPlayer = oldPlayers.next();
			oldPlayer.setTotal(newPlayer.getTotal());
		}				
	}	
	
}
