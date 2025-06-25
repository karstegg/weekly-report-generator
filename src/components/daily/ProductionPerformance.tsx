import React from 'react';
import { ProductionPerformanceData, AreaLoads, BlastPerformance } from '../../data/reportData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { DataRow } from '../ui/data-display';

interface ProductionPerformanceProps {
  data: ProductionPerformanceData | null;
}

// A helper component to render each performance metric row
const MetricRow: React.FC<{ title: string; actual?: number | null; target?: number | null }> = ({ title, actual, target }) => {
  if (actual === undefined || target === undefined || actual === null || target === null) return null;

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

const LoadsSection: React.FC<{ loads: AreaLoads | null }> = ({ loads }) => {
    if (!loads) return null;
    const totalLoads = (loads.stopping || 0) + (loads.development || 0) + (loads.rehab || 0);

    return (
        <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="font-semibold mb-2 text-gray-700">Loads</h4>
            <DataRow>
                <span>Total Loads</span>
                <span>{totalLoads}</span>
            </DataRow>
            <p className="text-xs text-gray-500 mt-1">
                (Stopping: {loads.stopping ?? 0}, Development: {loads.development ?? 0}, Rehab: {loads.rehab ?? 0})
            </p>
        </div>
    );
};

const BlastPerformanceSection: React.FC<{ blast_performance: BlastPerformance | null }> = ({ blast_performance }) => {
    if (!blast_performance) return null;

    return (
        <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="font-semibold mb-2 text-gray-700">Blast Performance</h4>
            <DataRow>
                <span>Planned</span>
                <span>{blast_performance.planned ?? '?'}</span>
            </DataRow>
            <DataRow>
                <span>Completed</span>
                <span>{blast_performance.completed ?? '?'}</span>
            </DataRow>
            {blast_performance.issues && (
                <div className="text-sm text-gray-600 mt-2">
                    <p className="font-semibold">Issues:</p>
                    <p>{blast_performance.issues}</p>
                </div>
            )}
        </div>
    );
};


const ProductionPerformance: React.FC<ProductionPerformanceProps> = ({ data }) => {
  if (!data) {
    return (
        <Card>
            <CardContent className="p-4">
                Loading production data...
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>2. Production Performance</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <MetricRow title="ROM (Tonnes)" actual={data.rom_tons?.actual} target={data.rom_tons?.target} />
                <MetricRow title="Product (Tonnes)" actual={data.product_tons?.actual} target={data.product_tons?.target} />
            </div>
            <LoadsSection loads={data.loads} />
            <BlastPerformanceSection blast_performance={data.blast_performance} />
        </CardContent>
    </Card>
  );
};

export default ProductionPerformance;
