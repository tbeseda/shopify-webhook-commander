import { expect, test } from '@oclif/test';

describe('webhooks/create', () => {
  test
    .stdout()
    .command(['webhooks/create'])
    .it('runs hello', (ctx) => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['webhooks/create', '--name', 'jeff'])
    .it('runs hello --name jeff', (ctx) => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
