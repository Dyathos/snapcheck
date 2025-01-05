'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { PencilIcon, XCircle } from 'lucide-react';

interface Vehicle {
  id: string;
  brand: string;
  affectation: string;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface EditVehicleProps {
  vehicleId: string;
  initialData: Vehicle;
}

export function EditVehicle({ vehicleId, initialData }: EditVehicleProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('affectation', formData.affectation);
      if (photo) {
        formDataToSend.append('photo', photo);
      }

      const response = await fetch(`/api/vehicles/${vehicleId}/edit`, {
        method: 'PATCH',
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la mise à jour du véhicule');
      }

      setIsOpen(false);
      router.refresh();
    } catch (err) {
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

  const ImagePreview = () => {
    const photoUrl = photo 
      ? URL.createObjectURL(photo)
      : formData.photo;

    if (!photoUrl) return null;

    return (
      <div className="relative mt-2 inline-block">
        <Image
          src={photoUrl}
          alt="Aperçu"
          width={200}
          height={200}
          className="rounded-lg object-cover"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2"
          onClick={() => setPhoto(null)}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PencilIcon className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le véhicule</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="brand">Marque</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="affectation">Affectation</Label>
            <Input
              id="affectation"
              value={formData.affectation}
              onChange={(e) => setFormData({ ...formData, affectation: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-1"
            />
            {(formData.photo || photo) && <ImagePreview />}
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