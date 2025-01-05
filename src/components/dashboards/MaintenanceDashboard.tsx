'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Wrench, AlertTriangle, CheckCircle, Calendar } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const MaintenanceOverview = () => {
  const [stats, setStats] = useState({
    active: [],
    completed: [],
    critical: [],
    dailyActions: []
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/maintenance/stats')
        
        // Check if the response is okay
        if (!response.ok) {
          const errorBody = await response.text(); // Get the response body
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }
        
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching maintenance stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Section des véhicules en maintenance */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              En maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active.length}</div>
            <div className="mt-4 space-y-2">
              {stats.active.map(vehicle => (
                <div key={vehicle.id} className="text-sm">
                  {vehicle.brand} - {vehicle.affectation}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Maintenance terminée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed.length}</div>
            <div className="mt-4 space-y-2">
              {stats.completed.map(vehicle => (
                <div key={vehicle.id} className="text-sm">
                  {vehicle.brand} - {vehicle.affectation}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Cas critiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {stats.critical.length}
            </div>
            <div className="mt-4 space-y-2">
              {stats.critical.map(vehicle => (
                <div key={vehicle.id} className="text-sm">
                  {vehicle.brand} - {vehicle.affectation}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section des actions quotidiennes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Actions quotidiennes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <BarChart
              data={stats.dailyActions}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Terminées" fill="#22c55e" />
              <Bar dataKey="started" name="Démarrées" fill="#3b82f6" />
              <Bar dataKey="critical" name="Critiques" fill="#ef4444" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MaintenanceOverview