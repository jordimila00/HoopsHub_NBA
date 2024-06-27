package com.milajordi.nbachamps.controller;

import com.milajordi.nbachamps.model.Championships;
import com.milajordi.nbachamps.model.Teams;
import com.milajordi.nbachamps.service.ChampionshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/championship")
@CrossOrigin
public class ChampionshipController {

    @Autowired
    private ChampionshipService championshipService;

    @PostMapping("/add")
    public ResponseEntity<Championships> addChampionship(@RequestBody Championships championships){
        Championships createdChampionship = championshipService.addChampionship(championships);
        return ResponseEntity.ok(createdChampionship);
    }

    @GetMapping("/getAll")
    public List<Championships> getAllChampionships(){
        return championshipService.getAllChampionships();
    }
}
