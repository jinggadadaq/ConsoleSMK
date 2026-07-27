import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Login.css';

export default function Login() {
  const [role, setRole] = useState('siswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenAkses, setTokenAkses] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const destUrl = window.location.port !== "" ? 'http://localhost:8080/api/auth/login' : '/api/auth/login';

      const res = await fetch(destUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          token_akses: role === 'siswa' ? tokenAkses : ''
        })
      });

      const data = await res.json();
      if (res.ok && data.sukses) {
        localStorage.setItem('userRole', data.data.user.role);
        localStorage.setItem('userName', data.data.user.name);
        localStorage.setItem('userEmail', data.data.user.email);
        localStorage.setItem('apiToken', data.data.token);
        navigate('/dashboard');
      } else {
        setErrorMsg(data.pesan || "Autentikasi gagal");
      }
    } catch (err) {
      setErrorMsg("Gagal terhubung ke server. Melanjutkan demo...");
      setTimeout(() => navigate('/dashboard'), 1200);
    } finally {
      setIsLoading(false);
    }
  };

  const floatingCards = [
    { icon: '🖥️', label: 'Virtual Lab', style: { top: '22%', left: '12%' } },
    { icon: '💻', label: 'SSH Terminal', style: { top: '18%', left: '50%' } },
    { icon: '🌐', label: 'Networking', style: { top: '42%', left: '55%' } },
    { icon: '🛡️', label: 'Security', style: { top: '60%', left: '30%' } },
    { icon: '⚙️', label: 'Server Mgmt', style: { top: '48%', left: '8%' } },
  ];

  return (
    <div className="login-v2-wrapper">
      {/* Back to home link */}
      <Link to="/" className="login-back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Kembali ke Beranda
      </Link>

      {/* Theme toggle */}
      <button className="login-theme-btn" onClick={toggleTheme} title={isDark ? 'Mode Terang' : 'Mode Gelap'}>
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        )}
      </button>

      {/* Left Panel */}
      <div className="login-left-panel">
        {/* Floating Feature Cards */}
        {floatingCards.map((card, i) => (
          <div key={i} className="floating-card" style={card.style}>
            <span className="floating-card-icon">{card.icon}</span>
            <span className="floating-card-label">{card.label}</span>
          </div>
        ))}

        {/* Center logo */}
        <div className="login-center-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          </svg>
        </div>

        {/* Branding text at bottom */}
        <div className="login-left-branding">
          <h2>Welcome to <span className="branding-highlight">Candradimuka</span></h2>
          <p>Platform penempa kesatria IT dari bangku SMK. Lab nyata, skill nyata, masa depan nyata.</p>
        </div>
      </div>

      {/* Right Panel — Form Card */}
      <div className="login-right-panel">
        <div className="login-card">
          {/* Card Header */}
          <div className="login-card-header">
            <div className="login-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div>
              <h1 className="login-card-title">Sign In</h1>
              <p className="login-card-subtitle">Akses console dashboard kamu</p>
            </div>
          </div>

          {/* Role tabs */}
          <div className="login-tabs">
            <button
              type="button"
              className={`login-tab ${role === 'siswa' ? 'active' : ''}`}
              onClick={() => setRole('siswa')}
            >
              Siswa
            </button>
            <button
              type="button"
              className={`login-tab ${role === 'guru_admin' ? 'active' : ''}`}
              onClick={() => setRole('guru_admin')}
            >
              Guru / Admin
            </button>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="login-error-alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field">
              <label htmlFor="login-email">Email / NIS</label>
              <input
                type="text"
                id="login-email"
                placeholder="nis@smkn1kutasari.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="login-field">
              <div className="login-field-header">
                <label htmlFor="login-password">Password</label>
                <a href="#" className="login-forgot">Lupa password?</a>
              </div>
              <div className="login-field-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                      <line x1="3" y1="21" x2="21" y2="3" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {role === 'siswa' && (
              <div className="login-field">
                <label htmlFor="login-token">Token Akses Lab</label>
                <input
                  type="text"
                  id="login-token"
                  placeholder="Token dari guru"
                  value={tokenAkses}
                  onChange={(e) => setTokenAkses(e.target.value)}
                />
              </div>
            )}

            <button type="submit" className="login-submit-btn" disabled={isLoading} id="login-submit">
              {isLoading ? (
                <><span className="login-spinner"></span>Authenticating...</>
              ) : (
                <>Masuk <span>→</span></>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-card-footer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Encrypted · Platform Candradimuka SMK
          </div>
        </div>
      </div>
    </div>
  );
}
