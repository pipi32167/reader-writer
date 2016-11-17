export default class Runner {

  constructor({ reader, writer }) {

    this.__reader = reader
    this.__writer = writer
  }

  async run() {

    const timer = setInterval(() => {
      console.log(`step: ${this.__writer.handled()}/${this.__reader.total()}`)
    }, 2000)
    let lines
    do {

      lines = await this.__reader.read()

      if (lines && lines.length > 0) {
        await this.__writer.write(lines)
      }
      
    } while(lines && lines.length > 0)

    clearInterval(timer)
  }
}