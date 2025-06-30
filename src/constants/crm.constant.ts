

// Project ---
export const CrmProjectStatus = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
} as const;

export type CrmProjectStatusType = typeof CrmProjectStatus[keyof typeof CrmProjectStatus];

export const CrmProjectPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    NA: 'na',
} as const;

export type CrmProjectPriorityType = typeof CrmProjectPriority[keyof typeof CrmProjectPriority];



// Invoice
export const CrmInvoiceStatus = {
    DRAFT: 'draft',
    SENT: 'sent',
    PARTIAL: 'partial',
    PAID: 'paid',
    CANCELLED: 'cancelled',
} as const;

export type CrmInvoiceStatusType = typeof CrmInvoiceStatus[keyof typeof CrmInvoiceStatus];




// Client ---
export const CrmClientFlag = {
    NEW_CUSTOMER: 'new_customer',
    NEW_ORDER: 'new_order',
    PENDING_PAYMENT: 'pending_payment',
    PAID: 'paid',
    ORDER_COMPLETE: 'order_complete',
    FOLLOW_UP: 'follow_up',
    VIP: 'vip',
    BLOCKED: 'blocked',
    PROSPECT: 'prospect',
} as const;
export type CrmClientFlagType = typeof CrmClientFlag[keyof typeof CrmClientFlag];

export const CrmClientSource = {
    REFERRAL: 'referral',
    LINKEDIN: 'linkedin',
    UPWORK: 'upwork',
    WEBSITE: 'website',
    OTHER: 'other',
} as const;

export type CrmClientSourceType = typeof CrmClientSource[keyof typeof CrmClientSource];



// Items ---
export const CrmServiceUnit = {
    HOUR: 'hour',
    DAY: 'day',
    MONTH: 'month',
    YEAR: 'year',
    PROJECT: 'project',
    FEATURE: 'feature',
    FIXED: 'fixed',
} as const;

export type CrmServiceUnitType = typeof CrmServiceUnit[keyof typeof CrmServiceUnit];



// Transaction ---
export const CrmPaymentMethod = {
    UPI: 'upi',
    BANK: 'bank',
    CASH: 'cash',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    PAYPAL: 'paypal',
    OTHER: 'other',
} as const;

export type CrmPaymentMethodType = typeof CrmPaymentMethod[keyof typeof CrmPaymentMethod];
