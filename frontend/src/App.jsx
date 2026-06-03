import { useEffect, useState } from "react";

import axios from "axios";

const URL = "http://localhost:3000/tasks";
function App() {

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try{
        const response = await axios.get(URL);
        setTasks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);


  return (
    <div>
      <h1>Hola aqui esta mi TODO-LIST</h1>
      <p>Cantidad de tareas: {tasks.length} </p>

      {tasks.map((task) => (

        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Estado: {task.completed ? "lista" : "aun falta"}</p>
          <p>Prioridad: {task.priority}</p>
        </div>
      ))}
    </div>
  );
}

export default App;