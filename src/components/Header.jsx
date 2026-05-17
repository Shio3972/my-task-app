import React from 'react';

function Header({ searchTerm, setSearchTerm }) {
  return (
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
  );
}

export default Header;
