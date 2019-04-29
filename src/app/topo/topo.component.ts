import { Component, OnInit, Input } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'
import { Subject, of } from 'rxjs'
import { CarrinhoService } from '../carrinho.service';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;  
  private subjectPesquisa: Subject<string> = new Subject<string>();

  public itens = this.carrinho.itensCarrinho.length;

  constructor(private ofertasService: OfertasService, private carrinho: CarrinhoService) { }

 
  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorna Oferta[]
      .pipe(        
        debounceTime(1000), //executa a ação do switchMap após 1 segundo
        distinctUntilChanged(), //nao faz a requisição a Api caso a ultima busca for igual a atual
        switchMap((termo: string) => {  

          if(termo.trim() === '') {
            return of([]) 
          }  

          return this.ofertasService.pesquisaOfertas(termo)
        }),   
      
        catchError((error: any) => {          
          return of([])
        })
      )      
  }

  public pesquisa(valor: string): void {    
    this.subjectPesquisa.next(valor)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

  public  get pesq(): string {

    return ;
  }  

}
