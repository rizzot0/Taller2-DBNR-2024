import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import neo4j, { Driver, Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private driver: Driver;
  private database = 'taller2bdnr'; // Especificar la base de datos aquí

  async onModuleInit() {
    try {
      this.driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'contraseña') // Usuario y contraseña directos
      );
      await this.driver.verifyConnectivity();
      console.log(`Conexión a Neo4j establecida a la base de datos: ${this.database}`);
    } catch (error) {
      console.error('Error al conectar a Neo4j:', error.message);
      throw error;
    }
  }

  async executeQuery(query: string, params?: Record<string, any>): Promise<any> {
    console.log('Creando sesión para Neo4j...');
    const session: Session = this.driver.session({ database: this.database }); // Especificar la base aquí
    console.log('Sesión creada:', session);
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
