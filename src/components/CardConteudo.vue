<template>
  <div class="conteudo">
    <span class="expand" @click="toggleConteudo"></span>

    <div class="dados" :class="{ 'show': collapse }">
      <div class="api-error" v-if="!status">
        <span>API fora do ar, tente novamente ou mais tarde</span>
      </div>
      
      <ul v-else>
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
          <b>Última atualização: </b> <span class="valor"> {{ (dados.updated_at || dados.datetime) | formatDate }} </span>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import CovidService from '../services/covid-service'

export default {
  async created () {
    try {
      await this.buscarStatusAPI()
      this.buscarDadosBrasil()
    } catch (error) {
      this.status = false
    }
  },

  data () {
    return {
      status: false,
      collapse: false,
      dados: {}
    }
  },

  methods: {
    async buscarDadosBrasil () {
      this.$emit('start-loading')
      this.dados = await CovidService.listaCasosBrasil()
      this.$emit('stop-loading')
      this.collapse = true
    },

    async buscarStatusAPI () {
      this.$emit('start-loading')
      const resultado = await CovidService.getStatusApi()

      this.status = resultado.status === 'ok'
      this.$emit('stop-loading')
    },

    async buscarDados (uf) {
      this.$emit('start-loading')
      this.dados = await CovidService.listarPorEstado(uf) || {}
      this.$emit('stop-loading')
      this.collapse = true
    },

    toggleConteudo () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style scoped>
  .api-error {
    display: block;
    color: rgb(180, 11, 11);
    text-align: center;
    margin-top: 10px;
  }

  .dados {
    display: none;
  }

  .dados.show {
    display: block;
  }

  .expand {
    cursor: pointer;
    background-color: #747474;
    width: 50px;
    height: 5px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  .conteudo {
    z-index: 2;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 31px 18px 82px -5px rgba(66,66,66,1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .conteudo ul {
    padding: 0 20px 0 20px;
    list-style: none;
  }
</style>