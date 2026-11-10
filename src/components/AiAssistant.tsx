import { useState, type FormEvent } from 'react';
import { Bot, LoaderCircle, Send, Sprout } from 'lucide-react';
import { getSessionId } from '../lib/session';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  warning?: string;
};

type ChatResponse = {
  answer: string;
  sources?: { title: string }[];
  saved?: boolean;
  warning?: string;
};

type ChatErrorResponse = {
  detail?: string | { msg?: string }[];
};

const EXAMPLE_QUESTIONS = [
  'How can I improve soil health on my farm?',
  'How should I schedule irrigation?',
  'What are the first steps in integrated pest management?',
  'How can I manage sandy soil?',
];

export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  const askQuestion = async (value: string) => {
    const text = value.trim();
    if (!text || isSending) return;

    const history = messages.slice(-8).map(({ role, content }) => ({
      role,
      content: content.slice(-2000),
    }));
    setMessages((current) => [...current, { role: 'user', content: text }]);
    setQuestion('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? ''}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          session_id: getSessionId(),
        }),
      });

      let result: ChatResponse | ChatErrorResponse;
      try {
        result = await response.json() as ChatResponse | { detail?: string };
      } catch {
        throw new Error(
          response.ok
            ? 'The assistant returned an invalid response. Please try again.'
            : response.status === 404
              ? 'The GreenHarvest API endpoint was not found. Deploy the backend and set VITE_API_BASE_URL to its URL in Vercel, then redeploy the frontend.'
            : `The assistant service failed (HTTP ${response.status}). Check the backend logs.`,
        );
      }
      if (!response.ok) {
        const detail = 'detail' in result ? result.detail : undefined;
        const message = typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
            ? detail.map((issue) => issue.msg).filter(Boolean).join('; ')
            : '';
        throw new Error(message || `The assistant could not respond (HTTP ${response.status}).`);
      }

      if (!('answer' in result) || typeof result.answer !== 'string') {
        throw new Error('The assistant returned an invalid response.');
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: result.answer,
          sources: result.sources?.map((source) => source.title),
          warning: result.warning,
        },
      ]);
    } catch (requestError) {
      setError(requestError instanceof TypeError
        ? 'Cannot connect to the GreenHarvest API. Start the backend locally or configure VITE_API_BASE_URL to your deployed backend URL.'
        : requestError instanceof Error
          ? requestError.message
          : 'Unable to reach the agriculture assistant. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askQuestion(question);
  };

  return (
    <section id="ai-assistant" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8EFEA] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#26734D]">
            <Sprout className="h-4 w-4" />
            Agriculture-only guidance
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#174B35] sm:text-4xl">
            Ask the GreenHarvest AI Assistant
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Get farming guidance grounded in our agriculture knowledge library. For
            urgent crop or chemical decisions, confirm recommendations with a local
            qualified agronomist.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-[#D2E0D5] bg-[#F8FAF8] shadow-soft-xl">
          <div className="flex items-center gap-3 border-b border-[#D2E0D5] bg-white px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#26734D] text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#174B35]">GreenHarvest Farm Guide</h3>
              <p className="text-xs text-gray-500">Ask about soil, crops, irrigation, or sustainable practices</p>
            </div>
          </div>

          <div
            className="max-h-[26rem] min-h-48 space-y-4 overflow-y-auto p-5"
            aria-live="polite"
            aria-label="Conversation"
          >
            {messages.length === 0 && (
              <div className="rounded-2xl border border-[#D2E0D5] bg-white p-4 text-sm leading-relaxed text-gray-600">
                Hello! I can help with agriculture topics such as soil health, crop
                planning, water management, and integrated pest management. What are
                you growing?
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-[#26734D] text-white'
                    : 'border border-[#D2E0D5] bg-white text-gray-700'
                }`}
              >
                {message.content}
                {message.sources && message.sources.length > 0 && (
                  <p className="mt-3 border-t border-[#D2E0D5] pt-2 text-xs text-gray-500">
                    References: {message.sources.join(', ')}
                  </p>
                )}
                {message.warning && (
                  <p role="status" className="mt-3 border-t border-amber-200 pt-2 text-xs text-amber-800">
                    {message.warning}
                  </p>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Searching agriculture references…
              </div>
            )}
          </div>

          <div className="border-t border-[#D2E0D5] bg-[#F8FAF8] px-4 py-3">
            <p className="mb-2 text-xs font-semibold text-gray-600">Try an example question:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_QUESTIONS.map((example) => (
                <button
                  key={example}
                  type="button"
                  disabled={isSending}
                  onClick={() => void askQuestion(example)}
                  className="rounded-full border border-[#D2E0D5] bg-white px-3 py-1.5 text-left text-xs text-[#26734D] transition-colors hover:border-[#26734D] hover:bg-[#E8EFEA] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={sendMessage} className="border-t border-[#D2E0D5] bg-white p-4">
            <label htmlFor="agriculture-question" className="sr-only">
              Your agriculture question
            </label>
            <div className="flex gap-2">
              <input
                id="agriculture-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                maxLength={2000}
                placeholder="Ask an agriculture question…"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#26734D] focus:outline-none focus:ring-2 focus:ring-[#26734D]/20"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={isSending || !question.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#26734D] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#174B35] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send question"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Ask</span>
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-3 text-sm text-rose-700">
                {error}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Responses are informational and should be checked against local growing
              conditions and expert advice.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Successful chat questions and answers are stored indefinitely when
              the Supabase database allows them.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
