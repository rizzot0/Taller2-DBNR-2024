import { Controller, Get, Query } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Get('create-test-node')
  async createTestNode() {
    try {

      const createQuery = `CREATE (n:Test {name: "Prueba", createdAt: datetime()}) RETURN n`;
      const result = await this.neo4jService.executeQuery(createQuery);
  
      return { message: 'Nodo creado con éxito en Neo4j', data: result };
    } catch (error) {
      console.error('Error al crear el nodo:', error.message);
      return { error: 'Fallo al crear el nodo en Neo4j', details: error.message };
    }
  }
  
}
