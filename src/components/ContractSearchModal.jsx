import React, { useState } from 'react';
import { SearchIcon, DownloadIcon } from '../assets/icons';

// Advanced high-fidelity mock contracts
const mockContracts = [
  { id: '1', no: '400000000005', type: '개인형IRP', name: '김오_개인형IRP', bizNo: '700730-1770510', status: '정상' },
  { id: '2', no: '400000000006', type: '개인형IRP', name: '김동일_개인형IRP', bizNo: '720315-1102938', status: '정상' },
  { id: '3', no: '400000000007', type: '개인형IRP', name: '김종필_개인형IRP', bizNo: '780729-1082736', status: '정상' },
  { id: '4', no: '400000000008', type: '개인형IRP', name: '곽동수_개인형IRP', bizNo: '821102-1200666', status: '계약이전처리중' },
  { id: '5', no: '400000000009', type: '개인형IRP', name: '김우_개인형IRP', bizNo: '700730-1770510', status: '정상' },
  { id: '6', no: '400000000010', type: '개인형IRP', name: '박태환_개인형IRP', bizNo: '890514-1082736', status: '정상' },
  { id: '7', no: '400000000011', type: '기업형IRP', name: '국떡흥_기업형IRP', bizNo: '801107-1200666', status: '정상' },
  { id: '8', no: '400000000012', type: 'DB', name: '우두기_DB퇴직연금', bizNo: '801108-1200667', status: '정상' },
  { id: '9', no: '400000000013', type: 'DC', name: '우청동_DC퇴직연금', bizNo: '801109-1200688', status: '정상' },
  { id: '10', no: '400000000014', type: '개인형IRP', name: '한진_개인형IRP', bizNo: '801109-1200668', status: '정상' },
  { id: '11', no: '400000000015', type: 'DC', name: '김대인_DC퇴직연금', bizNo: '801109-1200659', status: '정상' },
  { id: '12', no: '400000000016', type: 'DB', name: '김평강_DB퇴직연금', bizNo: '801126-1200665', status: '정상' },
  { id: '13', no: '400000000017', type: '개인형IRP', name: '한희숙_개인형IRP', bizNo: '801111-1200670', status: '정상' },
  { id: '14', no: '400000000018', type: '개인형IRP', name: '김아인_개인형IRP', bizNo: '801112-1200671', status: '정상' },
  { id: '15', no: '400000000019', type: '개인형IRP', name: '백호진_개인형IRP', bizNo: '801113-1200672', status: '정상' },
];

