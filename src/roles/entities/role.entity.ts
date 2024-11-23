import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'roles_tab' })
export class Role extends EntityHelper {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'character varying', unique: true, nullable: false })
  name: string;

  // Relationships

  @Exclude({ toPlainOnly: true })
  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
