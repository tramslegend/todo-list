import { IFeedbackType } from "@/constants";


export interface IFeedbackModel extends Document {
    _id: string;
    userId: string;
    feedbackType: IFeedbackType;
    message: string;
    createdAt: Date;
    updatedAt: Date;
};