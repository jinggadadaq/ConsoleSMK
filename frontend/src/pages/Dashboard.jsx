import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="banner">
        🔔 Selamat datang! Silakan ganti password default Anda untuk keamanan akun.
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-title">🖥 Lab Aktif</span>
          <span className="stat-value green">3</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">📋 Ujian Tersedia</span>
          <span className="stat-value">1</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">🎁 Poin Reward</span>
          <span className="stat-value">450</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">✅ Sesi Selesai</span>
          <span className="stat-value">12</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Katalog Modul Lab</h2>
        </div>
        <div className="sub-tabs">
          <button className="sub-tab active">Lab Saya</button>
          <button className="sub-tab">Semua Lab</button>
          <button className="sub-tab">Riwayat</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nama Lab</th>
              <th>Mata Pelajaran</th>
              <th>Kelas</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lab Cisco Packet Tracer #1</td>
              <td>Jaringan Komputer</td>
              <td>XII TKJ 1</td>
              <td>20 Apr 2026</td>
              <td><span className="status-pill status-aktif">Aktif</span></td>
              <td><button className="btn-sm btn-hijau" onClick={() => navigate('/lab/1')}>Buka Lab</button></td>
            </tr>
            <tr>
              <td>Lab Linux Server Dasar</td>
              <td>Administrasi Server</td>
              <td>XII TKJ 1</td>
              <td>22 Apr 2026</td>
              <td><span className="status-pill status-belum">Belum Mulai</span></td>
              <td><button className="btn-sm btn-hijau">Mulai Baru</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
