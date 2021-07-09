# Shopify Webhook Commander

## Install

#### Unavailable! (WIP)

This package hasn't been published just yet.

```sh-session
$ npm i -g shopify-webhook-commander
```

## Demonstration

```sh-session
$ shopify-webhook-commander config set
  Shop (with .myshopify.com): tbeseda.myshopify.com
  Password: ****************

$ shopify-webhook-commander webhook list
  Connected to "tbeseda Zero"
  []

$ shopify-webhook-commander webhook create
  Webhook topic: ORDERS_CREATE
  Callback URL: https://ingest.my-app.com/
```

# `oclif` Generated Docs:

## shopify-webhook-commander

Set up Shopify webhook destinations from the command line

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/shopify-webhook-commander.svg)](https://npmjs.org/package/shopify-webhook-commander)
[![Downloads/week](https://img.shields.io/npm/dw/shopify-webhook-commander.svg)](https://npmjs.org/package/shopify-webhook-commander)
[![License](https://img.shields.io/npm/l/shopify-webhook-commander.svg)](https://github.com/tbeseda/shopify-webhook-commander/blob/master/package.json)

<!-- toc -->

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
shopify-webhook-commander/0.0.1 darwin-arm64 node-v16.4.1
$ shopify-webhook-commander --help [COMMAND]
USAGE
  $ shopify-webhook-commander COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`shopify-webhook-commander config OPERATION [SERVICE]`](#shopify-webhook-commander-config-operation-service)
- [`shopify-webhook-commander help [COMMAND]`](#shopify-webhook-commander-help-command)
- [`shopify-webhook-commander webhook [OPERATION]`](#shopify-webhook-commander-webhook-operation)

## `shopify-webhook-commander config OPERATION [SERVICE]`

configure Shopify Webhook Commander

```
USAGE
  $ shopify-webhook-commander config OPERATION [SERVICE]

OPTIONS
  -h, --help       show CLI help
  --key=key
  --secret=secret
  --shop=shop
```

_See code: [src/commands/config.ts](https://github.com/tbeseda/shopify-webhook-commander/blob/v0.0.1/src/commands/config.ts)_

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

## `shopify-webhook-commander webhook [OPERATION]`

List, create, and delete Shopify webhooks

```
USAGE
  $ shopify-webhook-commander webhook [OPERATION]

OPTIONS
  -h, --help                 show CLI help
  --callbackUrl=callbackUrl
  --id=id
  --topic=topic
```

_See code: [src/commands/webhook.ts](https://github.com/tbeseda/shopify-webhook-commander/blob/v0.0.1/src/commands/webhook.ts)_

<!-- commandsstop -->
