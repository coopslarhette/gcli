import { doAction } from './do'
import { Configuration, OpenAIApi } from 'openai'
import { sayAction } from './say'
import { Command } from 'commander'

const program = new Command()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
if (!process.env.OPENAI_API_KEY) {
  throw Error('process.env.OPENAI_API_KEY is empty string')
}
export const openai = new OpenAIApi(configuration)

program.name('gcli').description('CLI tool using LLMs to help you remember how to do things')

program
  .command('do')
  .description('Given a action description, generate a command and execute it')
  .argument('<string>', 'Description of action wanted')
  .action(doAction)

program
  .command('say')
  .description('Given an action description, generate a command and say/echo it')
  .argument('<string>', 'Description of action wanted')
  .option('-e, --explain', 'explain the reasoning behind the generated command')
  .action(sayAction)

program.parse()
