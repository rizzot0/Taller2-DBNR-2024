import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import neo4j, { Driver, Session } from 'neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private driver: Driver;

  async onModuleInit() {
    const scheme = process.env.NEO4J_SCHEME || 'bolt';
    const host = process.env.NEO4J_HOST || 'localhost';
    const port = process.env.NEO4J_PORT || '7687';
    const username = process.env.NEO4J_USERNAME || 'neo4j';
    const password = process.env.NEO4J_PASSWORD || 'contraseña';

    try {
      this.driver = neo4j.driver(
        `${process.env.NEO4J_SCHEME}://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`,
        neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
      );
      
      await this.driver.verifyConnectivity();
      console.log('Conexión a Neo4j exitosa.');
    } catch (error) {
      console.error('Error al conectar a Neo4j:', error.message);
      throw error;
    }
  }

  async executeQuery(query: string, params?: Record<string, any>): Promise<any> {
    console.log('Creando sesión para Neo4j...');
    const session: Session = this.driver.session();
    try {
      const result = await session.run(query, params);
      return result.records.map((record) => record.toObject());
    } finally {
      await session.close();
    }
  }

  async onModuleDestroy() {
    await this.driver.close();
    console.log('Conexión a Neo4j cerrada');
  }
}
