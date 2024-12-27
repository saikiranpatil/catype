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

  const [startIdx, setStartIdx] = useState(0);
  const [typeStartTime, setTpyeStartTime] = useState<number | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState(-1);

  const { typingMode, setTypingMode } = useTypingMode();
  const { typingOptions } = useTypingOptions();
  const { type: typeType, value: typeValue } = typingOptions;

  const actualTextArray = actualText.split(" ");
  const typedTextArray = typedText.split(" ");

  const textIdx = typedTextArray.filter(word => word !== " ").length - 1;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingMode(true);

    const typedText = e.target.value;
    const newTypedText = typedText.replace(/  +/g, ' ');
    setTypedText(newTypedText);
  }

  const resetTyping = () => {
    setTypingMode(false);
    setTpyeStartTime(null);
    setStartIdx(0);
    setTypedText("");
    generateNewWords();
    boardRef.current?.focus();
  }

  const generateNewWords = () => {
    setActualText(generateWords(typeValue));
  }

  let se: ReturnType<typeof setInterval> | null = null;
  if (typeStartTime && typeType === "time" && !se) {
    se = setInterval(() => setCountdownSeconds(countdownSeconds + 1), 1000);
  }

  useEffect(() => {
    if (countdownSeconds === 0 && se) {
      clearInterval(se);
      se = null;
    }
  }, [countdownSeconds])

  useEffect(() => {
    boardRef.current?.focus();
  }, [actualText]);

  useEffect(() => {
    resetTyping();
  }, [typeValue, typeType]);

  useEffect(() => {
    wordsRef.current = wordsRef.current.splice(0, actualTextArray.length);
  }, [actualTextArray]);

  useEffect(() => {
    if (!caretRef.current || textIdx >= actualTextArray.length || !wordsRef.current[textIdx]) return;


    const { left, top } = wordsRef.current[textIdx].getBoundingClientRect();

    caretRef.current.style.top = `${top}px`;
    caretRef.current.style.left = `${left + (typedTextArray.length ? typedTextArray[typedTextArray.length - 1].length * 18 : 0)}px`;
  }, [typedTextArray, textIdx]);

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

    setStartIdx(startIdx => startIdx + count);
  }, [textIdx]);

  useEffect(() => {
    const startTime = typeStartTime || new Date().getTime();
    if (typedText !== "" && !typeStartTime) {
      setTpyeStartTime(startTime);
    }

    if (typeStartTime) {
      setTypedTime([...typedTime.slice(0, typedText.length - 1), (new Date().getTime()) - startTime]);
    }
  }, [typedText]);


  if ((actualTextArray.length && textIdx === actualTextArray.length) || (typedTextArray.length && typedTextArray.length === actualTextArray.length && typedTextArray.slice(-1)[0] === actualTextArray.slice(-1)[0])) {
    setTypingMode(false);
    return (
      <>
        <TypingSummary actualText={actualText} typedText={typedText} typedTime={typedTime} />
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
      <div id="main" className="w-full overflow-y-hidden mb-6 h-60">
        <span id="caret" ref={caretRef} className="bg-main h-10 w-[3px] absolute left-0 animate-[blink_1s_ease-in-out_infinite] rounded-full" />
        <div id="timer" className={cn("text-main text-4xl pb-4  opacity-0", typingMode && "opacity-100")}>
          {typeType === "time" ? countdownSeconds : `${textIdx + 1} / ${actualTextArray.length}`}
        </div>
        <button className="font-normal border-0 outline-0 cursor-auto flex justify-start items-start flex-wrap gap-y-6 text-3xl">
          {actualTextArray.slice(startIdx).map((word, wordIdx) => {
            const slicedIdx = startIdx + wordIdx;
            return (
              <div
                className={`${(textIdx > slicedIdx) && (word.length > typedTextArray[slicedIdx].length) ? "underline" : ""} underline-offset-2 decoration-error mr-4`}
                ref={(el: HTMLDivElement) => wordsRef.current[slicedIdx] = el}
              >
                <BoardWord
                  key={"wordIdx-" + slicedIdx + "-word-" + word}
                  actualWord={word}
                  typedWord={slicedIdx < typedTextArray.length ? typedTextArray[slicedIdx] : ""}
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