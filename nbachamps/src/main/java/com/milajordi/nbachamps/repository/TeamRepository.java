package com.milajordi.nbachamps.repository;

import com.milajordi.nbachamps.model.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Teams,Integer> {
}
