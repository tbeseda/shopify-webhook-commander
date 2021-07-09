import fs from 'fs-extra';
import path from 'path';
import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import ShopifyClient from '../lib/ShopifyClient';

interface UserConfig {
  [key: string]: { [key: string]: string | undefined };
}

export default class Webhook extends Command {
  static description = 'List, create, and delete Shopify webhooks';

  static flags = {
    help: flags.help({ char: 'h' }),
    topic: flags.string(),
    callbackUrl: flags.string(),
    id: flags.string(),
  };

  static args = [{ name: 'operation', options: ['list', 'create', 'delete'] }];

  async run(): Promise<void> {
    const { args, flags } = this.parse(Webhook);

    let userConfig: UserConfig = {};
    try {
      userConfig = await fs.readJSON(
        path.join(this.config.configDir, 'config.json')
      );
    } catch (err) {
      if (err.code === 'ENOENT') this.debug('No existing configuration');
    }

    if (
      !userConfig.shopify.shop ||
      !userConfig.shopify?.key ||
      !userConfig.shopify.secret
    )
      this.error('Missing Shopify config');

    const client = new ShopifyClient(
      userConfig.shopify.shop,
      userConfig.shopify.secret
    );

    const shopName = await client.getShopName();

    this.log(`Connected to "${shopName}"`);

    let topic = flags.topic;
    let callbackUrl = flags.callbackUrl;
    // let webhookId = flags.id;

    switch (args.operation) {
      case 'list':
        const webhooks = await client.listWebhooks();
        this.log(JSON.stringify(webhooks, null, 2));
        break;
      case 'create':
        if (!topic) topic = await cli.prompt('Webhook topic');
        if (!callbackUrl) callbackUrl = await cli.prompt('Callback URL');

        if (!topic || !callbackUrl) this.error('Missing topic or callback URL');

        const result = await client.createWebhook(topic, callbackUrl);
        this.log(JSON.stringify(result.body, null, 2));
        break;
      case 'delete':
        this.log('WIP');
        break;
      default:
        this.log('Choose an operation; list, create, delete');
        break;
    }
  }
}
