import { flags } from '@oclif/command';
import cli from 'cli-ux';

import BaseCommand from '../../base';
import ShopifyClient from '../../lib/ShopifyClient';

export default class WebhooksDelete extends BaseCommand {
  static description = 'delete a webhook given a resource id';

  static flags = {
    help: flags.help({ char: 'h' }),
    id: flags.string(),
  };

  async run(): Promise<void> {
    const { flags } = this.parse(WebhooksDelete);

    if (!this.userConfig.config.shopify) this.error('Missing Shopify config');

    const client = new ShopifyClient(
      this.userConfig.config.shopify.shop,
      this.userConfig.config.shopify.secret
    );

    let webhookId = flags.id;

    if (!webhookId) webhookId = await cli.prompt('Webhook id to delete');

    if (!webhookId) this.error('Missing webhook id');

    const shopName = await client.getShopName();
    const deleteResult = await client.deleteWebhook(webhookId);

    this.log(
      `Deleted ${deleteResult.deletedWebhookSubscriptionId} from "${shopName}"`
    );
  }
}
