# Setup

Make sure you have [node](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script) and [pnpm](https://pnpm.io/installation#on-posix-systems) installed.

After cloning, run:

```bash
pnpm install
```

Then, run this command to start the dev server:

```bash
pnpm run dev
```

# Assumptions

1. **Hardcoded LaTeX**: Math expressions are pre-formatted for the specific question (not a general parser)
2. **No Validation**: Answer submission doesn't check correctness
3. **Mock AI Only**: All AI responses are simulated with fixed delays
4. **No Persistence**: Chat history and answers reset on page refresh (local state)

# Notes on LLM Integration

I would connect to a real LLM API in production with these steps:

I will make sure to structure the payload as follow:

```json
{
  // all questionContext data are actual metadata from the question
  "questionContext": {
    "questionId": "q_spm_99",
    "topic": "Standard Form",
    "difficulty": "Hard",
    "rawText": "Convert the number..."
  },

  // embedding the RECENT chat history is important for context
  // by making sure to not send too much data and consuming too much
  // token
  "chatHistory": [
    { "isUser": true, "text": "Give me a hint" },
    { "isUser": false, "text": "Absolutely!" }
  ],

  // recent message is important to allow server to determine
  // whether to answer with chatHistory or give out "hint" or "steps"
  // or general answer without context instead
  "recentMessage": "Some question..."
}
```

Then change the handler in `ai-chat-box.tsx` like so:

```tsx
...
  const handleHelp = async (type: "hint" | "step") => {
    const userMessage =
      type === "hint" ? "Give me a hint" : "Reveal the steps";

    setMessages((prev) => [
      ...prev,
      { text: userMessage, isUser: true },
    ]);
    setLoading(true);

    // instead of a mock, i would actually hit our API like so:
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionContext: questionData,
          chatHistory: messages,
          recentMessage: userMessage
        })
      });

      setMessages((prev) => [
        ...prev,
        { text: answer, isUser: false },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
```
