import { Component, OnInit, AfterContentInit, ViewEncapsulation } from '@angular/core'
import { Http } from '@angular/http'
import { Router } from '@angular/router'
import { Map, Marker, MapMouseEvent } from 'mapbox-gl'

import { MapService } from '../../services/map.service'
import { CommentService } from '../../services/comment.service'
import { MarkerService } from '../../services/marker.service'

import { Comment } from '../../models/comment'

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  currentUser: string
  marker: Marker
  coords
  markerId: number
  data: Comment
  comments: Comment[]
  modal: HTMLElement
  showError: boolean
  showModal: boolean
  listComment: Array<String>
  listUser: Array<String>
  clicked: boolean
  myText: string
  thisMarker:string
  divId:string
  newCom

  constructor(
    private mapService: MapService,
    private markerService: MarkerService,
    private router: Router,
    private commentService: CommentService,
    private http: Http
  ) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser')
    this.showError = false
    this.showModal = false
    this.clicked = false
    this.myText = ''

    const map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 5,
      center: [19.0402, 47.4979]
    })

    this.mapService.map = map

    this.markerService.loadMarkers()

    this.commentService.getComments()
      .subscribe(data => {
        this.comments = data
        this.markerId = this.comments.length
      })

    this.markerEvent()
  }

  markerEvent() {
    this.mapService.map.on('load', () => {

      this.mapService.map.on('click', (e) => {
        if (e.originalEvent.path[0].id.substring(0, 6) === 'marker') {
          this.clicked = true

          this.divId = e.originalEvent.path[0].attributes[0].value

          let count = 0
          this.listComment = []
          this.listUser = []
          for (let i = 0; i < this.comments.length; i++) {
            if (this.divId === this.comments[i].markerId) {
                this.listComment[count] = this.comments[i].comText
                this.listUser[count] = this.comments[i].user
                count++
            }
          }

          this.showModal = true
        } else {
          this.clicked = false
          this.showModal = true
          this.coords = e.lngLat
        }
      })
    })
  }

  newMarker() {
    if (this.myText === '') {
      this.showError = true
    } else {
      const el = document.createElement('div')
      el.id = `marker-${this.markerId}`
      el.style.backgroundImage =
      `url('http://2015.thefriendshipexpress.org/wp-content/uploads/2014/03/Map-Marker-Marker-Outside-Pink-icon.png')`
      el.style.backgroundSize = 'cover'
      el.style.width = '32px'
      el.style.height = '32px'
      el.style.cursor = 'pointer'

      const marker:Marker = new Marker(el, {offset:[-16, -32]})
        .setLngLat(this.coords)
        .addTo(this.mapService.map)

      this.data = {
        markerId: `marker-${this.markerId}`,
        user: this.currentUser,
        comText: this.myText,
        lat: this.coords.lat,
        lng: this.coords.lng
      }

      this.markerId++

      this.commentService.createComment(this.data)
        .subscribe(data => {
          this.commentService.getComments()
            .subscribe(data => {
              this.comments = data
            })
        })

      this.myText = ''
      this.showModal = false
    }
  }

  newComment() {
    if (this.myText === '') {
      this.showError = true
    } else {
      for (let i = 0; i < this.comments.length; i++) {
        if (this.divId === this.comments[i].markerId) {
          this.newCom = this.comments[i]
        }
      }
    }

    this.data = {
      markerId: this.newCom.markerId,
      user: this.currentUser,
      comText: this.myText,
      lat: this.newCom.lat,
      lng: this.newCom.lng
    }

    this.commentService.createComment(this.data)
        .subscribe(data => {
          this.commentService.getComments()
            .subscribe(data => {
              this.comments = data
            })
        })

      this.myText = ''
      this.showModal = false
  }

  close() {
    this.myText = ''
    this.showModal = false
    this.showError = false
  }

  logOut() {
    this.router.navigate(['login'])
    localStorage.setItem('currentUser', '')
  }
}
