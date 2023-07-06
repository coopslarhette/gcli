## Gen-CLI

Gen-CLI is a fun little CLI tool I built in a day or so that is intended to help you do stuff, or remember how to do stuff, in the terminal.

Its intended to easy the transtiion between natural language and thought and terminal commands. Given a action description of what you want to accomplish, it uses `gpt-3.5-turbo` to generate commands to accomplish that task.

Example:

🧑: "copy everything in ./training-run-epoch-1012/data to s3://my-bucket/training-run-epoch-1012/data"

🤖: `aws s3 sync ./training-run-epoch-1012/data s3://my-bucket/training-run-epoch-1012/data
`

### Usage

