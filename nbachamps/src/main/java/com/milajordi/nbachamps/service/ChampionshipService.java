package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Championships;

import java.util.List;

public interface ChampionshipService {

    Championships addChampionship(Championships championships);

    List<Championships> getAllChampionships();
}
