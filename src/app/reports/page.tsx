// app/reports/page.tsx
import { ReportGenerator } from '@/components/dashboards/ReportGenerator';

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Génération de rapports</h1>
      <ReportGenerator />
    </div>
  );
}