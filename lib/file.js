import lineReader from 'line-reader'
import P from 'bluebird'
import fs from 'fs'
import cp from 'child_process'

const open = P.promisify(lineReader.open)
const writeFile = P.promisify(fs.writeFile)

function getFileTotalLine(file) {

  return cp
    .execSync(`wc -l ${file}`)
    .toString()
    .split(/\s/)
    .filter(elem => elem.length > 0)[0]
}

export class FileReader {

  constructor({ file, lineCount = 100 }) {
    this.__reader = null
    this.__lineCount = lineCount
    this.__file = file
    this.__total = 0
  }

  total() {
    return this.__total
  }

  async read() {

    if (!this.__reader) {
      this.__reader = P.promisifyAll(await open(this.__file))
      this.__total = getFileTotalLine(this.__file)
      console.log(this.__total);
    }

    const lines = []

    while (this.__reader.hasNextLine() && 
      lines.length < this.__lineCount) {
      
      const line = await this.__reader.nextLineAsync()

      lines.push(line)
    }

    return lines 
  }
}

export class FileWriter {

  constructor({ file }) {
    this.__file = file
    this.__handled = 0
  }

  handled() {
    return this.__handled
  }

  async write(lines) {

    await writeFile(this.__file, lines.join('\n') + '\n', { flag: 'a+' })
    this.__handled += lines.length
  }
}