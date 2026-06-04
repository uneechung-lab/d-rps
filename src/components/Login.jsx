import React, { useState } from 'react';
import { ShieldAlertIcon } from '../assets/icons';

// High-fidelity custom SVG icons for the feature list
const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#071126" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#071126" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polygon points="2 17 12 22 22 17" /><polygon points="2 12 12 17 22 12" />
  </svg>
);

const LightningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#071126" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#071126" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 11 2 2 4-4" />
  </svg>
);

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('guest');
  const [password, setPassword] = useState('•••••');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login processing
    setTimeout(() => {
      if (username.trim() === '') {
        setError('ID를 입력해 주세요.');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        onLoginSuccess({ id: username, name: '홍길동', role: '시스템 관리자' });
      }
    }, 1000);
  };

  return (
    <div style={styles.loginContainer}>
      {/* Top Left: Official Corporate Logo Image (with multiply blend to dissolve white background) */}
      <div style={styles.logoAbsoluteSection}>
        <img
          src="/corporate-logo.png"
          alt="다음정보시스템즈"
          style={styles.corporateLogo}
        />
      </div>

      <div style={styles.centeredWrapper}>
        {/* Top Row: Left Column (Headline) and Right Column (Login) */}
        <div style={styles.topRow}>
          {/* Left Side: Logo -> Slogan */}
          <div style={styles.leftColumn}>
            <div style={styles.heroTextContainer}>
              {/* Custom D-RPS Logo Brand sitting right above the Headline */}
              <div style={styles.logoSectionLeft}>
                <div style={styles.logoIcon}>D</div>
                <h1 style={styles.logoText}>D-RPS</h1>
              </div>

              <h2 style={styles.heroTitle}>
                내가 기다리던<br />
                퇴직연금을 만나다.
              </h2>
              <p style={styles.heroSubtitle}>
                더 빠르고, 더 안전해진 <strong style={{ color: '#071126', fontWeight: '800' }}>다음퇴직연금시스템</strong>
              </p>
            </div>
          </div>

          {/* Right Side: Flat, borderless Login Card */}
          <div style={styles.rightColumn}>
            <div style={styles.loginCard}>
              {error && (
                <div style={styles.errorAlert}>
                  <ShieldAlertIcon size={18} className="btn-danger" style={{ background: 'none' }} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.rememberAbove}>
                  <label style={styles.remember}>
                    <input type="checkbox" defaultChecked style={styles.checkbox} />
                    <span>로그인 상태 유지</span>
                  </label>
                </div>

                <div style={styles.loginRow}>
                  <div style={styles.inputContainer}>
                    <div style={styles.inputWrapper}>
                      <span style={styles.inputPrefix}>I D</span>
                      <div style={styles.inputDivider} />
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.innerInput}
                        disabled={isLoading}
                      />
                    </div>
                    <div style={styles.inputWrapper}>
                      <span style={styles.inputPrefix}>PW</span>
                      <div style={styles.inputDivider} />
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.innerInput}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={styles.submitBtn}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner" style={styles.spinner}></span>
                    ) : (
                      '로그인'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => alert('회원가입은 다음정보시스템즈 보안 규정에 따라 사내 인사시스템 승인 후 계정이 연동됩니다. 시스템 관리자에게 문의해 주세요.')}
                    className="btn btn-secondary"
                    style={styles.signupBtn}
                    disabled={isLoading}
                  >
                    회원가입
                  </button>
                </div>

                <div style={styles.optionsBelow}>
                  <a href="#forgot" style={styles.forgotLink}>비밀번호를 잊으셨나요?</a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section: 4 Features displayed horizontally in 4 columns */}
        <div style={styles.featuresHorizontalGrid}>
          {[
            {
              icon: <TargetIcon />,
              title: '개인 맞춤형 자산관리',
              desc: '가입자 성향과 라이프사이클에 최적화된 연금 포트폴리오를 제공합니다.'
            },
            {
              icon: <LayersIcon />,
              title: '유연성과 확장성을 갖춘 아키텍처',
              desc: '제도 변화와 대용량 거래량 증가에 신속하고 안정적으로 대응합니다.'
            },
            {
              icon: <LightningIcon />,
              title: '퇴직연금 영업 경쟁력 강화',
              desc: '체계적인 영업 지원 분석 툴과 최적의 비즈니스 모델을 가동합니다.'
            },
            {
              icon: <ShieldCheckIcon />,
              title: '차별화된 연금 자산 관리',
              desc: '체계적인 리스크 제어 시스템과 안정적인 수익성 포인트를 극대화합니다.'
            }
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div style={styles.featureGridItem}>
                {/* Top Rounded Square Icon Card */}
                <div style={styles.iconCard}>
                  {item.icon}
                </div>
                {/* Bottom Header and Subtitle Content */}
                <div style={styles.featureContentGrid}>
                  <h4 style={styles.featureTitleTextGrid}>{item.title}</h4>
                  <p style={styles.featureDescTextGrid}>{item.desc}</p>
                </div>
                {/* Individual Character Image aligned below */}
                <div style={styles.characterContainer}>
                  <img
                    src={`/character-${idx + 1}.png`}
                    alt={item.title}
                    style={{
                      ...styles.characterImageReal,
                      transform: (idx === 0 || idx === 2) ? 'translateY(8px)' : 'none'
                    }}
                  />
                </div>
              </div>
              {idx < arr.length - 1 && <div style={styles.gridDivider} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    alignItems: 'center', // Revert to center to align the entire wrapper vertically in the middle of the screen!
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#ffb81c', // Solid flat Daom Yellow
    position: 'relative',
  },
  logoAbsoluteSection: {
    position: 'absolute',
    top: '36px',
    left: '40px',
    zIndex: 10,
  },
  corporateLogo: {
    height: '44px', // Enlarge by 15% as requested!
    width: 'auto',
    objectFit: 'contain',
    mixBlendMode: 'multiply', // Seamlessly dissolves the white background of the logo!
  },
  centeredWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1200px',
    padding: '40px 24px',
    zIndex: 2,
    transform: 'translateY(150px)', // Shift down by exactly 150px total relative to screen center!
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    gap: '80px',
    marginBottom: '20px',
  },
  leftColumn: {
    flex: '0 0 auto',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  heroTextContainer: {
    textAlign: 'left',
    width: '100%',
    maxWidth: '500px',
  },
  logoSectionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px', // Spacious gap before the headline
  },
  logoIcon: {
    width: '42px',
    height: '42px',
    borderRadius: 'var(--radius-sm)',
    background: '#071126',
    color: '#ffb81c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.5rem',
    fontFamily: 'var(--font-display)',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.85rem', // Enlarged logo font size
    fontWeight: '700',
    margin: 0,
    color: '#071126',
    letterSpacing: '-0.5px',
  },
  heroTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '2.8rem',
    fontWeight: '800',
    color: '#071126',
    lineHeight: '1.42',
    margin: '0 0 12px 0',
    letterSpacing: '-1.2px',
    wordBreak: 'keep-all',
  },
  heroSubtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.38rem',
    fontWeight: '600',
    color: '#3d2500', // Deep gold warm accent
    margin: '0 0 68px 0', // Increased spacing below the sub-slogan!
    letterSpacing: '-0.3px',
    wordBreak: 'keep-all',
  },
  featuresHorizontalGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    marginTop: '40px',
    gap: '24px',
  },
  featureGridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
    flex: 1,
  },
  gridDivider: {
    width: '1px',
    backgroundColor: 'rgba(7, 17, 38, 0.15)', // Very clean, elegant, soft gray vertical separator
    alignSelf: 'stretch',
    margin: '0 8px',
    flexShrink: 0,
  },
  iconCard: {
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    backgroundColor: 'rgba(7, 17, 38, 0.08)', // Beautiful translucent square matching yellow background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureContentGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  featureTitleTextGrid: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.2rem',
    fontWeight: '800',
    color: 'rgba(7, 17, 38, 0.65)',
    margin: 0,
    letterSpacing: '-0.3px',
    lineHeight: '1.3',
    wordBreak: 'keep-all',
  },
  featureDescTextGrid: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'rgba(92, 58, 0, 0.55)',
    margin: 0,
    lineHeight: '1.45',
    letterSpacing: '-0.2px',
    wordBreak: 'keep-all',
  },
  rightColumn: {
    flex: '0 0 auto',
    width: '530px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: '76px',
  },
  loginCard: {
    width: '100%',
    maxWidth: '530px',
    display: 'flex',
    flexDirection: 'column',
    color: '#071126', // Deep corporate navy
    backgroundColor: 'transparent', // Completely card-less
    border: 'none',
    boxShadow: 'none',
    padding: '0',
  },
  errorAlert: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: 'var(--radius-sm)',
    padding: '12px 16px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.85rem',
    color: '#b91c1c',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  loginRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'stretch',
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(7, 17, 38, 0.2)',
    borderRadius: '4px',
    padding: '0 16px',
    height: '48px',
    gap: '4px',
  },
  inputPrefix: {
    fontSize: '0.98rem',
    fontWeight: '700',
    color: '#071126',
    width: '28px',
    flexShrink: 0,
    userSelect: 'none',
    letterSpacing: '0px',
    whiteSpace: 'nowrap',
  },
  inputDivider: {
    width: '1px',
    height: '18px',
    backgroundColor: '#cbd5e1',
    margin: '0 12px',
    flexShrink: 0,
  },
  innerInput: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#071126',
    fontWeight: '600',
    fontSize: '1.08rem',
    padding: 0,
    width: '100%',
    height: '100%',
  },
  labelOverride: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#071126',
    marginBottom: '6px',
    display: 'inline-block',
    letterSpacing: '-0.3px',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(7, 17, 38, 0.2)',
    color: '#071126',
    fontWeight: '600',
    fontSize: '1.08rem',
    padding: '12px 16px',
    height: '48px',
    boxShadow: '0 2px 4px rgba(7, 17, 38, 0.05)',
  },
  rememberAbove: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    width: '100%',
  },
  optionsBelow: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '10px',
    width: '100%',
  },
  remember: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: '#3d2500',
    fontWeight: '600',
    fontSize: '0.98rem',
    whiteSpace: 'nowrap',
  },
  checkbox: {
    accentColor: '#071126',
    width: '16px',
    height: '16px',
  },
  forgotLink: {
    color: '#000000',
    opacity: 0.6,
    textDecoration: 'underline',
    fontWeight: '400',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap',
  },
  submitBtn: {
    padding: '12px',
    fontSize: '0.98rem',
    height: '104px',
    width: '95px',
    backgroundColor: '#071126',
    color: '#ffffff',
    border: '1px solid #071126', // 1px solid border to match signupBtn box sizing exactly!
    fontWeight: '700',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  signupBtn: {
    padding: '12px',
    fontSize: '0.98rem',
    height: '104px',
    width: '95px',
    backgroundColor: 'rgba(7, 17, 38, 0.08)',
    color: '#071126',
    border: '1px solid rgba(7, 17, 38, 0.18)',
    fontWeight: '700',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  characterContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end', // Align images perfectly at the bottom baseline!
    marginTop: 'auto', // Push the image block to the absolute bottom of the column!
    height: '380px', // Bounded box matching max-height
    transform: 'translateY(110px)',
  },
  characterImageReal: {
    width: '252px',
    height: 'auto',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: 'spin 1s ease-in-out infinite',
  },
};

export default Login;
