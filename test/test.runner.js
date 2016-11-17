import Runner from '../lib/runner'
import { FileReader, FileWriter } from '../lib/file'
import { ConsoleWriter } from '../lib/console'

(async function () {
  
  try {

    const runner = new Runner({
      reader: new FileReader({ file: __filename + '.copy1', lineCount: 10000 }),
      // writer: new ConsoleWriter(),
      writer: new FileWriter({ file: __filename + '.copy2' }),
    })

    await runner.run()

  } catch(err) {console.error('error:', err.stack || err)}
})()