package com.vietle.websocket.socket;
import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * A websocket to enable client and server communication.
 * Only handle one client at a time 
 * Ex: UI send a request, and this server return a response.
 * @author dev
 *
 */

@ServerEndpoint("/websocket")
public class VietLeSocket implements WebSocketIfc{
	private static Session session = null;
	
	public VietLeSocket() {} 
	
	/**
	 * When the socket is open.
	 * We create a session per the client and if session already open, we send a message back to client notify client that a session has already been established.
	 */
	@OnOpen
	@Override
	public void onOpen(Session session) {
		System.out.println("------Socket is open-------");
		if(VietLeSocket.session == null){
			setSession(session);
		} else {
			sessionNotAvailable(session);
		}
	}

	/**
	 * Do something when server get a message from client.
	 */
	@OnMessage
	@Override
	public void onMessage(String data, Session session) {
		System.out.println("------Server received a message from client-------");
		System.out.println("***Message from client is: " + data);
		String res = new RandomServerResponses().getRandomResponse();
		System.out.println("***Server sending back: " + res);
		sendMessage(res);
	}
	
	/**
	 * When the socket is close from communication.
	 */
	@OnClose
	@Override
	public void onClose(Session session) {
		System.out.println("------Socket is closed-------");
		setSession(null);
		if(VietLeSocket.getSession() != null){
			try {
				VietLeSocket.getSession().close();
			} catch (IOException e) {
				System.out.println("Error while closing socket:\n" + e.getMessage());
			}
		}
	}
	
	/**
	 * Send a message back to the client.
	 * @param message
	 */
	public static void sendMessage(String message){
		try {
			String messageToClient = message + " | id: " + getSession().getId();
			getSession().getBasicRemote().sendText(messageToClient);
		} catch (IOException e) {
			System.out.println("Error when sending message to client:\n" + e.getMessage());
		}
	}
	
	/**
	 * Do something when there is an error while socket is open for communication.
	 * We send a message to client and close the socket.
	 */
	@OnError
	@Override
	public void onError(Throwable t, Session session) {
		try {
			System.out.println("------Error in VietLeSocket-------");
			String errorMsg = "Error:\n" + t.getMessage();
			sendMessage(errorMsg);
			getSession().close();
		} catch (IOException e) {
			System.out.println("Error while closing socket:\n" + e.getMessage());
		}
	}

	@Override
	public void onError(Throwable t) {}
	
	/**
	 * A session already established.
	 * @param session
	 */
	public void sessionNotAvailable(Session session) {
		try {
			session.getBasicRemote().sendText("A connection is already established. " + "The current connection must be released before a new connection can be made");
		} catch (IOException e) {
			System.out.println("Error sending text:\n" + e.getMessage());
		}
	}
	
	public static Session getSession() {
		return session;
	}

	public static void setSession(Session session) {
		VietLeSocket.session = session;
	}
}
