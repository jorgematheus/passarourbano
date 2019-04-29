import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService }  from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedido: number;  
  public itensCarrinho: ItemCarrinho[] = [];
  public total = 0;

  public num = this.carrinhoService.itensCarrinho.length;


  public form: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl('', [Validators.required])
  });

  constructor(
    private ordemCompraService: OrdemCompraService, 
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {  
    this.itensCarrinho = this.carrinhoService.itensCarrinho();       
  }

  public confirmarCompra(): void {   
    console.log(this.form)
    if(!this.form.valid) {
      this.form.get('endereco').markAsTouched();
      this.form.get('numero').markAsTouched();
      this.form.get('complemento').markAsTouched();
      this.form.get('formaPagamento').markAsTouched();
      console.log('formulario valido: '+ this.form.valid)
    } else {
      let control = this.form.controls;
      let pedido: Pedido = new Pedido(
        control.endereco.value, 
        control.numero.value, 
        control.complemento.value, 
        control.formaPagamento.value,
        this.carrinhoService.itensCarrinho()
      );
      
      this.ordemCompraService.efetivarCompra(pedido)
       .subscribe((id: number) => {
          this.idPedido = id;
          this.carrinhoService.limparCarrinho();
        })

        console.log(pedido)
      }
  } 
  
  public acrescentarItem(quantidade: number): number {    
    let total = quantidade + 1;
    console.log('novo valor: ', total)
    return total;
    
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item);
  }

  public subtrair(item: ItemCarrinho): void {
    this.carrinhoService.subtrairQuantidade(item);
  }
}
