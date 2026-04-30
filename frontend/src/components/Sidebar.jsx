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
      <div className="sidebar-header">
        <img src={logoSmk} alt="Logo SMKN 1 Kutasari" style={{ width: 40, height: 40 }} />
        <div className="brand-info">
          <span className="brand-title" style={{ letterSpacing: '1px' }}>LAB CONSOLE</span>
          <span className="brand-sub">SMKN 1 KUTASARI</span>
        </div>
      </div>

      <div className="nav-label">MAIN MENU</div>
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>🖥</span> <span>My Labs</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/materi" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>📚</span> <span>Materi Pembelajaran</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ujian" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>📋</span> <span>Ulangan Harian</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/jadwal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>📅</span> <span>Jadwal Pelajaran</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/monitoring" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>🌐</span> <span>Monitoring Jaringan</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sertifikat" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>🎓</span> <span>Sertifikat</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/data-siswa" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>👥</span> <span>Data Siswa & Kelas</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/pengaturan" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>⚙️</span> <span>Pengaturan</span>
          </NavLink>
        </li>
        <li className="nav-item" style={{ marginTop: '20px' }}>
          <div className="nav-link" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
            <span>🌓</span> <span>Ganti Tema</span>
          </div>
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
