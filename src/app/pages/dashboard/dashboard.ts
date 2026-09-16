import { Component } from '@angular/core';
import { Menu } from '../../componentes/menu/menu';
import { DadosVeiculo, Veiculo, VeiculosAPI } from '../../models/veiculo.model';
import { Vehicle } from '../../services/vehicle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  imports: [Menu, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  veiculos: Veiculo[] = [];
  veiculoSelecionado: Veiculo | null = null;

  vinCodigo = '';
  codigoVeiculo: DadosVeiculo | null = null;
  mensagemErro = '';

  constructor(private vehicle: Vehicle) {}

  ngOnInit(): void {
    this.vehicle.getVeiculos().subscribe((response: VeiculosAPI) => {
      this.veiculos = response.vehicles;
    });
  }

  buscarDadosVeiculo(): void {
    this.mensagemErro = '';
    this.codigoVeiculo = null;

    this.vehicle.getDadosVeiculo(this.vinCodigo.trim()).subscribe({
      next: (response: DadosVeiculo) => {
        this.codigoVeiculo = response;
      },
      error: (error: { error?: { message?: string } }) => {
        this.mensagemErro =
          error.error?.message || 'Não foi possível buscar os dados do veículo.';
      },
    });
  }

  veiculoEscolhido(event: Event): void {
    const idSelecionado = (event.target as HTMLSelectElement).value;
    if (idSelecionado) {
      this.veiculoSelecionado =
        this.veiculos.find((v) => v.id == Number(idSelecionado)) || null;
    }
  }
}