import BoardLetter from "./BoardLetter";

interface BoardWordProps {
    actualWord: string;
    typedWord: string;
    isEnd: boolean;
}

const BoardWord = ({ actualWord, typedWord, isEnd }: BoardWordProps) => (
    [...Array(Math.max(actualWord.length, typedWord.length))].map((_, charIdx) => (
        <BoardLetter
            char={charIdx < actualWord.length ? actualWord[charIdx] : typedWord[charIdx]}
            isCorrect={charIdx < actualWord.length && actualWord[charIdx] === typedWord[charIdx]}
            isIncorrect={charIdx < actualWord.length && charIdx < typedWord.length && actualWord[charIdx] !== typedWord[charIdx]}
            isExtra={charIdx >= actualWord.length}
            isEnd={isEnd && (charIdx === typedWord.length - 1)}
        />
    ))
)

export default BoardWord