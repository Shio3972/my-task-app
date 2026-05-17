import React from 'react';

function TaskItem({ task, onToggle, onStatusChange, onDelete }) {
  let badgeColor = "#eee";
  if (task.status === "進行中") badgeColor = "#FFF9C4";
  if (task.status === "未着手") badgeColor = "#FFCDD2";
  if (task.status === "完了") badgeColor = "#C8E6C9";

  return (
    <div className="task-item" style={{ display: 'flex', gap: '20px', padding: '15px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={task.status === '完了'}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ flex: 1 }}>{task.title}</span>
      <span style={{ width: '80px' }}>{task.user}</span>
      <span style={{ width: '100px', fontSize: '14px', color: '#666' }}>
        {task.date}
      </span>
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        style={{ backgroundColor: badgeColor, padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
      >
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      <button
        onClick={() => onDelete(task.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#ccc' }}
      >
        🗑️
      </button>
    </div>
  );
}

export default TaskItem;
