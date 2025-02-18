import React, { useState } from "react";
import arkrung from './assets/images/arkrung.jpg';

const Upper = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-section">
        <img src={arkrung} alt="Logo" className="logo-img" />
        <span className="header-title">Ameeffy Tech</span>
      </div>
      <nav className="navigation">
        <a href="#home">Home</a>
        <a href="#about">About Me</a> 
        <a href="#works">Works</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      {menuOpen && (
        <div className="dropdown">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Me</a> 
          <a href="#works" onClick={() => setMenuOpen(false)}>Works</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Upper;
