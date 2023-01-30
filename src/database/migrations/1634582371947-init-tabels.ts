import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTabels1634582371947 implements MigrationInterface {
  name = 'initTabels1634582371947';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_auth_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`token\` varchar(255) NOT NULL, \`expires_at\` int(4) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`token\` varchar(255) NOT NULL, \`action\` varchar(255) NOT NULL, \`expires_at\` int(4) NOT NULL, \`data\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(150) NOT NULL, \`email_verified_at\` timestamp NULL, \`password\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`page\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`content\` mediumtext NOT NULL, \`meta_title\` varchar(255) NULL, \`meta_description\` text NULL, \`slug\` varchar(255) NULL, \`sort_order\` int(2) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_auth_token\` ADD CONSTRAINT \`FK_e4dbc40e1c38f1497e0de9d1670\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_79ac751931054ef450a2ee47778\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_79ac751931054ef450a2ee47778\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_auth_token\` DROP FOREIGN KEY \`FK_e4dbc40e1c38f1497e0de9d1670\``,
    );
    await queryRunner.query(`DROP TABLE \`page\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`user_token\``);
    await queryRunner.query(`DROP TABLE \`user_auth_token\``);
  }
}
