import React from 'react';
import Depth1Menu from './Depth1Menu';

const Header = ({ activeDepth1, onDepth1Select, onLogoClick, isDashboard, headerStyle, setHeaderStyle, addNotification }) => {
  const isSimple = headerStyle === 'simple';
  const headerCombinedStyle = {
    ...styles.header,
    background: isSimple ? 'var(--bg-primary)' : 'linear-gradient(100deg, rgba(255, 184, 28, 0.8) 0%, #ffb81c 25%, #ffa726 50%, #fcef26 75%, #3ba093 100%)',
    borderRadius: isSimple ? '0px' : '20px',
    margin: isSimple ? '0px' : '10px 16px 0 16px',
    borderBottom: isSimple ? '1.5px solid var(--header-border)' : 'none',
  };

  return (
    <header style={headerCombinedStyle}>
      {/* Left side: Brand Logo */}
      <div 
        onClick={onLogoClick}
        style={styles.logoSection}
        title="대시보드로 이동"
      >
        <img
          src="/corporate-logo2.png"
          alt="다음정보시스템즈"
          style={{
            height: '28px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
        <div style={styles.logoBrand}>
          <span style={{ 
            ...styles.logoBrandTitle, 
            color: isSimple ? 'var(--text-primary)' : '#071126',
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px' 
          }}>
            D-RPS
            <span style={{
              fontSize: '0.6rem',
              fontWeight: '700',
              color: '#ffb81c',
              backgroundColor: 'rgba(7, 17, 38, 0.5)',
              padding: '2px 6px',
              borderRadius: '4px',
              letterSpacing: '0.5px',
              lineHeight: 1.4,
            }}>DEV</span>
          </span>
        </div>
      </div>
 
      {/* Center side: Horizontal GNB Menu */}
      <div style={styles.centerSection}>
        <Depth1Menu 
          activeDepth1={activeDepth1} 
          onDepth1Select={onDepth1Select} 
          isDashboard={isDashboard} 
          headerStyle={headerStyle}
        />
      </div>
      {/* Right side: Switcher */}
      <div style={styles.rightSection}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          border: isSimple ? '1px solid var(--border-color)' : '1px solid rgba(7, 17, 38, 0.15)',
          borderRadius: '6px',
          padding: '2px',
          backgroundColor: isSimple ? 'var(--bg-secondary)' : 'rgba(7, 17, 38, 0.08)',
        }}>
          <button
            type="button"
            onClick={() => {
              setHeaderStyle('simple');
              addNotification('심플/구분선 GNB 시안으로 전환되었습니다.', 'success');
            }}
            style={{
              padding: '3px 8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isSimple ? 'var(--text-primary)' : 'transparent',
              color: isSimple ? 'var(--bg-primary)' : 'rgba(7, 17, 38, 0.7)',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.15s ease',
            }}
          >
            Simple
          </button>
          <button
            type="button"
            onClick={() => {
              setHeaderStyle('yellow');
              addNotification('옐로우 GNB 시안으로 전환되었습니다.', 'success');
            }}
            style={{
              padding: '3px 8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: !isSimple ? '#071126' : 'transparent',
              color: !isSimple ? '#ffb81c' : 'var(--text-secondary)',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.15s ease',
            }}
          >
            Yellow
          </button>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: '70px',
    background: '#ffb81c',
    borderRadius: '12px',
    margin: '10px 16px 0 16px',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 9,
    flexShrink: 0,
    position: 'relative',
  },
  centerSection: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  logoCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: '#071126',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(7, 17, 38, 0.15)',
    flexShrink: 0,
  },
  logoText: {
    fontWeight: '900',
    fontSize: '1.1rem',
    color: '#ffb81c',
    fontFamily: 'var(--font-display)',
  },
  logoBrand: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoBrandTitle: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#071126',
    lineHeight: 1.1,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 10,
  },
};

export default Header;
