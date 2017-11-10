package com.example.fribaStar;

import java.util.Vector;

public class Player {

	private Vector<Integer> holes = new Vector<Integer>(0,1);
	private String name;
	private int total;
	
	public void addHole(int score) throws Exception
	{
		this.holes.addElement(new Integer(0));
	}
	
	public Vector<Integer> getHoles() {
//		return hole.get(index);
		return this.holes;
	}
	
	public void setHole(int hole, int score)
	{
		this.holes.set(hole, score);
	}
	
	public void setHoles(Vector<Integer> holes) {
		
		this.holes = holes;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	
}
