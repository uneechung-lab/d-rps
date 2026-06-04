import React from 'react';
import { depth1Menus } from '../menuData';

const Depth1Menu = ({ activeDepth1, onDepth1Select, collapsed }) => {
  return (
    <div style={{
      ...styles.container,
      width: collapsed ? '76px' : '160px',
      alignItems: collapsed ? 'center' : 'stretch',
    }} className={`depth1-menu-container ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand Logo Header (Side-by-Side when expanded, icon only when collapsed) */}
      <div style={{
        ...styles.logoSection,
        padding: collapsed ? '0' : '0 16px',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <div style={styles.logoCircle}>
          <span style={styles.logoText}>D</span>
        </div>
        {!collapsed && (
          <div style={styles.logoBrand}>
            <span style={{ ...styles.logoBrandTitle, fontSize: '1.1rem', fontWeight: '800' }}>D-RPS</span>
          </div>
        )}
      </div>

      {/* Menu Navigation Items */}
      <div style={styles.itemsWrapper}>
        {depth1Menus.map((menu) => {
          const isActive = activeDepth1 === menu.name;
          return (
            <button
              key={menu.id}
              onClick={() => onDepth1Select(menu.name)}
              style={{
                ...styles.menuItem,
                flexDirection: collapsed ? 'column' : 'row',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '12px 0' : '10px 12px',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-accent)' : 'transparent',
              }}
              title={menu.name}
              className={`depth1-item ${isActive ? 'active' : ''}`}
            >
              {/* Active Indicator Line */}
              {isActive && <div style={styles.activeIndicator} />}
              
              {/* Icon */}
              <div style={{
                ...styles.iconWrapper,
                color: isActive ? 'var(--primary)' : 'var(--text-tertiary)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}>
                {menu.icon({ size: collapsed ? 22 : 18 })}
              </div>
              
              {/* Label (Hidden when collapsed) */}
              {!collapsed && (
                <span style={{
                  ...styles.label,
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '700' : '600'
                }}>
                  {menu.name}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      {!collapsed && (
        <div style={styles.footer}>
          <span style={styles.footerText}>D-RPS Portal v3.5</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '160px',
    backgroundColor: 'var(--bg-secondary)', // Light background matching Sidebar
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexShrink: 0,
    zIndex: 11,
    padding: '16px 0',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 16px',
    marginBottom: '24px',
    height: '40px',
  },
  logoCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: '#ffb81c', // Signature brand color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(255, 184, 28, 0.2)',
    flexShrink: 0,
  },
  logoText: {
    fontWeight: '900',
    fontSize: '1.1rem',
    color: '#071126',
    fontFamily: 'var(--font-display)',
  },
  logoBrand: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoBrandTitle: {
    fontSize: '0.85rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: 1.1,
  },
  logoBrandSub: {
    fontSize: '0.65rem',
    color: 'var(--text-tertiary)',
    fontWeight: '600',
  },
  itemsWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',
    padding: '0 8px',
  },
  menuItem: {
    width: '100%',
    padding: '10px 12px',
    border: 'none',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  activeIndicator: {
    position: 'absolute',
    left: '0',
    top: '25%',
    height: '50%',
    width: '3px',
    backgroundColor: '#ffb81c',
    borderRadius: '0 4px 4px 0',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease',
  },
  label: {
    fontSize: '0.825rem',
    letterSpacing: '-0.3px',
  },
  footer: {
    marginTop: 'auto',
    padding: '0 16px',
    opacity: 0.5,
  },
  footerText: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: 'var(--text-tertiary)',
  }
};

export default Depth1Menu;

