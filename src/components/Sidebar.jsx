import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  UserIcon,
  FileTextIcon,
  UsersIcon,
  DatabaseIcon,
  SearchIcon
} from '../assets/icons';

const menuData = [
  {
    id: 'customer',
    title: '고객관리',
    icon: <UserIcon size={18} />,
    items: [
      { id: 'user-reg', name: '사용자등록' },
      { id: 'user-list', name: '사용자목록' },
      { id: 'cust-change', name: '개인고객정보변경' },
      { id: 'cust-history', name: '개인고객정보이력' },
      { id: 'worker-reg', name: '근로자고객등록' },
    ]
  },
  {
    id: 'contract',
    title: '계약관리',
    icon: <FileTextIcon size={18} />,
    items: [
      { id: 'irp-reg', name: 'IRP 계약등록' },
      { id: 'dbdc-reg', name: 'DB/DC 계약등록' },
      { id: 'contract-biz', name: '계약별 업무등록/해제' },
      { id: 'product-lineup', name: '계약 운용상품라인업' },
      { id: 'handover-info', name: '계약인계정보' },
      { id: 'change-query', name: '계약변경조회' },
      { id: 'history-info', name: '계약정보 변경이력' },
      { id: 'cancel-req', name: '계약등록 취소신청' },
    ]
  },
  {
    id: 'subscriber',
    title: '가입자관리',
    icon: <UsersIcon size={18} />,
    items: [
      { id: 'sub-indiv', name: '가입자개별등록' },
      { id: 'sub-periodic', name: '가입자주기등록정보' },
      { id: 'sub-bulk', name: '가입자일괄등록' },
      { id: 'sub-search', name: '가입자검색' },
      { id: 'sub-history', name: '가입자변경이력' },
      { id: 'sub-transfer', name: '가입자이관신청' },
    ]
  },
  {
    id: 'tax',
    title: '과세이력',
    icon: <DatabaseIcon size={18} />,
    items: [
      { id: 'tax-trans-reg', name: '과세이전정보 등록(통신)' },
      { id: 'tax-trans-list', name: '과세이전정보 목록(통신)' },
    ]
  }
];

