import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreatePhotoTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'photos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'enhancements',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'filters',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'photos',
      new TableForeignKey({
        name: 'fk_photos_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'photos',
      new TableIndex({
        name: 'idx_photos_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'photos',
      new TableIndex({
        name: 'idx_photos_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'photos',
      new TableIndex({
        name: 'uk_photos_url',
        columnNames: ['url'],
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('photos', 'idx_photos_user_id');
    await queryRunner.dropIndex('photos', 'uk_photos_url');
    await queryRunner.dropForeignKey('photos', 'fk_photos_user_id');
    await queryRunner.dropTable('photos');
  }
}
