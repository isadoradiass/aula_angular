import { Component, OnInit } from '@angular/core';
import { CnpjService } from './cnpj.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']
})
export class CnpjComponent implements OnInit {
  buscacnpj: string = '';
  buscar: boolean = false;

  constructor(
    private cnpjService: CnpjService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  buscarCNPJ(buscacnpj: string, form: any) {
    if (buscacnpj) {
      this.cnpjService.consultaCNPJ(buscacnpj).subscribe({
        next: (dados: any) => {
          console.log('Dados recebidos do serviço:', dados); // Verifique os dados recebidos
          this.buscar = true;
          setTimeout(() => {
            this.populaCNPJForm(dados, form);
          }, 100);
        },
        error: (e) => {
          console.error('Erro ao buscar CNPJ:', e); // Log de erro
          this.resetaCNPJForm(form);
          this.buscar = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao buscar CNPJ!'
          });
        }
      });
    }
  }
  
  populaCNPJForm(dados: any, form: any) {
    form.form.patchValue({
      razaoSocial: dados.razao_social,
      nomeFantasia: dados.nome_fantasia,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.municipio,
      estado: dados.uf
    });
  }

  resetaCNPJForm(form: any) {
    form.form.patchValue({
      razaoSocial: null,
      nomeFantasia: null,
      logradouro: null,
      bairro: null,
      cidade: null,
      estado: null
    });
    this.buscar = false;
  }
}
