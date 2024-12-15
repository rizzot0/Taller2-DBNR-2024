import { Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jController } from './neo4j.controller';

@Module({
  providers: [Neo4jService], // Proveedor del servicio de Neo4j
  controllers: [Neo4jController], // Controlador para las rutas relacionadas con Neo4j
  exports: [Neo4jService], // Exportar para usarlo en otros módulos
})
export class ApoNeo4jModule {}
