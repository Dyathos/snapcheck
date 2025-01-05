'use client';

import { useSession } from 'next-auth/react';
import { Camera, Mail, User as UserIcon, BadgeCheck, Building, Phone } from 'lucide-react';
import { EditProfile } from '../components/EditProfile';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';

export default function ProfileSettings() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const fields = [
    { id: 'phone', title: 'Téléphone', icon: Phone, value: user.phone },
    { id: 'badge', title: 'Badge', icon: BadgeCheck, value: user.badge },
    { id: 'department', title: 'Département', icon: Building, value: user.department },
  ];

  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between">
        <EditProfile 
          initialData={{
            id: user.id,
            firstname: user.firstName,
            lastname: user.lastName,
            badge: user.badge,
            email: user.email,
            telephone: user.phone,
            department: user.department,
            photo: user.photo,
          }} 
        />
      </CardHeader>

      <div className="divide-y divide-gray-200 bg-white rounded-lg shadow">
        <div className="flex items-center gap-4 px-4 py-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              {user.photo ? (
                <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg">
              <Camera className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.id} className="px-4 py-4 flex items-center">
              <div className="p-2 rounded-lg bg-gray-100">
                <Icon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium text-gray-900">{field.title}</h3>
                <p className="text-gray-600">{field.value || 'Non renseigné'}</p>
              </div>
              <Badge variant="outline">
                {field.value ? 'À jour' : 'Non renseigné'}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}