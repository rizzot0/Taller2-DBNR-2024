import { Controller, Get, Query } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Get('test')
  async testConnection() {
    try {
      const result = await this.neo4jService.executeQuery('RETURN "Connected to Neo4j" AS message');
      return { message: 'Conexión exitosa', data: result[0] };
    } catch (error) {
      console.error('Error al probar la conexión:', error.message);
      return { error: 'Fallo en la conexión con Neo4j', details: error.message };
    }
  }

  @Get('comments-by-course')
  async getCommentsByCourse(@Query('courseId') courseId: string) {
    try {
      const query = `
        MATCH (u:Usuario)-[r:COMENTA]->(c:Curso {id: $courseId})
        RETURN u.username AS usuario, r.texto AS comentario, r.puntuacion AS puntuacion, r.fecha AS fecha
      `;
      const result = await this.neo4jService.executeQuery(query, { courseId });
      return { comentarios: result };
    } catch (error) {
      console.error('Error al obtener comentarios:', error.message);
      return { error: 'Fallo al obtener comentarios', details: error.message };
    }
  }
}
