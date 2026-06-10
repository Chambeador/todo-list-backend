import { useState, useEffect } from "react";

import axios from "axios";

const API_URL = "http://localhost:3000";

function App(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [todoLists, setTodoLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [message, setMessage] = useState("");


 useEffect(() => {
  if (!token) return;
  const loadTodoLists = async () => {
    try{
      const response = await axios.get(
        `${API_URL}/todolists`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      setTodoLists(response.data.data);
    }catch(error){
      console.error(error);
      setMessage("Error al cargar las listas");
    }
  };
    loadTodoLists();
  }, [token]);



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password }
      );

      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setMessage("");
    } catch (error){
      console.error(error);
      setMessage("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTodoLists([]);
    setSelectedList(null);
    setEmail("");
    setPassword("");
  };

const renderLogin = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <p>Correo</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Contraseña</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">
          Entrar
        </button>
      </form>
      <p>{message}</p>
    </div>
  );

};

if (!token) {
  return renderLogin();
}


if(selectedList){
  return (
    <div>
      <button onClick={() => setSelectedList(null)}>
        Volver
      </button>
      <h1>{selectedList.title}</h1>
      <p>{selectedList.description}</p>
      <h2>Tareas</h2>
      {selectedList.tasks.length === 0 ? (<p>No hay tareas.</p>) :(
        selectedList.tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Estado: {task.completed? " Completada": " Pendiente"}</p>
            <p>Prioridad: {task.priority}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

return (

  <div>
    <h1>Mis TodoLists</h1>
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
    <hr />
    {todoLists.map((list) => (
      <div
        key={list.id}
        onClick={() => setSelectedList(list)}
        className="todo-card"
      >
        <h2>{list.title}</h2>
        <p>{list.description}</p>
        <hr />
      </div>
    ))}
  </div>
);

}

export default App;