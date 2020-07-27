<template>
  <div id="container">
    <div class="mapa">
      <mapa-brasil @click="buscarDados"></mapa-brasil>
    </div>

    <loading :enable="carregamento"></loading>

    <div v-if="carregamento" class="loading-backdrop"></div>

    <div class="conteudo">
      <ul>
        <li>
          <b>{{ dados.state ? 'Cidade:' : 'País:' }}</b> <span class="valor"> {{ dados.country || dados.state }} </span>
        </li>

        <li>
          <b>Casos: </b> <span class="valor"> {{ dados.cases | formatNumber }} </span>
        </li>

        <li v-if="dados.suspects">
          <b>Suspeitos: </b> <span class="valor"> {{ dados.suspects | formatNumber }} </span>
        </li>

        <li>
          <b>Mortes: </b> <span class="valor"> {{ dados.deaths | formatNumber }} </span>
        </li>

        <li>
          <b>Recuperados: </b> <span class="valor"> {{ (dados.recovered || dados.refuses)  | formatNumber }} </span>
        </li>

        <li>
          <b>Atualizado em: </b> <span class="valor"> {{ (dados.updated_at || dados.datetime) | formatDate }} </span>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
  import MapaBrasil from './components/MapaBrasil'
  import Loading from './components/Loading'
  import CovidService from './service/covid-service'

  export default {
    components: {
      MapaBrasil,
      Loading
    },

    async created () {
      this.carregamento = true
      this.dados = await CovidService.listaCasosBrasil()
      this.carregamento = false
    },

    data () {
      return {
        carregamento: false,
        dados: {}
      }
    },

    methods: {
      async buscarDados (uf) {
        this.carregamento = true
        this.dados = await CovidService.listarPorEstado(uf) || {}
        this.carregamento = false
      }
    }
  }
</script>

<style>
  #container {
    height: 100%;
    width: 100%;
  }

  .mapa {
    background: #efefef;
    height: 100%;
  }

  .loading-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
    opacity: .1;
  }

  .conteudo {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-shadow: 2px -16px 48px -31px rgba(66,66,66,1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .conteudo ul {
    list-style: none;
  }
</style>