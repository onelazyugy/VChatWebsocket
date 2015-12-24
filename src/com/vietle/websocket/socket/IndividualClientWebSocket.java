package com.vietle.websocket.socket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/individual")
public class IndividualClientWebSocket implements WebSocketIfc {
	private final static Map<String, IndividualClientWebSocket> clientMap = new HashMap<>();
	private Session session;
	
	@OnOpen
	@Override
	public void onOpen(Session session) {
		this.session = session;		
		String clientUUID = "1234";
		IndividualClientWebSocket.clientMap.put(clientUUID, this);
	}

	@OnMessage
	@Override
	public void onMessage(String data, Session session) {
		String clientUUID = "1234";
		if(!IndividualClientWebSocket.clientMap.containsKey(clientUUID)){
			try {
				this.session.getBasicRemote().sendText("client not found");
			} catch (IOException e) {
				e.printStackTrace();
			}
			return;
		}
		try {
			this.session.getBasicRemote().sendText("Hi " + clientUUID);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@OnClose
	@Override
	public void onClose(Session session) {
		String clientUUID = "12345";
		if(IndividualClientWebSocket.clientMap.containsKey(clientUUID)){
			IndividualClientWebSocket.clientMap.remove(clientUUID);
		}
	}

	@Override
	public void onError(Throwable t) {}

	@OnError
	@Override
	public void onError(Throwable t, Session session) {
		try {
			this.session.getBasicRemote().sendText("error");
			this.session.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
