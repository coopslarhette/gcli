## Gen-CLI

Gen-CLI is a fun little CLI tool I built in a day or so that is intended to help you do stuff, or remember how to do stuff, in the terminal.

Its intended to easy the transtiion between natural language and thought and terminal commands. Given a action description of what you want to accomplish, it uses `gpt-3.5-turbo` to generate commands to accomplish that task.

Example:

🧑: "copy everything in ./training-run-epoch-1012/data to s3://my-bucket/training-run-epoch-1012/data"

🤖: `aws s3 sync ./training-run-epoch-1012/data s3://my-bucket/training-run-epoch-1012/data
`

### Install

[Install Homebrew](https://brew.sh/) (if you don't have it)

`$ brew tap coopslarhette/formula`

`$ brew install gcli`

### Usage

`$ OPENAI_API_KEY='xxxxx' gcli do "kill the process on port 3000"`

`$ OPENAI_API_KEY='xxxxx' gcli say "delete everything in C:\\Windows\System32"`

The `say` command has a flag, `--explain` where the tool will also generate its an explanation/reasoning for the command(s) it chose.

`$ OPENAI_API_KEY='xxxxx' gcli say "delete everything in C:\\Windows\System32" --explain`

