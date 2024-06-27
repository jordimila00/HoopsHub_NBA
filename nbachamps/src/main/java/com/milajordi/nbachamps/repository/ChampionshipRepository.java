package com.milajordi.nbachamps.repository;

import com.milajordi.nbachamps.model.Championships;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionshipRepository extends JpaRepository<Championships,Integer> {
}
