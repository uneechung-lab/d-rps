import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, LogOutIcon, BellIcon, RefreshIcon, InfoIcon, ChevronDownIcon } from '../assets/icons';

import { menuDataMap } from '../menuData';

const Header = ({ user, isDark, onThemeToggle, onLogout, addNotification, activeTab, activeDepth1 }) => {
  const [timeLeft, setTimeLeft] = useState(3599); // 59 mins 59 secs
  const [showSessionModal, setShowSessionModal] = useState(false);

  // Find parent category group title dynamically
  const activeGroup = (menuDataMap[activeDepth1] || []).find(group =>
    group.items.some(item => item.name === activeTab)
  );
  const parentTitle = activeGroup ? activeGroup.title : '';

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
      {/* Left side: Premium Dynamic Breadcrumbs & Process Banner */}
      <div style={styles.leftSection}>
        <div style={styles.breadcrumb}>
          <span style={styles.breadcrumbHome}>{activeDepth1}</span>
          {parentTitle && (
            <>
              <span style={styles.breadcrumbSeparator}>/</span>
              <span style={styles.breadcrumbParent}>{parentTitle}</span>
            </>
          )}
          <span style={styles.breadcrumbSeparator}>/</span>
          <span style={styles.breadcrumbActive}>{activeTab || 'IRP 계약등록'}</span>
        </div>

        <div style={styles.verticalDivider} />

        {/* Processing Message Banner */}
        <div style={styles.processBanner}>
          <div style={{
            ...styles.processMsgBox,
            backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
            borderColor: isDark ? '#334155' : '#cbd5e1'
          }}>
            <span style={{ ...styles.processMsgText, color: isDark ? '#f8fafc' : '#0f172a' }}>
              처리소요시간 : <span style={{ color: isDark ? '#38bdf8' : '#0284c7', fontWeight: '700' }}>(0.016 sec)</span> 정상 처리 되었습니다.
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Session Timer, Theme Switcher, Notifications, Profile, Logout */}
      <div style={styles.rightSection}>
        {/* Session Timer */}
        <div style={{ position: 'relative' }}>
          <div style={styles.sessionContainer}>
            <button
              onClick={() => setShowSessionModal(!showSessionModal)}
              style={{
                ...styles.infoBtn,
                color: isDark ? '#fbbf24' : '#d97706',
              }}
              title="접속 정보 보기"
            >
              <InfoIcon size={14} />
              <ChevronDownIcon size={10} />
            </button>
            <div style={styles.sessionInnerDivider} />
            <span style={styles.sessionLabel}>세션만료</span>
            <span style={styles.sessionTimer}>{formatTime(timeLeft)}</span>
            <button onClick={handleExtendSession} style={styles.extendBtn} className="btn">
              <RefreshIcon size={12} />
              연장
            </button>
          </div>

          {/* Layer Modal for Connection Info */}
          {showSessionModal && (
            <div style={{
              ...styles.sessionModal,
              backgroundColor: isDark ? '#1b1e2b' : '#ffffff',
              borderColor: isDark ? '#334155' : '#cbd5e1',
              boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.1)',
            }}>
              {/* Arrow indicators pointing to the toggle icon */}
              <div style={{
                ...styles.modalArrowBorder,
                borderBottomColor: isDark ? '#334155' : '#cbd5e1',
              }} />
              <div style={{
                ...styles.modalArrow,
                borderBottomColor: isDark ? '#1b1e2b' : '#ffffff',
              }} />

              <div style={styles.modalHeader}>
                <span style={{ ...styles.modalTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>접속 정보</span>
                <button
                  onClick={() => setShowSessionModal(false)}
                  style={{ ...styles.modalCloseBtn, color: isDark ? '#94a3b8' : '#64748b' }}
                >
                  &times;
                </button>
              </div>
              <div style={styles.modalBody}>
                <div style={styles.infoRow}>
                  <span style={{ ...styles.infoLabel, color: isDark ? '#94a3b8' : '#475569' }}>
                    (최근)접속일시
                  </span>
                  <span style={{
                    ...styles.infoValBox,
                    backgroundColor: isDark ? '#2e3748' : '#e2e8f0',
                    color: isDark ? '#ffffff' : '#0f172a'
                  }}>
                    2026-06-04 09:07:04
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <span style={{ ...styles.infoLabel, color: isDark ? '#94a3b8' : '#475569' }}>
                    (최근)접속IP
                  </span>
                  <span style={{
                    ...styles.infoValBox,
                    backgroundColor: isDark ? '#2e3748' : '#e2e8f0',
                    color: isDark ? '#ffffff' : '#0f172a'
                  }}>
                    222.108.214.128
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <span style={{ ...styles.infoLabel, color: isDark ? '#94a3b8' : '#475569' }}>
                    (현)접속일시
                  </span>
                  <span style={{
                    ...styles.infoValBox,
                    backgroundColor: isDark ? '#2e3748' : '#e2e8f0',
                    color: isDark ? '#ffffff' : '#0f172a'
                  }}>
                    2026-06-04 10:10:40
                  </span>
                </div>
              </div>
            </div>
          )}
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
  verticalDivider: {
    width: '1px',
    height: '18px',
    backgroundColor: 'var(--border-color)',
    margin: '0 6px',
  },
  processBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  processLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '-0.3px',
  },
  processMsgBox: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '4px',
    padding: '4px 10px',
    display: 'flex',
    alignItems: 'center',
  },
  processMsgText: {
    fontSize: '0.8rem',
    fontWeight: '500',
    letterSpacing: '-0.2px',
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
  infoBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 0 2px 2px',
    gap: '4px',
    opacity: 0.9,
    marginRight: '-3px',
  },
  sessionModal: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: '0',
    width: '310px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid',
    padding: '14px',
    zIndex: 99,
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '6px',
  },
  modalTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  modalCloseBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    lineHeight: '1',
    padding: '0 4px',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  infoLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  infoValBox: {
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)',
    letterSpacing: '-0.2px',
    whiteSpace: 'nowrap',
  },
  sessionInnerDivider: {
    width: '1px',
    height: '14px',
    backgroundColor: 'var(--border-color)',
    margin: '0 2px',
  },
  modalArrow: {
    position: 'absolute',
    top: '-7px',
    left: '16px',
    width: '0',
    height: '0',
    borderLeft: '7px solid transparent',
    borderRight: '7px solid transparent',
    borderBottom: '7px solid',
    zIndex: 101,
  },
  modalArrowBorder: {
    position: 'absolute',
    top: '-8px',
    left: '15px',
    width: '0',
    height: '0',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '8px solid',
    zIndex: 100,
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
