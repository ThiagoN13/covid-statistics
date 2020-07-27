<template>
  <div class="list-card">
    <h3>Dados de todos os países</h3>

    <div class="card" v-for="(pais, $index) in dados" :key="$index">
      <h4>{{ pais.country }}</h4>
      <hr>

      <div class="row">
        <div class="col">
          <b>Casos</b> <span>{{ pais.cases | formatNumber }}</span>
        </div>

        <div class="col">
          <b>Confirmados</b> <span>{{ pais.confirmed | formatNumber }}</span>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b>Recuperados</b> <span>{{ pais.recovered | formatNumber }}</span>
        </div>

        <div class="col">
          <b>Mortes</b> <span>{{ pais.deaths | formatNumber }}</span>
        </div>
      </div>

      <div>
        <b>Última atualização</b> <span> {{ pais.updated_at | formatDate }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import CovidService from '../services/covid-service'

export default {
  created () {
    this.buscarDados()
  },

  data () {
    return {
      dados: []
    }
  },

  methods: {
    async buscarDados () {
      this.$emit('start-loading')
      this.dados = await CovidService.listaCasosPaises()
      this.$emit('stop-loading')
    }
  }
}
</script>

<style scoped>
  .list-card {
    padding: 20px;
  }

  .card {
    font-size: 14px;
    padding: 10px;
    background-color: #ffffff;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  }

  .row {
    margin-bottom: 5px;
  }

  .card h4 {
    margin: 0;
  }

  .col {
    width: 50%;
    display: inline-block;
  }
</style>