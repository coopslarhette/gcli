import { explainTemplate, generateCommandsTemplate, preprocess } from './prompts'
import { OptionValues } from 'commander'
import { openai } from './index'

export async function sayAction(actionDescription: string, options: OptionValues) {
  const templates = [...generateCommandsTemplate, ...(options.explain ? [explainTemplate] : [])]
  const completion = await openai.createChatCompletion({
    model: 'gpt-4o',
    temperature: 0.3,
    messages: preprocess(templates, actionDescription),
  })
  const output = completion.data.choices?.[0].message?.content
  if (!output) {
    console.log('Model output is empty')
    return
  }
  console.log(output)
}
