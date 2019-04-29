import { ItemCarrinho } from './shared/item-carrinho.model'
import { Observable } from 'rxjs';
import { Oferta } from './shared/oferta.model';
import { URL_API } from './app.api';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable()
export class CarrinhoService {

    public itens: ItemCarrinho[] = [];
    
    constructor(private http: Http) {}

    public itensCarrinho(): ItemCarrinho[] {        
        return this.itens;        
    }

    public incluirItem(oferta: Oferta): void {        
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[1],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );
    
        // verifica se o item em questão já existe dentro de this.intes
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if(itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }            
    }

    public quantidadeItens(): number { 
        console.log(this.itens.length)       
        return this.itens.length;        
    }

    public totalCarrinho(): number {
        let total: number = 0;

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.preco * item.quantidade)
        })        
        return total;
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id == itemCarrinho.id)

        if(itemEncontrado) {
            itemEncontrado.quantidade += 1; 
        }
    }

    public subtrairQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id == itemCarrinho.id)

        if(itemEncontrado) {
            itemEncontrado.quantidade -= 1;

            if(itemEncontrado.quantidade == 0) {
                this.itens.splice(this.itens.indexOf(itemEncontrado), 1)
            }
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}



