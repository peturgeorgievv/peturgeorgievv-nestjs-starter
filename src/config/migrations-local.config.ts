import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  synchronize: false,
  password: 'root',
  database: 'peturgeorgievv-nestjs-starter',
  migrations: ['src/db/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
});
