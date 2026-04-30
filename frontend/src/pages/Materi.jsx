import React, { useState } from 'react';

export default function Materi() {
  const [activeTab, setActiveTab] = useState('cyber');

  const materiList = {
    cyber: [
      { title: 'Pengenalan Cyber Security Dasar', type: 'PDF', size: '2.4 MB', date: '25 Apr 2026' },
      { title: 'Praktik Penetration Testing dengan Kali Linux', type: 'Video', size: '145 MB', date: '26 Apr 2026' },
      { title: 'Analisis Malware & Forensik Digital', type: 'Modul Lab', size: 'N/A', date: '28 Apr 2026' },
    ],
    cloud: [
      { title: 'Arsitektur Cloud Computing & AWS', type: 'PDF', size: '3.1 MB', date: '20 Apr 2026' },
      { title: 'Deploy Web Apps ke Docker Container', type: 'Video', size: '95 MB', date: '22 Apr 2026' },
      { title: 'Setup Kubernetes Cluster Dasar', type: 'Modul Lab', size: 'N/A', date: '25 Apr 2026' },
    ],
    network: [
      { title: 'Fundamental Routing & Switching Cisco', type: 'PDF', size: '5.2 MB', date: '18 Apr 2026' },
      { title: 'Konfigurasi Mikrotik Firewall', type: 'Video', size: '110 MB', date: '19 Apr 2026' },
      { title: 'Simulasi Jaringan WAN dengan Packet Tracer', type: 'Modul Lab', size: 'N/A', date: '21 Apr 2026' },
    ]
  };

  const getIcon = (type) => {
    switch(type) {
      case 'PDF': return '📄';
      case 'Video': return '🎥';
      case 'Modul Lab': return '🖥️';
      default: return '📁';
    }
  };

  return (
    <>
      <div className="banner" style={{ background: 'var(--primary-xlight)', borderColor: 'var(--primary-light)' }}>
        📚 Portal Materi Pembelajaran. Akses seluruh bahan ajar untuk kelas Cyber, Cloud, dan Network.
      </div>

      <div className="card">
        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Katalog Materi Belajar</span>
          <button className="btn-hijau btn-sm">+ Upload Materi (Guru)</button>
        </div>

        <div className="sub-tabs">
          <button 
            className={`sub-tab ${activeTab === 'cyber' ? 'active' : ''}`}
            onClick={() => setActiveTab('cyber')}
          >
            🛡️ Cyber Security
          </button>
          <button 
            className={`sub-tab ${activeTab === 'cloud' ? 'active' : ''}`}
            onClick={() => setActiveTab('cloud')}
          >
            ☁️ Cloud Computing
          </button>
          <button 
            className={`sub-tab ${activeTab === 'network' ? 'active' : ''}`}
            onClick={() => setActiveTab('network')}
          >
            🌐 Network Engineering
          </button>
        </div>

        <table style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>Nama Materi</th>
              <th>Jenis Tipe</th>
              <th>Ukuran</th>
              <th>Tanggal Diupload</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {materiList[activeTab].map((item, index) => (
              <tr key={index}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{getIcon(item.type)}</span>
                  <span style={{ fontWeight: '700' }}>{item.title}</span>
                </td>
                <td><span className="status-pill" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>{item.type}</span></td>
                <td>{item.size}</td>
                <td>{item.date}</td>
                <td>
                  <button className="btn-sm btn-hijau" style={{ marginRight: '8px' }}>Buka</button>
                  <button className="btn-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-1)' }}>Unduh</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
