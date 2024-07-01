package com.milajordi.nbachamps.repository;

import com.milajordi.nbachamps.model.TeamChampionshipPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamChampionshipPlayerRepository extends JpaRepository<TeamChampionshipPlayer, TeamChampionshipPlayer.TeamChampionshipPlayerId> {
    @Query("SELECT COUNT(tcp) > 0 FROM TeamChampionshipPlayer tcp WHERE tcp.id.player_id = :player_id AND tcp.id.year = :year")
    boolean existsByPlayerIdAndYear(@Param("player_id") Integer player_id, @Param("year") Integer year);

    @Query("SELECT COUNT(tcp) > 0 FROM TeamChampionshipPlayer tcp WHERE tcp.id.team_id = :team_id AND tcp.id.year = :year AND tcp.jerseyNumber = :jerseyNumber")
    boolean existsByTeamIdYearAndJerseyNumber(@Param("team_id") Integer team_id, @Param("year") Integer year, @Param("jerseyNumber") Integer jerseyNumber);

    List<TeamChampionshipPlayer> findByIdYear(@Param("year") Integer year);
}

