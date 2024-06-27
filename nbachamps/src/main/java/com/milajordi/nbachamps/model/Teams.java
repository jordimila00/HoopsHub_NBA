package com.milajordi.nbachamps.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;


@Entity
public class Teams {

    @Id
    private Integer team_id;

    private String city;
    private String name;
    private String arena;

    public Teams() {
    }

    public Teams(Integer team_id, String city, String name, String arena) {
        this.team_id = team_id;
        this.city = city;
        this.name = name;
        this.arena = arena;
    }

    public Integer getTeam_id() {
        return team_id;
    }

    public void setTeam_id(Integer team_id) {
        this.team_id = team_id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArena() {
        return arena;
    }

    public void setArena(String arena) {
        this.arena = arena;
    }
}