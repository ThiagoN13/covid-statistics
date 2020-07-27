<template>
  <div class="conteudo">
    <div class="row">
      <span class="valor" :class="{ 'active': filtrar === 'cases' }" @click="setFiltro('cases')">Casos</span>
      <span class="valor" :class="{ 'active': filtrar === 'suspects' }" @click="setFiltro('suspects')">Suspeitos</span>
      <span class="valor" :class="{ 'active': filtrar === 'refuses' }" @click="setFiltro('refuses')">Recuperados</span>
      <span class="valor" :class="{ 'active': filtrar === 'deaths' }" @click="setFiltro('deaths')">Mortes</span>
    </div>

    <div id="piechart"></div>
  </div>
</template>

<script>
import CovidService from '../services/covid-service'

export default {
  async mounted () {
    await this.buscarDados()

    // Load google charts
    window.google.charts.load('current', {'packages':['corechart']});
    window.google.charts.setOnLoadCallback(this.drawChart);
  },

  data () {
    return {
      filtrar: 'cases',
      dados: []
    }
  },

  methods: {
    setFiltro (campo) {
      this.filtrar = campo

      this.drawChart()
    },

    async buscarDados () {
      this.$emit('start-loading')
      this.dados = await CovidService.listarTodosEstados()
      this.$emit('stop-loading')
    },

    drawChart () {
      const itens = [
        ['Estado', 'Dados']
      ]

      this.dados
        .forEach(estado => itens.push([ estado.state, estado[this.filtrar] ]))

      const data = window.google.visualization.arrayToDataTable(itens)
      const options = { is3D: true }
      // Display the chart inside the <div> element with id="piechart"
      const chart = new window.google.visualization.PieChart(document.getElementById('piechart'))
      chart.draw(data, options)
    }
  }
}
</script>

<style scoped>
  .valor {
    cursor: pointer;
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
  }

  .valor.active {
    color: #ffffff;
    background-color: #0094d9;
  }

  .row {
    text-align: center;
    padding: 10px;
  }
</style>