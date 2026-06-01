import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, LogOutIcon, BellIcon, RefreshIcon } from '../assets/icons';

const Header = ({ user, isDark, onThemeToggle, onLogout, addNotification, activeTab }) => {
  const [timeLeft, setTimeLeft] = useState(3599); // 59 mins 59 secs

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          addNotification('세션이 만료되었습니다. 다시 로그인 해주세요.', 'warning');
          onLogout();
          return 3599;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLogout, addNotification]);

  const handleExtendSession = () => {
    setTimeLeft(3599);
    addNotification('로그인 세션이 60분 연장되었습니다.', 'success');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header style={styles.header}>
      {/* Left side: Premium Dynamic Breadcrumbs */}
      <div style={styles.leftSection}>
        <div style={styles.breadcrumb}>
          <span style={styles.breadcrumbHome}>계약</span>
          <span style={styles.breadcrumbSeparator}>/</span>
          <span style={styles.breadcrumbParent}>계약관리</span>
          <span style={styles.breadcrumbSeparator}>/</span>
          <span style={styles.breadcrumbActive}>{activeTab || 'IRP 계약등록'}</span>
        </div>
      </div>

      {/* Right side: Session Timer, Theme Switcher, Notifications, Profile, Logout */}
      <div style={styles.rightSection}>
        {/* Session Timer */}
        <div style={styles.sessionContainer}>
          <span style={styles.sessionLabel}>세션만료</span>
          <span style={styles.sessionTimer}>{formatTime(timeLeft)}</span>
          <button onClick={handleExtendSession} style={styles.extendBtn} className="btn">
            <RefreshIcon size={12} />
            연장
          </button>
        </div>

        <div style={styles.divider} />

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          style={styles.actionBtn}
          title={isDark ? "라이트 모드로 변경" : "다크 모드로 변경"}
          className="btn-secondary"
        >
          {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>

        {/* Notifications */}
        <div style={styles.notiWrapper}>
          <button style={styles.actionBtn} className="btn-secondary">
            <BellIcon size={18} />
            <span style={styles.notiBadge} />
          </button>
        </div>

        <div style={styles.divider} />

        {/* User Info */}
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {user.name.charAt(0)}
          </div>
          <div style={styles.userMeta}>
            <span style={styles.userName}>{user.name}</span>
            <span style={styles.userRole}>{user.role}</span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          style={styles.logoutBtn}
          className="btn btn-secondary"
          title="로그아웃"
        >
          <LogOutIcon size={16} />
          로그아웃
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: '70px',
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 9,
    flexShrink: 0,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.05rem', // Enlarged from 0.85rem!
    fontWeight: '600',
  },
  breadcrumbHome: {
    color: 'var(--text-tertiary)',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  breadcrumbSeparator: {
    color: 'var(--text-tertiary)',
    fontSize: '0.9rem', // Enlarged from 0.75rem!
    opacity: 0.6,
  },
  breadcrumbParent: {
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  breadcrumbActive: {
    color: 'var(--primary)',
    fontWeight: '700',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  sessionContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '4px 8px 4px 12px',
    borderRadius: 'var(--radius-sm)',
    gap: '8px',
    border: '1px solid var(--border-color)',
  },
  sessionLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  sessionTimer: {
    fontFamily: 'monospace',
    fontWeight: '700',
    fontSize: '0.875rem',
    color: 'var(--danger)',
    minWidth: '42px',
  },
  extendBtn: {
    padding: '4px 8px',
    fontSize: '0.72rem',
    height: '24px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  },
  divider: {
    width: '1px',
    height: '24px',
    backgroundColor: 'var(--border-color)',
  },
  actionBtn: {
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-sm)',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    position: 'relative',
  },
  notiWrapper: {
    position: 'relative',
  },
  notiBadge: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--danger)',
    boxShadow: '0 0 4px var(--danger)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  userMeta: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  userRole: {
    fontSize: '0.7rem',
    color: 'var(--text-tertiary)',
    fontWeight: '500',
  },
  logoutBtn: {
    height: '36px',
    padding: '0 12px',
    fontSize: '0.8rem',
    gap: '6px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
  },
};

export default Header;
