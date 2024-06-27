package com.milajordi.nbachamps.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Players {

    @Id
    private Integer player_id;

    private String name;
    private String jerseyName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    private String birthCity;
    private String birthState;
    private String birthCountry;

    private Integer draftYear;
    private Integer draftPick;

    public Players() {
    }

    public Players(Integer player_id, String name, String jerseyName, LocalDate birthDate, String birthCity, String birthState, String birthCountry,Integer draftYear,Integer draftPick) {
        this.player_id = player_id;
        this.name = name;
        this.jerseyName = jerseyName;
        this.birthDate = birthDate;
        this.birthCity = birthCity;
        this.birthState = birthState;
        this.birthCountry = birthCountry;
        this.draftYear = draftYear;
        this.draftPick = draftPick;
    }



    public Integer getPlayer_id() {
        return player_id;
    }

    public void setPlayer_id(Integer player_id) {
        this.player_id = player_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJerseyName() {
        return jerseyName;
    }

    public void setJerseyName(String jerseyName) {
        this.jerseyName = jerseyName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getBirthCity() {
        return birthCity;
    }

    public void setBirthCity(String birthCity) {
        this.birthCity = birthCity;
    }

    public String getBirthState() {
        return birthState;
    }

    public void setBirthState(String birthState) {
        this.birthState = birthState;
    }

    public String getBirthCountry() {
        return birthCountry;
    }

    public void setBirthCountry(String birthCountry) {
        this.birthCountry = birthCountry;
    }

    public Integer getDraftYear() {
        return draftYear;
    }

    public void setDraftYear(Integer draftYear) {
        this.draftYear = draftYear;
    }

    public Integer getDraftPick() {
        return draftPick;
    }

    public void setDraftPick(Integer draftPick) {
        this.draftPick = draftPick;
    }
}
