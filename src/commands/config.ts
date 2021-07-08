import { Command, flags } from '@oclif/command';
import fs from 'fs-extra';
import path from 'path';
import cli from 'cli-ux';

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
      if (err.code === 'ENOENT') this.debug('No existing configuration');
    }

    let service = args.service;
    let token = flags.token;

    switch (args.operation) {
      case 'set':
        if (!service)
          service = await cli.prompt('Service to set? probably "shopify"');
        if (!token) token = await cli.prompt('Token', { type: 'hide' });

        if (service.toLowerCase() === 'shopify') {
          userConfig.shopify = token;
          this.log('Setting Shopify token.');
        } else {
          this.error(`Unknown service: ${service}`);
        }

        break;
      case 'unset':
        if (!service)
          service = await cli.prompt('Service to unset? probably "shopify"');

        if (service.toLowerCase() === 'shopify') {
          delete userConfig.shopify;
          this.log('Deleting Shopify token.');
        } else {
          this.error(`Unknown service: ${service}`);
        }
        break;
      case 'reveal':
        if (userConfig && Object.keys(userConfig).length) {
          if (await cli.confirm('Print config in clear text? (y/n)')) {
            const rows = [];
            for (const [key, value] of Object.entries(userConfig)) {
              rows.push({ Setting: key, Value: value });
            }
            cli.table(
              rows,
              { Setting: { minWidth: 12 }, Value: { minWidth: 20 } },
              { printLine: this.log }
            );
          }
        } else {
          this.log('No configuration to unset.');
        }
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
