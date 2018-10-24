import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Player } from '../models/Player';
import { TeamPlayer } from '../models/TeamPlayer';
import { Map } from '../models/Map'
import { PlayerService } from '../services/player.service'

import { Observable } from 'rxjs';
import { Series } from '../models/Series'
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  seriesCollection: AngularFirestoreCollection<Series>;
  seriesDoc: AngularFirestoreDocument<Series>;
  seriesList: Observable<Series[]>;
  series: Observable<Series>;


  mapCollection: AngularFirestoreCollection<Map>
  mapDoc: AngularFirestoreDocument<Map>
  mapList: Observable<Map[]>;
  map: Observable<Map>







  constructor(
    private afs: AngularFirestore,
    private playerService: PlayerService
  ) {
    this.seriesCollection = afs.collection('series');

  }


  getSeriesList(): Observable<Series[]> {
    // Get players with the id
    this.seriesList = this.seriesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Series;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.seriesList;
  }

  newSeries(series: Series, team1: Team, team2: Team, team1Players: TeamPlayer[], team2Players: TeamPlayer[],
    map1: Map, map2: Map, map3: Map, map4: Map, map5: Map, map6: Map, map7: Map) {
    console.log(map1 + " " + map2)
    this.seriesCollection.add(series)
      .then(res => {
        this.afs.collection('series').doc(res.id).set({ id: res.id }, { merge: true });

        this.afs.collection(`series/${res.id}/teams`).add(team1)
          .then((t) => {
            //assign added team1 id to team document
            this.afs.collection(`series/${res.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

            for (var i = 0; i < team1Players.length; i++) {
              this.afs.collection(`series/${res.id}/teams/${t.id}/players`).add(team1Players[i])
                .then((m) => {
                  this.afs.collection(`series/${res.id}/teams/${t.id}/players/`).doc(m.id).set({ id: m.id }, { merge: true })
                  console.log("player added")
                }).catch((err) => {
                  console.log(err)
                })
            }
            console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
          }).catch((err) => {
            console.log(err)
          });

        this.afs.collection(`series/${res.id}/teams`).add(team2)
          .then((t) => {
            //assign added team1 id to team document
            this.afs.collection(`series/${res.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

            for (var i = 0; i < team2Players.length; i++) {
              this.afs.collection(`series/${res.id}/teams/${t.id}/players`).add(team2Players[i])
                .then((k) => {
                  this.afs.collection(`series/${res.id}/teams/${t.id}/players/`).doc(k.id).set({ id: k.id }, { merge: true })

                  console.log("player added")
                }).catch((err) => {
                  console.log(err)
                })
            }
            console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
          }).catch((err) => {
            console.log(err)
          });



        this.afs.collection(`series/${res.id}/maps`).add(map1)
          .then((m) => {
            this.afs.collection(`series/${res.id}/maps`).doc(m.id).set({ id: m.id }, { merge: true })
            console.log("Map 1 Added")

            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team1)
              .then((t) => {
                //assign added team1 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

                for (var i = 0; i < team1Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).add(team1Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var x;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        x = val

                        this.getTeamPlayerInMapOfSeries(x, res.id, m.id, t.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team1")
                    }).catch((err) => {
                      console.log(err)
                    })
                }
                console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
              }).catch((err) => {
                console.log(err)
              });


            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team2)
              .then((x) => {
                //assign added team2 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(x.id).set({ id: x.id }, { merge: true })

                for (var i = 0; i < team2Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).add(team2Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })

                      var q;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        q = val

                        this.getTeamPlayerInMapOfSeries(q, res.id, m.id, x.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team2")
                    }).catch((err) => {
                      console.log(err)
                    })
                }


                console.log("team2 added to series with id: " + res.id + " and team id: " + x.id)
              }).catch((err) => {
                console.log(err)
              });

          }).catch((err) => {
            console.log(err)
          })

        // MAP 2

        this.afs.collection(`series/${res.id}/maps`).add(map2)
          .then((m) => {
            this.afs.collection(`series/${res.id}/maps`).doc(m.id).set({ id: m.id }, { merge: true })
            console.log("Map 1 Added")

            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team1)
              .then((t) => {
                //assign added team1 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

                for (var i = 0; i < team1Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).add(team1Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var x;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        x = val

                        this.getTeamPlayerInMapOfSeries(x, res.id, m.id, t.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team1")
                    }).catch((err) => {
                      console.log(err)
                    })
                }
                console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
              }).catch((err) => {
                console.log(err)
              });


            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team2)
              .then((x) => {
                //assign added team2 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(x.id).set({ id: x.id }, { merge: true })

                for (var i = 0; i < team2Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).add(team2Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var q;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        q = val

                        this.getTeamPlayerInMapOfSeries(q, res.id, m.id, x.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team2")
                    }).catch((err) => {
                      console.log(err)
                    })
                }


                console.log("team2 added to series with id: " + res.id + " and team id: " + x.id)
              }).catch((err) => {
                console.log(err)
              });

          }).catch((err) => {
            console.log(err)
          })


        //MAP 3

        this.afs.collection(`series/${res.id}/maps`).add(map3)
          .then((m) => {
            this.afs.collection(`series/${res.id}/maps`).doc(m.id).set({ id: m.id }, { merge: true })
            console.log("Map 1 Added")

            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team1)
              .then((t) => {
                //assign added team1 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

                for (var i = 0; i < team1Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).add(team1Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var x;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        x = val

                        this.getTeamPlayerInMapOfSeries(x, res.id, m.id, t.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team1")
                    }).catch((err) => {
                      console.log(err)
                    })
                }
                console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
              }).catch((err) => {
                console.log(err)
              });


            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team2)
              .then((x) => {
                //assign added team2 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(x.id).set({ id: x.id }, { merge: true })

                for (var i = 0; i < team2Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).add(team2Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var q;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        q = val

                        this.getTeamPlayerInMapOfSeries(q, res.id, m.id, x.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team2")
                    }).catch((err) => {
                      console.log(err)
                    })
                }


                console.log("team2 added to series with id: " + res.id + " and team id: " + x.id)
              }).catch((err) => {
                console.log(err)
              });

          }).catch((err) => {
            console.log(err)
          })


        //MAP 4

        this.afs.collection(`series/${res.id}/maps`).add(map4)
          .then((m) => {
            this.afs.collection(`series/${res.id}/maps`).doc(m.id).set({ id: m.id }, { merge: true })
            console.log("Map 1 Added")

            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team1)
              .then((t) => {
                //assign added team1 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

                for (var i = 0; i < team1Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).add(team1Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var x;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        x = val

                        this.getTeamPlayerInMapOfSeries(x, res.id, m.id, t.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team1")
                    }).catch((err) => {
                      console.log(err)
                    })
                }
                console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
              }).catch((err) => {
                console.log(err)
              });


            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team2)
              .then((x) => {
                //assign added team2 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(x.id).set({ id: x.id }, { merge: true })

                for (var i = 0; i < team2Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).add(team2Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var q;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        q = val

                        this.getTeamPlayerInMapOfSeries(q, res.id, m.id, x.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team2")
                    }).catch((err) => {
                      console.log(err)
                    })
                }


                console.log("team2 added to series with id: " + res.id + " and team id: " + x.id)
              }).catch((err) => {
                console.log(err)
              });

          }).catch((err) => {
            console.log(err)
          })


        //MAP 5

        this.afs.collection(`series/${res.id}/maps`).add(map5)
          .then((m) => {
            this.afs.collection(`series/${res.id}/maps`).doc(m.id).set({ id: m.id }, { merge: true })
            console.log("Map 1 Added")

            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team1)
              .then((t) => {
                //assign added team1 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

                for (var i = 0; i < team1Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).add(team1Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var x;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        x = val

                        this.getTeamPlayerInMapOfSeries(x, res.id, m.id, t.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team1")
                    }).catch((err) => {
                      console.log(err)
                    })
                }
                console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
              }).catch((err) => {
                console.log(err)
              });


            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team2)
              .then((x) => {
                //assign added team2 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(x.id).set({ id: x.id }, { merge: true })

                for (var i = 0; i < team2Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).add(team2Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var q;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        q = val

                        this.getTeamPlayerInMapOfSeries(q, res.id, m.id, x.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team2")
                    }).catch((err) => {
                      console.log(err)
                    })
                }


                console.log("team2 added to series with id: " + res.id + " and team id: " + x.id)
              }).catch((err) => {
                console.log(err)
              });

          }).catch((err) => {
            console.log(err)
          })


        //MAP 6
        this.afs.collection(`series/${res.id}/maps`).add(map6)
          .then((m) => {
            this.afs.collection(`series/${res.id}/maps`).doc(m.id).set({ id: m.id }, { merge: true })
            console.log("Map 1 Added")

            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team1)
              .then((t) => {
                //assign added team1 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

                for (var i = 0; i < team1Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).add(team1Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var x;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        x = val

                        this.getTeamPlayerInMapOfSeries(x, res.id, m.id, t.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team1")
                    }).catch((err) => {
                      console.log(err)
                    })
                }
                console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
              }).catch((err) => {
                console.log(err)
              });


            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team2)
              .then((x) => {
                //assign added team2 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(x.id).set({ id: x.id }, { merge: true })

                for (var i = 0; i < team2Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).add(team2Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var q;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        q = val

                        this.getTeamPlayerInMapOfSeries(q, res.id, m.id, x.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team2")
                    }).catch((err) => {
                      console.log(err)
                    })
                }


                console.log("team2 added to series with id: " + res.id + " and team id: " + x.id)
              }).catch((err) => {
                console.log(err)
              });

          }).catch((err) => {
            console.log(err)
          })


        //MAP 7

        this.afs.collection(`series/${res.id}/maps`).add(map7)
          .then((m) => {
            this.afs.collection(`series/${res.id}/maps`).doc(m.id).set({ id: m.id }, { merge: true })
            console.log("Map 1 Added")

            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team1)
              .then((t) => {
                //assign added team1 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(t.id).set({ id: t.id }, { merge: true })

                for (var i = 0; i < team1Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).add(team1Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var x;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        x = val

                        this.getTeamPlayerInMapOfSeries(x, res.id, m.id, t.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team1")
                    }).catch((err) => {
                      console.log(err)
                    })
                }
                console.log("team1 added to series with id: " + res.id + " and team id: " + t.id)
              }).catch((err) => {
                console.log(err)
              });


            this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).add(team2)
              .then((x) => {
                //assign added team2 id to team document
                this.afs.collection(`series/${res.id}/maps/${m.id}/teams`).doc(x.id).set({ id: x.id }, { merge: true })

                for (var i = 0; i < team2Players.length; i++) {
                  this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).add(team2Players[i])
                    .then((p) => {
                      this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ id: p.id }, { merge: true })
                      var q;
                      var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id)
                      temp.valueChanges().subscribe(val => {
                        q = val

                        this.getTeamPlayerInMapOfSeries(q, res.id, m.id, x.id).subscribe(value => {
                          console.log(value.playerID)
                          this.playerService.getPlayer(value.playerID).subscribe(val => {
                            this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${x.id}/players`).doc(p.id).set({ name: val.gamerID }, { merge: true })
                            console.log("gamerID added")
                          })
                        })

                      })
                    }).catch((err) => console.log(err))
                    .then((res) => {
                      console.log("player added to team2")
                    }).catch((err) => {
                      console.log(err)
                    })
                }


                console.log("team2 added to series with id: " + res.id + " and team id: " + x.id)
              }).catch((err) => {
                console.log(err)
              });

          }).catch((err) => {
            console.log(err)
          })


      })
      .catch((err) => {
        console.log(err)
      })



  }

  getSeries(id: string): Observable<Series> {
    this.seriesDoc = this.afs.doc<Series>(`series/${id}`);
    this.series = this.seriesDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Series;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.series;
  }

  // var temp = this.afs.collection(`series/${res.id}/maps/${m.id}/teams/${t.id}/players`).doc(p.id)

  getTeamPlayerInMapOfSeries(teamplayer: TeamPlayer, seriesID: string, mapID: string, teamID: string): Observable<TeamPlayer> {
    var tempPlayerDoc = this.afs.doc(`series/${seriesID}/maps/${mapID}/teams/${teamID}/players/${teamplayer.id}`)
    var tp = tempPlayerDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null
      } else {
        const data = action.payload.data() as TeamPlayer;
        data.id = action.payload.id;
        return data
      }
    }))
    return tp;
  }




  updateSeries(series: Series) {
    this.seriesDoc = this.afs.doc(`series/${series.id}`);
    this.seriesDoc.update(series);
  }

  updateMapInSeries(seriesID:string,map:Map){
    var tempdoc = this.afs.doc(`series/${seriesID}/maps/${map.id}`)
    tempdoc.update(map);
  }

  updateTeamPlayerInMapOfSeries(teamplayer: TeamPlayer, seriesID: string, mapID: string, teamID: string) {
    var tempPlayerDoc = this.afs.doc(`series/${seriesID}/maps/${mapID}/teams/${teamID}/players/${teamplayer.id}`)
    tempPlayerDoc.update(teamplayer)
  }

  deleteSeries(series: Series) {
    this.seriesDoc = this.afs.doc(`series/${series.id}`);
    this.seriesDoc.delete();
  }


  addMapToSeries(sid: string, seriesID: string, map: Map) {
    this.afs.collection(`series/${seriesID}/maps`).add(map)
      .then(res => {
        console.log(res)
        console.log("added Map to series: " + seriesID)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getMapFromSeries(seriesID: string, mapID: string): Observable<Map> {

    this.mapDoc = this.afs.doc(`series/${seriesID}/map/${mapID}`);
    this.map = this.mapDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Map;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.map;
  }



  getMapsFromSeries(seriesID: string) {
    this.mapList = this.afs.collection(`series/${seriesID}/maps`).snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Map;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.mapList;
  }

  addTeamToSeries(seriesID: string, team: Team) {
    this.afs.collection(`series/${seriesID}/teams`).add(team)
      .then((res) => {
        console.log("team added")
        console.log(team)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getTeamsFromSeries(seriesID: string): Observable<Team[]> {
    var teamList = this.afs.collection(`series/${seriesID}/teams`).snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Team;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return teamList;
  }

  getTeamsFromMapInSeries(seriesID: string, mapID: string): Observable<Team[]> {
    var teamList = this.afs.collection(`series/${seriesID}/maps/${mapID}/teams`).snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Team;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return teamList;
  }






  addPlayerToTeamInSeries(seriesID: string, teamID: string, player: TeamPlayer) {
    this.afs.collection(`series/${seriesID}/teams/${teamID}`).add(player)
      .then((res) => {
        console.log("player added to team" + player)

      })
      .catch((err) => {
        console.log("player not added")
        console.log(err)
      })
  }

  getPlayersFromTeamInSeries(seriesID: string, teamID: string): Observable<TeamPlayer[]> {
    var playerList = this.afs.collection(`series/${seriesID}/teams/${teamID}/players`).snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as TeamPlayer;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return playerList;
  }


  getPlayersFromTeamInMap(seriesID: string, mapID: string, teamID: string) {
    var playerList = this.afs.collection(`series/${seriesID}/maps/${mapID}/teams/${teamID}/players`).snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as TeamPlayer;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return playerList;
  }







}
