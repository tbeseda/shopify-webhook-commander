import { expect, test } from '@oclif/test';

describe('webhooks/delete', () => {
  test
    .stdout()
    .command(['webhooks/delete'])
    .it('runs hello', (ctx) => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['webhooks/delete', '--name', 'jeff'])
    .it('runs hello --name jeff', (ctx) => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
