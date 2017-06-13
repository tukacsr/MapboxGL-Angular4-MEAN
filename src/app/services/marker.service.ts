import { Injectable } from '@angular/core';
import { Marker } from 'mapbox-gl'

import { MapService } from './map.service'
import { CommentService } from './comment.service'

import { Comment } from '../models/comment'

@Injectable()
export class MarkerService {
  comments: Comment[]
  loadMarkers
  el: HTMLElement

  constructor(private commentService: CommentService, private mapService: MapService) {
    this.loadMarkers = () => {
      this.commentService.getComments()
      .subscribe(data => {
        this.comments = data

        for (let i = 0; i < this.comments.length; i++) {
          this.el = document.createElement('div')
          this.el.id = `${this.comments[i].markerId}`
          this.el.style.backgroundImage =
          `url('http://2015.thefriendshipexpress.org/wp-content/uploads/2014/03/Map-Marker-Marker-Outside-Pink-icon.png')`
          this.el.style.backgroundSize = 'cover'
          this.el.style.width = '32px'
          this.el.style.height = '32px'
          this.el.style.cursor = 'pointer'

          new Marker(this.el, {offset:[-16, -32]})
            .setLngLat([this.comments[i].lng, this.comments[i].lat])
            .addTo(this.mapService.map);

        }
      })
    }
  }
}
