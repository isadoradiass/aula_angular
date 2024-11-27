import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { CepService } from './cep.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent implements OnInit {
  @Input() titleHome = 'Consultando CEP';
  buscacep: string = '';
  buscar: boolean = false;

  constructor(
    private cepService: CepService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Buscando CEP');
  }

  buscarCEP(buscacep: string, form: any) {
    if (buscacep && buscacep.length === 10) {  // Verifica se o CEP é válido
      this.cepService.consultaCEP(buscacep).subscribe({
        next: (dados: any) => {
          this.buscar = true;
          this.populaCEPForm(dados, form);
        },
        error: (err: any) => {
          this.resetaCEPForm(form);
          this.buscar = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao buscar CEP!'
          });
        }
      });
    }
  }

  populaCEPForm(dados: any, formulario: any) {
    formulario.form.patchValue({
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  resetaCEPForm(formulario: any) {
    formulario.form.patchValue({
      logradouro: null,
      bairro: null,
      cidade: null,
      estado: null
    });
    this.buscar = false;
  }
}
