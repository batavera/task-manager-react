import { useNavigate } from "react-router-dom"

export function Login() {
    const navigate = useNavigate()

    function handleLogin() {
        localStorage.setItem("token", "123")
        navigate("/dashboard")
    }
    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Entrar</button>
        </div>
    )
}