import { flags } from '@oclif/command';
import cli from 'cli-ux';

import BaseCommand from '../../base';
import ShopifyClient from '../../lib/ShopifyClient';

export default class WebhooksList extends BaseCommand {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run(): Promise<void> {
    if (!this.userConfig.config.shopify) this.error('Missing Shopify config');

    const client = new ShopifyClient(
      this.userConfig.config.shopify.shop,
      this.userConfig.config.shopify.secret
    );

    const shopName = await client.getShopName();
    const webhooksResult = await client.listWebhooks();

    const webhooks = webhooksResult.map((nodes) => {
      return nodes.node;
    });

    this.log(`Webhooks for "${shopName}"`);

    cli.table(webhooks, {
      topic: { minWidth: 15 },
      endpoint: { minWidth: 20, get: (row) => row.endpoint.callbackUrl },
      id: { header: 'ID' },
    });
  }
}
