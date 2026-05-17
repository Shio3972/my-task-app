import React from 'react';

const tabs = [
  { label: '👤 自分のタスク', value: '自分のタスク' },
  { label: '📋 すべてのタスク', value: 'すべてのタスク' },
  { label: '✅ 完了したタスク', value: '完了したタスク' },
];

function Sidebar({ selectedTab, setSelectedTab }) {
  return (
    <aside className="sidebar" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRight: '1px solid #eee' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tabs.map((tab) => (
          <li
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            style={{
              padding: '12px 15px',
              marginBottom: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: selectedTab === tab.value ? 'bold' : '500',
              color: selectedTab === tab.value ? '#ffffff' : '#555',
              backgroundColor: selectedTab === tab.value ? '#4A90E2' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
