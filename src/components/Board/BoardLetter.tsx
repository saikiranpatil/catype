import { cn } from "@/lib/utils";

interface BoardLetterProps {
    char: string;
    isCorrect: boolean;
    isIncorrect: boolean;
    isExtra: boolean;
    isEnd: boolean;
}

const BoardLetter = ({
    char,
    isCorrect,
    isIncorrect,
    isExtra,
    isEnd,

}: BoardLetterProps) => {
    if (isEnd) {

    }
    return (
        <span className={cn(
            char === "" && "mr-4",
            isIncorrect && "text-error",
            isCorrect && "text-text",
            isExtra && "text-error-extra",
        )}>{char}</span>
    )
}

export default BoardLetter