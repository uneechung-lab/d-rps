import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import IRPContractForm from './components/IRPContractForm';
import ContractSearchModal from './components/ContractSearchModal';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('IRP 계약등록');
  
  // Multi-tab system (bottom tabs as seen in old system)
  const [openTabs, setOpenTabs] = useState(['IRP 계약등록']);
  
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
    addNotification(`${userData.name} 님, 환영합니다! 시스템 로그인이 완료되었습니다.`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedContract(null);
    setOpenTabs(['IRP 계약등록']);
    setActiveTab('IRP 계약등록');
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
    addNotification(`'${tabName}' 화면으로 이동했습니다.`, 'success');
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
      setActiveTab(newTabs[newTabs.length - 1]);
    }
    addNotification(`'${tabName}' 작업 탭이 종료되었습니다.`, 'success');
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

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabSelect={handleSidebarTabSelect} />

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
        />

        {/* Dynamic content screen wrapper */}
        <div className="scrollable-body">
          {activeTab === 'IRP 계약등록' ? (
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
                현재 데모 버전에서는 핵심 화면인 <strong>'IRP 계약등록'</strong> 및 <strong>'계약 찾기'</strong> 모달 검색 연동을 완벽히 구현해 두었습니다.
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
          <div style={styles.activePath}>
            <span>현재 메뉴 경로:</span>
            <strong>계약 &gt; 계약관리 &gt; {activeTab}</strong>
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
  }
};

export default App;
