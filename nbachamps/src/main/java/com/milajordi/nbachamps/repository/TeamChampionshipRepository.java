package com.milajordi.nbachamps.repository;

import com.milajordi.nbachamps.model.TeamChampionship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamChampionshipRepository extends JpaRepository<TeamChampionship, TeamChampionship.TeamChampionshipId> {
    List<TeamChampionship> findByIdYear(Integer year);

    @Query("SELECT COUNT(tc) > 0 FROM TeamChampionship tc WHERE tc.id.team_id = :team_id AND tc.id.year = :year")
    boolean existsByTeamIdAndYear(@Param("team_id") Integer team_id, @Param("year") Integer year);

    @Query("SELECT COUNT(tc) FROM TeamChampionship tc WHERE tc.id.team_id = :team_id")
    long countByTeamId(@Param("team_id") Integer team_id);

    @Query("SELECT COUNT(tc) FROM TeamChampionship tc WHERE tc.id.team_id = :team_id AND tc.isChampion = true")
    long countChampionshipWinsByTeamId(@Param("team_id") Integer team_id);

    @Query("SELECT tc.id.year FROM TeamChampionship tc WHERE tc.id.team_id = :team_id AND tc.isChampion = true")
    List<Integer> findChampionshipYearsByTeamId(@Param("team_id") Integer team_id);

}
