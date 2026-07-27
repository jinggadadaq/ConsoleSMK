import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../style.css'; 

export default function Landing() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="landing-page-clean">
      {/* Navigation */}
      <nav className="landing-nav-clean">
        <div className="nav-container-clean">
          <Link to="/" className="nav-logo-clean">
            <div className="logo-icon-clean">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <span className="logo-text-clean">Candradimuka</span>
          </Link>

          <div className="nav-links-clean">
            <a href="#explore">Fitur</a>
            <Link to="/materi">Materi</Link>
          </div>

          <div className="nav-actions-clean">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-landing"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            >
              {isDark ? (
                /* Sun Icon */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                /* Moon Icon */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>

            <Link to="/login" className="btn-login-clean">Masuk</Link>
            <Link to="/login" className="btn-register-clean">Daftar Sekarang</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="landing-main-clean">
        <div className="hero-background-gradient"></div>
        <section className="hero-section-clean">
          <div className="hero-content-clean">
            <div className="badge-clean">
              <span className="badge-dot"></span> Platform Pembelajaran SMK
            </div>
            <h1 className="hero-title-clean">
              Menempa Kesatria IT<br />
              <span className="text-highlight-clean">dari Bangku SMK.</span>
            </h1>
            <p className="hero-desc-clean">
              Kawah Candradimuka adalah tempat menempa, bukan menyiksa. Di sini siswa SMK IT ditempa jadi kesatria yang siap kerja dengan kurikulum standar industri.
            </p>
            <div className="hero-actions-clean">
              <Link to="/login" className="btn-primary-clean">
                Mulai Belajar
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
              <a href="#explore" className="btn-secondary-clean">Pelajari Lebih Lanjut</a>
            </div>
            
            <div className="hero-stats-clean">
              <div className="stat-box">
                <h4>1000+</h4>
                <p>Siswa Aktif</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <h4>50+</h4>
                <p>Modul Lab</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <h4>24/7</h4>
                <p>Akses Server</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="explore" className="features-section-clean">
          <div className="features-header-clean">
            <h2 className="section-title-clean">Fasilitas Standar Industri.</h2>
            <p className="section-desc-clean">Didesain khusus untuk memudahkan siswa SMK belajar infrastruktur IT tingkat lanjut.</p>
          </div>

          <div className="features-grid-clean">
            <div className="feature-card-clean">
              <div className="feature-icon-clean bg-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
              </div>
              <h3>Virtual Labs Terintegrasi</h3>
              <p>Akses VM sungguhan langsung dari browser. Dilengkapi terminal SSH dan konsol, siap praktik kapan saja.</p>
            </div>
            <div className="feature-card-clean">
              <div className="feature-icon-clean bg-purple">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"></path><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"></path></svg>
              </div>
              <h3>Kurikulum Terstruktur</h3>
              <p>Modul belajar yang disusun rapi dari Dasar Jaringan, Sysadmin, Cloud Computing hingga Cyber Security.</p>
            </div>
            <div className="feature-card-clean">
              <div className="feature-icon-clean bg-orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path></svg>
              </div>
              <h3>Ujian &amp; Penilaian Otomatis</h3>
              <p>Sistem ujian berbasis praktik dengan auto-provisioning lab dan penilaian yang instan.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-clean">
        <div className="footer-content-clean">
          <div className="footer-brand-clean">
            <span className="footer-logo">Candradimuka</span>
            <p>Platform Pembelajaran IT untuk SMK.</p>
          </div>
          <div className="footer-copyright-clean">
            <p>© 2026 Candradimuka SMK. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

