export const FeedbackType = {
    FEEDBACK: 'Feedback',
    ISSUE: 'Issue',
} as const;

export type IFeedbackType = typeof FeedbackType[keyof typeof FeedbackType];