import React from 'react';

export default function Topbar({ pageTitle }) {
  const userName = localStorage.getItem('userName') || 'Siswa SMK';
  const userEmail = localStorage.getItem('userEmail') || 'siswa@smkn1kutasari.sch.id';
  const role = localStorage.getItem('userRole') || 'siswa';
  
  const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="breadcrumb">
          WORKSPACE
          <span className="role-badge">{role === 'guru_admin' ? 'Guru Access' : 'Siswa Access'}</span>
        </div>
        <div className="page-title">{pageTitle}</div>
      </div>
      <div className="topbar-right">
        <div className="user-info-group">
          <div>
            <span className="user-name">{userName}</span>
            <span className="user-email">{userEmail}</span>
          </div>
          <div className="avatar">{initials}</div>
        </div>
      </div>
    </header>
  );
}
