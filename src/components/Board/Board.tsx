import { IoReload } from "react-icons/io5"

const text = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
const textArray = text.split(" ");
console.log(textArray);

const Board = () => {
  return (
    <footer>
      <div id="main" className="h-40 w-full overflow-y-hidden mt-10 mb-6">
        <div className="flex flex-wrap gap-4">
          {textArray.map((word, wordIdx) => (
            <div className="pr-2 text-3xl">
              <span key={wordIdx + word}>{word}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <IoReload size={24} className="mx-auto m-2" />
      </div>
    </footer>
  )
}

export default Board