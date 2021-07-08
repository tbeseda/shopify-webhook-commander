import { Command, flags } from '@oclif/command';
import * as fs from 'fs-extra';
import * as path from 'path';

interface UserConfig {
  shopify?: string;
}

export default class Config extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
    token: flags.string(),
  };

  static args = [
    {
      name: 'operation',
      options: ['set', 'unset', 'reveal'],
      required: true,
    },
    {
      name: 'service',
      options: ['shopify'],
    },
  ];

  async run() {
    const { args, flags } = this.parse(Config);

    let userConfig: UserConfig = {};
    try {
      userConfig = await fs.readJSON(
        path.join(this.config.configDir, 'config.json')
      );
    } catch (err) {
      if (err.code === 'ENOENT') {
        this.debug('No existing configuration');
      }
    }

    switch (args.operation) {
      case 'set':
        if (args.service === 'shopify' && flags.token) {
          userConfig.shopify = flags.token;
          this.log('Setting Shopify token.');
        } else {
          this.error('Specify service and token.');
        }
        break;
      case 'unset':
        if (args.service === 'shopify') {
          delete userConfig.shopify;
          this.log('Deleting Shopify token.');
        } else {
          this.error('Unsure what to unset, specify service.');
        }
        break;
      case 'reveal':
        this.log(JSON.stringify(userConfig, null, 2));
        break;
      default:
        break;
    }

    try {
      await fs.outputJSON(
        path.join(this.config.configDir, 'config.json'),
        userConfig
      );
    } catch (err) {
      this.error(err);
    }
  }
}
