import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
  players: Player[];
  constructor(private playerService:PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(playerlist => {
      this.players = playerlist;
    })
  }

}
