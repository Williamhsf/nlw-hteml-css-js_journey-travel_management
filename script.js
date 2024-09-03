// bibliotecas e códigos de terceiros
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm'),
  }
}

// objeto
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true
}

// lista, array, vetor
let atividades = [
  atividade,
  {
    nome: 'Academia em grupo',
    data: new Date("2024-07-08 12:00"),
    finalizada: false
  },
  {
    nome: 'Gaming session',
    data: new Date("2024-10-08 11:00"),
    finalizada: true
  }
]

// atividades = []

const criarItemDeAtividade = (atividade) => {
  
  let input = `
    <input
      onchange="concluirAtividade(event)"
      value="${atividade.data}"
      type="checkbox"
  `

  if(atividade.finalizada) {
    input += 'checked'
  }

  input += '>'

  const formatar = formatador(atividade.data)

  return `
    <div>
      ${input}
      <span>${atividade.nome}</span>
      <time>
        ${formatar.dia.semana.longo}, 
        dia ${formatar.dia.numerico}
        de ${formatar.mes}
        às ${formatar.hora}h
      </time>
    </div>
  `
} 
 
const atualizarListaDeAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  // verificar se a lista esta vazia
  if(atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
  }

  for(let atividade of atividades) {  
    section.innerHTML += criarItemDeAtividade(atividade)
    // return
  }
}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}`

  const NovaAtividade = {
    nome,
    data,
    finalizada: false
  }

  // verificar se já não tem aquela atividade guardada
  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == NovaAtividade.data
  })

  if(atividadeExiste) {
    return alert('Dia/Hora não disponível')
  }

  // adicionar as atividades
  atividades = [NovaAtividade, ...atividades]
  atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
// dias disponiveis em formato de lista
const dias = [
  "2024-09-05",
  "2024-09-06",
  "2024-09-07",
  "2024-09-08",
]

let diasSelecao = ''

for(let dia of dias) {
  const formatar = formatador(dia)
  const diaFormatado = `
    ${formatar.dia.numerico} de 
    ${formatar.mes}
  `

  diasSelecao += `
    <option value="${dia}">
      ${diaFormatado}
    </option>
  `
}

document
.querySelector('select[name="dia"]')
.innerHTML = diasSelecao

}
criarDiasSelecao()

const criarHoraSelecao = () => {
  // horários disponiveis em formato de lista
  let horasDisponiveis = ''

  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, '0')
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
    horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    
  }

  document
  .querySelector('select[name="hora"]')
  .innerHTML = horasDisponiveis
}
criarHoraSelecao()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  })

  if(!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada 
}