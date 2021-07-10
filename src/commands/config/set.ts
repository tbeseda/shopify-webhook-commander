import { flags } from '@oclif/command';
import cli from 'cli-ux';

import BaseCommand from '../../base';

export default class ConfigSet extends BaseCommand {
  static description = 'set Shopify credentials config';

  static flags = {
    help: flags.help({ char: 'h' }),
    shop: flags.string(),
    secret: flags.string(),
  };

  async run(): Promise<void> {
    const { flags } = this.parse(ConfigSet);

    let shop = flags.shop;
    let secret = flags.secret;

    if (!shop) shop = await cli.prompt('Shop (with .myshopify.com)');
    if (!secret) secret = await cli.prompt('Password', { type: 'hide' });

    if (!shop || !secret) this.error('You must provide a shop and password');

    this.userConfig.config.shopify = { shop, secret };
    this.log('Setting Shopify token.');
  }
}
