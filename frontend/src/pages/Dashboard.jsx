import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([
    { id: '1', title: 'Konfigurasi VLAN & Routing Dasar', class_name: 'XII TKJ 1', duration_minutes: 120, teacher: 'Bapak Budi', status: 'Tersedia' },
    { id: '2', title: 'Instalasi Linux Debian 11 CLI', class_name: 'XI TKJ 2', duration_minutes: 90, teacher: 'Ibu Rina', status: 'Tersedia' },
    { id: '3', title: 'Setup Web Server Apache & PHP', class_name: 'XII TKJ 1', duration_minutes: 90, teacher: 'Bapak Budi', status: 'Selesai' }
  ]);
  const [monitoring, setMonitoring] = useState([
    { id: '1', name: 'VM Ubuntu Server 22.04 - Kelompok 1', ip: '192.168.100.15', status: 'Running' },
    { id: '2', name: 'Router Mikrotik CHR - Lab 2', ip: 'N/A', status: 'Stopped' }
  ]);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const labsUrl = window.location.port !== "" ? 'http://localhost:8080/api/labs' : '/api/labs';
        const resLabs = await fetch(labsUrl);
        if (resLabs.ok) {
          const jsonLabs = await resLabs.json();
          if (jsonLabs.sukses && jsonLabs.data && jsonLabs.data.length > 0) {
            setLabs(jsonLabs.data);
          }
        }

        const monUrl = window.location.port !== "" ? 'http://localhost:8080/api/monitoring' : '/api/monitoring';
        const resMon = await fetch(monUrl);
        if (resMon.ok) {
          const jsonMon = await resMon.json();
          if (jsonMon.sukses && jsonMon.data && jsonMon.data.length > 0) {
            setMonitoring(jsonMon.data);
          }
        }
      } catch (e) {
        // Fallback to default initial state
      }
    };
    fetchApiData();
  }, []);

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
            {labs.map((lab) => (
              <div key={lab.id} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-1)', marginBottom: '4px' }}>{lab.title}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)' }}>
                    Kelas: {lab.class_name || 'XII TKJ 1'} • Durasi: {lab.duration_minutes || 90} Menit • Guru: {lab.teacher || 'Bapak Budi'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className={`status-pill ${lab.status === 'Selesai' ? 'status-belum' : 'status-aktif'}`}>{lab.status || 'Tersedia'}</span>
                  {lab.status === 'Selesai' ? (
                    <button className="btn-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>Lihat Hasil</button>
                  ) : (
                    <button className="btn-sm btn-hijau" onClick={() => navigate(`/lab/${lab.id}`)}>Buka Lab</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Active Monitoring */}
      <div className="card" style={{ background: 'var(--primary-xlight)', borderColor: 'var(--primary-light)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-hover)', marginBottom: '16px' }}>Status Lab Anda (Realtime)</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {monitoring.map((item) => (
            <div key={item.id} style={{ padding: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-1)' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Status: {item.status} • IP: {item.ip}</div>
              </div>
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: item.status === 'Running' ? 'var(--primary)' : 'var(--text-3)',
                boxShadow: item.status === 'Running' ? '0 0 8px var(--primary)' : 'none'
              }}></span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
