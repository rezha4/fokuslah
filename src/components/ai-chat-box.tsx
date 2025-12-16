import { useEffect, useRef, useState } from "react";
import { aiResponse } from "../lib/mock";

export default function AiChatBox() {
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleHelp = (type: "hint" | "step") => {
    const userMessage =
      type === "hint" ? "Give me a hint" : "Reveal the steps";

    setMessages((prev) => [
      ...prev,
      { text: userMessage, isUser: true },
    ]);
    setLoading(true);

    setTimeout(() => {
      const answer =
        type === "hint" ? aiResponse.hint : aiResponse.steps;
      setMessages((prev) => [
        ...prev,
        { text: answer, isUser: false },
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleCustomQuestion = () => {
    setMessages((prev) => [
      ...prev,
      { text: customInput, isUser: true },
    ]);
    setCustomInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "You're absolutely right! " + aiResponse.hint,
          isUser: false,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 lg:min-h-[60vh] lg:max-h-[60vh] rounded-lg bg-base-200 overflow-y-auto p-4 ">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-base-content/50">
            <p className="text-center">
              Ask Jojo for help with this question!
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg.text}
            isUser={msg.isUser}
          />
        ))}

        {loading && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full bg-neutral flex items-center justify-center"></div>
            </div>
            <div className="flex gap-2 items-center chat-bubble chat-bubble-neutral">
              <p>Thinking</p>
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            disabled={loading}
            onClick={() => handleHelp("hint")}
            className="btn btn-outline btn-sm sm:btn-md"
          >
            Give me a hint
          </button>
          <button
            disabled={loading}
            onClick={() => handleHelp("step")}
            className="btn btn-outline btn-sm sm:btn-md"
          >
            Reveal the steps
          </button>
        </div>

        <div className="flex gap-2 w-full">
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={loading}
            placeholder="Ask Jojo a custom question..."
            className="input input-bordered flex-1"
          />
          <button
            onClick={handleCustomQuestion}
            disabled={loading || !customInput.trim()}
            className="btn btn-primary"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) {
  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div
          className={`w-10 rounded-full bg-base-300 flex items-center justify-center ${
            isUser ? "bg-primary" : "bg-neutral"
          }`}
        ></div>
      </div>
      <div
        className={`chat-bubble ${
          isUser ? "chat-bubble-primary" : "chat-bubble-neutral"
        }`}
      >
        <div className="whitespace-pre-wrap">{message}</div>
      </div>
    </div>
  );
}
