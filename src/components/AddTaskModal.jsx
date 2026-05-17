import React from 'react';

function AddTaskModal({ newTitle, setNewTitle, newUser, setNewUser, newDate, setNewDate, newStatus, setNewStatus, onAdd, onClose }) {
  return (
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
          <button onClick={onClose}>キャンセル</button>
          <button className="save-button" onClick={onAdd}>保存する</button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
