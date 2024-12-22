// Creating /template endpoint
// first we will retrieve the message from the body and then we send it to the anthropic api and then we recieve eithere node or react 
// On the basis of the answer we use if else
//If react then we pass the base_prompt and other messages for ui of the website and then in the uiPrompt we pass the initial files
//If node then we Base_prompt on noe and other imp message for clean ui and then in ui prompt we pass the intial files

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { BASE_PROMPT, getSystemPrompt, TEMPLATE_PROMPT } from '@/llm/prompts';
import { basePrompt as nodeBasePrompt } from '@/defaults/node';
import { basePrompt as reactBasePrompt } from '@/defaults/react';
import { getAnthropicModel } from '@/llm/model';
import { getApiKey } from '@/llm/api-key';
import { TEMPLATE_MAX_TOKEN } from '@/llm/constants';

const anthropic = new Anthropic();

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await anthropic.messages.create({
      messages: [{ role: 'user', content: prompt }],
      model: getAnthropicModel(getApiKey()),
      max_tokens: TEMPLATE_MAX_TOKEN,
      system: TEMPLATE_PROMPT,
    });

    const answer = response.content[0]?.text; // react or node

    if (answer === 'react') {
      return NextResponse.json({
        prompts: [
          BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [reactBasePrompt],
      });
    }

    if (answer === 'node') {
      return NextResponse.json({
        prompts: [
            BASE_PROMPT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [nodeBasePrompt],
      });
    }

    return NextResponse.json(
      { message: "You can't access this" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
