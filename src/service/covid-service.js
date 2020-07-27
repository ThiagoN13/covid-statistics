const url = 'https://covid19-brazil-api.now.sh'

function listarTodosEstados () {
  return fetch(`${url}/api/report/v1`)
    .then(resultado => resultado.json())
    .then(resultado => resultado.data)
}

function listarPorEstado (uf) {
  console.log(`${url}/api/report/v1/brazil/uf/${uf}`)
  return fetch(`${url}/api/report/v1/brazil/uf/${uf}`)
    .then(resultado => resultado.json())
    .then(resultado => resultado)
}

function listaCasosBrasil () {
  return fetch(`${url}/api/report/v1/brazil`)
    .then(resultado => resultado.json())
    .then(resultado => resultado.data)
}

function getStatusApi () {
  return fetch(`${url}/api/status/v1`)
    .then(resultado => resultado.json())
    .then(resultado => resultado.data)
}

export default {
  listarTodosEstados,
  listarPorEstado,
  listaCasosBrasil,
  getStatusApi
}