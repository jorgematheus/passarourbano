import { Component, OnInit, OnChanges } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public restaurantes: Oferta[];  

  constructor(private ofertasService: OfertasService) {  }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('restaurante')
      .then( ( ofertas: Oferta[] )  => {
        this.restaurantes = ofertas;
     })  
     .catch( ( param:any ) => {
       console.log(param) 
     })
  }

  ngOnChanges() {
    
  }


}
