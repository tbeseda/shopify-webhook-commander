// TODO: separate into separate commands in ./commands/

import { flags } from '@oclif/command';
import cli from 'cli-ux';

import BaseCommand from '../base';

export default class Config extends BaseCommand {
  static description = 'configure Shopify Webhook Commander';

  static flags = {
    help: flags.help({ char: 'h' }),
    shop: flags.string(),
    key: flags.string(),
    secret: flags.string(),
  };

  static args = [
    {
      name: 'operation',
      options: ['set', 'unset', 'reveal'],
      required: true,
    },
    {
      name: 'service',
      options: ['shopify', 'hookdeck'],
      default: 'shopify',
    },
  ];

  async run(): Promise<void> {
    const { args, flags } = this.parse(Config);

    let service = args.service;
    let shop = flags.shop;
    let secret = flags.secret;

    switch (args.operation) {
      case 'set':
        if (!shop) shop = await cli.prompt('Shop (with .myshopify.com)');
        if (!secret) secret = await cli.prompt('Password', { type: 'hide' });

        if (!shop || !secret)
          this.error('You must provide a shop and password');

        if (service.toLowerCase() === 'shopify') {
          this.userConfig.config.shopify = { shop, secret };
          this.log('Setting Shopify token.');
        } else {
          this.error(`Unknown service: ${service}`);
        }

        break;
      case 'unset':
        if (!service)
          service = await cli.prompt('Service to unset? probably "shopify"');

        if (service.toLowerCase() === 'shopify') {
          delete this.userConfig.config.shopify;
          this.log('Deleting Shopify token.');
        } else {
          this.error(`Unsupported service: ${service}`);
        }
        break;
      case 'reveal':
        if (
          this.userConfig.config.shopify &&
          Object.keys(this.userConfig.config.shopify).length
        ) {
          const reveal = await cli.confirm('Print config in clear text? (y/n)');

          if (reveal) {
            const rows = [];
            for (const [key, value] of Object.entries(
              this.userConfig.config.shopify
            )) {
              rows.push({ Setting: key, Value: value });
            }
            cli.table(
              rows,
              { Setting: { minWidth: 12 }, Value: { minWidth: 20 } },
              { printLine: this.log }
            );
          }
        } else {
          this.log('No configuration to reveal.');
        }
        break;
      default:
        break;
    }
  }
}
