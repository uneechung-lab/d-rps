import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Depth1Menu from './components/Depth1Menu';
import IRPContractForm from './components/IRPContractForm';
import ContractSearchModal from './components/ContractSearchModal';
import Dashboard from './components/Dashboard';
import { menuDataMap } from './menuData';
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

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setOpenTabs(['대시보드']);
    setActiveTab('대시보드');
    setActiveDepth1('대시보드');
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
    // Auto-select first submenu item of that depth1 category if switching
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
    <div className="app-container">
      {/* 1-Depth Left Menu */}
      <Depth1Menu 
        activeDepth1={activeDepth1} 
        onDepth1Select={handleDepth1Select} 
        collapsed={depth1Collapsed}
        onLogoClick={() => handleSidebarTabSelect('대시보드')}
      />

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
        {/* Top Header toolbar */}
        <Header
          user={user}
          isDark={isDark}
          onThemeToggle={handleThemeToggle}
          onLogout={handleLogout}
          addNotification={addNotification}
          activeTab={activeTab}
          activeDepth1={activeDepth1}
        />

        {/* Dynamic content screen wrapper */}
        <div className="scrollable-body">
          {activeTab === '대시보드' ? (
            <Dashboard isDark={isDark} onTabSelect={handleSidebarTabSelect} />
          ) : activeTab === 'IRP 계약등록' ? (
            <IRPContractForm
              selectedContract={selectedContract}
              onOpenSearch={() => setIsSearchOpen(true)}
              onSave={handleSaveContract}
              onReset={handleResetForm}
              addNotification={addNotification}
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
                  backgroundColor: activeTab === tab ? 'var(--bg-secondary)' : 'transparent',
                  borderColor: activeTab === tab ? 'var(--border-color)' : 'transparent',
                  color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)'
                }}
              >
                <span style={styles.tabIndicator} />
                <span style={{ fontSize: '0.8rem', fontWeight: activeTab === tab ? '700' : '600' }}>{tab}</span>
                <button onClick={(e) => handleCloseTab(e, tab)} style={styles.tabCloseBtn}>&times;</button>
              </div>
            ))}
          </div>
          <div style={styles.tabActionsWrapper} className="tab-actions-wrapper">
            {/* File ID Display */}
            <div style={styles.fileIDContainer}>
              <span style={{ ...styles.fileIDLabel, color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#475569' }}>File ID</span>
              <span style={{
                ...styles.fileIDValue,
                backgroundColor: isDark ? '#2e3748' : '#e2e8f0',
                color: isDark ? '#ffffff' : '#0f172a'
              }}>AGM00005</span>
            </div>

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
    alignItems: 'flex-end',
  },
  bottomTabItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 16px',
    height: '34px',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    border: '1px solid transparent',
    borderBottom: 'none',
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
  }
};

export default App;
