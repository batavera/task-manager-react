import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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

  const [editandoTarefaId, setEditandoTarefaId] = useState(null)
  const [textoEditado, setTextoEditado] = useState("")

  useEffect(() => {
    getTarefas().then(setTarefas)
  }, [])

  async function adicionarTarefa(e) {
    e.preventDefault()

    if (!novaTarefa.trim()) return

    setLoading(true)

    try {
      const nova = await criarTarefa({
        texto: novaTarefa,
        concluida: false
      })

      setTarefas(prev => [...prev, nova])
      setNovaTarefa("")
    } finally {
      setLoading(false)
    }
  }

  function iniciarEdicao(tarefa) {
    setEditandoTarefaId(tarefa.id)
    setTextoEditado(tarefa.texto)
  }

  async function salvarEdicao(id) {
    const tarefa = tarefas.find(t => t.id === id)

    const atualizada = await atualizarTarefa(id, {
      ...tarefa,
      texto: textoEditado
    })

    setTarefas(tarefas.map(t =>
      t.id === id ? atualizada : t
    ))

    setEditandoTarefaId(null)
    setTextoEditado("")
  }

  function removerTarefa(id) {
    deletarTarefa(id).then(() => {
      setTarefas(tarefas.filter(t => t.id !== id))
    })
  }

  function toggleConcluida(id) {
    const tarefa = tarefas.find(t => t.id === id)

    atualizarTarefa(id, {
      ...tarefa,
      concluida: !tarefa.concluida
    }).then(atualizada => {
      setTarefas(tarefas.map(t =>
        t.id === id ? atualizada : t
      ))
    })
  }

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>

      <button
        onClick={handleLogout}
        style={{ marginBottom: "15px" }}
      >
        Sair
      </button>

      {/* FORM = ENTER FUNCIONA AUTOMÁTICO */}
      <form
        onSubmit={adicionarTarefa}
        style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
      >
        <input
          placeholder="Nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          style={{ flex: 1 }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </form>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id} style={{ marginBottom: "10px" }}>
            {editandoTarefaId === tarefa.id ? (
              <>
                <input
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                />
                <button onClick={() => salvarEdicao(tarefa.id)}>
                  Salvar
                </button>
              </>
            ) : (
              <span
                onClick={() => toggleConcluida(tarefa.id)}
                onDoubleClick={() => iniciarEdicao(tarefa)}
                style={{
                  textDecoration: tarefa.concluida ? "line-through" : "none",
                  cursor: "pointer"
                }}
              >
                {tarefa.texto}
              </span>
            )}

            <button onClick={() => removerTarefa(tarefa.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}