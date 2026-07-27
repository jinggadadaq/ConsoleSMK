import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import logoTkj from '../assets/LOGO-TKJ.svg';
import { useTheme } from '../context/ThemeContext';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const location = useLocation();
  const { toggleTheme } = useTheme();

  const getPageTitle = () => {
    if (location.pathname.includes('/dashboard')) return 'TKJ SMKKU - Lab Environment';
    if (location.pathname.includes('/materi')) return 'Materi Pembelajaran';
    if (location.pathname.includes('/ujian')) return 'Ulangan Harian';
    if (location.pathname.includes('/lab')) return 'Active Lab Environment';
    if (location.pathname.includes('/sertifikat')) return 'Sertifikat Kompetensi';
    return 'Console SMK';
  };

  return (
    <div className="app-container">
      <Sidebar toggleTheme={toggleTheme} />
      <main className="main-area">
        <img src={logoTkj} className="bg-watermark" alt="Logo TKJ" />
        <Topbar pageTitle={getPageTitle()} />
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
