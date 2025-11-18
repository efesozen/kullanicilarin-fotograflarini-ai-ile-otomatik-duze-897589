import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'subscription_plans' })
export class Subscriptionplan extends BaseEntity {
  @Column({ unique: true })
  @Index('idx_subscription_plans_name', { unique: true })
  name!: string;

  @Column({ type: 'integer' })
  price!: number;

  @Column({ type: 'integer' })
  duration_months!: number;

  @Column({ type: 'jsonb', nullable: true })
  features?: Record<string, unknown>;

}
