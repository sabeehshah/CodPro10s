import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { SeriesService } from '../../services/series.service';
import { AuthService } from '../../services/auth.service';
import { Series } from 'src/app/models/Series';
import { Team } from 'src/app/models/Team'
import { TeamPlayer } from 'src/app/models/TeamPlayer';
import { Player } from 'src/app/models/Player'
import { Map } from 'src/app/models/Map'
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { PlayerService } from 'src/app/services/player.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css']
})
export class SeriesDetailsComponent implements OnInit {



  isLoggedIn: boolean
  loggedInUser: string

  id: string;

  team1Players: TeamPlayer[] = []
  team2Players: TeamPlayer[] = []

  team1PlayersList: Player[] = []
  team2PlayersList: Player[] = []

  teamsInMap1: Team[] = []
  teamsInMap2: Team[] = []
  teamsInMap3: Team[] = []
  teamsInMap4: Team[] = []
  teamsInMap5: Team[] = []
  teamsInMap6: Team[] = []
  teamsInMap7: Team[] = []

  seriesTeams: Team[] = []

  series: Series

  mapsInSeries: Map[] = []

  team1player1: any



  map1: Map
  map2: Map
  map3: Map
  map4: Map
  map5: Map
  map6: Map
  map7: Map




  map1team1Players: TeamPlayer[] = []
  map1team2Players: TeamPlayer[] = []


  map2team1Players: TeamPlayer[] = []
  map2team2Players: TeamPlayer[] = []

  map3team1Players: TeamPlayer[] = []
  map3team2Players: TeamPlayer[] = []

  map4team1Players: TeamPlayer[] = []
  map4team2Players: TeamPlayer[] = []

  map5team1Players: TeamPlayer[] = []
  map5team2Players: TeamPlayer[] = []

  map6team1Players: TeamPlayer[] = []
  map6team2Players: TeamPlayer[] = []

  map7team1Players: TeamPlayer[] = []
  map7team2Players: TeamPlayer[] = []

  m1t1Form: FormGroup;
  m1t1Players: FormArray;

  m1t2Form: FormGroup;
  m1t2Players: FormArray;


  m2t1Form: FormGroup;
  m2t1Players: FormArray;


  m2t2Form: FormGroup;
  m2t2Players: FormArray;

  m3t1Form: FormGroup;
  m3t1Players: FormArray;


  m3t2Form: FormGroup;
  m3t2Players: FormArray;

  m4t1Form: FormGroup;
  m4t1Players: FormArray;


  m4t2Form: FormGroup;
  m4t2Players: FormArray;

  m5t1Form: FormGroup;
  m5t1Players: FormArray;


  m5t2Form: FormGroup;
  m5t2Players: FormArray;

  m6t1Form: FormGroup;
  m6t1Players: FormArray;


  m6t2Form: FormGroup;
  m6t2Players: FormArray;

  m7t1Form: FormGroup;
  m7t1Players: FormArray;


  m7t2Form: FormGroup;
  m7t2Players: FormArray;



  map1Form: FormGroup;
  map2Form: FormGroup;
  map3Form: FormGroup;
  map4Form: FormGroup;
  map5Form: FormGroup;
  map6Form: FormGroup;
  map7Form: FormGroup;


  oldKills: number = 0
  newKills: number = 0



