"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Inspection {
  inspected: number;
  critical: number;
  pending: number;
  date: string;
}

interface Stats {
  uninspected: number;
  critical: number;
  history: Inspection[];
}

const InspectionOverview = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/inspections/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching inspection stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 300000); // Actualiser toutes les 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Section des véhicules non inspectés */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            État des inspections aujourd'hui
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-4">
              <Clock className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Non inspectés</p>
                <p className="text-2xl font-bold">{stats?.uninspected || 0}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-sm font-medium">Cas critiques</p>
                <p className="text-2xl font-bold">{stats?.critical || 0}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-sm font-medium">Inspectés</p>
                <p className="text-2xl font-bold">
                  {stats?.history && stats.history.length > 0 
                    ? stats.history[stats.history.length - 1]?.inspected 
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historique des inspections */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des inspections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <BarChart
              data={stats?.history || []}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inspected" name="Inspectés" fill="#22c55e" />
              <Bar dataKey="critical" name="Critiques" fill="#ef4444" />
              <Bar dataKey="pending" name="En attente" fill="#f97316" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectionOverview;