import 'cross-fetch/polyfill';
import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';

export default class ShopifyClient {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(shop: string, token: string) {
    const cache = new InMemoryCache();
    const link = new HttpLink({
      uri: `https://${shop}/admin/api/2021-07/graphql.json`,
      headers: {
        'X-Shopify-Access-Token': token,
      },
    });
    this.client = new ApolloClient({
      cache,
      link,
    });
  }

  async getShopName(): Promise<string> {
    const query = gql`
      query {
        shop {
          name
        }
      }
    `;

    const response = await this.client.query({ query });

    return response.data.shop.name;
  }

  async listWebhooks(): Promise<[Record<string, unknown>]> {
    // TODO: paginate webhooks
    const query = gql`
      query {
        webhookSubscriptions(first: 100) {
          edges {
            node {
              id
              topic
            }
          }
        }
      }
    `;

    const response = await this.client.query({ query });

    return response.data.webhookSubscriptions.edges;
  }

  async createWebhook(
    topic: string,
    callbackUrl: string
  ): Promise<Record<string, unknown>> {
    const mutation = gql`
      mutation {
        webhookSubscriptionCreate(
          topic: ${topic}
          webhookSubscription: {callbackUrl: "${callbackUrl}"}
        ) {
          userErrors {
            field
            message
          }
          webhookSubscription {
            id
          }
        }
      }
    `;

    const response = await this.client.mutate({ mutation });

    return response.data.createWebhook.webhook;
  }

  async deleteWebhook(id: string): Promise<void> {
    const query = gql`
      mutation {
        webhookSubscriptionDelete(id: "${id}") {
          userErrors {
            field
            message
          }
        }
      }
    `;

    await this.client.query({ query });
  }
}
