import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Gunakan SVG dari assets yang sudah di-copy
import logoSmk from '../assets/LOGO-SMKKU.svg';
import logoTkj from '../assets/LOGO-TKJ.svg';

export default function Login() {
  const [role, setRole] = useState('siswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenAkses, setTokenAkses] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const navigate = useNavigate();

  // Handle Theme Toggle
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    if (newTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      setIsDarkTheme(true);
    } else {
      html.removeAttribute('data-theme');
      setIsDarkTheme(false);
    }
    localStorage.setItem('lab-console-theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('lab-console-theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDarkTheme(true);
    }
  }, []);

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

        // Redirect to dashboard using React Router
        navigate('/dashboard');
      } else {
        setErrorMsg(data.pesan || "Autentikasi gagal");
      }
    } catch (err) {
      setErrorMsg("Gagal terhubung ke Database Backend!");
      // Simulate login for frontend demo if backend is offline
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* Left Side */}
        <div className="left-side">
          <div className="watermark-bg"></div>
          <div className="logo-container" style={{ position: 'relative', width: '100%', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src={logoSmk} alt="Logo SMKN 1 Kutasari" className="logo-smk" />
              <img src={logoTkj} alt="Logo TKJ" className="logo-tkj" />
            </div>
            <div className="logo-text">
              <div className="logo-title font-outfit">SECURE ACCESS PORTAL</div>
              <div className="logo-subtitle">SMKN 1 KUTASARI · TKJ</div>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} title="Ganti mode gelap/terang" style={{ position: 'absolute', top: 0, right: 0 }}>
              {isDarkTheme ? (
                <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f59e0b', width: 20, height: 20 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#16a34a', width: 20, height: 20 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          <div className="left-content" style={{ zIndex: 2, position: 'relative' }}>
            <h1 className="login-title font-outfit">SIGN IN TO<br /><span className="text-primary">YOUR JOURNEY</span></h1>
            <p className="login-subtitle">Setiap langkah belajarmu dimulai dari sini. Tingkatkan skill IT-mu, bangun percaya diri, dan wujudkan masa depan karier yang lebih besar bersama Lab Terpusat.</p>
          </div>

          <div style={{ marginTop: 'auto', fontSize: '0.8rem', opacity: 0.7, zIndex: 2, position: 'relative', fontWeight: 600 }}>
            <p>Growing Skills & Creating Opportunities</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-side">
          <div className="form-header">
            <h2 className="form-title font-outfit">SIGN IN</h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>Akses ke lingkungan secure IT-lab.</p>
          </div>

          <div className="tabs">
            <button
              type="button"
              className={`tab-btn font-outfit ${role === 'siswa' ? 'active' : ''}`}
              onClick={() => setRole('siswa')}
            >
              Login Siswa
            </button>
            <button
              type="button"
              className={`tab-btn font-outfit ${role === 'guru_admin' ? 'active' : ''}`}
              onClick={() => setRole('guru_admin')}
            >
              Login Guru / Admin
            </button>
          </div>

          <div className={`errorAlert ${errorMsg ? 'show' : ''}`}>
            ⚠️ <span>{errorMsg}</span>
          </div>

          <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400 }}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email / NIS</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="email"
                  className="input-field"
                  placeholder="nis@smkn1kutasari.sch.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div className={`input-group tokenField ${role === 'guru_admin' ? 'hidden' : ''}`}>
              <label className="input-label" htmlFor="token">Token Akses Lab</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="token"
                  className="input-field"
                  placeholder="Token dari guru"
                  value={tokenAkses}
                  onChange={(e) => setTokenAkses(e.target.value)}
                />
              </div>
            </div>

            <a href="#" className="forgot-password">Lupa password?</a>

            <button type="submit" className="btn-primary font-outfit" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign In as Client →'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-3)', fontWeight: 600 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            Powered by TKJ SMKN 1 Kutasari
          </div>
        </div>
      </div>
    </div>
  );
}
