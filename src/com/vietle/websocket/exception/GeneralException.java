package com.vietle.websocket.exception;

public class GeneralException extends Exception {
	private static final long serialVersionUID = 7505892807223404942L;

	public GeneralException(String msg, Throwable t) {
		super(msg);
	}
}
