import React, { useState, useEffect } from 'react';
import { SearchIcon, CheckIcon, PrinterIcon, FilePlusIcon, RefreshIcon } from '../assets/icons';

const ButtonGroupSelect = ({ value, onChange, options }) => {
  return (
    <div style={{ display: 'flex', width: '100%', gap: '4px', backgroundColor: 'var(--bg-tertiary)', padding: '2px', borderRadius: '6px' }}>
      {options.map(opt => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '0.8rem',
              fontWeight: isSelected ? '700' : '500',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: isSelected ? 'var(--bg-secondary)' : 'transparent',
              color: isSelected ? 'var(--primary)' : 'var(--text-tertiary)',
              boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {isSelected && (
              <CheckIcon size={12} style={{ strokeWidth: '3px', flexShrink: 0 }} />
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const IRPContractForm = ({ selectedContract, onOpenSearch, onSave, onReset, addNotification }) => {
  const [activeSubTab, setActiveSubTab] = useState('기본정보');
  const [accountChecked, setAccountChecked] = useState(false);
  const [checkingAccount, setCheckingAccount] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    contractNo: '',
    irpType: '개인형IRP',
    // Customer Info
    custName: '',
    residentNo: '',
    realNameType: '주민등록증',
    nationality: '한국',
    residency: '거주',
    country: '한국',
    homePhone: '',
    mobile: '',
    smsReceive: '미수신',
    email: '',
    emailReceive: '미수신',
    homeAddr: '',
    postDest: '자택',
    // Contract Info
    contractName: '',
    contractType: '가입자형IRP',
    startDate: '2026-06-01',
    regDate: '2026-06-01',
    endDate: '2056-06-01',
    status: '진행업무없음',
    marketingType: '신규',
    manager: '김지은',
    salesManager: '이민호',
    rkManager: '박상현',
    accountNo: '',
    // Contributions & Fees
    firstPayDate: '',
    lastPayDate: '',
    feePaymentMethod: '자산차감',
    // Default Option
    defaultStatus: '미가입',
    defaultDate: '',
    productType: 'TDF (Target Date Fund)',
    productRisk: '중중립위험',
    investProfile: '성장추구형',
    productName: '다옴 핵심 TDF 2045 증권투자신탁',
    // Annual Limit
    annualLimit: '18000000',
    setTotalLimit: '18000000',
    reqReason: '노후 자금 마련 및 연금저축 한도 설정',
  });

  // Watch selected contract changes
  useEffect(() => {
    if (selectedContract) {
      setFormData(prev => ({
        ...prev,
        contractNo: selectedContract.no,
        contractName: selectedContract.name,
        irpType: selectedContract.type,
        custName: selectedContract.name.split('_')[0],
        residentNo: selectedContract.bizNo,
        status: selectedContract.status,
        accountNo: '302-8829-1920-41',
      }));
      setAccountChecked(true);
    }
  }, [selectedContract]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAccountCheck = () => {
    if (!formData.accountNo) {
      addNotification('체크할 계좌번호를 먼저 입력해 주세요.', 'warning');
      return;
    }
    setCheckingAccount(true);
    setTimeout(() => {
      setCheckingAccount(false);
      setAccountChecked(true);
      addNotification('계좌가 성공적으로 검증되었습니다. (정상 사용 가능)', 'success');
    }, 800);
  };

  const handleFormSave = (e) => {
    e.preventDefault();
    if (!formData.custName) {
      addNotification('필수 항목인 고객명을 입력해 주세요.', 'warning');
      return;
    }
    onSave(formData);
  };

  const handleFormPrint = () => {
    addNotification('계약등록 신청서 인쇄 명령이 전송되었습니다.', 'success');
    window.print();
  };

  const handleCancelContract = () => {
    onReset();
    addNotification('계약 등록 신청이 취소되었습니다.', 'warning');
  };

  const handleNewContract = () => {
    onReset();
    addNotification('신규 계약 등록 입력을 시작합니다.', 'success');
  };

  return (
    <div style={styles.container}>
      {/* Top Search Toolbar */}
      <div style={styles.topToolbar} className="card toolbar-card">
        <div style={styles.toolbarRow}>
          <div className="form-group" style={{ flex: 1, margin: 0 }}>
            <label className="form-label">계약번호</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="계약번호 입력 또는 돋보기 클릭"
                value={formData.contractNo}
                onChange={(e) => handleInputChange('contractNo', e.target.value)}
                style={styles.toolbarInput}
              />
              <button type="button" onClick={onOpenSearch} className="input-icon-btn" style={styles.toolbarIconBtn}>
                <SearchIcon size={18} />
              </button>
            </div>
          </div>

          <div className="form-group" style={{ flex: 1, margin: 0 }}>
            <label className="form-label">IRP 유형</label>
            <ButtonGroupSelect
              value={formData.irpType}
              onChange={(val) => handleInputChange('irpType', val)}
              options={[
                { value: '개인형IRP', label: '개인형 IRP' },
                { value: '기업형IRP', label: '기업형 IRP' }
              ]}
            />
          </div>

          <div style={styles.toolbarActions} className="toolbar-actions">
            <button onClick={onOpenSearch} className="btn btn-primary" style={styles.actionBtn}>
              <SearchIcon size={16} />
              계약 찾기
            </button>
            <button onClick={onReset} className="btn btn-secondary" style={styles.actionBtn}>
              <RefreshIcon size={16} />
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab bar */}
      <div className="tab-container">
        <button
          onClick={() => setActiveSubTab('기본정보')}
          className={`tab-btn ${activeSubTab === '기본정보' ? 'active' : ''}`}
        >
          기본정보
        </button>
        <button
          onClick={() => setActiveSubTab('서류정보')}
          className={`tab-btn ${activeSubTab === '서류정보' ? 'active' : ''}`}
        >
          서류정보
        </button>
      </div>

      {/* Tab: 기본정보 (Basic Details) */}
      {activeSubTab === '기본정보' && (
        <form onSubmit={handleFormSave}>
          {/* 고객정보 Card */}
          <div className="card">
            <h3 className="card-title">
              <span style={styles.badgeIndex}>1</span>
              고객 정보 (Customer Details)
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">고객명 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.custName}
                  onChange={(e) => handleInputChange('custName', e.target.value)}
                  placeholder="예: 홍길동"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">실명확인구분</label>
                <ButtonGroupSelect
                  value={formData.realNameType}
                  onChange={(val) => handleInputChange('realNameType', val)}
                  options={[
                    { value: '주민등록증', label: '주민등록증' },
                    { value: '운전면허증', label: '운전면허증' },
                    { value: '여권', label: '여권' }
                  ]}
                />
              </div>
              <div className="form-group">
                <label className="form-label">주민등록번호 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.residentNo}
                  onChange={(e) => handleInputChange('residentNo', e.target.value)}
                  placeholder="700730-1770510"
                  required
                />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: '12px' }}>
              <div className="form-group">
                <label className="form-label">국적</label>
                <input type="text" className="form-input" value={formData.nationality} onChange={(e) => handleInputChange('nationality', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">거주여부</label>
                <ButtonGroupSelect
                  value={formData.residency}
                  onChange={(val) => handleInputChange('residency', val)}
                  options={[
                    { value: '거주', label: '거주' },
                    { value: '비거주', label: '비거주' }
                  ]}
                />
              </div>
              <div className="form-group">
                <label className="form-label">거주국가</label>
                <input type="text" className="form-input" value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)} />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: '12px' }}>
              <div className="form-group">
                <label className="form-label">핸드폰번호</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="010-1234-5678"
                />
              </div>
              <div className="form-group">
                <label className="form-label">SMS 수신여부</label>
                <ButtonGroupSelect
                  value={formData.smsReceive}
                  onChange={(val) => handleInputChange('smsReceive', val)}
                  options={[
                    { value: '수신', label: '수신' },
                    { value: '미수신', label: '미수신' }
                  ]}
                />
              </div>
              <div className="form-group">
                <label className="form-label">이메일</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@daom.com"
                />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: '12px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">자택 주소</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.homeAddr}
                  onChange={(e) => handleInputChange('homeAddr', e.target.value)}
                  placeholder="우편번호 찾기 및 도로명 주소 입력"
                />
              </div>
              <div className="form-group">
                <label className="form-label">우편수신지</label>
                <ButtonGroupSelect
                  value={formData.postDest}
                  onChange={(val) => handleInputChange('postDest', val)}
                  options={[
                    { value: '자택', label: '자택' },
                    { value: '직장', label: '직장' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* 계약정보 Card */}
          <div className="card">
            <h3 className="card-title">
              <span style={styles.badgeIndex}>2</span>
              계약 상세 정보 (Contract Specifications)
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">계약명</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.contractName}
                  onChange={(e) => handleInputChange('contractName', e.target.value)}
                  placeholder="예: 홍길동_개인형IRP"
                />
              </div>
              <div className="form-group">
                <label className="form-label">계약유형</label>
                <ButtonGroupSelect
                  value={formData.contractType}
                  onChange={(val) => handleInputChange('contractType', val)}
                  options={[
                    { value: '가입자형IRP', label: '가입자형 IRP' },
                    { value: '기업형IRP', label: '기업형 IRP' }
                  ]}
                />
              </div>
              <div className="form-group">
                <label className="form-label">계약상태</label>
                <input type="text" className="form-input" value={formData.status} readOnly style={styles.readOnly} />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: '12px' }}>
              <div className="form-group">
                <label className="form-label">계약개시일</label>
                <input type="date" className="form-input" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">계약등록일</label>
                <input type="date" className="form-input" value={formData.regDate} onChange={(e) => handleInputChange('regDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">계약종료일</label>
                <input type="date" className="form-input" value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} />
              </div>
            </div>

            <div className="form-row" style={{ marginTop: '12px' }}>
              <div className="form-group">
                <label className="form-label">계좌번호 *</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    className="form-input"
                    value={formData.accountNo}
                    onChange={(e) => {
                      handleInputChange('accountNo', e.target.value);
                      setAccountChecked(false);
                    }}
                    placeholder="302-XXXX-XXXX-XX"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleAccountCheck}
                    className="btn btn-secondary"
                    style={styles.checkBtn}
                    disabled={checkingAccount}
                  >
                    {checkingAccount ? '...' : accountChecked ? <CheckIcon size={16} style={{ color: 'var(--accent)' }} /> : '계좌체크'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">영업담당자</label>
                <input type="text" className="form-input" value={formData.salesManager} onChange={(e) => handleInputChange('salesManager', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">RK담당자</label>
                <input type="text" className="form-input" value={formData.rkManager} onChange={(e) => handleInputChange('rkManager', e.target.value)} />
              </div>
            </div>
          </div>

          {/* 부담금/수수료 & 디폴트옵션 Card (Split Row) */}
          <div style={styles.splitRow}>
            <div className="card" style={{ flex: 1, marginBottom: 0 }}>
              <h3 className="card-title">부담금 및 수수료</h3>
              <div className="form-group">
                <label className="form-label">운용수수료 납부방법</label>
                <ButtonGroupSelect
                  value={formData.feePaymentMethod}
                  onChange={(val) => handleInputChange('feePaymentMethod', val)}
                  options={[
                    { value: '자산차감', label: '자산차감' },
                    { value: '직접납부', label: '직접납부' }
                  ]}
                />
              </div>
              <div className="form-row">
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">최초납입일자</label>
                  <input type="date" className="form-input" value={formData.firstPayDate} onChange={(e) => handleInputChange('firstPayDate', e.target.value)} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">최종납입일자</label>
                  <input type="date" className="form-input" value={formData.lastPayDate} onChange={(e) => handleInputChange('lastPayDate', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="card" style={{ flex: 1, marginBottom: 0 }}>
              <h3 className="card-title">디폴트 옵션 (Default Option)</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">가입상태</label>
                  <ButtonGroupSelect
                    value={formData.defaultStatus}
                    onChange={(val) => handleInputChange('defaultStatus', val)}
                    options={[
                      { value: '미가입', label: '미가입' },
                      { value: '가입완료', label: '가입완료' }
                    ]}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">투자성향</label>
                  <ButtonGroupSelect
                    value={formData.investProfile}
                    onChange={(val) => handleInputChange('investProfile', val)}
                    options={[
                      { value: '성장추구형', label: '성장추구형' },
                      { value: '안정형', label: '안정형' },
                      { value: '위험선호형', label: '위험선호형' }
                    ]}
                  />
                </div>
              </div>
              <div className="form-group" style={{ margin: 0, marginTop: '8px' }}>
                <label className="form-label">지정 상품명</label>
                <input type="text" className="form-input" value={formData.productName} onChange={(e) => handleInputChange('productName', e.target.value)} />
              </div>
            </div>
          </div>

          {/* 연간한도 & 승인요청 Card */}
          <div className="card" style={{ marginTop: '24px' }}>
            <h3 className="card-title">연간 납입한도 정보</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">연간 납입 한도액 (₩)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.annualLimit}
                  onChange={(e) => {
                    handleInputChange('annualLimit', e.target.value);
                    handleInputChange('setTotalLimit', e.target.value);
                  }}
                  style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1rem' }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">설정 한도 총액 (₩)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.setTotalLimit}
                  readOnly
                  style={{ ...styles.readOnly, fontWeight: '700', color: 'var(--accent)' }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">요청 원인 사유</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.reqReason}
                  onChange={(e) => handleInputChange('reqReason', e.target.value)}
                  placeholder="예: 퇴직연금 개인납입 한도증액"
                />
              </div>
            </div>
          </div>

          {/* Form Actions Toolbar */}
          <div style={styles.actionsBar} className="actions-bar">
            <div className="left-actions" style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={handleFormPrint} className="btn btn-secondary">
                <PrinterIcon size={16} />
                계약서 출력
              </button>
              <button type="button" onClick={handleCancelContract} className="btn btn-danger">
                계약취소
              </button>
            </div>
            <div style={styles.rightActions} className="right-actions">
              <button type="button" onClick={handleNewContract} className="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
                </svg>
                신규
              </button>
              <button type="submit" className="btn btn-primary">
                <CheckIcon size={16} />
                저장
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab: 서류정보 (Documents) */}
      {activeSubTab === '서류정보' && (
        <div className="card" style={styles.docCard}>
          <h3 className="card-title">필수 증빙 서류 업로드</h3>
          <p style={styles.docDesc}>
            퇴직연금 계약 진행을 위해 다음 서류들을 스캔하여 PDF 또는 이미지로 업로드해 주세요.
          </p>

          <div style={styles.docList}>
            {[
              { name: '실명확인 증표 사본', required: true, status: '제출대기', size: '-' },
              { name: 'IRP 가입신청서 및 확약서', required: true, status: '업로드 완료', size: '1.2 MB' },
              { name: '퇴직소득 원천징수영수증', required: false, status: '미대상', size: '-' },
              { name: '개인정보 수집 및 제공동의서', required: true, status: '제출대기', size: '-' },
            ].map((doc, idx) => (
              <div key={idx} style={styles.docItem}>
                <div style={styles.docItemLeft}>
                  <div style={styles.docIndex}>{idx + 1}</div>
                  <div>
                    <h4 style={styles.docItemTitle}>
                      {doc.name}
                      {doc.required && <span style={styles.reqBadge}>필수</span>}
                    </h4>
                    <p style={styles.docItemMeta}>확장자: PDF, PNG, JPG | 용량: 최대 10MB</p>
                  </div>
                </div>

                <div style={styles.docItemRight}>
                  <span style={{
                    ...styles.docStatusBadge,
                    backgroundColor: doc.status === '업로드 완료' ? 'rgba(16, 185, 129, 0.1)' : doc.status === '미대상' ? 'var(--bg-tertiary)' : 'rgba(245, 158, 11, 0.1)',
                    color: doc.status === '업로드 완료' ? 'var(--accent)' : doc.status === '미대상' ? 'var(--text-tertiary)' : 'var(--warning)'
                  }}>
                    {doc.status}
                  </span>
                  
                  {doc.status !== '미대상' && (
                    <button className="btn btn-secondary" style={styles.uploadBtn}>
                      <FilePlusIcon size={14} />
                      파일 선택
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.dragDropZone}>
            <p style={styles.dragText}>마우스로 파일을 드래그하여 이곳에 끌어다 놓으세요</p>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>일괄 첨부하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  topToolbar: {
    padding: '16px 20px',
    marginBottom: '20px',
  },
  toolbarRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '20px',
  },
  toolbarInput: {
    height: '38px',
    backgroundColor: 'var(--bg-tertiary)',
  },
  toolbarSelect: {
    height: '38px',
    backgroundColor: 'var(--bg-tertiary)',
  },
  toolbarIconBtn: {
    right: '12px',
  },
  toolbarActions: {
    display: 'flex',
    gap: '10px',
  },
  actionBtn: {
    height: '38px',
    fontSize: '0.825rem',
  },
  badgeIndex: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-accent)',
    color: 'var(--primary)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: '700',
  },
  readOnly: {
    backgroundColor: 'var(--bg-tertiary)',
    cursor: 'not-allowed',
  },
  checkBtn: {
    position: 'absolute',
    right: '2px',
    top: '2px',
    bottom: '2px',
    height: 'auto',
    borderRadius: '6px',
    padding: '0 12px',
    fontSize: '0.75rem',
  },
  splitRow: {
    display: 'flex',
    gap: '24px',
  },
  actionsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-color)',
    paddingBottom: '40px',
  },
  rightActions: {
    display: 'flex',
    gap: '12px',
  },
  docCard: {
    padding: '24px',
  },
  docDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '20px',
  },
  docList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  docItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--bg-primary)',
  },
  docItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  docIndex: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },
  docItemTitle: {
    margin: '0 0 4px 0',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  reqBadge: {
    fontSize: '0.65rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--danger)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '700',
  },
  docItemMeta: {
    margin: 0,
    fontSize: '0.72rem',
    color: 'var(--text-tertiary)',
  },
  docItemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  docStatusBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  uploadBtn: {
    padding: '6px 12px',
    fontSize: '0.75rem',
    height: '32px',
  },
  dragDropZone: {
    border: '2px dashed var(--border-color)',
    borderRadius: 'var(--radius-md)',
    padding: '32px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  dragText: {
    fontSize: '0.8rem',
    color: 'var(--text-tertiary)',
    margin: 0,
  }
};

export default IRPContractForm;
