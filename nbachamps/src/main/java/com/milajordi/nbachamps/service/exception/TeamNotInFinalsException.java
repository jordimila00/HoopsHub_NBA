package com.milajordi.nbachamps.service.exception;

public class TeamNotInFinalsException extends RuntimeException {

    public TeamNotInFinalsException(String message) {
        super(message);
    }

    public TeamNotInFinalsException(String message, Throwable cause) {
        super(message, cause);
    }
}
