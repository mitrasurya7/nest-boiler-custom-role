import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1729057627393 implements MigrationInterface {
    name = 'InitTable1729057627393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions_tab" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_26449a3159173a38e0b1d5bb037" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions_tab" ("id" SERIAL NOT NULL, "roleId" integer NOT NULL, "permissionId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_426b6bcbdf446775d0d0ea97644" UNIQUE ("roleId", "permissionId"), CONSTRAINT "PK_0845180cec8658c76029b445669" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_tab" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_1e1883a20f60e336c1bfada0b8a" UNIQUE ("name"), CONSTRAINT "PK_58789166061ce6bb5806cfe0377" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_tab" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "roleId" integer NOT NULL, CONSTRAINT "PK_8d67941afbc95fb5167f44c61ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role_permissions_tab" ADD CONSTRAINT "FK_3d07d57d66b50656b083950d76e" FOREIGN KEY ("roleId") REFERENCES "roles_tab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions_tab" ADD CONSTRAINT "FK_b46fe56fda5871e995c8ba110fd" FOREIGN KEY ("permissionId") REFERENCES "permissions_tab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_tab" ADD CONSTRAINT "FK_dc91f693aa63e5d62a2a723f652" FOREIGN KEY ("roleId") REFERENCES "roles_tab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_tab" DROP CONSTRAINT "FK_dc91f693aa63e5d62a2a723f652"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_tab" DROP CONSTRAINT "FK_b46fe56fda5871e995c8ba110fd"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_tab" DROP CONSTRAINT "FK_3d07d57d66b50656b083950d76e"`);
        await queryRunner.query(`DROP TABLE "users_tab"`);
        await queryRunner.query(`DROP TABLE "roles_tab"`);
        await queryRunner.query(`DROP TABLE "role_permissions_tab"`);
        await queryRunner.query(`DROP TABLE "permissions_tab"`);
    }

}
