package com.milajordi.nbachamps.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
public class TeamChampionshipPlayer {

    @EmbeddedId
    private TeamChampionshipPlayerId id;

    @ManyToOne
    @MapsId("team_id")
    @JoinColumn(name = "team_id")
    private Teams teams;

    @ManyToOne
    @MapsId("year")
    @JoinColumn(name = "year")
    private Championships championships;

    @ManyToOne
    @MapsId("player_id")
    @JoinColumn(name = "player_id")
    private Players players;

    private Integer jerseyNumber;

    private Integer gamesPlayed;
    private Double minutesPerGame;
    private Double pointsPerGame;
    private Double reboundsPerGame;
    private Double assistsPerGame;
    private Double stealsPerGame;
    private Double blocksPerGame;
    private Integer percentageFieldGoals;
    private Integer percentageThreePoints;



    public TeamChampionshipPlayer() {
    }

    public TeamChampionshipPlayer(TeamChampionshipPlayerId id, Teams teams, Championships championships, Players players, Integer jerseyNumber,Integer gamesPlayed,Double minutesPerGame,Double pointsPerGame,Double reboundsPerGame,Double assistsPerGame,Double stealsPerGame,Double blocksPerGame,Integer percentageFieldGoals,Integer percentageThreePoints ) {
        this.id = id;
        this.teams = teams;
        this.championships = championships;
        this.players = players;
        this.jerseyNumber = jerseyNumber;
        this.gamesPlayed = gamesPlayed;
        this.minutesPerGame = minutesPerGame;
        this.pointsPerGame = pointsPerGame;
        this.reboundsPerGame = reboundsPerGame;
        this.assistsPerGame = assistsPerGame;
        this.stealsPerGame = stealsPerGame;
        this.blocksPerGame = blocksPerGame;
        this.percentageFieldGoals = percentageFieldGoals;
        this.percentageThreePoints = percentageThreePoints;

    }

    public TeamChampionshipPlayerId getId() {
        return id;
    }

    public void setId(TeamChampionshipPlayerId id) {
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

    public Players getPlayers() {
        return players;
    }

    public void setPlayers(Players players) {
        this.players = players;
    }

    public Integer getJerseyNumber() {
        return jerseyNumber;
    }

    public void setJerseyNumber(Integer jerseyNumber) {
        this.jerseyNumber = jerseyNumber;
    }

    public Integer getGamesPlayed() {
        return gamesPlayed;
    }

    public void setGamesPlayed(Integer gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public Double getMinutesPerGame() {
        return minutesPerGame;
    }

    public void setMinutesPerGame(Double minutesPerGame) {
        this.minutesPerGame = minutesPerGame;
    }

    public Double getPointsPerGame() {
        return pointsPerGame;
    }

    public void setPointsPerGame(Double pointsPerGame) {
        this.pointsPerGame = pointsPerGame;
    }

    public Double getReboundsPerGame() {
        return reboundsPerGame;
    }

    public void setReboundsPerGame(Double reboundsPerGame) {
        this.reboundsPerGame = reboundsPerGame;
    }

    public Double getAssistsPerGame() {
        return assistsPerGame;
    }

    public void setAssistsPerGame(Double assistsPerGame) {
        this.assistsPerGame = assistsPerGame;
    }

    public Double getStealsPerGame() {
        return stealsPerGame;
    }

    public void setStealsPerGame(Double stealsPerGame) {
        this.stealsPerGame = stealsPerGame;
    }

    public Double getBlocksPerGame() {
        return blocksPerGame;
    }

    public void setBlocksPerGame(Double blocksPerGame) {
        this.blocksPerGame = blocksPerGame;
    }

    public Integer getPercentageFieldGoals() {
        return percentageFieldGoals;
    }

    public void setPercentageFieldGoals(Integer percentageFieldGoals) {
        this.percentageFieldGoals = percentageFieldGoals;
    }

    public Integer getPercentageThreePoints() {
        return percentageThreePoints;
    }

    public void setPercentageThreePoints(Integer percentageThreePoints) {
        this.percentageThreePoints = percentageThreePoints;
    }



    @Embeddable
    public static class TeamChampionshipPlayerId implements Serializable{
        private Integer team_id;
        private Integer year;
        private Integer player_id;

        public TeamChampionshipPlayerId() {
        }

        public TeamChampionshipPlayerId(Integer team_id, Integer year, Integer player_id) {
            this.team_id = team_id;
            this.year = year;
            this.player_id = player_id;
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

        public Integer getPlayer_id() {
            return player_id;
        }

        public void setPlayer_id(Integer player_id) {
            this.player_id = player_id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TeamChampionshipPlayerId that = (TeamChampionshipPlayerId) o;
            return Objects.equals(team_id, that.team_id) && Objects.equals(year, that.year) && Objects.equals(player_id, that.player_id);
        }

        @Override
        public int hashCode() {
            return Objects.hash(team_id, year, player_id);
        }
    }


}
