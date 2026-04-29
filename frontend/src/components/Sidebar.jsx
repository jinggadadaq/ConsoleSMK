import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoSmk from '../assets/LOGO-SMKKU.svg';

export default function Sidebar({ toggleTheme }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ gap: '12px', padding: '20px 0' }}>
        <img src={logoSmk} alt="Logo SMKN 1 Kutasari" style={{ width: 42, height: 42, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
        <div className="brand-info">
          <span className="brand-title" style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)' }}>LAB CONSOLE</span>
          <span className="brand-sub" style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>SMKN 1 KUTASARI</span>
        </div>
      </div>

      <div className="nav-label">MAIN MENU</div>
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>🖥 My Labs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ujian" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>📋 Pusat Ujian</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>🏆 Leaderboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sertifikat" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>🎓 Sertifikat Ujian</NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-toggle-item theme-toggle" onClick={toggleTheme}>
            <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#16a34a' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f59e0b' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span id="themeText" style={{ marginLeft: 8 }}>Mode Gelap/Terang</span>
          </a>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span>↩</span> Keluar
        </button>
      </div>
    </aside>
  );
}
