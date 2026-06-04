import React, { useState } from 'react';

// Custom Icons for the Naver Works style cards
const InfoCircleIcon = ({ size = 14, color = '#94a3b8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);

const ChevronRightIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronLeftIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const PlusCircleIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const BellOffIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.73 21a2 2 0 0 1-3.46 0" /><path d="M18.63 13A17.89 17.89 0 0 1 18 8" /><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" /><path d="M18 8a6 6 0 0 0-9.33-5" /><line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const EmptyStateIcon = ({ size = 48, color = '#d1d5db' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

const Dashboard = ({ isDark, onTabSelect, user }) => {
  const [activeMyWorkTab, setActiveMyWorkTab] = useState('week'); // 'today' or 'week'
  const [activeMailTab, setActiveMailTab] = useState('received'); // 'all', 'received', 'unread'
  const [widgetPage, setWidgetPage] = useState(1);

  const getFormattedDate = () => {
    return "6월 4일 (목요일)";
  };

  return (
    <div style={{
      ...styles.container,
      backgroundColor: isDark ? '#090a0f' : '#f4f6fa'
    }}>
      {/* 3-Column Grid Layout */}
      <div style={styles.dashboardGrid}>
        
        {/* Column 1: Left Widget Column (width: 250px) */}
        <div style={styles.leftColumn}>
          {/* Account Widget */}
          <div style={{ ...styles.card, ...styles.profileCard, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <div style={styles.profileAvatarCircle}>
              {user?.name ? user.name.charAt(0) : '정'}
            </div>
            <h2 style={{ ...styles.profileWelcomeText, color: isDark ? '#f8fafc' : '#0f172a' }}>
              {user?.name || '정윤희'}님,<br />안녕하세요.
            </h2>
            <div style={{ ...styles.profileDateRow, color: isDark ? '#94a3b8' : '#64748b' }}>
              <span style={styles.calendarIconWrapper}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span>{getFormattedDate()}</span>
            </div>

            <div style={styles.profileActionsWrapper}>
              <button style={{ ...styles.capsuleBtn, color: isDark ? '#f8fafc' : '#374151', borderColor: isDark ? '#334155' : '#e5e7eb', backgroundColor: isDark ? '#1e293b' : '#ffffff' }} className="btn-secondary">
                <PlusCircleIcon size={16} />
                상태 설정
              </button>
              <button style={{ ...styles.capsuleBtn, color: isDark ? '#f8fafc' : '#374151', borderColor: isDark ? '#334155' : '#e5e7eb', backgroundColor: isDark ? '#1e293b' : '#ffffff' }} className="btn-secondary">
                <BellOffIcon size={16} />
                알림 일시 정지
              </button>
            </div>
          </div>

          {/* Edit Home Widget */}
          <div style={{ ...styles.card, ...styles.editWidgetCard, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <button style={{ ...styles.closeBtn, color: isDark ? '#94a3b8' : '#9ca3af' }}>&times;</button>
            
            <div style={styles.widgetIllustrationContainer}>
              {/* Custom SVG mockup of a screen with widgets */}
              <svg width="110" height="74" viewBox="0 0 120 80" fill="none" style={{ opacity: isDark ? 0.75 : 0.95 }}>
                <rect x="5" y="5" width="110" height="70" rx="4" fill={isDark ? '#1e293b' : '#f3f4f6'} stroke={isDark ? '#334155' : '#e5e7eb'} strokeWidth="1.5" />
                <rect x="12" y="12" width="96" height="6" rx="1" fill="#8aa8d6" opacity="0.8" />
                <rect x="12" y="24" width="28" height="24" rx="2" fill={isDark ? '#334155' : '#ffffff'} stroke={isDark ? '#475569' : '#e5e7eb'} strokeWidth="1" />
                <line x1="16" y1="36" x2="30" y2="36" stroke="#1e6ced" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="42" x2="36" y2="42" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
                
                <rect x="46" y="24" width="62" height="44" rx="2" fill={isDark ? '#334155' : '#ffffff'} stroke={isDark ? '#475569' : '#e5e7eb'} strokeWidth="1" />
                <circle cx="56" cy="34" r="4" fill="#a78bfa" />
                <line x1="66" y1="34" x2="100" y2="34" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
                <line x1="52" y1="44" x2="96" y2="44" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="52" y1="50" x2="88" y2="50" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
                
                <rect x="12" y="52" width="28" height="16" rx="2" fill="#34d399" opacity="0.2" />
                <circle cx="26" cy="60" r="3" fill="#34d399" />
              </svg>
            </div>

            <h3 style={{ ...styles.widgetCardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
              홈 위젯 편집 <InfoCircleIcon size={13} color={isDark ? '#64748b' : '#9ca3af'} />
            </h3>
            <p style={{ ...styles.widgetCardDesc, color: isDark ? '#94a3b8' : '#64748b' }}>
              자주 사용하는 메뉴를 홈의 위젯으로 추가할 수 있어요.
            </p>

            <div style={styles.paginationWrapper}>
              <div style={styles.paginationArrows}>
                <button style={{ ...styles.arrowBtn, color: isDark ? '#64748b' : '#9ca3af' }}><ChevronLeftIcon size={12} /></button>
                <button style={{ ...styles.arrowBtn, color: isDark ? '#64748b' : '#9ca3af' }}><ChevronRightIcon size={12} /></button>
              </div>
              <span style={{ ...styles.paginationText, color: isDark ? '#64748b' : '#9ca3af' }}>{widgetPage}/4</span>
            </div>
          </div>

          {/* Promotion Card */}
          <div style={{ ...styles.card, ...styles.promoCard, backgroundColor: isDark ? '#1e202a' : '#eff5ff', borderColor: isDark ? '#2e303c' : '#e0ebff' }}>
            <span style={{ ...styles.promoSub, color: isDark ? '#a5b4fc' : '#1e6ced' }}>프로젝트 서비스 출시</span>
            <h4 style={{ ...styles.promoTitle, color: isDark ? '#f8fafc' : '#1e293b' }}>
              흩어진 업무를 모아 프로젝트로 관리해 보세요.
            </h4>
            <div style={styles.promoIllustration}>
              <svg width="140" height="60" viewBox="0 0 140 60" fill="none">
                <rect x="10" y="5" width="120" height="50" rx="4" fill={isDark ? '#272935' : '#ffffff'} stroke={isDark ? '#3a3d4d' : '#d0e0fc'} strokeWidth="1" />
                <rect x="20" y="15" width="22" height="22" rx="11" fill="#1e6ced" opacity="0.15" />
                <circle cx="31" cy="26" r="6" fill="#1e6ced" />
                
                <rect x="52" y="18" width="60" height="6" rx="3" fill="#e2e8f0" />
                <rect x="52" y="28" width="40" height="6" rx="3" fill="#e2e8f0" />
                
                <circle cx="20" cy="48" r="3" fill="#34d399" />
                <circle cx="30" cy="48" r="3" fill="#a78bfa" />
                <circle cx="40" cy="48" r="3" fill="#fbbf24" />
              </svg>
            </div>
          </div>
        </div>

        {/* Column 2: Middle Widget Column */}
        <div style={styles.middleColumn}>
          {/* Today Widget */}
          <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <div style={styles.cardHeader}>
              <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                Today <InfoCircleIcon size={14} color={isDark ? '#64748b' : '#9ca3af'} />
              </h3>
            </div>

            <div style={styles.todayBanner}>
              <span style={styles.todayBannerBadge}>필독</span>
              <span style={{ ...styles.todayBannerText, color: isDark ? '#cbd5e1' : '#374151' }}>업무 효율을 200%로 만드는 게시판 활용법</span>
            </div>

            <div style={styles.todayItems}>
              <div style={{ ...styles.todayLineItem, borderLeftColor: isDark ? '#3b82f6' : '#1e6ced' }}>
                <span style={{ ...styles.todayItemText, color: isDark ? '#f8fafc' : '#111827' }}>테스트</span>
                <span style={styles.todayItemBadge}>+1</span>
              </div>
            </div>

            <div style={{ height: '140px' }} /> {/* Match mockup height spacing */}
          </div>

          {/* My Business Widget */}
          <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <div style={styles.cardHeader}>
              <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                내 업무 <ChevronRightIcon size={14} />
              </h3>
              {/* Custom Blue Shield Badge Icon */}
              <div style={styles.blueBadgeIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <div style={styles.tabNavRow}>
              <span
                onClick={() => setActiveMyWorkTab('today')}
                style={{
                  ...styles.tabNavLink,
                  color: activeMyWorkTab === 'today' ? '#1e6ced' : 'var(--text-secondary)',
                  borderBottomColor: activeMyWorkTab === 'today' ? '#1e6ced' : 'transparent',
                  fontWeight: activeMyWorkTab === 'today' ? '700' : '500'
                }}
              >
                오늘 마감
              </span>
              <span
                onClick={() => setActiveMyWorkTab('week')}
                style={{
                  ...styles.tabNavLink,
                  color: activeMyWorkTab === 'week' ? '#1e6ced' : 'var(--text-secondary)',
                  borderBottomColor: activeMyWorkTab === 'week' ? '#1e6ced' : 'transparent',
                  fontWeight: activeMyWorkTab === 'week' ? '700' : '500'
                }}
              >
                이번 주 마감
              </span>
            </div>

            <div style={styles.emptyStateContainer}>
              <EmptyStateIcon size={44} color={isDark ? '#334155' : '#d1d5db'} />
              <span style={{ ...styles.emptyStateText, color: isDark ? '#64748b' : '#9ca3af' }}>표시할 내용이 없습니다.</span>
            </div>
          </div>
        </div>

        {/* Column 3: Right Widget Column */}
        <div style={styles.rightColumn}>
          {/* Org Chart Widget */}
          <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <div style={styles.cardHeader}>
              <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                조직도 <ChevronRightIcon size={14} />
              </h3>
              {/* Custom Green User Badge Icon */}
              <div style={{ ...styles.blueBadgeIcon, backgroundColor: '#0ea5e9' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            <div style={{ ...styles.emptyStateContainer, padding: '40px 0 24px' }}>
              <EmptyStateIcon size={40} color={isDark ? '#334155' : '#d1d5db'} />
              <span style={{ ...styles.emptyStateText, color: isDark ? '#64748b' : '#9ca3af' }}>표시할 내용이 없습니다.</span>
            </div>

            <button style={styles.blueStretchBtn}>전체보기</button>
          </div>

          {/* Mail Widget */}
          <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <div style={styles.cardHeader}>
              <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                메일 <ChevronRightIcon size={14} />
              </h3>
              {/* Custom Green Mail Badge Icon */}
              <div style={{ ...styles.blueBadgeIcon, backgroundColor: '#10b981' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
            </div>

            <div style={styles.tabNavRow}>
              <span
                onClick={() => setActiveMailTab('all')}
                style={{
                  ...styles.tabNavLink,
                  color: activeMailTab === 'all' ? '#1e6ced' : 'var(--text-secondary)',
                  borderBottomColor: activeMailTab === 'all' ? '#1e6ced' : 'transparent',
                  fontWeight: activeMailTab === 'all' ? '700' : '500'
                }}
              >
                전체 메일
              </span>
              <span
                onClick={() => setActiveMailTab('received')}
                style={{
                  ...styles.tabNavLink,
                  color: activeMailTab === 'received' ? '#1e6ced' : 'var(--text-secondary)',
                  borderBottomColor: activeMailTab === 'received' ? '#1e6ced' : 'transparent',
                  fontWeight: activeMailTab === 'received' ? '700' : '500'
                }}
              >
                받은 메일
              </span>
              <span
                onClick={() => setActiveMailTab('unread')}
                style={{
                  ...styles.tabNavLink,
                  color: activeMailTab === 'unread' ? '#1e6ced' : 'var(--text-secondary)',
                  borderBottomColor: activeMailTab === 'unread' ? '#1e6ced' : 'transparent',
                  fontWeight: activeMailTab === 'unread' ? '700' : '500'
                }}
              >
                안 읽은 메일 <span style={{ color: '#ef4444', fontWeight: '700' }}>2</span>
              </span>
            </div>

            <div style={styles.mailList}>
              <div style={styles.mailItem}>
                <span style={{ ...styles.mailSubject, color: isDark ? '#f8fafc' : '#111827' }}>[네이버웍스 코어] 신청 완료 안내</span>
                <div style={styles.mailMeta}>
                  <span style={{ ...styles.mailSender, color: isDark ? '#94a3b8' : '#4b5563' }}>NAVER WORKS</span>
                  <span style={{ ...styles.mailDate, color: isDark ? '#64748b' : '#9ca3af' }}>2026.06.04 12:39</span>
                </div>
              </div>
              <div style={styles.mailItem}>
                <span style={{ ...styles.mailSubject, color: isDark ? '#f8fafc' : '#111827' }}>환영합니다! 지금부터 NAVER WORKS를 이용해 업무를 시작해보...</span>
                <div style={styles.mailMeta}>
                  <span style={{ ...styles.mailSender, color: isDark ? '#94a3b8' : '#4b5563' }}>NAVER WORKS</span>
                  <span style={{ ...styles.mailDate, color: isDark ? '#64748b' : '#9ca3af' }}>2026.06.04 12:38</span>
                </div>
              </div>
            </div>

            <div style={styles.doubleActionsRow}>
              <button style={{ ...styles.halfWhiteBtn, color: isDark ? '#f8fafc' : '#374151', borderColor: isDark ? '#334155' : '#cbd5e1', backgroundColor: isDark ? '#1e293b' : '#ffffff' }}>전체보기</button>
              <button style={styles.halfBlueBtn}>메일 쓰기</button>
            </div>
          </div>

          {/* Latest Posts Widget */}
          <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <div style={styles.cardHeader}>
              <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                최신 게시글 <ChevronRightIcon size={14} />
              </h3>
              {/* Custom Purple File Badge Icon */}
              <div style={{ ...styles.blueBadgeIcon, backgroundColor: '#a855f7' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
            </div>

            <div style={styles.mailList}>
              <div style={styles.mailItem}>
                <span style={{ ...styles.mailSubject, color: isDark ? '#f8fafc' : '#111827' }}>[게시글 작성 가이드] 업무 매뉴얼 게시판 활용하기</span>
                <div style={styles.mailMeta}>
                  <span style={{ ...styles.mailSender, color: isDark ? '#94a3b8' : '#4b5563' }}>업무 매뉴얼 | Board</span>
                  <span style={{ ...styles.mailDate, color: isDark ? '#64748b' : '#9ca3af' }}>2026.06.04 12:38</span>
                </div>
              </div>
              <div style={styles.mailItem}>
                <span style={{ ...styles.mailSubject, color: isDark ? '#f8fafc' : '#111827' }}>[게시글 작성 가이드] 공지사항 게시판 활용하기</span>
                <div style={styles.mailMeta}>
                  <span style={{ ...styles.mailSender, color: isDark ? '#94a3b8' : '#4b5563' }}>공지사항 | Board</span>
                  <span style={{ ...styles.mailDate, color: isDark ? '#64748b' : '#9ca3af' }}>2026.06.04 12:38</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    minHeight: 'calc(100vh - 70px)',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr 1fr',
    gap: '20px',
    alignItems: 'start',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  middleColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '0.92rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    margin: 0,
  },
  profileCard: {
    padding: '24px 20px',
    alignItems: 'flex-start',
    gap: '14px',
  },
  profileAvatarCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#8aa8d6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.6rem',
    marginBottom: '4px',
  },
  profileWelcomeText: {
    fontSize: '1.25rem',
    fontWeight: '800',
    lineHeight: '1.45',
    margin: '0',
    letterSpacing: '-0.4px',
  },
  profileDateRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    fontWeight: '500',
    marginBottom: '8px',
  },
  calendarIconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    opacity: 0.7,
  },
  profileActionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  },
  capsuleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    padding: '10px 16px',
    borderRadius: '9999px',
    border: '1px solid',
    fontSize: '0.82rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    textAlign: 'left',
  },
  editWidgetCard: {
    padding: '20px',
    alignItems: 'flex-start',
  },
  closeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    fontSize: '1.3rem',
    cursor: 'pointer',
  },
  widgetIllustrationContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 0 20px',
  },
  widgetCardTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    margin: '0 0 6px 0',
  },
  widgetCardDesc: {
    fontSize: '0.78rem',
    lineHeight: '1.4',
    margin: '0 0 16px 0',
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '12px',
  },
  paginationArrows: {
    display: 'flex',
    gap: '4px',
  },
  arrowBtn: {
    background: 'none',
    border: 'none',
    padding: '2px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationText: {
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  promoCard: {
    padding: '20px',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  promoSub: {
    fontSize: '0.72rem',
    fontWeight: '700',
    marginBottom: '6px',
    display: 'block',
  },
  promoTitle: {
    fontSize: '0.85rem',
    fontWeight: '800',
    lineHeight: '1.45',
    margin: '0 0 12px 0',
    letterSpacing: '-0.3px',
  },
  promoIllustration: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayBanner: {
    backgroundColor: '#fff1f2',
    border: '1px solid #ffe4e6',
    borderRadius: '6px',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  todayBannerBadge: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: '0.68rem',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
  },
  todayBannerText: {
    fontSize: '0.78rem',
    fontWeight: '700',
    lineHeight: '1.45',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  todayItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  todayLineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    paddingLeft: '12px',
    height: '24px',
  },
  todayItemText: {
    fontSize: '0.82rem',
    fontWeight: '700',
  },
  todayItemBadge: {
    backgroundColor: 'rgba(30,108,237,0.1)',
    color: '#1e6ced',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '999px',
  },
  blueBadgeIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    backgroundColor: '#1e6ced',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabNavRow: {
    display: 'flex',
    gap: '16px',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '16px',
    paddingBottom: '2px',
  },
  tabNavLink: {
    fontSize: '0.8rem',
    cursor: 'pointer',
    paddingBottom: '8px',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
  },
  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 0',
    gap: '10px',
  },
  emptyStateText: {
    fontSize: '0.78rem',
    fontWeight: '600',
  },
  blueStretchBtn: {
    width: '100%',
    padding: '12px 0',
    borderRadius: '6px',
    backgroundColor: '#1e6ced',
    color: '#ffffff',
    border: 'none',
    fontSize: '0.82rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: 'auto',
  },
  mailList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '16px',
  },
  mailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '10px',
    cursor: 'pointer',
  },
  mailSubject: {
    fontSize: '0.8rem',
    fontWeight: '700',
    lineHeight: '1.4',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  mailMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.72rem',
  },
  mailSender: {
    fontWeight: '600',
  },
  mailDate: {
    fontFamily: 'monospace',
  },
  doubleActionsRow: {
    display: 'flex',
    gap: '8px',
    marginTop: 'auto',
  },
  halfWhiteBtn: {
    flex: 1,
    padding: '12px 0',
    borderRadius: '6px',
    border: '1px solid',
    fontSize: '0.82rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  halfBlueBtn: {
    flex: 1,
    padding: '12px 0',
    borderRadius: '6px',
    backgroundColor: '#1e6ced',
    color: '#ffffff',
    border: 'none',
    fontSize: '0.82rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }
};

export default Dashboard;
