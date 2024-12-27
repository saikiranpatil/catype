import { useEffect, useRef, useState } from "react";
import { IoReloadSharp } from "react-icons/io5"
import { Button } from "../ui/button";
import BoardWord from "./BoardWord";
import TypingSummary from "../TypingSummary";
import { cn } from "@/lib/utils";
import { useTypingMode } from "@/hooks/useTypingMode";
import { TbReload } from "react-icons/tb";

const actualText = "There are many variations of passages of Lorem Ipsum available, There are many variations of passages of Lorem Ipsum available,";
const Board = () => {
  const boardRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<HTMLInputElement | null>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);

  const [typedText, setTypedText] = useState("");
  const [startIdx, setStartIdx] = useState(0);

  const { typingMode, setTypingMode } = useTypingMode();


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
    setStartIdx(0);
    setTypedText("");
  }

  useEffect(() => {
    boardRef.current?.focus();
  }, []);

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

  if (typedTextArray.length > actualTextArray.length && typedText.slice(-1) === " ") {
    return (
      <>
        <TypingSummary actualText={actualText} typedText={typedText} />
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
          2/12
        </div>
        <button className="font-normal border-0 outline-0 cursor-auto flex justify-start items-start flex-wrap gap-y-4 text-3xl">
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
          className="absolute z-[-1]"
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