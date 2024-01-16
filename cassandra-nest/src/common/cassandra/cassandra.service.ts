import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {
  client: Client;
  mapper: mapping.Mapper;

  private createClient() {
    this.client = new Client({
      contactPoints: ['127.0.0.1:4444'],
      keyspace: 'utakmice',
      localDataCenter: 'datacenter1',
    });
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions);
  }
  async execute(query: string, params?: any[], options?: any): Promise<any> {
    return this.client.execute(query, params, options);
  }
}
