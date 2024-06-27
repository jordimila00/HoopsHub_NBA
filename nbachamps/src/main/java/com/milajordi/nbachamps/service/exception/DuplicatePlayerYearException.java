package com.milajordi.nbachamps.service.exception;

public class DuplicatePlayerYearException extends RuntimeException {
    public DuplicatePlayerYearException(String message) {
        super(message);
    }
}