import React from 'react';
import '../styles/MenuBar.css';

const MenuBar: React.FC = () => {
  return (
    <div className="menu-bar">
      <div className="menu-item">🍊 File</div>
      <div className="menu-item">Edit</div>
      <div className="menu-item">View</div>
      <div className="menu-item">Help</div>
      <div className="os-version">UnicornOS 3.11</div>
    </div>
  );
};

export default MenuBar;