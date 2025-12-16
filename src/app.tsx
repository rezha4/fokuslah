import { InlineMath } from "react-katex";
import AiChatBox from "./components/ai-chat-box";
import { useState } from "react";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <header className="w-full shadow-sm py-8 mb-4"></header>

      <div className="lg:flex lg:flex-nowrap flex-wrap w-full gap-2 lg:min-h-[85vh] px-4">
        <div className="lg:w-3/5 card p-4 shadow-sm">
          <div className="card-body place-content-center mb-40">
            <div className="bg-base-300 p-4 rounded-lg">
              <p className="text-lg text-center">
                Convert <InlineMath math="0.00000000031" /> to the
                form <InlineMath math="a \times 10^{n}" />, where{" "}
                <InlineMath math="1 \leq a < 10" /> and{" "}
                <InlineMath math="n" /> is an integer.
              </p>
            </div>

            <div className="flex items-center flex-col gap-1 mt-2">
              <label className="label" htmlFor="answer">
                Your answer
              </label>
              <input className="input" id="answer" />
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:w-2/5 rounded-lg p-4 card shadow-sm">
          <div className="card-body">
            <AiChatBox />
          </div>
        </div>

        {/* Rendered on Mobile Only*/}
        <button
          onClick={() => setIsChatOpen(true)}
          className="lg:hidden btn btn-neutral fixed bottom-6 right-6 z-50 shadow-xl"
        >
          Ask Jojo
        </button>
        <div
          className={`
            fixed inset-0 z-50 bg-base-100 lg:hidden
            transition-transform duration-300 ease-out
            ${isChatOpen ? "translate-y-0" : "translate-y-full"}
          `}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 shadow-sm bg-base-200">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Ask Jojo
              </h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="btn btn-circle"
              >
                X
              </button>
            </div>

            <div className="flex-1 overflow-hidden p-4">
              <AiChatBox />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
