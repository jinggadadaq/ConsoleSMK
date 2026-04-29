import React from 'react';
import { useParams } from 'react-router-dom';

export default function Lab() {
  const { id } = useParams();

  return (
    <div className="lab-layout">
      <div className="terminal-ui">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot-red"></span>
            <span className="dot-yellow"></span>
            <span className="dot-green"></span>
          </div>
          <div className="terminal-title">Lab {id} Environment</div>
          <div className="terminal-timer">00:45:12</div>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="terminal-user">user@smk-lab</span>:<span className="terminal-path">~</span>$ echo "Selamat datang di Lab dinamis!"
          </div>
          <div className="terminal-line">Selamat datang di Lab dinamis!</div>
          <div className="terminal-line">
            <span className="terminal-user">user@smk-lab</span>:<span className="terminal-path">~</span>$ <span className="terminal-input">_</span>
          </div>
        </div>
      </div>
      
      <div className="instruction-panel">
        <h3>Instruksi Praktik</h3>
        <ul className="task-list">
          <li className="task-item completed">
            <span>✅</span> Login ke sistem
          </li>
          <li className="task-item">
            <span>⏳</span> Konfigurasi IP Address
          </li>
        </ul>
      </div>
    </div>
  );
}
