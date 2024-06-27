package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Championships;
import com.milajordi.nbachamps.repository.ChampionshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChampionshipServiceImpl implements ChampionshipService{

    @Autowired
    private ChampionshipRepository championshipRepository;

    @Override
    public Championships addChampionship(Championships championships) {
        return championshipRepository.save(championships);
    }

    @Override
    public List<Championships> getAllChampionships() {
        return championshipRepository.findAll();
    }
}
