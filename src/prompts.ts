import { ChatCompletionRequestMessage } from 'openai'

type ChatMessageTemplate = Omit<ChatCompletionRequestMessage, 'content'> & {
  content: string | ((s: string) => string)
}

export function preprocess(
  templates: ChatMessageTemplate[],
  ...interpolations: string[]
): ChatCompletionRequestMessage[] {
  return templates.map(({ role, content }, i) => {
    return {
      role,
      content: typeof content === 'string' ? content : content(interpolations.shift() ?? ''),
    }
  })
}

export const generateCommandsTemplate: ChatMessageTemplate[] = [
  {
    role: 'system',
    content: 'You are a helpful assistant with strong knowledge of using the command line.',
  },
  {
    role: 'user',
    content: `Your task is to translate natural language to command line commands. Requests will come from a human that has forgotten the exact command, chain of commands, or flags to use to accomplish a given task and your job is to give them the commands they need. 

For example:

Human request: copy /Users/c/Documents/Ethics to s3 directory s3://example-loc/c/Documents/Ethics

Command:`,
  },
  {
    role: 'assistant',
    content: 'aws s3 sync /Users/c/Documents/Ethics s3://example-loc/c/Documents/Ethics',
  },
  {
    role: 'user',
    content: (description: string) => `Human request: ${description}
        Command:`,
  },
]

export const explainTemplate: ChatMessageTemplate = {
  role: 'user',
  content: 'Also please explain the reasoning behind your translation.',
}
