package com.milajordi.nbachamps.repository;

import com.milajordi.nbachamps.model.Conference;
import com.milajordi.nbachamps.model.Division;
import com.milajordi.nbachamps.model.Players;
import com.milajordi.nbachamps.model.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Teams,Integer> {

    @Query("SELECT COUNT(t) FROM Teams t WHERE t.conference = :conference")
    long countByConference(Conference conference);

    @Query("SELECT COUNT(t) FROM Teams t WHERE t.division = :division")
    long countByDivision(Division division);

    List<Teams> getTeamsByDivision(Division division);

    List<Teams> getTeamsByConference(Conference conference);

    Optional<Teams> findById(Integer team_id);
}
