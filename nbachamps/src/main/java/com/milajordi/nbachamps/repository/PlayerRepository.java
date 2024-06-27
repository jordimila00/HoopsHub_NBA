package com.milajordi.nbachamps.repository;

import com.milajordi.nbachamps.model.Players;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Players,Integer> {

    Players findByDraftYearAndDraftPick(Integer draftYear, Integer draftPick);

    List<Players> getPlayersByDraftPick(Integer draftPick);

    List<Players> getPlayersByDraftYear(Integer draftYear);

    Optional<Players> findById(Integer player_id);
}
