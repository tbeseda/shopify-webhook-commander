import { expect, test } from '@oclif/test';

describe('config/reveal', () => {
  test
    .stdout()
    .command(['config/reveal'])
    .it('runs hello', (ctx) => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['config/reveal', '--name', 'jeff'])
    .it('runs hello --name jeff', (ctx) => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
