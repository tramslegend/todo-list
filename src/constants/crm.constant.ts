

// Project ---
export const CrmProjectStatus = {
    DRAFT: 'Draft',
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
} as const;

export type CrmProjectStatusType = typeof CrmProjectStatus[keyof typeof CrmProjectStatus];

export const CrmProjectPriority = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
    NA: 'NA',
} as const;

export type CrmProjectPriorityType = typeof CrmProjectPriority[keyof typeof CrmProjectPriority];



// Invoice
export const CrmInvoiceStatus = {
    DRAFT: 'Draft',
    SENT: 'Sent',
    PARTIAL: 'Partial',
    PAID: 'Paid',
    CANCELLED: 'Cancelled',
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



// Units ---
export const CrmUnits = {
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    ITEM: 'item',
    FIXED: 'fixed',
} as const;

export type CrmUnitsType = typeof CrmUnits[keyof typeof CrmUnits];

export function getUnitLabel(unit: string): string {
    switch (unit) {
        case CrmUnits.HOUR: return 'Per Hour';
        case CrmUnits.DAY: return 'Per Day';
        case CrmUnits.WEEK: return 'Per Week';
        case CrmUnits.MONTH: return 'Per Month';
        case CrmUnits.ITEM: return 'Per Item';
        case CrmUnits.FIXED: return '(Fixed)';
        default: return unit;
    }
}


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
