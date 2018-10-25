import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player';
import { MatPaginator} from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
  players: Player[];
  displayedColumns: string[] = ['gamerID','kills', 'deaths', 'damage', 'mapsPlayed', 'team',
'mapsWon','mapsLost']
  dataSource;
 // dataSource = new MatTableDataSource<Player>(this.players)

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  constructor(private playerService:PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(playerlist => {
      this.players = playerlist;
      this.dataSource = new MatTableDataSource(this.players)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })


  }

}
