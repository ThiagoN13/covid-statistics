<template>
  <div id="container">
    <mapa-brasil @click="buscarDados"></mapa-brasil>

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
  import CovidService from './service/covid-service'

  export default {
    components: {
      MapaBrasil
    },

    async created () {
      this.dados = await CovidService.listaCasosBrasil()
    },

    data () {
      return {
        uf: null,
        dados: {}
      }
    },

    methods: {
      async buscarDados (uf) {
        this.dados = await CovidService.listarPorEstado(uf) || {}
      }
    }
  }
</script>

<style>
  .conteudo {
    box-shadow: 2px -16px 48px -31px rgba(66,66,66,1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 15px;
  }

  .conteudo ul {
    list-style: none;
  }
</style>