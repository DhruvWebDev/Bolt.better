import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getSystemPrompt } from '@/llm/prompts';
import { CHAT_MAX_TOKENS } from '@/llm/constants';
import { getApiKey } from '@/llm/api-key';
import { getAnthropicModel } from '@/llm/model';

const anthropic = new Anthropic();

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await anthropic.messages.create({
      messages,
      model: getAnthropicModel(getApiKey()),
      max_tokens: CHAT_MAX_TOKENS,
      system: getSystemPrompt(),
    });

    return NextResponse.json({
      response: response.content[0]?.text,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
