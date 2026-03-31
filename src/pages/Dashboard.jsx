import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TaskItem } from "../components/TaskItem"
import {
  getTarefas,
  criarTarefa,
  deletarTarefa,
  atualizarTarefa
} from "../services/api"

export function Dashboard() {
  const navigate = useNavigate()

  const [tarefas, setTarefas] = useState([])
  const [novaTarefa, setNovaTarefa] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTarefas().then(setTarefas)
  }, [])

  function adicionarTarefa() {
    if (novaTarefa.trim() === "") return

    setLoading(true)

    criarTarefa({
      texto: novaTarefa,
      concluida: false
    })
      .then(nova => {
        setTarefas(prev => [...prev, nova])
        setNovaTarefa("")
      })
      .finally(() => setLoading(false))
  }

  function salvarEdicao(id, novoTexto) {
    const tarefa = tarefas.find(t => t.id === id)

    atualizarTarefa(id, {
      ...tarefa,
      texto: novoTexto
    }).then(atualizada => {
      setTarefas(prev =>
        prev.map(t => (t.id === id ? atualizada : t))
      )
    })
  }

  function removerTarefa(id) {
    deletarTarefa(id).then(() => {
      setTarefas(prev => prev.filter(t => t.id !== id))
    })
  }

  function toggleConcluida(id) {
    const tarefa = tarefas.find(t => t.id === id)

    atualizarTarefa(id, {
      ...tarefa,
      concluida: !tarefa.concluida
    }).then(atualizada => {
      setTarefas(prev =>
        prev.map(t => (t.id === id ? atualizada : t))
      )
    })
  }

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div style={{ width: "400px" }}>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>

      <button
        onClick={handleLogout}
        style={{ marginBottom: "15px" }}
      >
        Sair
      </button>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          style={{ flex: 1 }}
        />

        <button onClick={adicionarTarefa} disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tarefas.map(tarefa => (
          <TaskItem
            key={tarefa.id}
            tarefa={tarefa}
            onDelete={removerTarefa}
            onToggle={toggleConcluida}
            onEdit={salvarEdicao}
          />
        ))}
      </ul>
    </div>
  )
}