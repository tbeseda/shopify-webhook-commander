# WIP

## shopify-webhook-commander

Set up Shopify webhook destinations from the command line

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/shopify-webhook-commander.svg)](https://npmjs.org/package/shopify-webhook-commander)
[![Downloads/week](https://img.shields.io/npm/dw/shopify-webhook-commander.svg)](https://npmjs.org/package/shopify-webhook-commander)
[![License](https://img.shields.io/npm/l/shopify-webhook-commander.svg)](https://github.com/tbeseda/shopify-webhook-commander/blob/master/package.json)

<!-- toc -->

- [WIP](#wip)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g shopify-webhook-commander
$ shopify-webhook-commander COMMAND
running command...
$ shopify-webhook-commander (-v|--version|version)
shopify-webhook-commander/0.0.0 darwin-arm64 node-v16.4.1
$ shopify-webhook-commander --help [COMMAND]
USAGE
  $ shopify-webhook-commander COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`shopify-webhook-commander config OPERATION [SERVICE]`](#shopify-webhook-commander-config-operation-service)
- [`shopify-webhook-commander webhook [FILE]`](#shopify-webhook-commander-webhook-file)
- [`shopify-webhook-commander help [COMMAND]`](#shopify-webhook-commander-help-command)

## `shopify-webhook-commander config OPERATION [SERVICE]`

configure Shopify Webhook Commander

```
USAGE
  $ shopify-webhook-commander config OPERATION [SERVICE]

OPTIONS
  -h, --help     show CLI help
  --token=token
```

_See code: [src/commands/config.ts](https://github.com/tbeseda/shopify-webhook-commander/blob/v0.0.0/src/commands/config.ts)_

## `shopify-webhook-commander help [COMMAND]`

display help for shopify-webhook-commander

```
USAGE
  $ shopify-webhook-commander help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `shopify-webhook-commander webhook [FILE]`

describe the command here

```
USAGE
  $ shopify-webhook-commander webhook [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/webhook.ts](https://github.com/tbeseda/shopify-webhook-commander/blob/v0.0.0/src/commands/webhook.ts)_

<!-- commandsstop -->
