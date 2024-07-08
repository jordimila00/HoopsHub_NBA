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

    @Enumerated(EnumType.STRING) // Especifica que el atributo es de tipo Enum y se almacenará como String
    @Column(length = 20) // Define la longitud máxima para el campo en la base de datos
    private Division division;

    @Enumerated(EnumType.STRING) // Especifica que el atributo es de tipo Enum y se almacenará como String
    @Column(length = 20) // Define la longitud máxima para el campo en la base de datos
    private Conference conference;

    private Integer seats;

    private Integer arenaYear;

    private Integer establishmentYear;

    private String code;

    private String color;

    public Teams() {
    }

    public Teams(Integer team_id, String city, String name, String arena,Division division,Conference conference,Integer seats,Integer arenaYear,Integer establishmentYear, String code,String color) {
        this.team_id = team_id;
        this.city = city;
        this.name = name;
        this.arena = arena;
        this.division = division;
        this.conference = conference;
        this.seats = seats;
        this.arenaYear=arenaYear;
        this.establishmentYear=establishmentYear;
        this.code = code;
        this.color = color;
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

    public Division getDivision() {
        return division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public Conference getConference() {
        return conference;
    }

    public void setConference(Conference conference) {
        this.conference = conference;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public Integer getArenaYear() {
        return arenaYear;
    }

    public void setArenaYear(Integer arenaYear) {
        this.arenaYear = arenaYear;
    }

    public Integer getEstablishmentYear() {
        return establishmentYear;
    }

    public void setEstablishmentYear(Integer establishmentYear) {
        this.establishmentYear = establishmentYear;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}