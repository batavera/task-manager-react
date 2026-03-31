import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { PrivateRoute } from "./components/PrivateRoute"
import "./App.css"


function App() {
  return (
    <BrowserRouter basename="/task-manager-react">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App