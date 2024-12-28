import { useEffect, useRef, useState } from "react";
import { IoReloadSharp } from "react-icons/io5"
import { Button } from "../ui/button";
import BoardWord from "./BoardWord";
import TypingSummary from "../TypingSummary";
import { cn } from "@/lib/utils";
import { useTypingMode } from "@/hooks/useTypingMode";
import { TbReload } from "react-icons/tb";
import generateWords from "@/common/utils/generateWords";
import { useTypingOptions } from "@/hooks/useTypingOptions";

const Board = () => {
  const boardRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<HTMLInputElement | null>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);

  const [actualText, setActualText] = useState<string>("");
  const [typedText, setTypedText] = useState<string>("");
  const [typedTime, setTypedTime] = useState<number[]>([]);

  const [time, setTime] = useState(0);
  const [startIdx, setStartIdx] = useState(0);
  const [typeStartTime, setTpyeStartTime] = useState<number | null>(null);
  const [typingState, setTypingState] = useState<"Not Started" | "Typing" | "Completed">("Not Started");

  const { typingMode, setTypingMode } = useTypingMode();
  const { typingOptions } = useTypingOptions();
  const { type: typeType, value: typeValue } = typingOptions;

  const actualTextArray = actualText.split(" ");
  const typedTextArray = typedText.split(" ");

  const textIdx = typedTextArray.filter(word => word !== " ").length - 1;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingMode(true);

    const typedText = e.target.value;
    const newTypedText = typedText.replace(/  +/g, " "); // ignoring second whitespace
    setTypedText(newTypedText);
  }

  const resetTyping = () => {
    setTime(0);
    setStartIdx(0);
    setTypedText("");
    generateNewWords();
    setTypingMode(false);
    setTpyeStartTime(null);
    setTypingState("Not Started");

    boardRef.current?.focus();
  }

  const generateNewWords = () => {
    setActualText(generateWords(typeValue));
  }

  let si: ReturnType<typeof setInterval> | null = null;
  const handleIncrementSeconds = () => {
    setTime(currentTime => currentTime + 1);
  }
  const clearSecondsInterval = () => {
    if (si !== null) {
      clearInterval(si);
      si = null;
    }
  }

  useEffect(() => {
    resetTyping();
  }, [typeValue, typeType]);

  useEffect(() => {
    wordsRef.current = wordsRef.current.splice(0, actualTextArray.length);
  }, [actualTextArray]);

  useEffect(() => {
    // handle caret position
    if (
      caretRef.current &&
      textIdx < actualTextArray.length &&
      wordsRef.current[textIdx]
    ) {
      const { left, top } = wordsRef.current[textIdx].getBoundingClientRect();

      caretRef.current.style.top = `${top}px`;
      caretRef.current.style.left = `${left + (typedTextArray.length ? typedTextArray[typedTextArray.length - 1].length * 18 : 0)}px`;
    }

    // handle typing state
    if (
      typingState === "Not Started" &&
      (typedTextArray.length !== 1 || typedTextArray[0] !== "")
    ) {
      setTypingState("Typing");
    } else if (
      typingState === "Typing" &&
      (textIdx === actualTextArray.length ||
        typedTextArray.slice(-1)[0] === actualTextArray.slice(-1)[0])
    ) {
      setTypingState("Completed");
    }
  }, [typedTextArray, textIdx]);

  // handle task of removing words at first line when caret enters the third line
  useEffect(() => {
    let count = 0;

    for (let idx = 0; idx <= textIdx; idx++) {
      if (!wordsRef.current[idx] || !caretRef.current) continue;

      const { y: wordY } = wordsRef.current[idx].getBoundingClientRect();
      const { y: caretY } = caretRef.current.getBoundingClientRect();

      if (wordY + 80 < caretY) {
        count++;
      }
    }

    setStartIdx(startIdx + count);
  }, [textIdx]);

  // handle task of storing times of typing of each words and storing the startTime
  useEffect(() => {
    const startTime = typeStartTime || new Date().getTime();
    if (typingState === "Typing" && !typeStartTime) {
      setTpyeStartTime(startTime);
    }

    if (typeStartTime) {
      setTypedTime([
        ...typedTime.slice(0, typedText.length - 1),
        new Date().getTime() - startTime,
      ]);
    }
  }, [typedText]);

  // handle task of countdown timer
  useEffect(() => {
    if (typeType === "word") {
      clearSecondsInterval();
    } else if (time === typeValue) {
      clearSecondsInterval();
      setTypingState("Completed");
    } else if (si === null && typingState === "Typing") {
      si = setInterval(handleIncrementSeconds, 1000);
    }

    return clearSecondsInterval;
  }, [typeType, typeValue, time, typingState]);

  if (typingState === "Completed") {
    setTypingMode(false);
    return (
      <>
        <TypingSummary
          actualText={actualText}
          typedText={typedText}
          typedTime={typedTime}
        />
        <div className="flex justify-center items-center">
          <Button size="icon" onClick={resetTyping}>
            <IoReloadSharp />
          </Button>
        </div>
      </>
    );
  }

  return (
    <main onClick={() => boardRef.current?.focus()}>
      <div id="main" className="overflow-y-hidden mb-6 h-60">
        <span
          id="caret"
          ref={caretRef}
          className={`bg-main h-10 w-[3px] absolute left-0 rounded-full ${typingMode ? "" : "animate-[blink_1s_ease-in-out_infinite]"}`}
        />
        <div
          id="timer"
          className={cn(
            "text-main text-4xl pb-4  opacity-0",
            typingMode && "opacity-100",
          )}
        >
          {typeType === "time"
            ? typeValue - time
            : `${textIdx + 1} / ${actualTextArray.length}`}
        </div>
        <button className="font-normal border-0 outline-0 cursor-auto flex justify-start items-start flex-wrap gap-y-6 text-3xl">
          {actualTextArray.slice(startIdx).map((word, wordIdx) => {
            const slicedIdx = startIdx + wordIdx;
            return (
              <div
                className={`${textIdx > slicedIdx && word.length > typedTextArray[slicedIdx].length ? "underline" : ""} underline-offset-2 decoration-error mr-4`}
                ref={(el: HTMLDivElement) => (wordsRef.current[slicedIdx] = el)}
              >
                <BoardWord
                  key={"wordIdx-" + slicedIdx + "-word-" + word}
                  actualWord={word}
                  typedWord={
                    slicedIdx < typedTextArray.length
                      ? typedTextArray[slicedIdx]
                      : ""
                  }
                  isEnd={slicedIdx === textIdx}
                />
              </div>
            );
          })}
        </button>
        <input
          type="text"
          className="absolute z-[-1] top-0"
          value={typedText}
          ref={boardRef}
          onChange={handleTextChange}
        />
      </div>
      <div className="flex justify-center items-center">
        <Button size="icon" onClick={resetTyping}>
          <TbReload />
        </Button>
      </div>
    </main>
  )
}

export default Board