const ContractSearchModal = ({ isOpen, onClose, onSelectContract, addNotification }) => {
  const [schemeFilter, setSchemeFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [bizNoTerm, setBizNoTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('정상');
  const [isLoading, setIsLoading] = useState(false);
  const [contractsList, setContractsList] = useState(mockContracts);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const filtered = mockContracts.filter(contract => {
        const matchesScheme = schemeFilter === '전체' || contract.type === schemeFilter;
        const matchesTerm = searchTerm === '' || 
          contract.no.includes(searchTerm) || 
          contract.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBizNo = bizNoTerm === '' || contract.bizNo.includes(bizNoTerm);
        const matchesStatus = statusFilter === '전체' || contract.status === statusFilter;
        return matchesScheme && matchesTerm && matchesBizNo && matchesStatus;
      });
      setContractsList(filtered);
      setIsLoading(false);
      addNotification(`총 ${filtered.length}건의 계약이 조회되었습니다.`, 'success');
    }, 450);
  };

  const handleExportExcel = () => {
    addNotification('계약 목록 엑셀 내보내기가 완료되었습니다. (contract_list.csv)', 'success');
    
    // Simulate simple CSV download
    const headers = '번호,계약번호,제도구분,계약명,실명확인/사업자번호,계약상태\n';
    const rows = contractsList.map((c, i) => `${i+1},${c.no},${c.type},${c.name},${c.bizNo},${c.status}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "contract_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'DB': return { backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' };
      case 'DC': return { backgroundColor: 'rgba(148, 163, 184, 0.15)', color: 'var(--text-secondary)' };
      case '개인형IRP': return { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)' };
      case '기업형IRP': return { backgroundColor: 'rgba(167, 139, 250, 0.1)', color: '#8b5cf6' };
      default: return {};
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={styles.modal}>
        {/* Modal Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <SearchIcon size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={styles.titleText}>계약 찾기 (Contract Search)</h3>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>

        {/* Modal Search Filters */}
        <form onSubmit={handleSearch} style={styles.filterSection} className="glass-panel">
          <div style={styles.filterRow}>
            {/* Scheme Type Radios */}
            <div style={{ ...styles.filterGroup, flex: 2 }}>
              <span className="form-label" style={styles.label}>제도구분</span>
              <div style={styles.radioGroup}>
                {['전체', 'DB', 'DC', '기업형IRP', '개인형IRP'].map(t => (
                  <label key={t} style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="schemeType"
                      checked={schemeFilter === t}
                      onChange={() => setSchemeFilter(t)}
                      style={styles.radioInput}
                    />
                    <span style={styles.radioText}>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contract Status */}
            <div style={{ ...styles.filterGroup, flex: 1 }}>
              <label className="form-label" style={styles.label}>계약상태</label>
              <select
                className="form-input"
                style={styles.select}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="전체">전체</option>
                <option value="정상">정상</option>
                <option value="계약이전처리중">계약이전처리중</option>
                <option value="해지">해지</option>
              </select>
            </div>
          </div>

          <div style={styles.filterRow}>
            {/* Contract No/Name */}
            <div style={styles.filterGroup}>
              <label className="form-label" style={styles.label}>계약번호 / 계약명</label>
              <input
                type="text"
                className="form-input"
                placeholder="검색어 입력"
                style={styles.input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Biz No */}
            <div style={styles.filterGroup}>
              <label className="form-label" style={styles.label}>실명확인 / 사업자번호</label>
              <input
                type="text"
                className="form-input"
                placeholder="번호 입력"
                style={styles.input}
                value={bizNoTerm}
                onChange={(e) => setBizNoTerm(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div style={styles.searchActionWrapper}>
              <button type="submit" className="btn btn-primary" style={styles.searchBtn} disabled={isLoading}>
                {isLoading ? <div className="spinner" style={styles.spinner} /> : <><SearchIcon size={16} />조회</>}
              </button>
            </div>
          </div>
        </form>

        {/* Modal Results Table */}
        <div style={styles.resultContainer}>
          <div style={styles.resultHeader}>
            <span style={styles.resultCount}>조회결과 <strong>{contractsList.length}</strong>건</span>
            <button onClick={handleExportExcel} className="btn btn-secondary" style={styles.excelBtn} title="Excel 파일로 내보내기">
              <DownloadIcon size={14} />
              <span>Excel 내보내기</span>
            </button>
          </div>

          <div className="table-wrapper" style={styles.tableWrapper}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '60px', textAlign: 'center' }}>번호</th>
                  <th>계약번호</th>
                  <th>제도구분</th>
                  <th>계약명</th>
                  <th>실명확인/사업자번호</th>
                  <th style={{ textAlign: 'center' }}>계약상태</th>
                </tr>
              </thead>
              <tbody>
                {contractsList.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={styles.noData}>조회된 계약 데이터가 없습니다.</td>
                  </tr>
                ) : (
                  contractsList.map((contract, index) => (
                    <tr key={contract.id} onClick={() => onSelectContract(contract)}>
                      <td style={{ textAlign: 'center', fontWeight: '600', color: 'var(--text-secondary)' }}>{index + 1}</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: '600', color: 'var(--primary)' }}>{contract.no}</td>
                      <td>
                        <span style={{ ...styles.badge, ...getTypeBadgeStyle(contract.type) }}>
                          {contract.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: '500' }}>{contract.name}</td>
                      <td style={{ fontFamily: 'monospace' }}>{contract.bizNo}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: contract.status === '정상' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                          color: contract.status === '정상' ? 'var(--accent)' : 'var(--warning)',
                        }}>
                          {contract.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={styles.footer}>
          <p style={styles.footerNote}>* 리스트에서 원하는 계약 정보를 마우스로 더블 클릭 또는 단일 클릭하시면 상세 폼에 바로 자동 적용됩니다.</p>
          <button onClick={onClose} className="btn btn-secondary" style={styles.closeFooterBtn}>닫기</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    maxWidth: '900px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  titleText: {
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    lineHeight: 1,
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
  },
  filterSection: {
    margin: '20px 24px',
    padding: '20px',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
  },
  filterRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-end',
  },
  filterGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  radioGroup: {
    display: 'flex',
    gap: '14px',
    height: '38px',
    alignItems: 'center',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  radioInput: {
    accentColor: 'var(--primary)',
  },
  radioText: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  input: {
    height: '38px',
    backgroundColor: 'var(--bg-secondary)',
  },
  select: {
    height: '38px',
    backgroundColor: 'var(--bg-secondary)',
  },
  searchActionWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBtn: {
    height: '38px',
    padding: '0 24px',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#ffffff',
    animation: 'spin 1s ease-in-out infinite',
  },
  resultContainer: {
    padding: '0 24px 20px 24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  resultCount: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  excelBtn: {
    padding: '6px 12px',
    fontSize: '0.78rem',
    gap: '6px',
    height: '32px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  },
  tableWrapper: {
    maxHeight: '320px',
    overflowY: 'auto',
  },
  badge: {
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.72rem',
    fontWeight: '700',
    letterSpacing: '0.3px',
  },
  statusBadge: {
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.72rem',
    fontWeight: '600',
  },
  noData: {
    textAlign: 'center',
    padding: '32px',
    color: 'var(--text-tertiary)',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  footer: {
    padding: '16px 24px',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--bg-tertiary)',
  },
  footerNote: {
    margin: 0,
    fontSize: '0.75rem',
    color: 'var(--text-tertiary)',
    fontWeight: '500',
  },
  closeFooterBtn: {
    height: '36px',
    padding: '0 20px',
  }
};

export default ContractSearchModal;
