import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor() { 
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZHozMTY0MjQiLCJhIjoiNzI3NmNkOTcyNWFlNGQxNzU2OTA1N2EzN2FkNWIwMTcifQ.NS8KWg47FzfLPlKY0JMNiQ';
  }

}