import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { SubscriptionPlan } from './subscription-plan.entity';
import type { User } from './user.entity';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @Column({ type: 'integer' })
  amount!: number;

  @Column({ type: 'timestamp with time zone', name: 'payment_date' })
  @Index('idx_payments_payment_date')
  paymentDate!: Date;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed'] })
  status!: 'pending' | 'completed' | 'failed';


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_payments_user_id')
  @ManyToOne('User', 'payments')
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'subscription_plan_id' })
  subscriptionPlanId!: string;

  @Index('idx_payments_subscription_plan_id')
  @ManyToOne('SubscriptionPlan', 'payments')
  @JoinColumn({ name: 'subscription_plan_id' })
  subscriptionPlan!: SubscriptionPlan;
}
