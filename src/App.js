import React, { useState, useEffect } from 'react'; 
import './App.css';

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
      <header className="App-header">
        <div className="logo">Hitöme</div>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="タスクを検索..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ 
              padding: '8px 15px', 
              borderRadius: '20px', 
              border: '1px solid #ddd',
              width: '200px'
            }}
          />
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRight: '1px solid #eee' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            
            <li 
              onClick={() => setSelectedTab('自分のタスク')}
              style={{ 
                padding: '12px 15px',
                marginBottom: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedTab === '自分のタスク' ? 'bold' : '500',
                color: selectedTab === '自分のタスク' ? '#ffffff' : '#555',
                backgroundColor: selectedTab === '自分のタスク' ? '#4A90E2' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              👤 自分のタスク
            </li>

            <li 
              onClick={() => setSelectedTab('すべてのタスク')}
              style={{ 
                padding: '12px 15px',
                marginBottom: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedTab === 'すべてのタスク' ? 'bold' : '500',
                color: selectedTab === 'すべてのタスク' ? '#ffffff' : '#555',
                backgroundColor: selectedTab === 'すべてのタスク' ? '#4A90E2' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              📋 すべてのタスク
            </li>

            <li 
              onClick={() => setSelectedTab('完了したタスク')}
              style={{ 
                padding: '12px 15px',
                marginBottom: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedTab === '完了したタスク' ? 'bold' : '500',
                color: selectedTab === '完了したタスク' ? '#ffffff' : '#555',
                backgroundColor: selectedTab === '完了したタスク' ? '#4A90E2' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              ✅ 完了したタスク
            </li>

          </ul>
        </aside>

        <main className="content">
          <h2>{selectedTab}</h2>
          <div className="task-list">
            {displayTasks.map((task) => {

              let badgeColor = "#eee";
              if (task.status === "進行中") badgeColor = "#FFF9C4";
              if (task.status === "未着手") badgeColor = "#FFCDD2";
              if (task.status === "完了") badgeColor = "#C8E6C9";

              return (
                <div key={task.id} className="task-item" style={{ display: 'flex', gap: '20px', padding: '15px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={task.status === '完了'}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span style={{ flex: 1 }}>{task.title}</span>
                  <span style={{ width: '80px' }}>{task.user}</span>
                  <span style={{ width: '100px', fontSize: '14px', color: '#666' }}>
                    {task.date}
                  </span>
                  <span className="status-badge" style={{ backgroundColor: badgeColor, padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                    {task.status}
                  </span>
                </div>
              );
            })}
          </div>

          <button className="add-button" onClick={() => setShowModal(true)}>
            ＋タスク追加
          </button>

          {showModal && (
            <div className="modal-overlay">
              <div className="task-form">
                <h3>タスク追加 🖋️</h3>
                
                <label>タスク名</label>
                <input 
                  type="text" 
                  placeholder="Facebook記事作成" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                />
                
                <br />
                
                <label>担当者</label>
                <input 
                  type="text" 
                  placeholder="山川" 
                  value={newUser} 
                  onChange={(e) => setNewUser(e.target.value)} 
                />

                <label>期限</label>
                <input 
                  type="date" 
                  value={newDate} 
                  onChange={(e) => setNewDate(e.target.value)} 
                />

                <label>進捗状況</label>
                <select
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="未着手">未着手</option>
                  <option value="進行中">進行中</option>
                  <option value="完了">完了</option>
                </select>

                <div className="button-group">
                  <button onClick={() => setShowModal(false)}>キャンセル</button>
                  <button className="save-button" onClick={addTask}>保存する</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
