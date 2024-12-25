import Board from "./components/Board/Board";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="bg-bg text-sub">
      <div className="max-w-[900px] mx-auto h-[100vh] w-full grid grid-rows-[max-content_auto_max-content] grid-cols-1 justify-center pt-4 pb-2 gap-y-8">
        <Header />
        <Board />
        <Footer />
      </div>
    </div>
  );
}

export default App