import React from 'react';

// Define the shape of the production data prop
interface ProductionPerformanceProps {
  data: {
    rom?: { actual: number; target: number };
    product?: { actual: number; target: number };
    decline?: { actual: number; target: number };
    mtd?: { actual: number; target: number };
  } | null;
}

// A helper component to render each performance metric row
const MetricRow: React.FC<{ title: string; actual?: number; target?: number }> = ({ title, actual, target }) => {
  if (actual === undefined || target === undefined) return null;

  const isAboveTarget = actual >= target;
  const performanceColor = isAboveTarget ? 'text-green-600' : 'text-red-600';

  return (
    <div className="grid grid-cols-3 gap-4 items-center py-2 border-b border-gray-200 last:border-b-0">
      <span className="font-semibold text-gray-700">{title}</span>
      <span className={`font-bold text-lg ${performanceColor}`}>{actual.toLocaleString()}</span>
      <span className="text-gray-500">/ {target.toLocaleString()}</span>
    </div>
  );
};

const ProductionPerformance: React.FC<ProductionPerformanceProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-gray-100 rounded-lg">Loading production data...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Production Performance (Tonnes)</h2>
      <div className="space-y-2">
        <MetricRow title="ROM" actual={data.rom?.actual} target={data.rom?.target} />
        <MetricRow title="Product" actual={data.product?.actual} target={data.product?.target} />
        <MetricRow title="Decline" actual={data.decline?.actual} target={data.decline?.target} />
        <MetricRow title="MTD" actual={data.mtd?.actual} target={data.mtd?.target} />
      </div>
    </div>
  );
};

export default ProductionPerformance;
