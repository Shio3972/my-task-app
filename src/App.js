import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskItem from './components/TaskItem';
import AddTaskModal from './components/AddTaskModal';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('hitome-tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Facebook記事作成', user: '山川', date: '2026-01-27', status: '進行中' }
    ];
  });
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newStatus, setNewStatus] = useState('未着手');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('すべてのタスク');

  useEffect(() => {
    localStorage.setItem('hitome-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === '完了' ? '進行中' : '完了' } : task
    ));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTitle === "") return;

    const newTask = {
      id: Date.now(),
      title: newTitle,
      user: newUser,
      date: newDate || '期限なし',
      status: newStatus
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewUser('');
    setNewDate('');
    setNewStatus('未着手');
    setShowModal(false);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayTasks = filteredTasks.filter(task => {
    if (selectedTab === 'すべてのタスク') return true;
    if (selectedTab === '完了したタスク') return task.status === '完了';
    if (selectedTab === '自分のタスク') return task.user === '山川';
    return true;
  });

  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="main-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <main className="content">
          <h2>{selectedTab}</h2>
          <div className="task-list">
            {displayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleComplete}
                onStatusChange={handleStatusChange}
                onDelete={deleteTask}
              />
            ))}
          </div>

          <button className="add-button" onClick={() => setShowModal(true)}>
            ＋タスク追加
          </button>

          {showModal && (
            <AddTaskModal
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              newUser={newUser}
              setNewUser={setNewUser}
              newDate={newDate}
              setNewDate={setNewDate}
              newStatus={newStatus}
              setNewStatus={setNewStatus}
              onAdd={addTask}
              onClose={() => setShowModal(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
