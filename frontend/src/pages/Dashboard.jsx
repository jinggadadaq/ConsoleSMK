import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="sub-tabs" style={{ marginBottom: '32px' }}>
        <button className="sub-tab active">Lab Praktik</button>
        <button className="sub-tab">Monitoring</button>
        <button className="sub-tab">Riwayat Lab</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '24px' }}>
        {/* Left Column - Actions / Forms */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
            <span style={{ color: 'var(--primary)' }}>+</span> Cari atau Gabung Lab Baru
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '24px' }}>Silakan masukkan kode lab atau cari berdasarkan mata pelajaran.</p>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--text-3)', marginBottom: '8px', textTransform: 'uppercase' }}>Kode Lab (Opsional)</label>
            <input type="text" placeholder="Contoh: LAB-TKJ-01" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-1)' }} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--text-3)', marginBottom: '8px', textTransform: 'uppercase' }}>Mata Pelajaran</label>
            <select style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-1)', appearance: 'none' }}>
              <option>Semua Mata Pelajaran</option>
              <option>Administrasi Infrastruktur Jaringan</option>
              <option>Teknologi Layanan Jaringan</option>
              <option>Administrasi Server Linux</option>
            </select>
          </div>

          <button className="btn-hijau" style={{ width: '100%', padding: '14px', borderRadius: '8px', fontWeight: '800', marginTop: 'auto' }}>
            Cari Lab
          </button>
        </div>

        {/* Right Column - Lab List */}
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
            <span style={{ color: 'var(--primary)' }}>📋</span> Daftar Lab Aktif
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Lab Item 1 */}
            <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-1)', marginBottom: '4px' }}>Konfigurasi VLAN & Routing Dasar</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>Kelas: XII TKJ 1 • Durasi: 120 Menit • Guru: Bapak Budi</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="status-pill status-aktif">Tersedia</span>
                <button className="btn-sm btn-hijau" onClick={() => navigate('/lab/1')}>Buka Lab</button>
              </div>
            </div>

            {/* Lab Item 2 */}
            <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-1)', marginBottom: '4px' }}>Instalasi Linux Debian 11 CLI</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>Kelas: XI TKJ 2 • Durasi: 90 Menit • Guru: Ibu Rina</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="status-pill status-aktif">Tersedia</span>
                <button className="btn-sm btn-hijau" onClick={() => navigate('/lab/2')}>Buka Lab</button>
              </div>
            </div>

            {/* Lab Item 3 */}
            <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-1)', marginBottom: '4px' }}>Setup Web Server Apache & PHP</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>Kelas: XII TKJ 1 • Durasi: 90 Menit • Guru: Bapak Budi</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="status-pill status-belum">Selesai</span>
                <button className="btn-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>Lihat Hasil</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Active Monitoring */}
      <div className="card" style={{ background: 'var(--primary-xlight)', borderColor: 'var(--primary-light)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-hover)', marginBottom: '16px' }}>Status Lab Anda (Realtime)</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-1)' }}>VM Ubuntu Server 22.04 - Kelompok 1</div>
              <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Status: Running • IP: 192.168.100.15</div>
            </div>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }}></span>
          </div>
          
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-1)' }}>Router Mikrotik CHR - Lab 2</div>
              <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Status: Stopped • IP: N/A</div>
            </div>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--text-3)' }}></span>
          </div>
        </div>
      </div>
    </>
  );
}
