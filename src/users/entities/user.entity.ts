import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
@Entity({ name: 'users_tab' })
export class User extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column({ type: 'character varying', nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  public previousPasswordExists: boolean;

  @Column({ type: 'int', nullable: false })
  roleId: number;

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  // Hooks

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
    this.previousPasswordExists = Boolean(this.previousPassword);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