  constructor(
    private seriesService: SeriesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.map1Form = this.fb.group({
      scoreTeam1: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      scoreTeam2: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      winningTeam: ['', [Validators.required]],
      id: '',
      mapNumber: '',
      gamemode: '',
      name: '',
      losingTeam: '',
      mapReported: false
    })



    this.map2Form = this.fb.group({
      scoreTeam1: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      scoreTeam2: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      winningTeam: ['', [Validators.required]],
      id: '',
      mapNumber: '',
      gamemode: '',
      name: '',
      losingTeam: '',
      mapReported: false
    })

    this.map3Form = this.fb.group({
      scoreTeam1: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      scoreTeam2: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      winningTeam: ['', [Validators.required]],
      id: '',
      mapNumber: '',
      gamemode: '',
      name: '',
      losingTeam: '',
      mapReported: false
    })

    this.map4Form = this.fb.group({
      scoreTeam1: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      scoreTeam2: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      winningTeam: ['', [Validators.required]],
      id: '',
      mapNumber: '',
      gamemode: '',
      name: '',
      losingTeam: '',
      mapReported: false
    })

    this.map5Form = this.fb.group({
      scoreTeam1: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      scoreTeam2: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      winningTeam: ['', [Validators.required]],
      id: '',
      mapNumber: '',
      gamemode: '',
      name: '',
      losingTeam: '',
      mapReported: false
    })

    this.map6Form = this.fb.group({
      scoreTeam1: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      scoreTeam2: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      winningTeam: ['', [Validators.required]],
      id: '',
      mapNumber: '',
      gamemode: '',
      name: '',
      losingTeam: '',
      mapReported: false
    })

    this.map7Form = this.fb.group({
      scoreTeam1: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      scoreTeam2: [0, [Validators.required, Validators.min(0), Validators.max(250)]],
      winningTeam: ['', [Validators.required]],
      id: '',
      mapNumber: '',
      gamemode: '',
      name: '',
      losingTeam: '',
      mapReported: false
    })



    this.m1t1Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m1t2Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m2t1Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m2t2Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m3t1Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m3t2Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m4t1Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m4t2Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m5t1Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m5t2Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m6t1Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m6t2Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m7t2Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });

    this.m7t1Form = new FormGroup({
      'players': new FormArray([this.createItem()])
    });





    // this.m1t1Form = this.fb.group({
    //   players: this.fb.array(this.map1team1Players)
    // })
    // this.m1t2Form = this.fb.group({
    //   players: this.fb.array(this.map1team2Players)
    // })



    this.authService.getAuth().subscribe(auth => {
      if (auth) {

        this.isLoggedIn = true;
        this.loggedInUser = auth.email;

        this.id = this.route.snapshot.params['id']
        this.seriesService.getSeries(this.id).subscribe(series => {
          this.series = series;

          //console.log(this.series)
          this.seriesService.getTeamsFromSeries(this.id).subscribe(teams => {
            this.seriesTeams = teams;
            //console.log(this.seriesTeams)

            var t1ID = this.seriesTeams[0].id;
            var t2ID = this.seriesTeams[1].id;

            this.seriesService.getPlayersFromTeamInSeries(this.id, t1ID).subscribe(teamplayers => {
              this.team1Players = teamplayers
              //console.log(this.team1Players)




              for (var i = 0; i < this.team1Players.length; i++) {
                this.playerService.getPlayer(this.team1Players[i].playerID).subscribe(player => {
                  this.team1PlayersList.push(player);
                  //console.log(player)
                })
              }

              //console.log(this.team1PlayersList)

            });
            this.seriesService.getPlayersFromTeamInSeries(this.id, t2ID).subscribe(teamplayers => {
              this.team2Players = teamplayers
              //console.log(this.team2Players)

              for (var i = 0; i < this.team2Players.length; i++) {
                this.playerService.getPlayer(this.team2Players[i].playerID).subscribe(player => {
                  this.team2PlayersList.push(player);
                  //console.log(player)
                })
              }
            });


          })
        })

        this.seriesService.getMapsFromSeries(this.id).subscribe(maps => {
          this.mapsInSeries = maps;
          this.mapsInSeries.sort((a, b) => (a.mapNumber) - (b.mapNumber));
          //console.log(this.mapsInSeries)

          this.map1 = this.mapsInSeries[0];
          this.map1Form.patchValue(this.map1)

          this.map2 = this.mapsInSeries[1];
          this.map2Form.patchValue(this.map2)

          this.map3 = this.mapsInSeries[2];
          this.map3Form.patchValue(this.map3)

          this.map4 = this.mapsInSeries[3];
          this.map4Form.patchValue(this.map4)

          this.map5 = this.mapsInSeries[4];
          this.map5Form.patchValue(this.map5)

          this.map6 = this.mapsInSeries[5];
          this.map6Form.patchValue(this.map6)

          this.map7 = this.mapsInSeries[6];
          this.map7Form.patchValue(this.map7)



          this.seriesService.getTeamsFromMapInSeries(this.id, this.mapsInSeries[0].id)
            .subscribe(value => {
              this.teamsInMap1 = value;
              // console.log(this.teamsInMap1)
              var collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
              this.teamsInMap1 = this.teamsInMap1.sort((a, b) => collator.compare(a.name, b.name))

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[0].id, this.teamsInMap1[0].id)
                .subscribe(value => {
                  this.map1team1Players = value;
                  console.log(this.map1team1Players)



                  // this.m1t1Form = this.fb.group({
                  //   players: this.fb.array([])
                  // })



                  // let control = <FormArray>this.m1t1Form.controls.players;
                  // this.map1team1Players.forEach(x => {
                  //   control.push(this.fb.group({
                  //     kills: x.kills,
                  //     deaths: x.deaths,
                  //     damage: x.damage,
                  //     id: x.id,
                  //     playerID: x.playerID
                  //   }))
                  // })

                  if (this.map1team1Players.length > 0) {
                    this.m1t1Players = this.m1t1Form.get('players') as FormArray;
                    while (this.m1t1Players.length) {
                      this.m1t1Players.removeAt(0);
                    }
                    this.m1t1Form.patchValue(this.map1team1Players);
                    this.map1team1Players.forEach(player =>
                      this.m1t1Players.push(this.fb.group(player)));
                  }
                })






              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[0].id, this.teamsInMap1[1].id)
                .subscribe(value => {
                  this.map1team2Players = value;
                  console.log(this.map1team2Players)

                  if (this.map1team2Players.length > 0) {
                    this.m1t2Players = this.m1t2Form.get('players') as FormArray;
                    while (this.m1t2Players.length) {
                      this.m1t2Players.removeAt(0);
                    }
                    this.m1t2Form.patchValue(this.map1team2Players);
                    this.map1team2Players.forEach(player =>
                      this.m1t2Players.push(this.fb.group(player)));
                  }


                })



            })

          this.seriesService.getTeamsFromMapInSeries(this.id, this.mapsInSeries[1].id)
            .subscribe(value => {
              this.teamsInMap2 = value;
              //   console.log(this.teamsInMap2)
              var collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
              this.teamsInMap2 = this.teamsInMap2.sort((a, b) => collator.compare(a.name, b.name))

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[1].id, this.teamsInMap2[0].id)
                .subscribe(value => {
                  this.map2team1Players = value;
                  console.log(this.map2team1Players)

                  if (this.map2team1Players.length > 0) {
                    this.m2t1Players = this.m2t1Form.get('players') as FormArray;
                    while (this.m2t1Players.length) {
                      this.m2t1Players.removeAt(0);
                    }
                    this.m2t1Form.patchValue(this.map2team1Players);
                    this.map2team1Players.forEach(player =>
                      this.m2t1Players.push(this.fb.group(player)));


                  }

                })

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[1].id, this.teamsInMap2[1].id)
                .subscribe(value => {
                  this.map2team2Players = value;
                  console.log(this.map2team2Players)

                  if (this.map2team2Players.length > 0) {
                    this.m2t2Players = this.m2t2Form.get('players') as FormArray;
                    while (this.m2t2Players.length) {
                      this.m2t2Players.removeAt(0);
                    }
                    this.m2t2Form.patchValue(this.map2team2Players);
                    this.map2team2Players.forEach(player =>
                      this.m2t2Players.push(this.fb.group(player)));
                  }
                })

            })

          this.seriesService.getTeamsFromMapInSeries(this.id, this.mapsInSeries[2].id)
            .subscribe(value => {
              this.teamsInMap3 = value;
              //  console.log(this.teamsInMap3)
              var collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
              this.teamsInMap3 = this.teamsInMap3.sort((a, b) => collator.compare(a.name, b.name))

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[2].id, this.teamsInMap3[0].id)
                .subscribe(value => {
                  this.map3team1Players = value;
                  console.log(this.map3team1Players)

                  if (this.map3team1Players.length > 0) {
                    this.m3t1Players = this.m3t1Form.get('players') as FormArray;
                    while (this.m3t1Players.length) {
                      this.m3t1Players.removeAt(0);
                    }
                    this.m3t1Form.patchValue(this.map3team1Players);
                    this.map3team1Players.forEach(player =>
                      this.m3t1Players.push(this.fb.group(player)));
                  }

                })

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[2].id, this.teamsInMap3[1].id)
                .subscribe(value => {
                  this.map3team2Players = value;
                  console.log(this.map3team2Players)
                  if (this.map3team2Players.length > 0) {
                    this.m3t2Players = this.m3t2Form.get('players') as FormArray;
                    while (this.m3t2Players.length) {
                      this.m3t2Players.removeAt(0);
                    }
                    this.m3t2Form.patchValue(this.map3team2Players);
                    this.map3team2Players.forEach(player =>
                      this.m3t2Players.push(this.fb.group(player)));
                  }
                })

            })

          this.seriesService.getTeamsFromMapInSeries(this.id, this.mapsInSeries[3].id)
            .subscribe(value => {
              console.log(value)
              this.teamsInMap4 = value;
              //   console.log(this.teamsInMap4)
              var collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
              this.teamsInMap4 = this.teamsInMap4.sort((a, b) => collator.compare(a.name, b.name))

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[3].id, this.teamsInMap4[0].id)
                .subscribe(value => {
                  console.log(value)
                  this.map4team1Players = value;
                  console.log(this.map4team1Players)

                  if (this.map4team1Players.length > 0) {
                    this.m4t1Players = this.m4t1Form.get('players') as FormArray;
                    while (this.m4t1Players.length) {
                      this.m4t1Players.removeAt(0);
                    }
                    this.m4t1Form.patchValue(this.map4team1Players);
                    this.map4team1Players.forEach(player =>
                      this.m4t1Players.push(this.fb.group(player)));
                  }
                })

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[3].id, this.teamsInMap4[1].id)
                .subscribe(value => {
                  this.map4team2Players = value;
                  console.log(this.map4team2Players)

                  if (this.map4team2Players.length > 0) {
                    this.m4t2Players = this.m4t2Form.get('players') as FormArray;
                    while (this.m4t2Players.length) {
                      this.m4t2Players.removeAt(0);
                    }
                    this.m4t2Form.patchValue(this.map4team2Players);
                    this.map4team2Players.forEach(player =>
                      this.m4t2Players.push(this.fb.group(player)));
                  }
                })


            })

          this.seriesService.getTeamsFromMapInSeries(this.id, this.mapsInSeries[4].id)
            .subscribe(value => {
              this.teamsInMap5 = value;
              console.log(this.teamsInMap5)
              var collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
              this.teamsInMap5 = this.teamsInMap5.sort((a, b) => collator.compare(a.name, b.name))

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[4].id, this.teamsInMap5[0].id)
                .subscribe(value => {
                  this.map5team1Players = value;
                  console.log(this.map5team1Players)

                  if (this.map5team1Players.length > 0) {
                    this.m5t1Players = this.m5t1Form.get('players') as FormArray;
                    while (this.m5t1Players.length) {
                      this.m5t1Players.removeAt(0);
                    }
                    this.m5t1Form.patchValue(this.map5team1Players);
                    this.map5team1Players.forEach(player =>
                      this.m5t1Players.push(this.fb.group(player)));
                  }
                })

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[4].id, this.teamsInMap5[1].id)
                .subscribe(value => {
                  this.map5team2Players = value;
                  console.log(this.map5team2Players)

                  if (this.map5team2Players.length > 0) {
                    this.m5t2Players = this.m5t2Form.get('players') as FormArray;
                    while (this.m5t2Players.length) {
                      this.m5t2Players.removeAt(0);
                    }
                    this.m5t2Form.patchValue(this.map5team2Players);
                    this.map5team2Players.forEach(player =>
                      this.m5t2Players.push(this.fb.group(player)));
                  }
                })

            })

          this.seriesService.getTeamsFromMapInSeries(this.id, this.mapsInSeries[5].id)
            .subscribe(value => {
              this.teamsInMap6 = value;
              // console.log(this.teamsInMap6)
              var collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
              this.teamsInMap6 = this.teamsInMap6.sort((a, b) => collator.compare(a.name, b.name))

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[5].id, this.teamsInMap6[0].id)
                .subscribe(value => {
                  this.map6team1Players = value;
                  console.log(this.map6team1Players)

                  if (this.map6team1Players.length > 0) {
                    this.m6t1Players = this.m6t1Form.get('players') as FormArray;
                    while (this.m6t1Players.length) {
                      this.m6t1Players.removeAt(0);
                    }
                    this.m6t1Form.patchValue(this.map6team1Players);
                    this.map6team1Players.forEach(player =>
                      this.m6t1Players.push(this.fb.group(player)));
                  }
                })

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[5].id, this.teamsInMap6[1].id)
                .subscribe(value => {
                  this.map6team2Players = value;
                  console.log(this.map6team2Players)


                  if (this.map6team2Players.length > 0) {
                    this.m6t2Players = this.m6t2Form.get('players') as FormArray;
                    while (this.m6t2Players.length) {
                      this.m6t2Players.removeAt(0);
                    }
                    this.m6t2Form.patchValue(this.map6team2Players);
                    this.map6team2Players.forEach(player =>
                      this.m6t2Players.push(this.fb.group(player)));
                  }
                })

            })

          this.seriesService.getTeamsFromMapInSeries(this.id, this.mapsInSeries[6].id)
            .subscribe(value => {
              this.teamsInMap7 = value;
              // console.log(this.teamsInMap7)
              var collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
              this.teamsInMap7 = this.teamsInMap7.sort((a, b) => collator.compare(a.name, b.name))

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[6].id, this.teamsInMap7[0].id)
                .subscribe(value => {
                  this.map7team1Players = value;
                  console.log(this.map7team1Players)

                  if (this.map7team1Players.length > 0) {
                    this.m7t1Players = this.m7t1Form.get('players') as FormArray;
                    while (this.m7t1Players.length) {
                      this.m7t1Players.removeAt(0);
                    }
                    this.m7t1Form.patchValue(this.map7team1Players);
                    this.map7team1Players.forEach(player =>
                      this.m7t1Players.push(this.fb.group(player)));
                  }
                })

              this.seriesService.getPlayersFromTeamInMap(this.id, this.mapsInSeries[6].id, this.teamsInMap7[1].id)
                .subscribe(value => {
                  this.map7team2Players = value;
                  console.log(this.map7team2Players)

                  if (this.map7team2Players.length > 0) {
                    this.m7t2Players = this.m7t2Form.get('players') as FormArray;
                    while (this.m7t2Players.length) {
                      this.m7t2Players.removeAt(0);
                    }
                    this.m7t2Form.patchValue(this.map7team2Players);
                    this.map7team2Players.forEach(player =>
                      this.m7t2Players.push(this.fb.group(player)));
                  }
                })

            })


        })

      } else {
        this.isLoggedIn = false;
      }

      //console.log(this.isLoggedIn)
    });
  }

  createItem(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      kills: new FormControl(),
      deaths: new FormControl(),
      damage: new FormControl()
    })
  }

  updatem1t1Record(i: any) {

    if (this.m1t1Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m1t1Players.at(i).value)
      console.log(this.map1.id)
      console.log(this.teamsInMap1[1].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m1t1Players.at(i).value, this.id, this.map1.id, this.teamsInMap1[0].id)
      console.log("updated teamplayer")
    }






  }

  updatem1t2Record(i: any) {
    if (this.m1t2Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m1t2Players.at(i).value)
      console.log(this.map1.id)
      console.log(this.teamsInMap1[1].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m1t2Players.at(i).value, this.id, this.map1.id, this.teamsInMap1[1].id)
      console.log("updated teamplayer")
    }
  }

  updatem2t1Record(i: any) {
    if (this.m2t1Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m2t1Players.at(i).value)
      console.log(this.map2.id)
      console.log(this.teamsInMap2[0].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m2t1Players.at(i).value, this.id, this.map2.id, this.teamsInMap2[0].id)
      console.log("updated teamplayer")
    }
  }

  updatem2t2Record(i: any) {
    if (this.m2t2Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m2t2Players.at(i).value)
      console.log(this.map2.id)
      console.log(this.teamsInMap2[1].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m2t2Players.at(i).value, this.id, this.map2.id, this.teamsInMap2[1].id)
      console.log("updated teamplayer")
    }
  }
  updatem3t1Record(i: any) {
    if (this.m3t1Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m3t1Players.at(i).value)
      console.log(this.map3.id)
      console.log(this.teamsInMap3[0].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m3t1Players.at(i).value, this.id, this.map3.id, this.teamsInMap3[0].id)
      console.log("updated teamplayer")
    }
  }
  updatem3t2Record(i: any) {
    if (this.m3t2Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m3t2Players.at(i).value)
      console.log(this.map3.id)
      console.log(this.teamsInMap3[1].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m3t2Players.at(i).value, this.id, this.map3.id, this.teamsInMap3[1].id)
      console.log("updated teamplayer")
    }
  }
  updatem4t1Record(i: any) {
    if (this.m4t1Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m4t1Players.at(i).value)
      console.log(this.map3.id)
      console.log(this.teamsInMap4[0].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m4t1Players.at(i).value, this.id, this.map4.id, this.teamsInMap4[0].id)
      console.log("updated teamplayer")
    }
  }
  updatem4t2Record(i: any) {
    if (this.m4t2Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m4t2Players.at(i).value)
      console.log(this.map4.id)
      console.log(this.teamsInMap4[1].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m4t2Players.at(i).value, this.id, this.map4.id, this.teamsInMap4[1].id)
      console.log("updated teamplayer")
    }
  }
  updatem5t1Record(i: any) {
    if (this.m5t1Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m5t1Players.at(i).value)
      console.log(this.map5.id)
      console.log(this.teamsInMap5[0].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m5t1Players.at(i).value, this.id, this.map5.id, this.teamsInMap5[0].id)
      console.log("updated teamplayer")
    }
  }
  updatem5t2Record(i: any) {
    if (this.m5t2Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m5t2Players.at(i).value)
      console.log(this.map5.id)
      console.log(this.teamsInMap5[1].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m5t2Players.at(i).value, this.id, this.map5.id, this.teamsInMap5[1].id)
      console.log("updated teamplayer")
    }
  }
  updatem6t1Record(i: any) {
    if (this.m6t1Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m6t1Players.at(i).value)
      console.log(this.map6.id)
      console.log(this.teamsInMap6[0].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m6t1Players.at(i).value, this.id, this.map6.id, this.teamsInMap6[0].id)
      console.log("updated teamplayer")
    }
  }
  updatem6t2Record(i: any) {
    if (this.m6t2Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m6t2Players.at(i).value)
      console.log(this.map6.id)
      console.log(this.teamsInMap6[1].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m6t2Players.at(i).value, this.id, this.map6.id, this.teamsInMap6[1].id)
      console.log("updated teamplayer")
    }
  }
  updatem7t1Record(i: any) {
    if (this.m7t1Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m7t1Players.at(i).value)
      console.log(this.map7.id)
      console.log(this.teamsInMap7[0].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m7t1Players.at(i).value, this.id, this.map7.id, this.teamsInMap7[0].id)
      console.log("updated teamplayer")
    }
  }
  updatem7t2Record(i: any) {
    if (this.m7t2Players.at(i).get('id').value) {
      // Do whatever you want to do with id or playerId
      console.log(this.m7t2Players.at(i).value)
      console.log(this.map7.id)
      console.log(this.teamsInMap6[1].id)
      this.seriesService.updateTeamPlayerInMapOfSeries(this.m7t2Players.at(i).value, this.id, this.map7.id, this.teamsInMap7[1].id)
      console.log("updated teamplayer")
    }
  }

  updateMap1() {
    console.log(this.map1Form.value)


    var m = this.map1Form.value as Map
    if (this.map1Form.valid) {
      var c = confirm("Are you sure? You can only report once!")
      if (c == true) {
        m.mapReported = true
        this.seriesService.updateMapInSeries(this.id, m)
        this.toastr.success('Map Has Been Updated', 'Map Update', {
          timeOut: 3000
        })
        console.log("map updated")
      } else {
        console.log("cancelled")
      }


    } else {
      this.toastr.error('Provide valid data', 'Invalid Data Found', {
        timeOut: 3000
      })
      console.log("Invalid Data")
    }

  }

  updateMap2() {
    var m = this.map2Form.value as Map
    if (this.map2Form.valid) {
      var c = confirm("Are you sure? You can only report once!")
      if (c == true) {
        m.mapReported = true
        this.seriesService.updateMapInSeries(this.id, m)
        this.toastr.success('Map Has Been Updated', 'Map Update', {
          timeOut: 3000
        })
        console.log("map updated")
      } else {
        console.log("cancelled")
      }


    } else {
      this.toastr.error('Provide valid data', 'Invalid Data Found', {
        timeOut: 3000
      })
      console.log("Invalid Data")
    }
  }

  updateMap3() {
    var m = this.map3Form.value as Map
    if (this.map3Form.valid) {
      var c = confirm("Are you sure? You can only report once!")
      if (c == true) {
        m.mapReported = true
        this.seriesService.updateMapInSeries(this.id, m)
        this.toastr.success('Map Has Been Updated', 'Map Update', {
          timeOut: 3000
        })
        console.log("map updated")
      } else {
        console.log("cancelled")
      }


    } else {
      this.toastr.error('Provide valid data', 'Invalid Data Found', {
        timeOut: 3000
      })
      console.log("Invalid Data")
    }

  }

  updateMap4() {
    var m = this.map4Form.value as Map
    if (this.map4Form.valid) {
      var c = confirm("Are you sure? You can only report once!")
      if (c == true) {
        m.mapReported = true
        this.seriesService.updateMapInSeries(this.id, m)
        this.toastr.success('Map Has Been Updated', 'Map Update', {
          timeOut: 3000
        })
        console.log("map updated")
      } else {
        console.log("cancelled")
      }


    } else {
      this.toastr.error('Provide valid data', 'Invalid Data Found', {
        timeOut: 3000
      })
      console.log("Invalid Data")
    }
  }

  updateMap5() {
    var m = this.map5Form.value as Map
    if (this.map5Form.valid) {
      var c = confirm("Are you sure? You can only report once!")
      if (c == true) {
        m.mapReported = true
        this.seriesService.updateMapInSeries(this.id, m)
        this.toastr.success('Map Has Been Updated', 'Map Update', {
          timeOut: 3000
        })
        console.log("map updated")
      } else {
        console.log("cancelled")
      }


    } else {
      this.toastr.error('Provide valid data', 'Invalid Data Found', {
        timeOut: 3000
      })
      console.log("Invalid Data")
    }
  }

  updateMap6() {
    var m = this.map6Form.value as Map
    if (this.map6Form.valid) {
      var c = confirm("Are you sure? You can only report once!")
      if (c == true) {
        m.mapReported = true
        this.seriesService.updateMapInSeries(this.id, m)
        this.toastr.success('Map Has Been Updated', 'Map Update', {
          timeOut: 3000
        })
        console.log("map updated")
      } else {
        console.log("cancelled")
      }


    } else {
      this.toastr.error('Provide valid data', 'Invalid Data Found', {
        timeOut: 3000
      })
      console.log("Invalid Data")
    }
  }

  updateMap7() {
    var m = this.map7Form.value as Map
    if (this.map7Form.valid) {
      var c = confirm("Are you sure? You can only report once!")
      if (c == true) {
        m.mapReported = true
        this.seriesService.updateMapInSeries(this.id, m)
        this.toastr.success('Map Has Been Updated', 'Map Update', {
          timeOut: 3000
        })
        console.log("map updated")
      } else {
        console.log("cancelled")
      }


    } else {
      this.toastr.error('Provide valid data', 'Invalid Data Found', {
        timeOut: 3000
      })
      console.log("Invalid Data")
    }
  }

  addPlayerStats() {
    console.log(this.team1Players.map(item => item.playerID)
      .filter((value, index, self) => self.indexOf(value) === index)
    )

    console.log(this.team2Players.map(item => item.playerID)
      .filter((value, index, self) => self.indexOf(value) === index)
    )

  }

}
