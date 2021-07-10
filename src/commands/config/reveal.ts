import { flags } from '@oclif/command';
import cli from 'cli-ux';

import BaseCommand from '../../base';

export default class ConfigReveal extends BaseCommand {
  static description = 'print current Shopify config';

  static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({
      char: 'y',
      description: 'agree to reveal',
    }),
  };

  async run(): Promise<void> {
    const { flags } = this.parse(ConfigReveal);

    if (
      this.userConfig.config.shopify &&
      Object.keys(this.userConfig.config.shopify).length
    ) {
      const reveal =
        flags.yes || (await cli.confirm('Print config in clear text? (y/n)'));

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
  }
}
