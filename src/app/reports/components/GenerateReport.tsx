import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { FileText, Mail, Download } from 'lucide-react';

const ReportGenerator = () => {
  const [selectedSections, setSelectedSections] = React.useState([]);
  const [generating, setGenerating] = React.useState(false);

  const reportSections = [
    {
      id: 'daily-inspections',
      title: 'Inspections de la journée',
      description: 'Résumé des inspections effectuées aujourd'hui'
    },
    {
      id: 'critical-vehicles',
      title: 'Véhicules critiques',
      description: 'Liste des véhicules présentant des défauts critiques'
    },
    {
      id: 'healthy-vehicles',
      title: 'Véhicules en bon état',
      description: 'Liste des véhicules sans défaut majeur'
    },
    {
      id: 'maintenance',
      title: 'Véhicules en maintenance',
      description: 'Liste des véhicules actuellement en maintenance'
    },
  ];

  const handleGenerateReport = async () => {
    if (selectedSections.length === 0) return;
    
    setGenerating(true);
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sections: selectedSections }),
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (selectedSections.length === 0) return;
    
    setGenerating(true);
    try {
      await fetch('/api/reports/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sections: selectedSections }),
      });
    } catch (error) {
      console.error('Error sending report:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Générer un rapport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportSections.map((section) => (
              <div key={section.id} className="flex items-center space-x-2">
                <Checkbox
                  id={section.id}
                  checked={selectedSections.includes(section.id)}
                  onCheckedChange={(checked) => {
                    setSelectedSections(prev =>
                      checked
                        ? [...prev, section.id]
                        : prev.filter(id => id !== section.id)
                    );
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={section.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {section.title}
                  </label>
                  <p className="text-sm text-gray-500">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-6">
            <Button
              onClick={handleGenerateReport}
              disabled={generating || selectedSections.length === 0}
            >
              <FileText className="w-4 h-4 mr-2" />
              Générer PDF
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={generating || selectedSections.length === 0}
              variant="outline"
            >
              <Mail className="w-4 h-4 mr-2" />
              Envoyer par email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGenerator;