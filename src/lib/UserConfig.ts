// TODO: move to a new Command base class

import fs from 'fs-extra';
import path from 'path';

export default class UserConfig {
  private configPath?: string;
  config: {
    shopify?: {
      shop: string;
      secret: string;
    };
  } = {};

  async load(configDir: string): Promise<void> {
    this.configPath = path.join(configDir, 'config.json');
    let config = {};

    try {
      config = await fs.readJson(this.configPath);
    } catch (err) {
      if (err.code === 'ENOENT') console.debug('No existing configuration');
    }

    this.config = config;
  }

  async save(): Promise<void> {
    if (this.configPath) await fs.outputJSON(this.configPath, this.config);
  }
}
