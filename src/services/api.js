const URL = "http://localhost:3000/tasks"

export async function getTarefas() {
  const res = await fetch(URL)
  return res.json()
}

export async function criarTarefa(tarefa) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tarefa)
  })
  return res.json()
}

export async function deletarTarefa(id) {
  await fetch(`${URL}/${id}`, {
    method: "DELETE"
  })
}

export async function atualizarTarefa(id, tarefa) {
  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tarefa)
  })
  return res.json()
}