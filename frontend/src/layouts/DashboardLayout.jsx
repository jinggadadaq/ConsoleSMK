import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import logoTkj from '../assets/LOGO-TKJ.svg';

export default function DashboardLayout() {
  const location = useLocation();
  
  // Handle Theme Toggle
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    if (newTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    localStorage.setItem('lab-console-theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('lab-console-theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const getPageTitle = () => {
    if (location.pathname.includes('/dashboard')) return 'TKJ SMKKU - Lab Environment';
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
