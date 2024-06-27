package com.milajordi.nbachamps.controller;


import com.milajordi.nbachamps.model.Players;
import com.milajordi.nbachamps.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/player")
@CrossOrigin
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @PostMapping("/add")
    public ResponseEntity<?> addPlayer(@RequestBody Players players) {
        try {
            Players createdPlayer = playerService.addPlayer(players);
            return ResponseEntity.ok(createdPlayer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public List<Players> getAllPlayers(){
        return playerService.getAllPlayers();
    }

    @GetMapping("/getByDraftPick/{draftPick}")
    public List<Players> getAllPlayersByDraftPick(@PathVariable Integer draftPick) {
        return playerService.getPlayersByDraftPick(draftPick);
    }

    @GetMapping("/getByDraftYear/{draftYear}")
    public List<Players> getAllPlayersByDraftYear(@PathVariable Integer draftYear) {
        return playerService.getPlayersByDraftYear(draftYear);
    }

    @GetMapping("/getById/{player_id}")
    public Optional<Players> getPlayersById(@PathVariable Integer player_id) {
        return playerService.getPlayersById(player_id);
    }
}
