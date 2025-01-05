'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    language: 'fr',
    theme: 'light',
    notifications: true,
    emailNotifications: true,
  });

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    // Ici, vous pouvez ajouter la logique pour sauvegarder les préférences
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Langue */}
        <div className="space-y-2">
          <Label>Langue</Label>
          <Select
            value={preferences.language}
            onValueChange={(value) => handlePreferenceChange('language', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Thème */}
        <div className="space-y-2">
          <Label>Thème</Label>
          <Select
            value={preferences.theme}
            onValueChange={(value) => handlePreferenceChange('theme', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un thème" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Clair</SelectItem>
              <SelectItem value="dark">Sombre</SelectItem>
              <SelectItem value="system">Système</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <Label>Notifications</Label>
            <p className="text-sm text-gray-500">
              Recevoir des notifications pour les inspections et les alertes
            </p>
          </div>
          <Switch
            checked={preferences.notifications}
            onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
          />
        </div>

        {/* Notifications par email */}
        <div className="flex items-center justify-between">
          <div>
            <Label>Notifications par email</Label>
            <p className="text-sm text-gray-500">
              Recevoir des rapports et alertes par email
            </p>
          </div>
          <Switch
            checked={preferences.emailNotifications}
            onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}