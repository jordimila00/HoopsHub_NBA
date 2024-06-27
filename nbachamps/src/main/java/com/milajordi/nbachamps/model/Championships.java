package com.milajordi.nbachamps.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Championships {

    @Id
    private Integer year;

    public Championships() {
    }

    public Championships(Integer year) {
        this.year = year;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
