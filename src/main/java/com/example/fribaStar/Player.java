package com.example.fribaStar;

import java.util.Vector;

public class Player {

	private Vector<Hole> holes = new Vector<Hole>(0,1);
	private String name;
	private int total;
	private int totalPar;
	
	public int getTotalPar() {
		return totalPar;
	}

	public void setTotalPar(int totalPar) {
		this.totalPar = totalPar;
	}

	public void addHole(int score) throws Exception
	{
		this.holes.addElement(new Hole());
	}
	
	public Vector<Hole> getHoles() {
//		return hole.get(index);
		return this.holes;
	}
	
	public void setHole(int hole, Hole score)
	{
		this.holes.set(hole, score);
	}
	
	public void setHoles(Vector<Hole> holes) {
		
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
