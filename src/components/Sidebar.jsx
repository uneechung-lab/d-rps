import React, { useState, useEffect } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  UserIcon,
  FileTextIcon,
  UsersIcon,
  DatabaseIcon,
  SearchIcon,
  PercentIcon,
  ShieldAlertIcon,
  SettingsIcon,
  CalendarIcon,
  DownloadIcon,
  LayoutDashboardIcon
} from '../assets/icons';
import { menuDataMap } from '../menuData';

const getGroupIcon = (groupId) => {
  switch (groupId) {
    case 'customer':
      return <UserIcon size={18} />;
    case 'subscriber':
      return <UsersIcon size={18} />;
    case 'contract-mgmt':
    case 'contract':
      return <FileTextIcon size={18} />;
    case 'tax':
    case 'tax-info':
      return <DatabaseIcon size={18} />;
    case 'contribution':
    case 'payment-mgmt':
      return <CalendarIcon size={18} />;
    case 'inst-mgmt':
    case 'deposit-expiry':
    case 'trade-inst':
    case 'trade-conclusion':
    case 'balance-yield':
      return <LayoutDashboardIcon size={18} />;
    case 'payout-apply':
    case 'payout-inst':
    case 'expected-retirement':
    case 'legal-limit':
      return <DownloadIcon size={18} />;
    case 'product-mgmt':
    case 'product-query':
      return <DatabaseIcon size={18} />;
    case 'fee-base-info':
    case 'fee-mgmt':
      return <PercentIcon size={18} />;
    case 'aftercare-mgmt':
    case 'pension-stats':
    case 'common-mgmt':
      return <ShieldAlertIcon size={18} />;
    case 'system-mgmt':
    case 'development':
      return <SettingsIcon size={18} />;
    default:
      return <FileTextIcon size={18} />;
  }
};

const Sidebar = ({ activeTab, onTabSelect, activeDepth1, collapsed, onToggleCollapse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openGroups, setOpenGroups] = useState({});

  // Reset open accordion groups when activeDepth1 or activeTab changes
  useEffect(() => {
    const currentGroups = menuDataMap[activeDepth1] || [];
    if (currentGroups.length > 0) {
      const initialOpenState = {};
      
      // Expand the group that contains the activeTab
      const containingGroup = currentGroups.find(group =>
        group.items.some(item => item.name === activeTab)
      );

      currentGroups.forEach((group, index) => {
        if (containingGroup) {
          initialOpenState[group.id] = group.id === containingGroup.id;
        } else {
          initialOpenState[group.id] = index === 0; // open first group by default
        }
      });
      setOpenGroups(initialOpenState);
    }
  }, [activeDepth1, activeTab]);


  const toggleGroup = (groupId) => {
    setOpenGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleExpandAll = () => {
    const currentGroups = menuDataMap[activeDepth1] || [];
    const allOpen = {};
    currentGroups.forEach(group => {
      allOpen[group.id] = true;
    });
    setOpenGroups(allOpen);
  };

  const handleCollapseAll = () => {
    const currentGroups = menuDataMap[activeDepth1] || [];
    const allCollapsed = {};
    currentGroups.forEach(group => {
      allCollapsed[group.id] = false;
    });
    setOpenGroups(allCollapsed);
  };

  const handleMenuClick = (menuItem) => {
    onTabSelect(menuItem.name);
  };

  // Filter items based on search term
  const activeMenuData = menuDataMap[activeDepth1] || [];
  const filteredMenuData = activeMenuData.map(group => {
    const matchedItems = group.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...group, items: matchedItems };
  }).filter(group => group.items.length > 0 || group.title.includes(searchTerm));

  return (
    <aside className="sidebar" style={{
      ...styles.sidebar,
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      color: 'var(--text-primary)',
    }}>
      {/* Sidebar Top: Collapse Toggle & App Info */}
      <div className="sidebar-header" style={{
        ...styles.header,
        padding: '0 16px',
        gap: '0',
        borderBottom: '1px solid var(--border-color)',
        justifyContent: 'center',
      }}>
        <div style={styles.brand}>
          <span style={{ ...styles.brandTitle, color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '800' }}>{activeDepth1}</span>
        </div>
      </div>

      {/* Sidebar search bar */}
      {true && (
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
          {!collapsed && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '1px solid var(--border-color)',
              gap: '8px'
            }}>
              <button
                onClick={handleCollapseAll}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  width: '24px',
                  height: '24px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s',
                }}
                title="전체 접기"
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.backgroundColor = 'var(--border-color)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; }}
              >
                <ChevronDownIcon size={14} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button
                onClick={handleExpandAll}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  width: '24px',
                  height: '24px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s',
                }}
                title="전체 펼치기"
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.backgroundColor = 'var(--border-color)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; }}
              >
                <ChevronDownIcon size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="sidebar-menu" style={styles.menuList}>
        {filteredMenuData.map((group) => {
          const isOpen = openGroups[group.id];
          const hasActiveItem = group.items.some(item => item.name === activeTab);

          // Determine theme-based styles dynamically
          const groupHeaderColor = hasActiveItem ? 'var(--primary)' : 'var(--text-secondary)';
          const iconColor = hasActiveItem ? 'var(--primary)' : 'var(--text-tertiary)';

          return (
            <div key={group.id} style={styles.groupContainer}>
              {/* Group Accordion Header */}
              <div
                onClick={() => toggleGroup(group.id)}
                style={{
                  ...styles.groupHeader,
                  color: groupHeaderColor
                }}
                className="menu-group-header"
              >
                <div style={styles.groupHeaderLeft}>
                  <span style={{ color: iconColor, display: 'flex', alignItems: 'center' }}>
                    {getGroupIcon(group.id)}
                  </span>
                  <span style={styles.groupTitle}>{group.title}</span>
                </div>
                <span style={{ color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center' }}>
                  {isOpen ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />}
                </span>
              </div>

              {/* Group Menu Items */}
              {isOpen && (
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
    fontSize: '0.925rem',
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
    fontSize: '0.9rem',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  bullet: {
    fontSize: '1rem',
    lineHeight: 1,
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
