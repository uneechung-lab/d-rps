import React from 'react';
import { depth1Menus } from '../menuData';

const Depth1Menu = ({ activeDepth1, onDepth1Select, isDashboard, headerStyle }) => {
  const isSimple = headerStyle === 'simple';
  const activeColor = isSimple ? 'var(--primary)' : 'rgba(0, 0, 0, 0.95)';
  const inactiveColor = isSimple 
    ? 'var(--text-secondary)' 
    : (isDashboard ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.45)');
  const inactiveIconColor = isSimple 
    ? 'var(--text-tertiary)' 
    : (isDashboard ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.35)');
  const borderBottomColor = isSimple ? 'var(--primary)' : 'rgba(0, 0, 0, 0.9)';

  return (
    <div style={styles.container} className="depth1-menu-container">
      {depth1Menus.map((menu) => {
        const isActive = activeDepth1 === menu.name;
        return (
          <button
            key={menu.id}
            onClick={() => onDepth1Select(menu.name)}
            style={{
              ...styles.menuItem,
              color: isActive ? activeColor : inactiveColor,
              backgroundColor: 'transparent',
              borderBottom: isActive ? `4px solid ${borderBottomColor}` : '4px solid transparent',
              boxShadow: 'none',
            }}
            title={menu.name}
            className={`depth1-item ${isActive ? 'active' : ''}`}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = activeColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = inactiveColor;
              }
            }}
          >
            {/* Icon */}
            <div style={{
              ...styles.iconWrapper,
              color: isActive ? activeColor : inactiveIconColor,
            }}>
              {menu.icon({ size: 20 })}
            </div>
            
            {/* Label */}
            <span style={{
              ...styles.label,
              color: isActive ? activeColor : inactiveColor,
              fontWeight: isActive ? '800' : '600'
            }}>
              {menu.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: '12px',
    height: '100%',
    padding: '0 12px',
  },
  menuItem: {
    height: '100%',
    padding: '4px 16px 0',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.15s ease',
    outline: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '0px',
    backgroundColor: 'transparent',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '0.95rem',
    letterSpacing: '-0.3px',
  }
};

export default Depth1Menu;
