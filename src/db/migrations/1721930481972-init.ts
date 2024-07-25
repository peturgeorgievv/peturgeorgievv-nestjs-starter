import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1721930481972 implements MigrationInterface {
  name = 'Init1721930481972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "project" ("name", "description") VALUES ('peturgeorgievv', 'NestJS and TypeORM are awesome!')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "project"`);
  }
}
