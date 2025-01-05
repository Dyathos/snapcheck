import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ClipboardCheck, AlertTriangle, Wrench, CheckCircle } from 'lucide-react';

interface VehicleStats {
  total: number;
  inspected: number;
  remaining: number;
}

interface InspectionStats {
  daily: number;
  critical: number;
  pending: number;
}

interface MaintenanceStats {
  active: number;
  completed: number;
  critical: number;
}

interface Stats {
  vehicles: VehicleStats;
  inspections: InspectionStats;
  maintenance: MaintenanceStats;
}

interface DailyStats {
  date: string;
  inspected: number;
  critical: number;
  pending: number;
}

const DashboardStats = ({ role = 'Inspecteur' }) => {
  const [stats, setStats] = React.useState<Stats>({
    vehicles: { total: 0, inspected: 0, remaining: 0 },
    inspections: { daily: 0, critical: 0, pending: 0 },
    maintenance: { active: 0, completed: 0, critical: 0 }
  });
  
  const [dailyStats, setDailyStats] = React.useState<DailyStats[]>([]);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchDailyStats = async () => {
      try {
        const response = await fetch('/api/stats/daily');
        const data = await response.json();
        setDailyStats(data);
      } catch (error) {
        console.error('Error fetching daily stats:', error);
      }
    };

    fetchStats();
    fetchDailyStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  const renderRoleSpecificStats = () => {
    switch (role) {
      case 'Inspecteur':
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="À inspecter aujourd'hui"
              value={stats.vehicles.remaining}
              icon={ClipboardCheck}
              color="text-blue-500"
            />
            <StatCard
              title="Inspectés aujourd'hui"
              value={stats.vehicles.inspected}
              icon={CheckCircle}
              color="text-green-500"
            />
            <StatCard
              title="Cas critiques"
              value={stats.inspections.critical}
              icon={AlertTriangle}
              color="text-red-500"
            />
          </div>
        );
      
      case 'Maintenance':
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="En maintenance"
              value={stats.maintenance.active}
              icon={Wrench}
              color="text-orange-500"
            />
            <StatCard
              title="Maintenances terminées"
              value={stats.maintenance.completed}
              icon={CheckCircle}
              color="text-green-500"
            />
            <StatCard
              title="Cas critiques"
              value={stats.maintenance.critical}
              icon={AlertTriangle}
              color="text-red-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderRoleSpecificStats()}
      
      <Card>
        <CardHeader>
          <CardTitle>Statistiques journalières</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <BarChart
              data={dailyStats}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inspected" fill="#22c55e" name="Inspectés" />
              <Bar dataKey="critical" fill="#ef4444" name="Critiques" />
              <Bar dataKey="pending" fill="#3b82f6" name="En attente" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;