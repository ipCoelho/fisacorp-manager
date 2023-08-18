import React, { useState, useEffect } from 'react';
import './TasksDashboard.scss';
import logo from '../../assets/svg/fisacorp-logo.svg';
import { Button, TextField, Typography } from '@material-ui/core';
import CircleRounded from '@mui/icons-material/CircleRounded';
import CheckCircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createTask, deleteTask, getTasks } from '../../services/tasks';

export default function TasksDashboard() {
  const [username, setUsername] = useState('usuário');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('username');
    const userId = localStorage.getItem('id'); // Assuming you have userId stored in localStorage

    setUsername(user);

    async function fetchTasks() {
      try {
        const { data: fetchedTasks } = await getTasks(userId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (task) {
      try {
        const { data: createdTask, status } = await createTask({
          title: new Date().toString(),
          description: task,
          fulfilled: false,
          user_id: localStorage.getItem('id'),
        });

        if (status <= 299) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleMarkAsFinished = (taskId) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t,
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((t) => t.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="main-task-container">
      <header className="task-header">
        <div className="user-info">
          <Typography style={{ fontSize: '14px' }} variant="h6">
            Bem vindo, {username}
          </Typography>
          <img src={logo} alt="User" className="user-photo" />
        </div>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <div className="task-insertion">
        <TextField
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddTask()}
          className="add-task-btn"
        >
          Criar <AddCircleOutlineIcon className="add-icon" />
        </Button>
      </div>

      <main className="task-content">
        <div className="task-overview">
          <Typography
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#15E823' }}
            variant="h6"
          >
            Tarefas criadas {tasks.length}
          </Typography>
          <Typography
            style={{ fontSize: '14px', fontWeight: 'bold', color: '#15E823' }}
            variant="h6"
          >
            Concluídas {tasks.filter((t) => t.completed).length} de{' '}
            {tasks.length}
          </Typography>
        </div>

        <div className="task-list">
          {tasks.length > 0 || console.log(tasks) ? (
            tasks.map((t) => (
              <div className="task-item" key={t.id}>
                {t.completed ? (
                  <CircleRounded
                    style={{ color: '#15E823' }}
                    onClick={() => handleMarkAsFinished(t.id)}
                  />
                ) : (
                  <CheckCircleOutlinedIcon
                    style={{ color: '#15E823' }}
                    onClick={() => handleMarkAsFinished(t.id)}
                  />
                )}
                <Typography style={{ fontSize: '14px' }} variant="body1">
                  {t.description}
                </Typography>
                <DeleteForeverOutlinedIcon
                  style={{ color: '#3D443D' }}
                  onClick={() => handleDeleteTask(t.id)}
                />
              </div>
            ))
          ) : (
            <Typography style={{ fontSize: '16px', textAlign: 'center' }}>
              Você ainda não possui tarefas.
            </Typography>
          )}
        </div>
      </main>
    </div>
  );
}
