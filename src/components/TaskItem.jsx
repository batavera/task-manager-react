import { useState } from "react"

export function TaskItem({ tarefa, onDelete, onToggle, onEdit }) {
  const [editando, setEditando] = useState(false)
  const [texto, setTexto] = useState(tarefa.texto)

  return (
    <li>
      {editando ? (
        <>
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <button onClick={() => {
            onEdit(tarefa.id, texto)
            setEditando(false)
          }}>
            Salvar
          </button>
        </>
      ) : (
        <span
          onClick={() => onToggle(tarefa.id)}
          onDoubleClick={() => setEditando(true)}
          style={{
            textDecoration: tarefa.concluida ? "line-through" : "none",
            cursor: "pointer"
          }}
        >
          {tarefa.texto}
        </span>
      )}

      <button onClick={() => onDelete(tarefa.id)}>
        X
      </button>
    </li>
  )
}