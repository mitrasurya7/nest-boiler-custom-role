import { Exclude } from 'class-transformer';
import { Permission } from '../../permissions/entities/permission.entity';
import { Role } from '../../roles/entities/role.entity';
import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'role_permissions_tab' })
@Unique(['roleId', 'permissionId'])
export class RolePermission extends EntityHelper {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  roleId: number;

  @Column({ type: 'int' })
  permissionId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude({ toPlainOnly: true })
  deletedAt: Date;

  // Relationships

  @ManyToOne(() => Role, (role) => role, { eager: true })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission, { eager: true })
  permission: Permission;
}
