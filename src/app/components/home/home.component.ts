import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Timestamp } from '@firebase/firestore-types';
import { Series } from 'src/app/models/Series';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allSeries:Series[]
  sList:Series[]

  tempSeries:Series;

  loggedInUser:string
  series: Series = {
    id: '',
    created_by: '',
    created_date: '',
    isComplete: false,
    sid:''
  }

  constructor(
    private seriesService: SeriesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;

        this.seriesService.getSeriesList().subscribe(serieslist => {
          this.allSeries = serieslist
          console.log(this.allSeries)
        })

      } else {

        
       

      }
    });

  }

  addNewSeries(){
    // var d = new Date();
    // this.series.created_by = this.loggedInUser
    // this.series.created_date = d.toLocaleDateString();
    // this.series.isComplete = false;
    // this.series.sid = Math.floor(100000 + Math.random() * 900000).toString();
    // this.seriesService.newSeries(this.series)

    // console.log("addNewSeries called")


    // this.seriesService.getSeriesList().subscribe(serieslist => {
    //   this.allSeries = serieslist
    //   console.log(this.allSeries)
    // })

    // var s = this.allSeries.filter(series => series.sid = this.series.sid)

    // var sid = s[0].id
    // alert(sid)
    // this.router.navigate(["series/:"+sid])
  }

}
