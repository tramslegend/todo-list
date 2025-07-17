export const FeedbackType = {
    FEEDBACK: 'Feedback',
    ISSUE: 'Issue',
    FEATURE_REQUEST: 'Feature Request',
} as const;

export type IFeedbackType = typeof FeedbackType[keyof typeof FeedbackType];