const Sidebar = ({ activeTab, onTabSelect }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openGroups, setOpenGroups] = useState({
    contract: true, // open contract management by default
    customer: false,
    subscriber: false,
    tax: false
  });

  const toggleGroup = (groupId) => {
    setOpenGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleMenuClick = (menuItem) => {
    onTabSelect(menuItem.name);
  };

  // Filter items based on search term
  const filteredMenuData = menuData.map(group => {
    const matchedItems = group.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...group, items: matchedItems };
  }).filter(group => group.items.length > 0 || group.title.includes(searchTerm));

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{
      ...styles.sidebar,
      backgroundColor: collapsed ? '#071126' : 'var(--bg-secondary)', // Dark when collapsed, original light when expanded!
      borderRight: collapsed ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid var(--border-color)',
      color: collapsed ? '#ffffff' : 'var(--text-primary)',
    }}>
      {/* Sidebar Top: Collapse Toggle & App Info */}
      <div className="sidebar-header" style={{
        ...styles.header,
        padding: collapsed ? '0 10px' : '0 16px',
        gap: collapsed ? '4px' : '0',
        borderBottom: collapsed ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid var(--border-color)',
      }}>
        {!collapsed ? (
          <div style={styles.brand}>
            <span style={{ ...styles.brandTitle, color: 'var(--text-primary)' }}>D-RPS Portal</span>
            <span style={{ ...styles.brandVersion, color: 'var(--text-tertiary)' }}>v3.5 Enterprise</span>
          </div>
        ) : (
          <div style={styles.collapsedLogo}>
            D
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            ...styles.toggleBtn,
            width: collapsed ? '22px' : '28px',
            height: collapsed ? '22px' : '28px',
            padding: 0,
            color: collapsed ? '#ffb81c' : 'var(--text-secondary)',
            borderColor: collapsed ? 'rgba(255, 255, 255, 0.15)' : 'var(--border-color)',
            backgroundColor: collapsed ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-tertiary)',
          }}
          title={collapsed ? "메뉴 열기" : "메뉴 접기"}
        >
          {collapsed ? <ChevronRightIcon size={12} /> : <ChevronRightIcon size={16} style={{ transform: 'rotate(180deg)' }} />}
        </button>
      </div>

      {/* Sidebar search bar */}
      {!collapsed && (
        <div style={styles.searchWrapper}>
          <div className="search-input-wrapper" style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="메뉴 빠른 검색..."
              className="form-input"
              style={{
                ...styles.searchInput,
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span style={{ ...styles.searchIcon, color: 'var(--text-tertiary)' }}><SearchIcon size={14} /></span>
          </div>
        </div>
      )}

      <div className="sidebar-menu" style={styles.menuList}>
        {filteredMenuData.map((group) => {
          const isOpen = openGroups[group.id];
          const hasActiveItem = group.items.some(item => item.name === activeTab);

          // Determine theme-based styles dynamically
          const groupHeaderColor = collapsed
            ? '#ffb81c'
            : (hasActiveItem ? 'var(--primary)' : 'var(--text-secondary)');
            
          const iconColor = collapsed
            ? '#ffb81c'
            : (hasActiveItem ? 'var(--primary)' : 'var(--text-tertiary)');

          return (
            <div key={group.id} style={styles.groupContainer}>
              {/* Group Accordion Header */}
              <div
                onClick={() => !collapsed && toggleGroup(group.id)}
                style={{
                  ...styles.groupHeader,
                  color: groupHeaderColor
                }}
                className="menu-group-header"
              >
                <div style={styles.groupHeaderLeft}>
                  {/* Next/Daum Yellow icons when collapsed, dynamic theme colors when expanded */}
                  <span style={{ color: iconColor, display: 'flex', alignItems: 'center' }}>
                    {group.icon}
                  </span>
                  {!collapsed && <span style={styles.groupTitle}>{group.title}</span>}
                </div>
                {!collapsed && (
                  <span style={{ color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center' }}>
                    {isOpen ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />}
                  </span>
                )}
              </div>

              {/* Group Menu Items */}
              {(!collapsed && isOpen) && (
                <div style={styles.groupItems}>
                  {group.items.map((item) => {
                    const isActive = activeTab === item.name;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleMenuClick(item)}
                        className={`menu-item ${isActive ? 'active' : ''}`}
                        style={{
                          ...styles.menuItem,
                          color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                          backgroundColor: isActive ? 'var(--bg-accent)' : 'transparent',
                          borderLeft: isActive ? '3px solid var(--primary)' : 'none',
                          borderTopLeftRadius: isActive ? '0' : '6px',
                          borderBottomLeftRadius: isActive ? '0' : '6px',
                        }}
                      >
                        <span style={{
                          ...styles.bullet,
                          color: isActive ? 'var(--primary)' : 'var(--text-tertiary)'
                        }}>•</span>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar footer: Quick Help */}
      {!collapsed && (
        <div style={styles.sidebarFooter}>
          <div style={styles.helpCard}>
            <h4 style={styles.helpTitle}>지원 센터</h4>
            <p style={styles.helpText}>Tel: 1544-0000</p>
            <p style={styles.helpText}>내선: 8909 (퇴직연금팀)</p>
          </div>
        </div>
      )}
    </aside>
  );
};

const styles = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#071126', // Premium dark brand background!
    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
    flexShrink: 0,
    color: '#ffffff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    height: '70px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  brandVersion: {
    fontSize: '0.68rem',
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '500',
  },
  toggleBtn: {
    background: 'none',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: 'var(--radius-sm)',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffb81c', // Yellow collapse button!
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  searchWrapper: {
    padding: '12px 16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  searchInput: {
    paddingLeft: '32px',
    fontSize: '0.8rem',
    height: '34px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.4)',
    display: 'flex',
    alignItems: 'center',
  },
  menuList: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 8px',
  },
  groupContainer: {
    marginBottom: '8px',
  },
  groupHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  groupHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  groupTitle: {
    fontSize: '0.825rem',
    fontWeight: '600',
  },
  groupItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    paddingLeft: '16px',
    marginTop: '4px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    fontSize: '0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  bullet: {
    fontSize: '1rem',
    lineHeight: 1,
  },
  sidebarFooter: {
    padding: '16px',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-primary)',
  },
  helpCard: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    padding: '12px',
    boxShadow: 'var(--card-shadow)',
  },
  helpTitle: {
    margin: '0 0 6px 0',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  helpText: {
    margin: 0,
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  collapsedLogo: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: '#ffb81c', // Yellow background for the icon D when collapsed!
    color: '#071126', // Dark icon letter!
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '1.15rem',
    fontFamily: 'var(--font-display)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
  }
};

export default Sidebar;
