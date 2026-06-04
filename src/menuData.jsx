import React from 'react';
import {
  FileTextIcon,
  CalendarIcon,
  DatabaseIcon,
  DownloadIcon,
  FilePlusIcon,
  PercentIcon,
  ShieldAlertIcon,
  SettingsIcon,
  LayoutDashboardIcon
} from './assets/icons';

export const depth1Menus = [
  { id: 'dashboard', name: '대시보드', icon: (props) => <LayoutDashboardIcon {...props} /> },
  { id: 'contract', name: '계약', icon: (props) => <FileTextIcon {...props} /> },
  { id: 'payment', name: '납입', icon: (props) => <CalendarIcon {...props} /> },
  { id: 'asset', name: '자산운용', icon: (props) => <DatabaseIcon {...props} /> },
  { id: 'payout', name: '지급', icon: (props) => <DownloadIcon {...props} /> },
  { id: 'product', name: '상품', icon: (props) => <FilePlusIcon {...props} /> },
  { id: 'fee', name: '수수료', icon: (props) => <PercentIcon {...props} /> },
  { id: 'aftercare', name: '사후관리', icon: (props) => <ShieldAlertIcon {...props} /> },
  { id: 'system', name: '시스템', icon: (props) => <SettingsIcon {...props} /> }
];

