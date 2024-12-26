import { useEffect, useRef, useState } from "react";
import { IoReload } from "react-icons/io5"
import { Button } from "../ui/button";
import BoardWord from "./BoardWord";

const actualText = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

const Board = () => {
  const boardRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<HTMLInputElement | null>(null);

  const [typedText, setTypedText] = useState("");

  const actualTextArray = actualText.split(" ");
  const typedTextArray = typedText.split(" ");

  const textIdx = typedTextArray.filter(word => word !== " ").length - 1;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTypedText = e.target.value.replace(/  +/g, ' ');
    setTypedText(newTypedText);
  }

  useEffect(() => {
    boardRef.current?.focus();
  }, []);

  return (
    <main onClick={() => boardRef.current?.focus()}>
      <div id="main" className="h-40 w-full overflow-y-hidden mt-10 mb-6 relative">
        <span id="caret" ref={caretRef} className="bg-main h-10 w-[3px] absolute left-0 animate-[blink_1s_ease-in-out_infinite] rounded-full" />
        <input
          type="text"
          className="absolute z-[-1]"
          value={typedText}
          ref={boardRef}
          onChange={handleTextChange}
        />
        <button className="font-normal border-0 outline-0 cursor-auto flex justify-start items-start flex-wrap gap-y-5 text-3xl">
          {actualTextArray.map((word, wordIdx) => (
            <div className={`${(textIdx > wordIdx) && (word.length > typedTextArray[wordIdx].length) ? "underline" : ""} underline-offset-2 decoration-error mr-4`}>
              <BoardWord
                key={"wordIdx-" + wordIdx + "-word-" + word}
                actualWord={word}
                typedWord={wordIdx < typedTextArray.length ? typedTextArray[wordIdx] : ""}
                isEnd={wordIdx === textIdx}
              />
            </div>
          ))}
        </button>
      </div>
      <Button>
        <IoReload size={24} className="mx-auto m-2" />
      </Button>
    </main>
  )
}

export default Board