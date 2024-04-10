import React, { useState, useEffect } from 'react';
import '../src/Estilos/styles.css'; // Importamos los estilos CSS

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);
 

  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');

  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setInputBody(e.target.value);
  };

  const handleAddTask = () => {
    if (inputTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: inputTitle,
        body: inputBody,
        completed: false,
        date: new Date().toLocaleString() // Agregamos la fecha y hora actual
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      alert('ENTRO');
      setInputTitle('');
      setInputBody('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  return (
    <div className="container"> 
      <h1>Lista de Tareas</h1>
      <div className="form"> 
        <h3>Titulo</h3>
        <input type="text" value={inputTitle} onChange={handleTitleChange} className="input" /> 
        <h3>Cuerpo</h3>
        <textarea value={inputBody} onChange={handleBodyChange} className="input" /> {/* Usamos un textarea para el cuerpo */}
        <button onClick={handleAddTask} className="button">Agregar Tarea</button> 
      </div>
      <ul className="task-list"> 
        {tasks.map(task => (
          <li key={task.id} className="task"> 
            <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id)} className="task-checkbox" />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }} className="task-text">
              {task.title} - {task.date}  
            </span>
            <span>{task.body} </span>
            <button onClick={() => handleDeleteTask(task.id)} className="task-action">Eliminar</button> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
