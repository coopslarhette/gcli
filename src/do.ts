import { exec } from 'node:child_process'
import { preprocess, generateCommandsTemplate } from './prompts'
import { openai } from './index'

export async function doAction(actionDescription: string) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    messages: preprocess(generateCommandsTemplate, actionDescription),
  })
  const command = completion.data.choices?.[0].message?.content
  if (!command) {
    console.log('Model output is empty')
    return
  }
  console.log(command)
  exec(command, (error: any, stdout: any) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(stdout)
  })
}
