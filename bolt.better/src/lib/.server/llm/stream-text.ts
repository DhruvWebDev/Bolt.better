import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getAPIKey } from './api-key';
import { getAnthropicModel } from './model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  return _streamText({
    model: getAnthropicModel(getAPIKey(env)),
    system: getSystemPrompt(),
    maxTokens: MAX_TOKENS,
    headers: {
      'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
    },
    messages: convertToCoreMessages(messages),
    ...options,
  });
}

//Before sending the messages to _streamText, they are passed through convertToCoreMessages to ensure compatibility with the AI model.
//This step abstracts any complexity of dealing with format mismatches, making your code cleaner and easier to maintain.

/*
Why Are Tool Invocations Useful?
Enhanced AI Capabilities:

The AI can perform tasks beyond generating text, such as looking up data or performing calculations.
Debugging and Logging:

Developers can track what tools were invoked and how they contributed to the AI's responses.
Contextual Responses:

The results of tool invocations can be used to provide accurate, dynamic answers.
Extensibility:

Allows integrating the AI with external systems to expand its functionality. */