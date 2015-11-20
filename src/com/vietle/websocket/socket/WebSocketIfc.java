package com.vietle.websocket.socket;

import javax.websocket.Session;

/**
 * A general websocket inteface for all other websockets to implement.
 * @author dev
 *
 */
public interface WebSocketIfc {
		
	public void onClose(Session session);
	
	public void onOpen(Session session);
	
	public void onMessage(String data, Session session);
	
	public void onError(Throwable t);
	
	public void onError(Throwable t, Session session);
}
