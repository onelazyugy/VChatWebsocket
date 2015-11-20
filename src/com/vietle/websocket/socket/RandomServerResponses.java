package com.vietle.websocket.socket;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomServerResponses {
	private List<String> responseList;
	
	public RandomServerResponses() {
		if(responseList == null){
			responseList = new ArrayList<String>();
			this.responseList.add(Common.RESPONSE_ONE);
			this.responseList.add(Common.RESPONSE_TWO);
			this.responseList.add(Common.RESPONSE_THREE);
			this.responseList.add(Common.RESPONSE_FOUR);
		}
	}

	public String getRandomResponse(){
		Random rand = new Random();
		int randomIndex = rand.nextInt(this.responseList.size());
		return this.responseList.get(randomIndex);
	}
	
	public List<String> getResponseList() {
		return responseList;
	}

	public void setResponseList(List<String> responseList) {
		this.responseList = responseList;
	}

}
