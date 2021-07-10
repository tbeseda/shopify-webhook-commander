import { flags } from '@oclif/command';
import cli from 'cli-ux';

import BaseCommand from '../../base';
import ShopifyClient from '../../lib/ShopifyClient';

export default class WebhooksCreate extends BaseCommand {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
    topic: flags.string(),
    callbackUrl: flags.string(),
  };

  async run(): Promise<void> {
    const { flags } = this.parse(WebhooksCreate);

    if (!this.userConfig.config.shopify) this.error('Missing Shopify config');

    const client = new ShopifyClient(
      this.userConfig.config.shopify.shop,
      this.userConfig.config.shopify.secret
    );

    let topic = flags.topic;
    let callbackUrl = flags.callbackUrl;

    if (!topic) topic = await cli.prompt('Webhook topic');
    if (!callbackUrl) callbackUrl = await cli.prompt('Callback URL');

    if (!topic || !callbackUrl) this.error('Missing topic or callback URL');

    const shopName = await client.getShopName();
    const createResult = await client.createWebhook(topic, callbackUrl);

    this.log(
      `Created ${createResult.webhookSubscription.id} for "${shopName}"`
    );
  }
}
