

export class ConsoleWriter {

  async write(lines) {
    console.log('##### output #####')
    console.log(lines.join('\n'))
  }
}