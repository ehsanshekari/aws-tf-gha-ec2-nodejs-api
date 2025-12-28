import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostsTable1614432892332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,               
        title VARCHAR(255) NOT NULL,
        content TEXT NULL,
        userId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_posts_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE posts;
    `);
  }
}
