import { flags } from '@oclif/command';

import BaseCommand from '../../base';

export default class ConfigUnset extends BaseCommand {
  static description = 'remove Shopify config';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run(): Promise<void> {
    delete this.userConfig.config.shopify;
    this.log('Unset Shopify settings.');
  }
}
