'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { PencilIcon, XCircle } from 'lucide-react';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  badge: string | null;
  email: string;
  telephone: string | null;
  department: string | null;
  photo: string | null;
}

interface EditProfileProps {
  initialData: User;
}

export function EditProfile({ initialData }: EditProfileProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: initialData.firstname,
    lastname: initialData.lastname,
    badge: initialData.badge || '',
    email: initialData.email,
    telephone: initialData.telephone || '',
    department: initialData.department || '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      // Ajout manuel de chaque champ pour s'assurer que les valeurs sont correctement envoyées
      formDataToSend.append('firstname', formData.firstname);
      formDataToSend.append('lastname', formData.lastname);
      formDataToSend.append('badge', formData.badge || '');
      formDataToSend.append('email', formData.email);
      formDataToSend.append('telephone', formData.telephone || '');
      formDataToSend.append('department', formData.department || '');
      
      if (photo) {
        formDataToSend.append('photo', photo);
      }

      console.log('Sending data:', Object.fromEntries(formDataToSend.entries()));

      const response = await fetch('/api/users/me/edit', {
        method: 'PATCH',
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la mise à jour du profil');
      }

      const result = await response.json();
      console.log('Update result:', result);

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Update error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
          <PencilIcon className="h-4 w-4 mr-2" />
          Modifier le profil
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier mon profil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstname">Prénom</Label>
              <Input
                id="firstname"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastname">Nom</Label>
              <Input
                id="lastname"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="badge">Matricule</Label>
            <Input
              id="badge"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="department">Département</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="photo">Photo de profil</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {(initialData.photo || photo) && (
              <div className="relative mt-2 inline-block">
                <Image
                  src={photo ? URL.createObjectURL(photo) : initialData.photo!}
                  alt="Photo de profil"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
                {photo && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2"
                    onClick={() => setPhoto(null)}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}