package com.milajordi.nbachamps.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
public class TeamChampionship {

    @EmbeddedId
    private TeamChampionshipId id;

    @ManyToOne
    @MapsId("team_id")
    @JoinColumn(name = "team_id")
    private Teams teams;

    @ManyToOne
    @MapsId("year")
    @JoinColumn(name = "year")
    private Championships championships;

    private String coach;
    private boolean isChampion;

    private Integer games;

    public TeamChampionship() {
    }

    public TeamChampionship(TeamChampionshipId id, Teams teams, Championships championships, String coach, boolean isChampion, Integer games) {
        this.id = id;
        this.teams = teams;
        this.championships = championships;
        this.coach = coach;
        this.isChampion = isChampion;
        this.games = games;
    }

    public TeamChampionshipId getId() {
        return id;
    }

    public void setId(TeamChampionshipId id) {
        this.id = id;
    }

    public Teams getTeams() {
        return teams;
    }

    public void setTeams(Teams teams) {
        this.teams = teams;
    }

    public Championships getChampionships() {
        return championships;
    }

    public void setChampionships(Championships championships) {
        this.championships = championships;
    }

    public String getCoach() {
        return coach;
    }

    public void setCoach(String coach) {
        this.coach = coach;
    }

    public boolean getIsChampion() {
        return isChampion;
    }

    public void setIsChampion(boolean isChampion) {
        this.isChampion = isChampion;
    }

    public Integer getGames() {
        return games;
    }

    public void setGames(Integer games) {
        this.games = games;
    }

    @Embeddable
    public static class TeamChampionshipId implements Serializable{
        private Integer team_id;

        private Integer year;

        public TeamChampionshipId() {
        }

        public TeamChampionshipId(Integer team_id, Integer year) {
            this.team_id = team_id;
            this.year = year;
        }

        public Integer getTeam_id() {
            return team_id;
        }

        public void setTeam_id(Integer team_id) {
            this.team_id = team_id;
        }

        public Integer getYear() {
            return year;
        }

        public void setYear(Integer year) {
            this.year = year;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TeamChampionshipId that = (TeamChampionshipId) o;
            return Objects.equals(team_id, that.team_id) && Objects.equals(year, that.year);
        }

        @Override
        public int hashCode() {
            return Objects.hash(team_id, year);
        }
    }
}
