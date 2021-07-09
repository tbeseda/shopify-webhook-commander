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

  async listWebhooks(): Promise<any[]> {
    // TODO: paginate webhooks
    const query = gql`
      query {
        webhookSubscriptions(first: 100) {
          edges {
            node {
              id
              topic
              endpoint {
                __typename
                ... on WebhookHttpEndpoint {
                  callbackUrl
                }
                ... on WebhookEventBridgeEndpoint {
                  arn
                }
                ... on WebhookPubSubEndpoint {
                  pubSubProject
                  pubSubTopic
                }
              }
            }
          }
        }
      }
    `;

    const response = await this.client.query({ query });

    return response.data.webhookSubscriptions.edges;
  }

  async createWebhook(topic: string, callbackUrl: string): Promise<any> {
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

    return response.data.webhookSubscriptionCreate;
  }

  async deleteWebhook(id: string): Promise<any> {
    const mutation = gql`
      mutation {
        webhookSubscriptionDelete(id: "${id}") {
          userErrors {
            field
            message
          }
          deletedWebhookSubscriptionId
        }
      }
    `;

    const response = await this.client.mutate({ mutation });

    return response.data.webhookSubscriptionDelete;
  }
}
