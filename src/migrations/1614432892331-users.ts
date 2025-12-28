import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1614432892331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE users (
         id SERIAL PRIMARY KEY,               
         username VARCHAR(50) UNIQUE NOT NULL, 
         email VARCHAR(100) UNIQUE NOT NULL,  
         password_hash TEXT NOT NULL,          
         first_name VARCHAR(50),               
         last_name VARCHAR(50),               
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    `DROP TABLE users;`;
  }
}
