import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Depth1Menu from './components/Depth1Menu';
import IRPContractForm from './components/IRPContractForm';
import ContractSearchModal from './components/ContractSearchModal';
import Dashboard from './components/Dashboard';
import { menuDataMap } from './menuData';
import { SunIcon, MoonIcon, LogOutIcon, BellIcon, RefreshIcon, InfoIcon, ChevronDownIcon, SettingsIcon } from './assets/icons';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [activeDepth1, setActiveDepth1] = useState('대시보드');
  const [activeTab, setActiveTab] = useState('대시보드');
  const [depth1Collapsed, setDepth1Collapsed] = useState(false);
  
  // Multi-tab system (bottom tabs as seen in old system)
  const [openTabs, setOpenTabs] = useState(['대시보드']);
  
  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Active selected contract data
  const [selectedContract, setSelectedContract] = useState(null);
  
  // Toast notifications engine
  const [notifications, setNotifications] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [headerStyle, setHeaderStyle] = useState('simple');


  // Check if device is mobile/tablet based on User Agent or screen width
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileUA = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 1024; // standard tablet & mobile boundary
      setIsMobile(isMobileUA || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply default light mode (or toggle dark class)
  useEffect(() => {
    const bodyClass = document.body.classList;
    if (isDark) {
      bodyClass.add('dark-theme');
    } else {
      bodyClass.remove('dark-theme');
    }
  }, [isDark]);

  // Render Mobile Blocking screen if accessed on mobile
  if (isMobile) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffb81c', // Solid Daum Yellow
        color: '#071126',
        padding: '24px',
        textAlign: 'center',
        fontFamily: "'Pretendard', sans-serif",
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#071126',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
          boxShadow: '0 8px 24px rgba(7, 17, 38, 0.15)',
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffb81c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <h1 style={{
          fontSize: '1.6rem',
          fontWeight: '800',
          margin: '0 0 16px 0',
          letterSpacing: '-1px',
          lineHeight: '1.3'
        }}>
          PC 환경 접속 안내
        </h1>
        <p style={{
          fontSize: '1.02rem',
          fontWeight: '600',
          color: '#3d2500',
          maxWidth: '450px',
          margin: '0 0 12px 0',
          lineHeight: '1.6',
          letterSpacing: '-0.5px'
        }}>
          다음퇴직연금시스템(D-RPS)은 안전한 자산 관리 및 보안 유지를 위해 <strong style={{ color: '#071126', fontWeight: '800' }}>PC 환경에서만 접속이 가능합니다.</strong>
        </p>
        <p style={{
          fontSize: '0.88rem',
          fontWeight: '600',
          color: '#5c3a00',
          margin: 0,
          opacity: 0.8
        }}>
          태블릿 또는 모바일 기기를 지원하지 않사오니,<br />
          PC 브라우저를 통해 다시 접속해 주시기 바랍니다.
        </p>
      </div>
    );
  }

  // Alert/Notification system
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const [timeLeft, setTimeLeft] = useState(3599); // 59 mins 59 secs
  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          addNotification('세션이 만료되었습니다. 다시 로그인 해주세요.', 'warning');
          handleLogout();
          return 3599;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user]);

  const handleExtendSession = () => {
    setTimeLeft(3599);
    addNotification('로그인 세션이 60분 연장되었습니다.', 'success');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setOpenTabs(['대시보드']);
    setActiveTab('대시보드');
    setActiveDepth1('대시보드');
    setTimeLeft(3599);
    addNotification(`${userData.name} 님, 환영합니다! 시스템 로그인이 완료되었습니다.`, 'success');
  };

  const findTabPath = (tabName) => {
    if (tabName === '대시보드') {
      return { depth1: '대시보드', parent: '종합현황' };
    }
    for (const [d1Name, groups] of Object.entries(menuDataMap)) {
      for (const group of groups) {
        if (group.items.some(item => item.name === tabName)) {
          return { depth1: d1Name, parent: group.title };
        }
      }
    }
    return { depth1: '계약', parent: '계약관리' };
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedContract(null);
    setOpenTabs(['대시보드']);
    setActiveTab('대시보드');
    setActiveDepth1('대시보드');
    setTimeLeft(3599);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    addNotification(!isDark ? '다크 테마가 적용되었습니다.' : '라이트 테마가 적용되었습니다.', 'success');
  };

  const handleSidebarTabSelect = (tabName) => {
    // Add tab if not already present
    if (!openTabs.includes(tabName)) {
      setOpenTabs(prev => [...prev, tabName]);
    }
    setActiveTab(tabName);
    
    // Automatically switch 1-depth active state to match selected tab
    const path = findTabPath(tabName);
    setActiveDepth1(path.depth1);
    
    addNotification(`'${tabName}' 화면으로 이동했습니다.`, 'success');
  };

  const handleDepth1Select = (depth1Name) => {
    setActiveDepth1(depth1Name);
    
    // Explicit default sub-menu mapping for 1-depth categories
    const defaultTabMap = {
      '계약': 'IRP 계약등록',
    };
    
    const targetTab = defaultTabMap[depth1Name];
    if (targetTab) {
      handleSidebarTabSelect(targetTab);
      return;
    }

    // Fallback: Auto-select first submenu item of that depth1 category if switching
    const groups = menuDataMap[depth1Name];
    if (groups && groups.length > 0 && groups[0].items && groups[0].items.length > 0) {
      const firstTab = groups[0].items[0].name;
      handleSidebarTabSelect(firstTab);
    } else {
      addNotification(`'${depth1Name}' 메뉴로 이동했습니다.`, 'success');
    }
  };

  const handleCloseTab = (e, tabName) => {
    e.stopPropagation();
    if (openTabs.length === 1) {
      addNotification('최소 하나 이상의 작업 탭이 유지되어야 합니다.', 'warning');
      return;
    }
    
    const newTabs = openTabs.filter(t => t !== tabName);
    setOpenTabs(newTabs);
    
    if (activeTab === tabName) {
      const nextTab = newTabs[newTabs.length - 1];
      setActiveTab(nextTab);
      const path = findTabPath(nextTab);
      setActiveDepth1(path.depth1);
    }
    addNotification(`'${tabName}' 작업 탭이 종료되었습니다.`, 'success');
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      addNotification('전체 화면 모드가 활성화되었습니다.', 'success');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        addNotification('전체 화면 모드가 해제되었습니다.', 'success');
      }
    }
  };

  const handleCascadeLayout = () => {
    addNotification('작업 화면들을 계단식 배열로 정렬했습니다.', 'success');
  };

  const handleTileHorizontalLayout = () => {
    addNotification('작업 화면들을 가로 바둑판식 배열로 정렬했습니다.', 'success');
  };

  const handleTileVerticalLayout = () => {
    addNotification('작업 화면들을 세로 바둑판식 배열로 정렬했습니다.', 'success');
  };

  const handleCloseActiveTab = () => {
    if (openTabs.length === 1) {
      addNotification('최소 하나 이상의 작업 탭이 유지되어야 합니다.', 'warning');
      return;
    }
    const newTabs = openTabs.filter(t => t !== activeTab);
    setOpenTabs(newTabs);
    const nextTab = newTabs[newTabs.length - 1];
    setActiveTab(nextTab);
    const path = findTabPath(nextTab);
    setActiveDepth1(path.depth1);
    addNotification(`'${activeTab}' 작업 탭이 종료되었습니다.`, 'success');
  };

  const handleCloseAllTabs = () => {
    setOpenTabs(['대시보드']);
    setActiveTab('대시보드');
    setActiveDepth1('대시보드');
    addNotification('모든 작업 탭을 닫고 초기화했습니다.', 'success');
  };

  const handleSelectContract = (contract) => {
    setSelectedContract(contract);
    setIsSearchOpen(false);
    addNotification(`계약번호 [${contract.no}] 계약 정보가 폼에 자동 반영되었습니다.`, 'success');
  };

  const handleSaveContract = (formData) => {
    addNotification(`고객 [${formData.custName}] 님의 IRP 계약 정보 및 연간한도 설정이 완료되었습니다.`, 'success');
  };

  const handleResetForm = () => {
    setSelectedContract(null);
    addNotification('폼의 모든 입력란 정보가 초기화되었습니다.', 'success');
  };

  // Render Login screen if not authenticated
  if (!user) {
    return (
      <>
        <Login onLoginSuccess={handleLoginSuccess} />
        {/* Toast List */}
        <div className="toast-container">
          {notifications.map(n => (
            <div key={n.id} className="toast" style={{
              borderLeftColor: n.type === 'success' ? 'var(--accent)' : n.type === 'warning' ? 'var(--warning)' : 'var(--danger)'
            }}>
              <span>{n.message}</span>
            </div>
          ))}
        </div>
      </>
    );
  }

  const currentPath = findTabPath(activeTab);

  return (
    <div className="app-container" style={{ flexDirection: 'column' }}>
      {/* Top Header toolbar (combines logo, 1-depth menu) */}
      <Header
        activeDepth1={activeDepth1}
        onDepth1Select={handleDepth1Select}
        onLogoClick={() => handleSidebarTabSelect('대시보드')}
        isDashboard={activeTab === '대시보드'}
        headerStyle={headerStyle}
        setHeaderStyle={setHeaderStyle}
        addNotification={addNotification}
      />

      {/* Sub Header for Breadcrumbs & Process banner (Stretches full width above LNB) */}
      <div style={styles.subHeader}>
        {/* Right side utilities moved here: Session, Theme, Noti, Profile, Logout */}
        <div style={styles.subHeaderUtilities}>
          {/* User Info (Now at the very front) */}
          <div style={styles.userInfo}>
            <span style={styles.userName}>{user.name}</span>
          </div>

          {/* Session Timer & Action Buttons */}
          <div style={{ position: 'relative' }}>
            <div style={styles.sessionContainer}>
              <span style={styles.sessionLabel}>세션만료</span>
              <span style={styles.sessionTimer}>{formatTime(timeLeft)}</span>
              <button onClick={handleExtendSession} style={styles.extendBtn} className="btn">
                <RefreshIcon size={12} />
                연장
              </button>
              <button onClick={() => addNotification('세션 변경 설정 창이 열렸습니다.', 'success')} style={{ ...styles.extendBtn, marginLeft: '4px' }} className="btn">
                <SettingsIcon size={12} />
                변경
              </button>
              <button
                onClick={handleLogout}
                style={styles.logoutBtnInline}
                className="btn"
                title="로그아웃"
              >
                <LogOutIcon size={12} />
                로그아웃
              </button>
            </div>
          </div>
        </div>

        <div style={styles.verticalDivider} />

        <div style={styles.breadcrumb}>
          {activeTab !== '대시보드' && (
            <>
              {/* Home Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span style={styles.breadcrumbSeparator}>/</span>
              <span style={styles.breadcrumbHome}>{activeDepth1}</span>
              {currentPath.parent && (
                <>
                  <span style={styles.breadcrumbSeparator}>/</span>
                  <span style={styles.breadcrumbParent}>{currentPath.parent}</span>
                </>
              )}
              <span style={styles.breadcrumbSeparator}>/</span>
              <span style={styles.breadcrumbActive}>{activeTab || 'IRP 계약등록'}</span>
            </>
          )}

          {/* Right-side: Site selector + Manual + Alert */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>

            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>사이트</span>
            <select style={{
              fontSize: '0.78rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '3px 24px 3px 8px',
              height: '26px',
              cursor: 'pointer',
              outline: 'none',
              fontFamily: "'Outfit', sans-serif",
              appearance: 'auto',
            }}>
              <option>선택</option>
              <option>사이트 A</option>
              <option>사이트 B</option>
            </select>
            <button
              type="button"
              title="매뉴얼"
              onClick={() => addNotification('매뉴얼 페이지를 열었습니다.', 'info')}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '0.78rem', fontWeight: '700',
                color: 'var(--text-secondary)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '3px 6px', borderRadius: '4px',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              매뉴얼
            </button>
            <button
              type="button"
              title="공지사항"
              onClick={() => addNotification('공지사항을 확인해주세요.', 'warning')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '22px', height: '22px', borderRadius: '4px',
                backgroundColor: '#ef4444', border: 'none', cursor: 'pointer',
                color: '#fff', fontSize: '0.75rem', fontWeight: '900',
                flexShrink: 0,
              }}
            >
              !
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area Container */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', width: '100%' }}>
        {/* Sidebar Navigation */}
        {activeTab !== '대시보드' && (
          <Sidebar
            activeTab={activeTab}
            onTabSelect={handleSidebarTabSelect}
            activeDepth1={activeDepth1}
            collapsed={depth1Collapsed}
            onToggleCollapse={() => setDepth1Collapsed(!depth1Collapsed)}
          />
        )}

        {/* Main content body panel */}
        <div className="main-content">
          {/* Dynamic content screen wrapper */}
          <div className="scrollable-body">
            {activeTab === '대시보드' ? (
            <Dashboard isDark={isDark} onTabSelect={handleSidebarTabSelect} user={user} />
          ) : activeTab === 'IRP 계약등록' ? (
            <IRPContractForm
              selectedContract={selectedContract}
              onOpenSearch={() => setIsSearchOpen(true)}
              onSave={handleSaveContract}
              onReset={handleResetForm}
              addNotification={addNotification}
              headerStyle={headerStyle}
            />
          ) : (
            <div className="card" style={styles.placeholderCard}>
              <h2 style={styles.placeholderTitle}>{activeTab} Redesign</h2>
              <p style={styles.placeholderDesc}>
                현재 데모 버전에서는 핵심 화면인 <strong>'IRP 계약등록'</strong> 및 <strong>'계약 찾기'</strong> 모달 검색 화면만  구현해 두었습니다.
              </p>
              <button
                onClick={() => handleSidebarTabSelect('IRP 계약등록')}
                className="btn btn-primary"
                style={{ marginTop: '16px' }}
              >
                IRP 계약등록 화면으로 돌아가기
              </button>
            </div>
          )}
        </div>

        {/* Bottom Tabs Bar (Exact signature of D-RPS) */}
        <div style={styles.bottomTabsBar} className="glass-panel">
          <div style={styles.bottomTabsWrapper}>
            {openTabs.map(tab => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.bottomTabItem,
                  backgroundColor: activeTab === tab ? (headerStyle === 'simple' ? 'var(--bg-primary)' : '#fff8e1') : 'transparent',
                  borderLeftColor: activeTab === tab ? 'var(--border-color)' : 'transparent',
                  borderRightColor: activeTab === tab ? 'var(--border-color)' : 'transparent',
                  borderBottomColor: activeTab === tab ? (headerStyle === 'simple' ? 'var(--text-primary)' : '#ffb81c') : 'transparent',
                  borderBottomWidth: activeTab === tab ? '3px' : '1px',
                  borderBottomStyle: 'solid',
                  borderTopColor: 'transparent',
                  color: activeTab === tab ? (headerStyle === 'simple' ? 'var(--text-primary)' : 'rgba(7, 17, 38, 0.9)') : 'var(--text-secondary)',
                  height: activeTab === tab ? '36px' : '34px',
                  zIndex: activeTab === tab ? 2 : 1,
                }}
              >
                <span style={{
                  ...styles.tabIndicator,
                  backgroundColor: activeTab === tab ? (headerStyle === 'simple' ? 'var(--text-primary)' : '#ffb81c') : 'var(--text-tertiary)'
                }} />
                <span style={{ fontSize: '0.8rem', fontWeight: activeTab === tab ? '700' : '500' }}>{tab}</span>
                <button onClick={(e) => handleCloseTab(e, tab)} style={styles.tabCloseBtn}>&times;</button>
              </div>
            ))}
          </div>
          <div style={styles.tabActionsWrapper} className="tab-actions-wrapper">

            <button onClick={handleToggleFullscreen} style={styles.tabActionBtn} className="tab-action-btn" title="전체화면">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </button>
            <button onClick={handleCascadeLayout} style={styles.tabActionBtn} className="tab-action-btn" title="계단식배열">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="13" height="13" rx="1.5" />
                <rect x="8" y="8" width="13" height="13" rx="1.5" />
              </svg>
            </button>
            <button onClick={handleTileHorizontalLayout} style={styles.tabActionBtn} className="tab-action-btn" title="바둑판식배열(가로)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="8" rx="1.5" />
                <rect x="3" y="13" width="18" height="8" rx="1.5" />
              </svg>
            </button>
            <button onClick={handleTileVerticalLayout} style={styles.tabActionBtn} className="tab-action-btn" title="바둑판식배열(세로)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="8" height="18" rx="1.5" />
                <rect x="13" y="3" width="8" height="18" rx="1.5" />
              </svg>
            </button>
            <button onClick={handleCloseActiveTab} style={styles.tabActionBtn} className="tab-action-btn" title="현재화면닫기">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="13" height="13" rx="1.5" />
                <line x1="14" y1="14" x2="20" y2="20" />
                <line x1="20" y1="14" x2="14" y2="20" />
              </svg>
            </button>
            <button onClick={handleCloseAllTabs} style={styles.tabActionBtn} className="tab-action-btn" title="전체화면닫기">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="10" height="10" rx="1" />
                <rect x="7" y="7" width="10" height="10" rx="1" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="21" y1="15" x2="15" y2="21" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Status Bar at the very bottom */}
    <div style={styles.statusBar}>
      <div style={styles.statusBarLeft}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '800', marginRight: '8px' }}>처리메시지</span>
        <div style={{
          ...styles.processMsgBox,
          backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
          borderColor: isDark ? '#334155' : '#cbd5e1',
          padding: '3px 8px',
          borderRadius: '4px',
          borderStyle: 'solid',
          borderWidth: '1px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#475569', fontFamily: "'Outfit', sans-serif" }}>처리소요시간 : </span>
          <span style={{ fontSize: '0.75rem', color: isDark ? '#38bdf8' : '#0284c7', fontWeight: '700', fontFamily: "'Outfit', sans-serif" }}>(0.016 sec)</span>
          <span style={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#475569', fontFamily: "'Outfit', sans-serif" }}>정상 처리 되었습니다.</span>
        </div>
      </div>
      <div style={styles.statusBarRight}>
        <span style={{ ...styles.statusBarLabel, marginLeft: 0 }}>(최근)접속일시</span>
        <span style={{
          ...styles.statusBarValue,
          backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
          borderColor: isDark ? '#334155' : '#cbd5e1',
          color: isDark ? '#38bdf8' : '#0284c7'
        }}>2026-06-05 16:39:16</span>
        
        <span style={styles.statusBarLabel}>(최근)접속IP</span>
        <span style={{
          ...styles.statusBarValue,
          backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
          borderColor: isDark ? '#334155' : '#cbd5e1',
          color: isDark ? '#38bdf8' : '#0284c7'
        }}>222.108.214.128</span>
        
        <span style={styles.statusBarLabel}>(현)접속일시</span>
        <span style={{
          ...styles.statusBarValue,
          backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
          borderColor: isDark ? '#334155' : '#cbd5e1',
          color: isDark ? '#38bdf8' : '#0284c7'
        }}>2026-06-08 10:52:52</span>
        
        <span style={styles.statusBarLabel}>File ID</span>
        <span style={{
          ...styles.statusBarValue,
          backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
          borderColor: isDark ? '#334155' : '#cbd5e1',
          color: isDark ? '#38bdf8' : '#0284c7'
        }}>AGM00011</span>
      </div>
    </div>

      {/* Interactive Contract Search popup */}
      <ContractSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectContract={handleSelectContract}
        addNotification={addNotification}
      />

      {/* Floating toast notifications */}
      <div className="toast-container">
        {notifications.map(n => (
          <div key={n.id} className="toast" style={{
            borderLeftColor: n.type === 'success' ? 'var(--accent)' : n.type === 'warning' ? 'var(--warning)' : 'var(--danger)'
          }}>
            <span>{n.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  placeholderCard: {
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '350px',
  },
  placeholderTitle: {
    fontFamily: 'var(--font-display)',
    margin: '0 0 12px 0',
  },
  placeholderDesc: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    maxWidth: '500px',
    lineHeight: '1.6',
  },
  bottomTabsBar: {
    height: '42px',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    flexShrink: 0,
    backgroundColor: 'var(--bg-secondary)',
  },
  bottomTabsWrapper: {
    display: 'flex',
    gap: '2px',
    height: '100%',
    alignItems: 'flex-start',
  },
  bottomTabItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 16px',
    height: '34px',
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    border: '1px solid transparent',
    marginTop: '-1.5px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s',
  },
  tabIndicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
  },
  tabCloseBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    color: 'var(--text-tertiary)',
    cursor: 'pointer',
    padding: '0 2px',
    lineHeight: 1,
  },
  activePath: {
    fontSize: '0.72rem',
    color: 'var(--text-secondary)',
    display: 'flex',
    gap: '6px',
  },
  fileIDContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginRight: '8px',
  },
  fileIDLabel: {
    fontSize: '0.8rem',
    fontWeight: '800',
    letterSpacing: '-0.3px',
  },
  fileIDValue: {
    fontSize: '0.8rem',
    fontWeight: '800',
    padding: '3px 8px',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)',
  },
  tabActionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  tabActionBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    borderRadius: '4px',
    transition: 'all 0.15s ease',
  },
  subHeader: {
    height: '52px',
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    gap: '12px',
    flexShrink: 0,
  },
  subHeaderUtilities: {
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
    border: '1px solid var(--border-color)',
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
    borderBottom: '7px solid var(--border-color)',
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
    borderBottom: '8px solid var(--border-color)',
    zIndex: 100,
  },
  sessionLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  sessionTimer: {
    fontFamily: "'Outfit', sans-serif",
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
  logoutBtnInline: {
    padding: '4px 8px',
    fontSize: '0.72rem',
    height: '24px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    marginLeft: '4px',
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
    fontSize: '0.85rem',
    fontWeight: '600',
    flex: 1,
    overflow: 'hidden',
  },
  breadcrumbHome: {
    color: 'var(--text-tertiary)',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  breadcrumbSeparator: {
    color: 'var(--text-tertiary)',
    fontSize: '0.75rem',
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
  statusBar: {
    height: '36px',
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    flexShrink: 0,
    zIndex: 10,
  },
  statusBarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  statusBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusBarLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    marginLeft: '12px',
    marginRight: '4px',
    userSelect: 'none',
    fontFamily: "'Outfit', sans-serif",
  },
  statusBarValue: {
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    fontFamily: "'Outfit', sans-serif",
  },
};

export default App;
