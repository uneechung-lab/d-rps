import React, { useState } from 'react';

// Custom icons inside Dashboard for maximum independence
const UsersIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BriefcaseIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const DatabaseIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const ArrowDownRight = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" />
  </svg>
);

const ArrowUpRight = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

const ChevronRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronDown = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ChevronUp = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const PlusCircleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const BellOffIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.73 21a2 2 0 0 1-3.46 0" /><path d="M18.63 13A17.89 17.89 0 0 1 18 8" /><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" /><path d="M18 8a6 6 0 0 0-9.33-5" /><line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const InfoCircleIcon = ({ size = 14, color = '#94a3b8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);

const EmptyStateIcon = ({ size = 48, color = '#d1d5db' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

const Dashboard = ({ isDark, onTabSelect, user }) => {
  const [activeScheduleTab, setActiveScheduleTab] = useState('month');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(4);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: '결재 대기 건 심사 승인 (IRP 신규 계약 3건)', done: false, priority: 'High' },
    { id: 2, text: '지급 오류 거래 내역 대조 확인 (1건)', done: false, priority: 'High' },
    { id: 3, text: '당일 퇴직연금 미납 부담금 고지서 출력', done: true, priority: 'Normal' },
    { id: 4, text: '자산기관 결제대금 대사 검증 수행', done: false, priority: 'Normal' },
  ]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const kpis = [
    {
      title: '전체 계약수',
      num: '1,245',
      unit: ' 건',
      change: '+12건 금주 대비',
      icon: <BriefcaseIcon size={22} color={isDark ? '#38bdf8' : '#0284c7'} />,
      bg: isDark ? 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0.02) 100%)' : 'linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(2,132,199,0.01) 100%)',
      borderColorLight: 'rgba(2, 132, 199, 0.15)',
      borderColorDark: 'rgba(56, 189, 248, 0.2)'
    },
    {
      title: '전체 가입자수',
      num: '48,203',
      unit: ' 명',
      change: '+143명 당월 누적',
      icon: <UsersIcon size={22} color={isDark ? '#34d399' : '#059669'} />,
      bg: isDark ? 'linear-gradient(135deg, rgba(52,211,153,0.1) 0%, rgba(52,211,153,0.02) 100%)' : 'linear-gradient(135deg, rgba(5,150,105,0.06) 0%, rgba(5,150,105,0.01) 100%)',
      borderColorLight: 'rgba(5, 150, 105, 0.15)',
      borderColorDark: 'rgba(52, 211, 153, 0.2)'
    },
    {
      title: '총 적립금',
      num: '3조 2,450',
      unit: ' 억원',
      change: '+1,240억 전월비',
      icon: <DatabaseIcon size={22} color={isDark ? '#a78bfa' : '#7c3aed'} />,
      bg: isDark ? 'linear-gradient(135deg, rgba(167,139,250,0.1) 0%, rgba(167,139,250,0.02) 100%)' : 'linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0.01) 100%)',
      borderColorLight: 'rgba(124, 58, 237, 0.15)',
      borderColorDark: 'rgba(167, 139, 250, 0.2)'
    },
    {
      title: '당월 입금액',
      num: '142',
      unit: ' 억원',
      change: '+8.4% 목표 대비',
      icon: <ArrowUpRight size={22} color={isDark ? '#f472b6' : '#db2777'} />,
      bg: isDark ? 'linear-gradient(135deg, rgba(244,114,182,0.1) 0%, rgba(244,114,182,0.02) 100%)' : 'linear-gradient(135deg, rgba(219,39,119,0.06) 0%, rgba(219,39,119,0.01) 100%)',
      borderColorLight: 'rgba(219, 39, 119, 0.15)',
      borderColorDark: 'rgba(244, 114, 182, 0.2)'
    },
    {
      title: '당월 지급액',
      num: '98',
      unit: ' 억원',
      change: '-2.1% 전월 대비',
      icon: <ArrowDownRight size={22} color={isDark ? '#fbbf24' : '#d97706'} />,
      bg: isDark ? 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0.02) 100%)' : 'linear-gradient(135deg, rgba(217,119,6,0.06) 0%, rgba(217,119,6,0.01) 100%)',
      borderColorLight: 'rgba(217, 119, 6, 0.15)',
      borderColorDark: 'rgba(251, 191, 36, 0.2)'
    }
  ];

  const schedules = {
    today: [
      { time: '09:30', text: '신규 IRP 계약 가입 서류 실명 확인 심사', status: '정상', statusType: 'success' },
      { time: '11:00', text: '자산관리기관 간주 지급금 미대사 내역 모니터링', status: '대기중', statusType: 'warning' },
      { time: '13:00', text: '1차 펀드 매수/매도 지시 마감', status: '마감임박', statusType: 'danger' },
      { time: '15:30', text: '정기예금 만기 재투자 지시 승인 배치', status: '대기중', statusType: 'warning' },
      { time: '16:20', text: '교체매매(상품변경) 신청 건 승인 및 예탁원 전문 발송', status: '정상', statusType: 'success' },
      { time: '17:00', text: '당월 퇴직급여 지급 배치 검증 및 송금 실행', status: '정상', statusType: 'success' },
    ]
  };

  const monthEvents = {
    4: [
      { time: '09:30', text: '신규 IRP 계약 가입 서류 실명 확인 심사', status: '정상', statusType: 'success' },
      { time: '11:00', text: '자산관리기관 간주 지급금 미대사 내역 모니터링', status: '대기중', statusType: 'warning' },
      { time: '13:00', text: '1차 펀드 매수/매도 지시 마감', status: '마감임박', statusType: 'danger' },
      { time: '15:30', text: '정기예금 만기 재투자 지시 승인 배치', status: '대기중', statusType: 'warning' },
      { time: '16:20', text: '교체매매(상품변경) 신청 건 승인 및 예탁원 전문 발송', status: '정상', statusType: 'success' },
      { time: '17:00', text: '당월 퇴직급여 지급 배치 검증 및 송금 실행', status: '정상', statusType: 'success' },
    ],
    5: [
      { time: '10:00', text: '국민연금 이전 과세이연 자료 통산 대조', status: 'D-1', statusType: 'warning' },
    ],
    8: [
      { time: '16:00', text: 'XX기업 확정기여형(DC) 부담금 납입 기한 마감', status: 'D-4', statusType: 'info' },
    ],
    9: [
      { time: '14:00', text: '상반기 정기 재정검증 서브미션 보고서 작성', status: 'D-5', statusType: 'normal' },
    ],
    15: [
      { time: '09:00', text: '퇴직연금 수수료(운용/자산관리) 자동 출금 청구일', status: 'D-11', statusType: 'normal' },
    ],
    25: [
      { time: '10:00', text: 'IRP 미지정 가입자 디폴트옵션 사전 통지 발송 배치', status: 'D-21', statusType: 'normal' },
    ],
    30: [
      { time: '18:00', text: '분기별 퇴직연금 비교공시 자료 검토 완료', status: 'D-26', statusType: 'danger' },
    ]
  };

  const notices = [
    { date: '2026-06-04', category: '시스템', tagColor: '#38bdf8', text: '퇴직연금 대외 시스템 정기 유지보수 점검 안내 (06/07 01시)' },
    { date: '2026-06-02', category: '법률개정', tagColor: '#34d399', text: '디폴트옵션(사전지정운용제도) 관련 감독규정 개정안 가이드라인 공지' },
    { date: '2026-05-29', category: '업무지침', tagColor: '#a78bfa', text: 'IRP 연간납입한도(최대 900만원) 변경 신청 및 확인사항 업무 지침' },
    { date: '2026-05-25', category: '공지사항', tagColor: '#94a3b8', text: 'D-RPS Enterprise v3.6 마이너 릴리즈 노트 공유' },
  ];

  const quickLinks = [
    { name: 'IRP 계약등록', icon: <BriefcaseIcon size={18} />, target: 'IRP 계약등록', color: '#0284c7' },
    { name: '예적금상품관리', icon: <DatabaseIcon size={18} />, target: '예적금상품관리', color: '#059669' },
    { name: '보유자산상세현황', icon: <UsersIcon size={18} />, target: '계약별 자산현황/잔고조회', color: '#7c3aed' },
    { name: '교체매매 지시', icon: <ArrowDownRight size={18} />, target: '상품교체(교체매매) 등록/승인', color: '#db2777' }
  ];

  return (
    <div style={styles.container}>
      {/* Main Outer Split: Left Column (260px) and Right Content Area (rest of the width) */}
      <div style={styles.outerLayout}>
        
        {/* Left Side: Account and Quick Links Widgets */}
        <div style={styles.leftColumn}>
          {/* Account Widget */}
          <div style={{ ...styles.card, ...styles.profileCard, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <div style={styles.profileAvatarCircle}>
              {user?.name ? user.name.charAt(0) : '홍'}
            </div>
            <h2 style={{ ...styles.profileWelcomeText, color: isDark ? '#f8fafc' : '#0f172a' }}>
              {user?.name || '홍길동'}님,<br />안녕하세요.
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
              <span>6월 4일 (목요일)</span>
            </div>

            <div style={styles.profileActionsWrapper}>
              <button style={{ ...styles.capsuleBtn, color: isDark ? '#f8fafc' : '#374151', borderColor: isDark ? '#334155' : '#e5e7eb', backgroundColor: isDark ? '#1e293b' : '#ffffff' }}>
                <BellOffIcon size={16} />
                알림 일시 정지
              </button>
            </div>
          </div>

          {/* Quick Links Widget */}
          <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
            <div style={styles.cardHeader}>
              <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                자주 쓰는 메뉴 퀵링크 <ChevronRight size={14} />
              </h3>
            </div>
            <div style={styles.quickLinkGrid1Col}>
              {quickLinks.map((link, idx) => (
                <div
                  key={idx}
                  onClick={() => onTabSelect(link.target)}
                  style={{
                    ...styles.quickLinkCardHorizontal,
                    backgroundColor: isDark ? '#1e202a' : '#f8fafc',
                    borderColor: isDark ? '#2e303c' : '#e2e8f0',
                  }}
                  className="dashboard-quicklink"
                >
                  <div style={{ ...styles.quickLinkIconContainer, backgroundColor: `${link.color}15`, color: link.color, flexShrink: 0 }}>
                    {link.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                    <span style={{ ...styles.quickLinkLabel, color: isDark ? '#f8fafc' : '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{link.name}</span>
                    <span style={styles.quickLinkDesc}>바로가기 &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: KPI Grid on Top, Widgets side-by-side underneath */}
        <div style={styles.rightLayoutArea}>
          {/* KPI Panel Grid on Top (1 row of 5 columns) */}
          <div style={styles.kpiGrid}>
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.kpiCard,
                  backgroundColor: isDark ? '#12141c' : '#ffffff',
                  borderColor: isDark ? '#222636' : '#e2e8f0',
                }}
                className="dashboard-kpi-card"
              >
                <div style={styles.kpiHeader}>
                  <span style={{ ...styles.kpiTitle, color: isDark ? '#94a3b8' : '#64748b' }}>{kpi.title}</span>
                  {kpi.icon}
                </div>
                <div style={{ ...styles.kpiValue, color: isDark ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'baseline' }}>
                  <span>{kpi.num}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', marginLeft: '2px', color: isDark ? '#94a3b8' : '#475569', fontFamily: 'var(--font-sans)' }}>{kpi.unit}</span>
                </div>
                <div style={{ ...styles.kpiChange, color: isDark ? '#cbd5e1' : '#94a3b8' }}>{kpi.change}</div>
              </div>
            ))}
          </div>

          {/* Under-KPI Grid: Middle and Right columns side-by-side */}
          <div style={styles.innerTwoColumnGrid}>
            {/* Column 2: Today Banner & Schedule Widget */}
            <div style={styles.middleColumn}>
              {/* Today Banner */}
              <div style={{
                ...styles.card,
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.12)' : '#fff1f2',
                borderColor: isDark ? '#222636' : '#e2e8f0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                padding: '17px 16px',
                justifyContent: 'flex-start'
              }}>
                <span style={styles.todayBannerBadge}>필독</span>
                <span style={{ ...styles.todayBannerText, color: isDark ? '#fca5a5' : '#b91c1c', marginBottom: 0 }}>
                  당월 퇴직연금 수수료 마감 및 재정검증 비율 준수
                </span>
              </div>

              {/* Schedule Widget (일정) */}
              <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
                <div style={styles.cardHeader}>
                  <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                    일정 <ChevronRight size={14} />
                  </h3>
                </div>
                <div style={styles.tabNavRow}>
                  <span
                    onClick={() => setActiveScheduleTab('today')}
                    style={{
                      ...styles.tabNavLink,
                      color: activeScheduleTab === 'today' ? '#1e6ced' : 'var(--text-secondary)',
                      borderBottomColor: activeScheduleTab === 'today' ? '#1e6ced' : 'transparent',
                      fontWeight: activeScheduleTab === 'today' ? '700' : '500'
                    }}
                  >
                    오늘의 일정
                  </span>
                  <span
                    onClick={() => setActiveScheduleTab('week')}
                    style={{
                      ...styles.tabNavLink,
                      color: activeScheduleTab === 'week' ? '#1e6ced' : 'var(--text-secondary)',
                      borderBottomColor: activeScheduleTab === 'week' ? '#1e6ced' : 'transparent',
                      fontWeight: activeScheduleTab === 'week' ? '700' : '500'
                    }}
                  >
                    금주일정
                  </span>
                  <span
                    onClick={() => setActiveScheduleTab('month')}
                    style={{
                      ...styles.tabNavLink,
                      color: activeScheduleTab === 'month' ? '#1e6ced' : 'var(--text-secondary)',
                      borderBottomColor: activeScheduleTab === 'month' ? '#1e6ced' : 'transparent',
                      fontWeight: activeScheduleTab === 'month' ? '700' : '500'
                    }}
                  >
                    당월일정
                  </span>
                </div>

                {activeScheduleTab === 'today' && (
                  <div style={styles.timelineList}>
                    {schedules.today.map((sch, idx) => (
                      <div key={idx} style={styles.timelineItem}>
                        <span style={{ ...styles.timelineTime, color: isDark ? '#94a3b8' : '#64748b' }}>{sch.time}</span>
                        <div style={styles.timelineContent}>
                          <span style={{ ...styles.timelineText, color: isDark ? '#f8fafc' : '#111827' }}>{sch.text}</span>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: sch.statusType === 'danger' ? 'rgba(239,68,68,0.1)' : sch.statusType === 'warning' ? 'rgba(245,158,11,0.1)' : sch.statusType === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(56,189,248,0.1)',
                            color: sch.statusType === 'danger' ? 'var(--danger)' : sch.statusType === 'warning' ? 'var(--warning)' : sch.statusType === 'success' ? 'var(--accent)' : '#0284c7',
                          }}>
                            {sch.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeScheduleTab === 'week' && (
                  <div>
                    <div style={styles.weekGridHeader}>
                      <div style={styles.weekGridHeaderCellTime}>시간</div>
                      {[
                        { label: '6/1(월)', dayNum: 1 },
                        { label: '6/2(화)', dayNum: 2 },
                        { label: '6/3(수)', dayNum: 3 },
                        { label: '6/4(목)', dayNum: 4 },
                        { label: '6/5(금)', dayNum: 5 },
                      ].map((d, i) => (
                        <div key={i} style={styles.weekGridHeaderCell}>{d.label}</div>
                      ))}
                    </div>
                    {['09:00', '11:00', '13:00', '15:00', '17:00'].map((time, idx) => (
                      <div key={idx} style={styles.weekGridRow}>
                        <div style={styles.weekGridTimeCell}>{time}</div>
                        {[1, 2, 3, 4, 5].map((dayNum, dIdx) => {
                          const dayEvts = monthEvents[dayNum] || [];
                          const matchedEvt = dayEvts.find(e => {
                            const hour = parseInt(e.time.split(':')[0]);
                            const slotHour = parseInt(time.split(':')[0]);
                            return hour >= slotHour && hour < slotHour + 2;
                          });
                          return (
                            <div key={dIdx} style={styles.weekGridCell}>
                              {matchedEvt ? (
                                <div
                                  title={matchedEvt.text}
                                  style={{
                                    ...styles.weekEventBadge,
                                    backgroundColor: matchedEvt.statusType === 'danger' ? 'rgba(239,68,68,0.1)' : matchedEvt.statusType === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(56,189,248,0.1)',
                                    color: matchedEvt.statusType === 'danger' ? 'var(--danger)' : matchedEvt.statusType === 'warning' ? 'var(--warning)' : '#0284c7',
                                    borderLeft: `3px solid ${matchedEvt.statusType === 'danger' ? 'var(--danger)' : matchedEvt.statusType === 'warning' ? 'var(--warning)' : '#0284c7'}`
                                  }}
                                >
                                  {matchedEvt.text.substring(0, 6)}..
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {activeScheduleTab === 'month' && (
                  <div style={styles.calendarContainer}>
                    <div style={styles.calendarHeader}>
                      {['일', '월', '화', '수', '목', '금', '토'].map((w, i) => (
                        <span key={i} style={{
                          ...styles.calendarHeaderDay,
                          color: i === 0 ? 'var(--danger)' : i === 6 ? '#2563eb' : 'var(--text-secondary)'
                        }}>{w}</span>
                      ))}
                    </div>
                    <div style={styles.calendarGrid}>
                      {Array.from({ length: 35 }).map((_, i) => {
                        const dayNum = i;
                        const cellWeekIndex = Math.floor(i / 7);
                        // Show only the first week containing today (June 4th is in week 0) by default
                        if (!isCalendarExpanded && cellWeekIndex !== 0) {
                          return null;
                        }

                        const isValidDay = dayNum >= 1 && dayNum <= 30;
                        const hasEvents = isValidDay && monthEvents[dayNum] && monthEvents[dayNum].length > 0;
                        const isSelected = isValidDay && selectedCalendarDay === dayNum;
                        const isToday = isValidDay && dayNum === 4;

                        return (
                          <div
                            key={i}
                            onClick={() => isValidDay && setSelectedCalendarDay(dayNum)}
                            style={{
                              ...styles.calendarCell,
                              cursor: isValidDay ? 'pointer' : 'default',
                              backgroundColor: isSelected ? (isDark ? 'rgba(30,108,237,0.2)' : 'rgba(30,108,237,0.08)') : 'transparent',
                              borderColor: isSelected ? '#1e6ced' : 'transparent',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                            }}
                          >
                            {isValidDay && (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', width: '100%' }}>
                                <span style={{
                                  ...styles.calendarDayNum,
                                  color: isToday ? '#1e6ced' : (i % 7 === 0 ? 'var(--danger)' : i % 7 === 6 ? '#2563eb' : (isDark ? '#cbd5e1' : '#374151')),
                                  fontWeight: isToday || isSelected ? '700' : '500',
                                  border: isToday ? '1.5px solid #1e6ced' : 'none',
                                  borderRadius: '50%',
                                  width: '18px',
                                  height: '18px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.7rem'
                                }}>
                                  {dayNum}
                                </span>
                                {hasEvents && (
                                  <div style={styles.calendarEventDotContainer}>
                                    {monthEvents[dayNum].map((e, eIdx) => (
                                      <span key={eIdx} style={{
                                        ...styles.calendarEventDot,
                                        backgroundColor: e.statusType === 'danger' ? 'var(--danger)' : e.statusType === 'warning' ? 'var(--warning)' : '#0284c7'
                                      }} />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div style={styles.expandButtonWrapper}>
                      <button
                        onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
                        style={{
                          ...styles.capsuleBtn,
                          color: isDark ? '#f8fafc' : '#374151',
                          borderColor: isDark ? '#334155' : '#e5e7eb',
                          backgroundColor: isDark ? '#1e293b' : '#ffffff',
                          justifyContent: 'center',
                          width: 'auto',
                          margin: '0 auto',
                          padding: '8px 20px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {isCalendarExpanded ? (
                          <>
                            <ChevronUp size={16} />
                            <span>접기</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} />
                            <span>더보기</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div style={{ ...styles.calendarEventsList, backgroundColor: isDark ? '#1e202a' : '#f8fafc' }}>
                      <div style={styles.calendarEventsListHeader}>
                        <span style={{ fontWeight: '700', fontSize: '0.75rem', color: isDark ? '#f8fafc' : '#0f172a' }}>
                          6월 {selectedCalendarDay}일 일정
                        </span>
                      </div>
                      {monthEvents[selectedCalendarDay] && monthEvents[selectedCalendarDay].length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                          {monthEvents[selectedCalendarDay].map((evt, idx) => (
                            <div key={idx} style={styles.calendarEventItem}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0 }}>
                                <span style={{ ...styles.calendarEventTime, color: isDark ? '#94a3b8' : '#64748b' }}>{evt.time}</span>
                                <span style={{ ...styles.calendarEventText, color: isDark ? '#cbd5e1' : '#374151', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={evt.text}>{evt.text}</span>
                              </div>
                              <span style={{
                                ...styles.statusBadge,
                                backgroundColor: evt.statusType === 'danger' ? 'rgba(239,68,68,0.1)' : evt.statusType === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
                                color: evt.statusType === 'danger' ? 'var(--danger)' : evt.statusType === 'warning' ? 'var(--warning)' : 'var(--accent)',
                              }}>
                                {evt.status || '대기'}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textAlign: 'center', display: 'block', padding: '6px 0' }}>
                          일정이 없습니다.
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Column 3: Right Widget Column */}
            <div style={styles.rightColumn}>
              {/* To-Do List Widget (나의 할 일) */}
              <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
                <div style={styles.cardHeader}>
                  <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                    나의 할 일 <ChevronRight size={14} />
                  </h3>
                  <span style={{ ...styles.todoCount, color: isDark ? '#94a3b8' : '#64748b' }}>
                    미완료 {todos.filter(t => !t.done).length}건
                  </span>
                </div>

                <div style={styles.todoList}>
                  {todos.map(todo => (
                    <div
                      key={todo.id}
                      style={{
                        ...styles.todoItem,
                        backgroundColor: isDark ? '#1e202a' : '#f8fafc',
                        borderColor: isDark ? '#2e303c' : '#e2e8f0',
                      }}
                      onClick={() => toggleTodo(todo.id)}
                    >
                      <div style={styles.todoCheckWrapper}>
                        <div style={{
                          ...styles.todoCheckbox,
                          backgroundColor: todo.done ? 'var(--accent)' : 'transparent',
                          borderColor: todo.done ? 'var(--accent)' : (isDark ? '#475569' : '#cbd5e1')
                        }}>
                          {todo.done && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="4">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span style={{
                          ...styles.todoText,
                          textDecoration: todo.done ? 'line-through' : 'none',
                          color: todo.done ? 'var(--text-tertiary)' : (isDark ? '#f8fafc' : '#0f172a')
                        }}>{todo.text}</span>
                      </div>
                      <span style={{
                        ...styles.todoBadge,
                        backgroundColor: todo.priority === 'High' ? 'rgba(239,68,68,0.1)' : 'rgba(148,163,184,0.1)',
                        color: todo.priority === 'High' ? 'var(--danger)' : (isDark ? '#94a3b8' : '#64748b')
                      }}>
                        {todo.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notice Board Widget */}
              <div style={{ ...styles.card, backgroundColor: isDark ? '#12141c' : '#ffffff' }}>
                <div style={styles.cardHeader}>
                  <h3 style={{ ...styles.cardTitle, color: isDark ? '#f8fafc' : '#0f172a' }}>
                    공지사항 <ChevronRight size={14} />
                  </h3>
                </div>
                <div style={styles.noticeList}>
                  {notices.map((not, idx) => (
                    <div key={idx} style={styles.noticeItem}>
                      <div style={styles.noticeMeta}>
                        <span style={{ ...styles.noticeDate, color: isDark ? '#64748b' : '#9ca3af' }}>{not.date}</span>
                        <span style={{
                          ...styles.noticeTag,
                          borderColor: not.tagColor,
                          color: not.tagColor
                        }}>{not.category}</span>
                      </div>
                      <span style={{ ...styles.noticeText, color: isDark ? '#cbd5e1' : '#1e293b' }}>{not.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div> {/* Closing innerTwoColumnGrid */}
        </div> {/* Closing rightLayoutArea */}

      </div> {/* Closing outerLayout */}
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    width: '100%',
  },
  kpiCard: {
    borderRadius: '12px',
    padding: '16px 20px',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: 'var(--card-shadow)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  kpiHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiTitle: {
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: '1.35rem',
    fontWeight: '800',
    fontFamily: 'var(--font-display)',
  },
  kpiChange: {
    fontSize: '0.72rem',
    fontWeight: '600',
    fontFamily: 'var(--font-display)',
  },
  outerLayout: {
    display: 'flex',
    gap: '20px',
    alignItems: 'start',
    width: '100%',
  },
  rightLayoutArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  innerTwoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    alignItems: 'start',
  },
  leftColumn: {
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flexShrink: 0,
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
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.05)',
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
    border: '1px solid var(--border-color)',
    fontSize: '0.82rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    textAlign: 'left',
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
  kpiList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  kpiRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    borderRadius: '8px',
    transition: 'all 0.2s',
  },
  kpiRowLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  kpiRowTitle: {
    fontSize: '0.78rem',
    fontWeight: '600',
  },
  kpiRowValue: {
    fontSize: '1.15rem',
    fontWeight: '800',
    fontFamily: 'var(--font-display)',
  },
  kpiRowRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  kpiRowChange: {
    fontSize: '0.7rem',
    fontWeight: '600',
  },
  tabNavRow: {
    display: 'flex',
    gap: '16px',
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
  timelineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  timelineItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  timelineTime: {
    fontSize: '0.8rem',
    fontWeight: '700',
    fontFamily: 'var(--font-display)',
    width: '45px',
    paddingTop: '2px',
  },
  timelineContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px',
  },
  timelineText: {
    fontSize: '0.82rem',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  statusBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  todoCount: {
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.2s',
  },
  todoCheckWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  todoCheckbox: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
  },
  todoText: {
    fontSize: '0.82rem',
    fontWeight: '600',
  },
  todoBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  noticeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  noticeItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '10px',
  },
  noticeMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  noticeDate: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-display)',
  },
  noticeTag: {
    fontSize: '0.65rem',
    fontWeight: '700',
    border: '1px solid',
    borderRadius: '3px',
    padding: '1px 5px',
  },
  noticeText: {
    fontSize: '0.8rem',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  quickLinkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  quickLinkGrid1Col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  quickLinkCard: {
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  quickLinkCardHorizontal: {
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  quickLinkIconContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLinkLabel: {
    fontSize: '0.825rem',
    fontWeight: '700',
  },
  quickLinkDesc: {
    fontSize: '0.68rem',
    color: 'var(--text-tertiary)',
    fontWeight: '600',
    marginTop: '2px',
  },

  // Weekly Timetable styles
  weekGridHeader: {
    display: 'grid',
    gridTemplateColumns: '50px repeat(5, 1fr)',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '6px',
    padding: '8px 4px',
    textAlign: 'center',
    marginBottom: '8px',
  },
  weekGridHeaderCellTime: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
  },
  weekGridHeaderCell: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
  },
  weekGridRow: {
    display: 'grid',
    gridTemplateColumns: '50px repeat(5, 1fr)',
    borderBottom: '1px solid var(--border-color)',
    alignItems: 'center',
    padding: '8px 4px',
  },
  weekGridTimeCell: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-display)',
    textAlign: 'center',
  },
  weekGridCell: {
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
  },
  weekEventBadge: {
    fontSize: '0.62rem',
    fontWeight: '600',
    padding: '4px 6px',
    borderRadius: '4px',
    width: '100%',
    textAlign: 'left',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    transition: 'transform 0.15s',
  },

  // Calendar styles
  calendarContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  calendarHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    textAlign: 'center',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '8px',
  },
  calendarHeaderDay: {
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  },
  calendarCell: {
    aspectRatio: '1',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    border: '1px solid transparent',
    transition: 'all 0.2s',
  },
  calendarDayNum: {
    fontFamily: 'var(--font-display)',
  },
  calendarEventDotContainer: {
    display: 'flex',
    gap: '2px',
    justifyContent: 'center',
  },
  calendarEventDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
  },
  calendarEventsList: {
    borderRadius: '8px',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '4px',
  },
  calendarEventsListHeader: {
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '6px',
    marginBottom: '4px',
  },
  calendarEventItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: '6px',
    borderBottom: '1px dotted var(--border-color)',
  },
  calendarEventTime: {
    fontSize: '0.75rem',
    fontWeight: '700',
    fontFamily: 'var(--font-display)',
    width: '40px',
  },
  calendarEventText: {
    fontSize: '0.75rem',
    fontWeight: '600',
    flex: 1,
  },
  expandButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '6px',
    marginBottom: '6px',
  },
  expandBtn: {
    fontSize: '0.72rem',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }
};

export default Dashboard;
