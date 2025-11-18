import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'photos' })
export class Photo extends BaseEntity {
  @Column({ unique: true })
  @Index('idx_photos_url', { unique: true })
  url!: string;

  @Column({ type: 'jsonb', nullable: true })
  enhancements?: Record<string, unknown>;

  @Column({ type: 'jsonb', nullable: true })
  filters?: Record<string, unknown>;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_photos_user_id')
  @ManyToOne('User', 'photos')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
