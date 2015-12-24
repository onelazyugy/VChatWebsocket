package com.vietle.websocket.socket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * Store a UUID from each client on every request, then each subsequence request, we check the UUID, 
 * if that UUID exist we send a message back to that client only
 * http://stackoverflow.com/questions/17080216/how-to-send-message-to-particular-websocket-connection-using-java-server
 * @author vle
 *
 */
@ServerEndpoint("/individual")
public class IndividualClientWebSocket implements WebSocketIfc {
	private final static Map<String, IndividualClientWebSocket> clientMap = new HashMap<>();
	private Session session;
	
	@OnOpen
	@Override
	public void onOpen(Session session) {
		this.session = session;
	}

	@OnMessage
	@Override
	public void onMessage(String data, Session session) {
		String[] msgArr = parseClientMsg(data);
		IndividualClientWebSocket.clientMap.put(msgArr[0], this);
		if(!IndividualClientWebSocket.clientMap.containsKey(msgArr[0])){
			try {
				this.session.getBasicRemote().sendText("client not found with uuid: " + msgArr[0]);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return;
		}
		try {
			this.session.getBasicRemote().sendText("client:  " + msgArr[0] + " sent: " + msgArr[1]);
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
	
	public String[] parseClientMsg(String msg){		
		msg = msg.replace("{\"", "").replace("}", "").replace("\"", "").replace(",msg", "").replace("uuid:", "");
		System.out.println("msg without double quote: " + msg);
		StringTokenizer token = new StringTokenizer(msg, ":");
		String[] uuidToMsgArr = new String[2];
		int i = 0;
		while(token.hasMoreTokens()){
			String t = token.nextToken();
			System.out.println(t);
			uuidToMsgArr[i] = t;
			i++;
		}
		return uuidToMsgArr;
	}
}
