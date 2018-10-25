import { Component, OnInit, ViewChild } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Timestamp } from '@firebase/firestore-types';
import { Series } from 'src/app/models/Series';
import { Team } from 'src/app/models/Team'
import { TeamPlayer } from 'src/app/models/TeamPlayer';
import { Player } from 'src/app/models/Player'
import { Map } from 'src/app/models/Map'

import { PlayerService } from 'src/app/services/player.service';
import { NgOption } from '@ng-select/ng-select';


@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styleUrls: ['./add-series.component.css']
})
export class AddSeriesComponent implements OnInit {

  loggedInUser: string;
  todaysDate: Date;

  series: Series = {
    id: '',
    sid: '',
    created_by: '',
    created_date: '',
    isComplete: false
  }

  team1: Team = {
    id: '',
    name: ''
  }

  team2: Team = {
    id: '',
    name: ''
  }

  team1Players: TeamPlayer[] = []
  team2Players: TeamPlayer[] = []

  team1player1: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }
  team1player2: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }
  team1player3: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }
  team1player4: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }
  team1player5: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }


  team2player1: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }
  team2player2: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }
  team2player3: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }
  team2player4: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }
  team2player5: TeamPlayer = {
    id: '',
    name: '',
    kills: 0,
    deaths: 0,
    damage: 0,
    playerID: ''
  }

  map1: Map = {
    id: '',
    name: '',
    gamemode: '',
    scoreTeam1: 0,
    scoreTeam2: 0,
    winningTeam: '',
    mapNumber: 1,
    losingTeam:'',
    mapReported:false
  }
  map2: Map = {
    id: '',
    name: '',
    gamemode: '',
    scoreTeam1: 0,
    scoreTeam2: 0,
    winningTeam: '',
    mapNumber: 2,
    losingTeam:'',
    mapReported:false
  }
  map3: Map = {
    id: '',
    name: '',
    gamemode: '',
    scoreTeam1: 0,
    scoreTeam2: 0,
    winningTeam: '',
    mapNumber: 3,
    losingTeam:'',
    mapReported:false
  }
  map4: Map = {
    id: '',
    name: '',
    gamemode: '',
    scoreTeam1: 0,
    scoreTeam2: 0,
    winningTeam: '',
    mapNumber: 4,
    losingTeam:'',
    mapReported:false
  }
  map5: Map = {
    id: '',
    name: '',
    gamemode: '',
    scoreTeam1: 0,
    scoreTeam2: 0,
    winningTeam: '',
    mapNumber: 5,
    losingTeam:'',
    mapReported:false
  }
  map6: Map = {
    id: '',
    name: '',
    gamemode: '',
    scoreTeam1: 0,
    scoreTeam2: 0,
    winningTeam: '',
    mapNumber: 6,
    losingTeam:'',
    mapReported:false
  }
  map7: Map = {
    id: '',
    name: '',
    gamemode: '',
    scoreTeam1: 0,
    scoreTeam2: 0,
    winningTeam: '',
    mapNumber: 7,
    losingTeam:'',
    mapReported:false
  }


  selectedPersonId: '';
  players: Player[];
  allSeries: Series[];

  playerList: Player[] = [];

  tempTeams: Team[]


  @ViewChild(`seriesForm`) form: any;
  constructor(
    private seriesService: SeriesService,
    private playerService: PlayerService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;

        this.playerService.getPlayers().subscribe(players => {
          this.players = players;
        })


      } else {

      }
    });

  }

  //TEAM 1 PLAYERS
  onChangeT1P1($event) {
    console.log($event)
    this.team1player1.playerID = $event.id
    console.log(this.team1player1)
  }
  onChangeT1P2($event) {
    console.log($event)
    this.team1player2.playerID = $event.id
    console.log(this.team1player1)
  }
  onChangeT1P3($event) {
    console.log($event)
    this.team1player3.playerID = $event.id
    console.log(this.team1player1)
  }
  onChangeT1P4($event) {
    console.log($event)
    this.team1player4.playerID = $event.id
    console.log(this.team1player1)
  }
  onChangeT1P5($event) {
    console.log($event)
    this.team1player5.playerID = $event.id
    console.log(this.team1player1)
  }


  onClearT1P1($event) {
    console.log("value cleared")
    this.team1player1.playerID = ''
    console.log(this.team1player1)
  }
  onClearT1P2($event) {
    console.log("value cleared")
    this.team1player2.playerID = ''
    console.log(this.team1player1)
  }
  onClearT1P3($event) {
    console.log("value cleared")
    this.team1player3.playerID = ''
    console.log(this.team1player1)
  }
  onClearT1P4($event) {
    console.log("value cleared")
    this.team1player4.playerID = ''
    console.log(this.team1player1)
  }
  onClearT1P5($event) {
    console.log("value cleared")
    this.team1player5.playerID = ''
    console.log(this.team1player1)
  }

  //TEAM 2 PLAYERS
  onChangeT2P1($event) {
    console.log($event)
    this.team2player1.playerID = $event.id
    console.log(this.team2player1)
  }

  onChangeT2P2($event) {
    console.log($event)
    this.team2player2.playerID = $event.id
    console.log(this.team2player2)
  }

  onChangeT2P3($event) {
    console.log($event)
    this.team2player3.playerID = $event.id
    console.log(this.team2player3)
  }

  onChangeT2P4($event) {
    console.log($event)
    this.team2player4.playerID = $event.id
    console.log(this.team2player4)
  }

  onChangeT2P5($event) {
    console.log($event)
    this.team2player5.playerID = $event.id
    console.log(this.team2player5)
  }

  onClearT2P1($event) {
    console.log("value cleared")
    this.team2player1.playerID = ''
    console.log(this.team2player1)
  }
  onClearT2P2($event) {
    console.log("value cleared")
    this.team2player2.playerID = ''
    console.log(this.team2player2)
  }

  onClearT2P3($event) {
    console.log("value cleared")
    this.team2player3.playerID = ''
    console.log(this.team2player3)
  }

  onClearT2P4($event) {
    console.log("value cleared")
    this.team2player4.playerID = ''
    console.log(this.team2player4)
  }

  onClearT2P5($event) {
    console.log("value cleared")
    this.team2player5.playerID = ''
    console.log(this.team2player5)
  }

  onSubmit() {


    var d = new Date()
    this.series.isComplete = false;
    this.series.created_by = this.loggedInUser;
    this.series.created_date = d.toDateString();
    this.series.sid = Math.floor(100000 + Math.random() * 900000).toString();


    this.team1.name = "team1";
    this.team2.name = "team2";

    this.team1Players.push(this.team1player1)
    this.team1Players.push(this.team1player2)
    this.team1Players.push(this.team1player3)
    this.team1Players.push(this.team1player4)
    this.team1Players.push(this.team1player5)

    this.team2Players.push(this.team2player1)
    this.team2Players.push(this.team2player2)
    this.team2Players.push(this.team2player3)
    this.team2Players.push(this.team2player4)
    this.team2Players.push(this.team2player5)

    this.map1.name = "Frequency"
    this.map1.gamemode = "Hardpoint"


    this.map2.name = "Hacienda"
    this.map2.gamemode = "Control"


    this.map3.name = "Slums"
    this.map3.gamemode = "Hardpoint"


    this.map4.name = "Seaside"
    this.map4.gamemode = "Control"


    this.map5.name = "Arsenal"
    this.map5.gamemode = "Hardpoint"


    this.map6.name = "Contraband"
    this.map6.gamemode = "Control"


    this.map7.name = "Firing Range"
    this.map7.gamemode = "Hardpoint"




    this.seriesService.newSeries(this.series, this.team1, this.team2, this.team1Players, this.team2Players,
      this.map1, this.map2, this.map3, this.map4, this.map5, this.map6, this.map7);
    console.log("New Series Created")


    this.router.navigate(["/"])



    //this.seriesService.addTeamToSeries()

  }


}
