import { Command, flags } from '@oclif/command';
import * as fs from 'fs-extra';
import * as path from 'path';

export default class Hello extends Command {
  static description = 'describe the command here';

  static examples = [
    `$ shopify-webhook-commander hello
Hello world from ./src/hello.ts!
`,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  };

  static args = [{ name: 'file' }];

  async run() {
    const { args, flags } = this.parse(Hello);
    let userConfig;
    try {
      userConfig = await fs.readJSON(path.join(this.config.configDir, 'config.json'));
    } catch (err) {
      if (err.code === 'ENOENT') {
        this.debug('Missing configuration');
      }
    }

    const name = flags.name ?? userConfig?.name ?? 'world';
    this.log(`Hello ${name} from ./src/commands/hello.ts`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}
