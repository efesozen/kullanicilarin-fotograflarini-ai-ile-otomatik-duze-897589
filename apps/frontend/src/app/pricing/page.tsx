'use client';

import { useSubscriptionPlans } from '@/features/subscription-plans/hooks/use-subscription-plans';

export default function PricingPage() {
  const { data: subscriptionPlans, isLoading } = useSubscriptionPlans();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Pricing</h1>
      <p className="text-muted-foreground mb-6">Details about subscription plans and pricing.</p>
      
      <div className="grid gap-4">
        {subscriptionPlans?.map((subscriptionPlan: any) => (
          <div key={subscriptionPlan.id} className="border rounded p-4">
            <pre>{JSON.stringify(subscriptionPlan, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
