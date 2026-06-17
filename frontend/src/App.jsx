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
  
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [newPriori, setnewPriori] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescrip, setnewDescrip] = useState("");


  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  


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

  const handleEdit = (task) => {
      setEditingTaskId(task.id);
      setEditTitle(task.title);
      setEditDescription(task.description || "");
      setEditPriority(task.priority);
  };

  const handleSave = async (taskId) => {
    try{
      await axios.put(
        `${API_URL}/tasks/${taskId}`,{title: editTitle, description: editDescription, priority: editPriority},
        {headers: {Authorization:"Bearer " + token}}
      );

    const updatedTasks = selectedList.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          id: task.id,
          title: editTitle,
          description: editDescription,
          priority: editPriority,
          completed: task.completed,
          todoListId: task.todoListId
        };
      }
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: task.completed,
        todoListId: task.todoListId
      };
    });
    setSelectedList({
      id: selectedList.id,
      title: selectedList.title,
      description: selectedList.description,
      tasks: updatedTasks
    });

    setEditingTaskId(null);
    } catch (error){
            console.error(error);

    }
  };

const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/tasks`,{
          title: newTitle,
          description: newDescrip,
          priority: newPriori,
          todoListId: selectedList.id},
        {headers:{Authorization: "Bearer " + token}}
      );

    const newTaskis = selectedList.tasks.concat(response.data.data);
    const newSelecList = {
      id: selectedList.id,
      title: selectedList.title,
      description: selectedList.description,
      tasks: newTaskis
    };
    setSelectedList(newSelecList);
    setNewTitle("");
    setnewDescrip("");
    setnewPriori("");
    } catch (error) {
            console.error(error);

    }
};


const handleDelete = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {Authorization: "Bearer " + token}
    });

    const newTasks = selectedList.tasks.filter(function(task) {
      return task.id !== taskId;
    });

    const newSelectedList = {
      id: selectedList.id,
      title: selectedList.title,
      description: selectedList.description,
      tasks: newTasks
    };

    setSelectedList(newSelectedList);

  } catch (error) {
          console.error(error);

  }
};

const handleUploadFile = async () => {
  try {
    if (!file) {
      alert("No elegiste archivo");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("todoListId", selectedList.id);

    await axios.post(
      `${API_URL}/files`, formData, {
        headers: { Authorization: "Bearer " + token }
      }
    );

    alert("Archivo subido");
    setFile(null);
  } catch (error) {
          console.error(error);

    alert("Error subiendo archivo");
  }
};

const loadFiles = async (todoListId) => {
  try {
    const response = await axios.get(
      `${API_URL}/files/${todoListId}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    setFiles(response.data.data);
  } catch (error) {
          console.error(error);
  }
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

      <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <h2>Crear una Nueva Taraea</h2>
        <p>Título</p>
        <input value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <p>Descripción</p>
        <input value={newDescrip}
          onChange={(e) => setnewDescrip(e.target.value)}
        />
        <p>Prioridad</p>
        <input value={newPriori}
          onChange={(e) => setnewPriori(e.target.value)}
        />
        <br />
        <button onClick={handleCreateTask}>
          Crear Task
        </button>
        <hr />


        <h2>Tareas</h2>
        {selectedList.tasks.length === 0 ? (<p>No hay tareas.</p>) :(
          selectedList.tasks.map((task) => (
            <div key={task.id}>
                {editingTaskId === task.id ? (
                  <div>
                    <p>Título</p>
                    <input value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <p>Descripción</p>
                    <input value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <p>Prioridad</p>
                    <input value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                    />
                    <br />
                    <button onClick={() => handleSave(task.id)}>
                      Guardar
                    </button>
                  </div>
                ):(
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Estado:{task.completed ? " Completada" : " Pendiente"}</p>
                    <p>Prioridad:{task.priority}</p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      <button onClick={() => handleEdit(task)}>
                        Editar
                      </button>
                      <button onClick={() => handleDelete(task.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
                <hr />
              </div>
          ))
        )}
      </div>
        <div style={{ flex: 1 }}>
          <h2>Archivos</h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

         <p>{file ? file.name : "Elige algun archivod"}</p>

          <button onClick={handleUploadFile}>
            Subir archivo
          </button>

          <h3>Archivos subidos</h3>
          {files.length === 0 ? <p>No hay archivos.</p> : (
            files.map((f) => (
              <div key={f.id}>
                <a href={f.url} target="_blank">{f.name}</a>
                <hr />
              </div>
            ))
          )}
        </div>
    </div>
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
        onClick={() => { setSelectedList(list); loadFiles(list.id); }}
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