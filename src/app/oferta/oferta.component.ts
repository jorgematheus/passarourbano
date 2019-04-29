import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { CarrinhoService } from '../carrinho.service';



@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]  
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;    

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinho: CarrinhoService
  ) { }
  

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {

      this.ofertasService.getOfertaPorId(parametros.id)
       .then((resposta: Oferta) => this.oferta = resposta)       
    })       
  }

  public adicionarItemCarrinho(): void {      
    this.carrinho.incluirItem(this.oferta);  
    this.carrinho.itensCarrinho();
    this.carrinho.quantidadeItens();   
  } 

}
