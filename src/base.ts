import Command from '@oclif/command';
import UserConfig from './lib/UserConfig';

export default abstract class extends Command {
  userConfig: UserConfig = new UserConfig();

  async init(): Promise<void> {
    await this.userConfig.load(this.config.configDir);
  }

  async finally(): Promise<void> {
    if (this.userConfig) await this.userConfig.save();
  }
}
