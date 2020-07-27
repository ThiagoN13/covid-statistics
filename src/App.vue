<template>
  <div id="container">
    <div class="mapa">
      <mapa-brasil @click="buscarDados" v-if="visualizacao === 'mapa'"></mapa-brasil>
      <lista-paises v-if="visualizacao === 'listaPaises'" @start-loading="startLoading" @stop-loading="stopLoading"></lista-paises>
      <grafico v-if="visualizacao === 'grafico'" @start-loading="startLoading" @stop-loading="stopLoading"></grafico>
    </div>

    <button type="button" class="btn-toggle" @click="toggleVisualizacao">
      <img src="./assets/img/chart.png" alt="" srcset="">
    </button>

    <loading :enable="carregamento"></loading>

    <div v-if="carregamento" class="loading-backdrop"></div>

    <card-conteudo ref="cardConteudo" @start-loading="startLoading" @stop-loading="stopLoading"></card-conteudo>
  </div>
</template>

<script>
  import MapaBrasil from './components/MapaBrasil'
  import Loading from './components/Loading'
  import CardConteudo from './components/CardConteudo'
  import ListaPaises from './components/ListaPaises'
  import Grafico from './components/Grafico'

  export default {
    components: {
      MapaBrasil,
      Loading,
      CardConteudo,
      ListaPaises,
      Grafico
    },

    data () {
      return {
        visualizacaoDisponiveis: ['mapa', 'listaPaises', 'grafico'],
        visualizacao: 'mapa',
        carregamento: false
      }
    },

    methods: {
      buscarDados (uf) {
        this.$refs.cardConteudo.buscarDados(uf)
      },

      toggleVisualizacao () {
        const index = this.visualizacaoDisponiveis.indexOf(this.visualizacao)

        if (index >= 0 && this.visualizacaoDisponiveis[index + 1]) {
          this.visualizacao = this.visualizacaoDisponiveis[index + 1]
        } else {
          this.visualizacao = this.visualizacaoDisponiveis[0]
        }

        this.$refs.cardConteudo.buscarDadosBrasil()
      },

      startLoading () {
        this.carregamento = true
      },

      stopLoading () {
        this.carregamento = false
      }
    }
  }
</script>

<style scoped>
  #container {
    height: 100%;
    width: 100%;
  }

  .btn-toggle {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 50%;
    width: 40px;
    height: 35px;
    padding: 5px;
    outline: none;
    border-color: #0094d9;
  }

  .btn-toggle img {
    width: 100%;
    height: 100%;
  }

  .mapa {
    background: #efefef;
    height: 100vh;
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
</style>