export const boardTimes = [15, 30, 60, 120];
export const boardWordCounts = [10, 25, 50, 100];
export type TypingType = "word" | "time";

export interface TypingOptionsTypes {
    type: TypingType;
    timeLimit: typeof boardTimes[number];
    wordCount: typeof boardWordCounts[number];
}