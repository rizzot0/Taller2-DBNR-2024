import { Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jController } from './neo4j.controller';

@Module({
  providers: [Neo4jService], 
  controllers: [Neo4jController],
  exports: [Neo4jService], 
})
export class ApoNeo4jModule {}
