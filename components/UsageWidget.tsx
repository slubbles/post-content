'use client';

import { useEffect, useState } from 'react';
import UsageIndicator from './UsageIndicator';

export default function UsageWidget() {
  const [usage, setUsage] = useState<{
    used: number;
    limit: number;
    remaining: number;
    percentage: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const response = await fetch('/api/usage');
      if (response.ok) {
        const data = await response.json();
        setUsage(data);
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-6 animate-pulse">
        <div className="bg-gray-100 rounded-atome-lg p-4 h-20"></div>
      </div>
    );
  }

  if (!usage) return null;

  return (
    <div className="mb-6">
      <UsageIndicator
        used={usage.used}
        limit={usage.limit}
        remaining={usage.remaining}
        percentage={usage.percentage}
      />
    </div>
  );
}
