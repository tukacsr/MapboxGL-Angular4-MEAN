import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { Router } from '@angular/router'
import { Map, MapMouseEvent, NavigationControl } from 'mapbox-gl'

import { CommentService } from '../../services/comment.service'
import { MapService } from '../../services/map.service'

import { Coords } from '../../models/coords'
import { Comment } from '../../models/comment'

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  map: Map
  comments: Comment[]
  coords: Coords
  data: Comment
  currentUser: string
  modal: HTMLElement
  showError: boolean

  constructor(private mapService: MapService, private router: Router,private commentService: CommentService, private http: Http) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser')
    this.modal = document.getElementById('myModal')
    this.modal.style.display = 'none'
    this.showError = false

    this.commentService.getComments()
    .subscribe(data => {
      this.comments = data
      this.markerEvent();
    })

    this.map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 5,
      center: [-70.880453, 40.897852]
    })

    this.markerEvent();
  }

  markerEvent() {
    this.map.on('load', () => {
      this.map.addControl(new NavigationControl())

      for (let i=0; i<this.comments.length; i++) {
        console.log(this.comments[i].comText)
      }

      this.map.on('click', (e: MapMouseEvent) => {
        this.modal.style.display = 'block'
        this.coords = e.lngLat
      });
    });
  }

  send(comment) {
    if (comment.value === '') {
      this.showError = true
    } else {

      this.data = {user: this.currentUser, comText: comment.value, lat: this.coords.lat, lng: this.coords.lng}
      this.commentService.createComment(this.data)
      .subscribe(data => { })

      comment.value = ''
      this.modal.style.display = 'none'
    }
  }

  close(comment) {
    comment.value = ''
    this.modal.style.display = 'none'
    this.showError = false;
  }

  logOut() {
    this.router.navigate(['login'])
    localStorage.setItem('currentUser', '')
  }
}