export const menuDataMap = {
  대시보드: [
    {
      id: 'dashboard-mgmt',
      title: '종합현황',
      items: [
        { id: 'dashboard-main', name: '대시보드' }
      ]
    }
  ],
  계약: [
    {
      id: 'customer',
      title: '고객관리',
      items: [
        { id: 'user-reg', name: '사용자등록' },
        { id: 'user-list', name: '사용자목록' },
        { id: 'user-history', name: '사용자변경이력' },
        { id: 'cust-change', name: '개인고객정보변경' },
        { id: 'cust-history', name: '개인고객변경이력' },
        { id: 'worker-list', name: '근로자고객목록' }
      ]
    },
    {
      id: 'contract-mgmt',
      title: '계약관리',
      items: [
        { id: 'irp-reg', name: 'IRP 계약등록' },
        { id: 'dbdc-reg', name: 'DB/DC 계약등록' },
        { id: 'contract-biz', name: '계약별 업무통제/해제' },
        { id: 'product-lineup', name: '계약 운용상품라인업' },
        { id: 'contract-progress', name: '계약진행상황' },
        { id: 'contract-status', name: '계약등록현황' },
        { id: 'history-info', name: '계약정보 변경이력' },
        { id: 'cancel-status', name: '계약등록 취소현황' },
        { id: 'inst-account-info', name: '자산기관계좌정보' },
        { id: 'accum-ratio-query', name: '계약별적립비율조회' },
        { id: 'mix-ratio-reg', name: '혼합형 설정비율 등록/변경' },
        { id: 'mix-ratio-history', name: '혼합형 설정비율 변경이력' },
        { id: 'std-policy-reg', name: '표준규약등록' },
        { id: 'finance-verify', name: '재정검증현황' }
      ]
    },
    {
      id: 'subscriber',
      title: '가입자관리',
      items: [
        { id: 'sub-indiv', name: '가입자개별등록' },
        { id: 'sub-add-info', name: '가입자추가등록정보' },
        { id: 'sub-bulk', name: '가입자일괄등록' },
        { id: 'sub-list', name: '가입자목록' },
        { id: 'sub-history', name: '가입자변경이력' },
        { id: 'sub-cancel-status', name: '가입자취소현황' },
        { id: 'leave-return-reg', name: '휴/복직등록' },
        { id: 'temp-deduct-reg', name: '일시전환가입자 소득공제등록' }
      ]
    },
    {
      id: 'tax',
      title: '과세이연',
      items: [
        { id: 'tax-trans-reg', name: '과세이연정보 등록(통산)' },
        { id: 'tax-trans-list', name: '과세이연정보 목록(통산)' }
      ]
    }
  ],
  납입: [
    {
      id: 'contribution',
      title: '부담금관리',
      items: [
        { id: 'contrib-gen-change', name: '부담금 생성/변경' },
        { id: 'tax-exclude-reg', name: '과세제외금액정보 등록' },
        { id: 'spec-upload-history', name: '명세 업로드내역' },
        { id: 'spec-unregistered-query', name: '명세미등록조회' },
        { id: 'contrib-list-query', name: '부담금목록조회' },
        { id: 'contrib-detail-query', name: '부담상세조회' },
        { id: 'contrib-msg-send', name: '부담금전문전송' },
        { id: 'contrib-adjust', name: '부담금조정' }
      ]
    },
    {
      id: 'payment-mgmt',
      title: '납입관리',
      items: [
        { id: 'pay-history-query', name: '납입내역조회' },
        { id: 'pay-detail-query', name: '납입내역 상세조회' },
        { id: 'sub-contrib-pay-mgmt', name: '가입자부담금납입내역관리' },
        { id: 'pay-unconfirmed-status', name: '납입미확정현황' },
        { id: 'unpaid-contract-query', name: '미납계약조회' },
        { id: 'pay-cert-issue', name: '납입증명서발급' },
        { id: 'pay-confirm-query', name: '납입확인서조회' }
      ]
    }
  ],
  자산운용: [
    {
      id: 'inst-mgmt',
      title: '운용지시관리',
      items: [
        { id: 'sub-inst-ratio-reg', name: '가입자별운용지시비율 등록' },
        { id: 'sub-inst-ratio-query', name: '가입자별운용지시비율 조회' },
        { id: 'contract-base-ratio-reg', name: '계약별 기본운용지시비율 등록' },
        { id: 'contract-base-ratio-query', name: '계약별 기본운용지시비율 조회' },
        { id: 'default-option-sub-mgmt', name: '디폴트옵션 가입자 등록/조회' },
        { id: 'default-option-noti-status', name: '디폴트옵션 통지현황' }
      ]
    },
    {
      id: 'deposit-expiry',
      title: '정기예금만기관리',
      items: [
        { id: 'expiry-expected-status', name: '만기도래예정 현황' },
        { id: 'expiry-auto-reinvest-reg', name: '만기처리 자동재투자 등록' },
        { id: 'expiry-uninstructed-status', name: '만기 미지시 처리현황' },
        { id: 'expiry-notice-send-history', name: '만기 안내문 발송이력' }
      ]
    },
    {
      id: 'trade-inst',
      title: '매매지시관리',
      items: [
        { id: 'buy-req-gen-approve', name: '매수의뢰 생성/승인' },
        { id: 'sell-req-gen-approve', name: '매도의뢰 생성/승인' },
        { id: 'periodic-accum-buy-gen', name: '정기적립 매수 생성' },
        { id: 'split-buy-cond-reg-status', name: '분할매수 조건등록/현황' },
        { id: 'product-swap-reg-approve', name: '상품교체(교체매매) 등록/승인' },
        { id: 'trade-inst-progress-query', name: '매매지시 진행현황 조회' },
        { id: 'trade-inst-cancel-err-mgmt', name: '매매지시 취소/오류 관리' }
      ]
    },
    {
      id: 'trade-conclusion',
      title: '거래체결/정산',
      items: [
        { id: 'trade-conclusion-upload-reg', name: '매매 체결내역 업로드/등록' },
        { id: 'trade-conclusion-settle-query', name: '매매 체결/정산 현황조회' },
        { id: 'inst-settle-amt-reconcile', name: '자산기관 결제대금 대사' },
        { id: 'unconcluded-unsettled-mgmt', name: '미체결/미정산 내역관리' }
      ]
    },
    {
      id: 'balance-yield',
      title: '잔고/수익률',
      items: [
        { id: 'contract-asset-balance-query', name: '계약별 자산현황/잔고조회' },
        { id: 'sub-asset-balance-query', name: '가입자별 자산현황/잔고조회' },
        { id: 'period-yield-query', name: '기간별 투자수익률 조회' },
        { id: 'product-balance-weight-status', name: '상품별 잔고 및 비중 현황' },
        { id: 'asset-eval-change-history', name: '자산평가 및 평가금액 변동이력' }
      ]
    }
  ],
  지급: [
    {
      id: 'payout-apply',
      title: '지급접수',
      items: [
        { id: 'indiv-payout-apply', name: '개별지급신청' },
        { id: 'indiv-payout-apply-detail', name: '개별지급신청상세' },
        { id: 'bulk-payout-apply', name: '일괄지급신청' },
        { id: 'contract-trans-apply', name: '계약이전신청' },
        { id: 'contract-cancel-apply', name: '계약해지 신청' },
        { id: 'reserve-return', name: '적립금반환' },
        { id: 'tax-refund-collect-apply', name: '세금환급추징 접수' },
        { id: 'online-payout-apply-status', name: '온라인지급청구 현황' }
      ]
    },
    {
      id: 'payout-inst',
      title: '지급지시',
      items: [
        { id: 'payout-progress-status', name: '지급진행현황' },
        { id: 'payout-inst-approve', name: '지급지시 승인' },
        { id: 'payout-inst-process', name: '지급지시 처리' },
        { id: 'payout-history-query', name: '지급내역조회' },
        { id: 'contract-cancel-trans-history-query', name: '계약해지/이전 내역조회' },
        { id: 'annuity-payout', name: '연금지급' }
      ]
    },
    {
      id: 'tax-info',
      title: '과세정보',
      items: [
        { id: 'tax-detail', name: '세금내역' },
        { id: 'tax-detail-query', name: '세금내역조회' },
        { id: 'local-income-tax-pay-status', name: '지방소득세주민세 납부현황' },
        { id: 'retire-tax-rate-reg-query', name: '퇴직 소득세율 정보등록/조회' }
      ]
    },
    {
      id: 'expected-retirement',
      title: 'DB 예상퇴직급여',
      items: [
        { id: 'dc-expected-payout-query', name: 'DC 지급예상조회' }
      ]
    },
    {
      id: 'legal-limit',
      title: '법적제한',
      items: [
        { id: 'collateral-check-history-query', name: '담보확인내역조회' },
        { id: 'collateral-check-issue-mgmt', name: '담보확인 발급관리' },
        { id: 'legal-limit-history-query', name: '법적제한 내역조회' },
        { id: 'legal-limit-reg-query', name: '법적제한 등록/조회' }
      ]
    }
  ],
  상품: [
    {
      id: 'product-mgmt',
      title: '상품관리',
      items: [
        { id: 'deposit-product-mgmt', name: '예적금상품관리' },
        { id: 'fund-product-mgmt', name: '수익증권 상품관리' },
        { id: 'insurance-product-mgmt', name: '보험상품관리' },
        { id: 'stock-product-mgmt', name: '주식상품관리' },
        { id: 'bond-product-mgmt', name: '채권상품관리' },
        { id: 'els-dls-product-mgmt', name: 'ELS/DLS 상품관리' },
        { id: 'rp-product-mgmt', name: 'RP 상품관리' },
        { id: 'cash-product-mgmt', name: '현금성자산 상품관리' },
        { id: 'issuer-info-reg', name: '발행회사 정보등록' }
      ]
    },
    {
      id: 'product-query',
      title: '상품조회',
      items: [
        { id: 'run-product-query', name: '운용상품조회' },
        { id: 'product-change-history-query', name: '상품변경이력조회' },
        { id: 'interest-rate-query', name: '이율조회' },
        { id: 'base-price-query', name: '기준가 조회' },
        { id: 'expiry-product-query', name: '만기도래상품조회' },
        { id: 'sales-end-product-query', name: '판매종료도래 상품조회' },
        { id: 'fund-yield-query', name: '수익률조회-수익증권' },
        { id: 'issuer-info-change-history', name: '발행회사 정보변경이력' },
        { id: 'base-price-unregistered-status', name: '기준가 미등록현황' }
      ]
    }
  ],
  수수료: [
    {
      id: 'fee-base-info',
      title: '수수료 기본정보',
      items: [
        { id: 'fee-info-reg', name: '수수료 정보등록' },
        { id: 'fee-info-query', name: '수수료 정보조회' },
        { id: 'fee-change-history-query', name: '수수료 변경이력조회' }
      ]
    },
    {
      id: 'fee-mgmt',
      title: '수수료관리',
      items: [
        { id: 'retire-trust-ins-trans-reg', name: '퇴직신탁/보험 전환금등록' },
        { id: 'org-fee-query', name: '기관별수수료 조회' },
        { id: 'unpaid-fee-query', name: '미수 수수료조회' },
        { id: 'fee-pay-history', name: '수수료 납입내역' },
        { id: 'fee-pay-receipt-query', name: '수수료 납입영수증 조회' },
        { id: 'fee-generate', name: '수수료 생성' },
        { id: 'fee-calculator', name: '수수료 계산기' },
        { id: 'daily-fee-query', name: '일자별 수수료 조회' }
      ]
    }
  ],
  사후관리: [
    {
      id: 'aftercare-mgmt',
      title: '사후관리',
      items: [
        { id: 'work-close', name: '업무마감' },
        { id: 'asset-eval-balance-reconcile', name: '자산평가 잔고대사' },
        { id: 'cert-issue-status', name: '증명서 발급현황' },
        { id: 'cert-integrated-issue', name: '증명서 통합발급' },
        { id: 'retire-pension-work-schedule', name: '퇴직연금업무일정' }
      ]
    },
    {
      id: 'pension-stats',
      title: '연금통계',
      items: [
        { id: 'pension-compare-notice', name: '퇴직연금 비교공시' },
        { id: 'pension-saving-compare-notice', name: '연금저축 비교공시' },
        { id: 'pension-statistics', name: '연금 통계' }
      ]
    },
    {
      id: 'common-mgmt',
      title: '공통관리',
      items: [
        { id: 'msg-mgmt', name: '전문관리' },
        { id: 'pension-msg-query', name: '퇴직연금 전문조회' },
        { id: 'pension-org-mgmt', name: '퇴직연금기관관리' },
        { id: 'pension-org-status', name: '퇴직연금기관현황' },
        { id: 'sms-send-mgmt', name: 'SMS발송 관리' },
        { id: 'email-sms-send-history-query', name: '이메일/SMS발송 이력내역조회' },
        { id: 'biz-day-mgmt', name: '영업일관리' }
      ]
    }
  ],
  시스템: [
    {
      id: 'system-mgmt',
      title: '시스템관리',
      items: [
        { id: 'code-mgmt-reg-query', name: '코드관리 등록/조회' },
        { id: 'message-mgmt', name: '메시지관리' },
        { id: 'menu-screen-mgmt', name: '메뉴/화면 관리' },
        { id: 'employee-dept-mgmt', name: '사원/부서관리' },
        { id: 'user-mgmt', name: '사용자관리' }
      ]
    },
    {
      id: 'development',
      title: 'Development',
      items: [
        { id: 'schedule-status', name: '일정현황' },
        { id: 'schedule-mgmt', name: '일정관리' },
        { id: 'defect-mgmt', name: '결함관리' },
        { id: 'defect-stats', name: '결함집계' },
        { id: 'dev-notice', name: '개발관련 공지사항' },
        { id: 'notice-board', name: '공지사항' }
      ]
    }
  ]
};
