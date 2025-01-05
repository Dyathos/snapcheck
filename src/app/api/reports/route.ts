import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { PDFDocument } from 'pdf-lib';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Désactiver le parsing automatique
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { frequency, filters } = req.body; // Récupérer les filtres et la fréquence

    try {
      // Récupérer les véhicules et pièces critiques
      const vehicles = await prisma.vehicle.findMany({
        include: {
          parts: true,
        },
      });

      const criticalVehicles = vehicles.filter(vehicle => 
        vehicle.parts.some(part => part.severity === 'critical')
      );

      // Créer un document PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      // Ajouter du contenu au PDF
      page.drawText('Rapport d\'Inspection', { x: 50, y: height - 50, size: 20 });
      let yPosition = height - 100;

      criticalVehicles.forEach(vehicle => {
        page.drawText(`Véhicule: ${vehicle.brand} ${vehicle.affectation}`, { x: 50, y: yPosition });
        yPosition -= 20;
        vehicle.parts.forEach(part => {
          if (part.severity === 'critical') {
            page.drawText(`- Pièce critique: ${part.name}`, { x: 70, y: yPosition });
            yPosition -= 20;
          }
        });
        yPosition -= 20; // Espace entre les véhicules
      });

      const pdfBytes = await pdfDoc.save();

      // Configuration de Nodemailer
      const transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Remplacez par votre hôte SMTP
        port: 587,
        secure: false, // true pour 465, false pour d'autres ports
        auth: {
          user: 'your-email@example.com', // Votre adresse email
          pass: 'your-email-password', // Votre mot de passe
        },
      });

      // Envoyer le PDF par email
      await transporter.sendMail({
        from: 'your-email@example.com',
        to: 'maintenance@example.com', // Destinataire
        subject: 'Rapport d\'Inspection',
        text: 'Veuillez trouver ci-joint le rapport d\'inspection.',
        attachments: [
          {
            filename: 'report.pdf',
            content: pdfBytes,
          },
        ],
      });

      // Renvoyer le PDF au client
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
      res.send(pdfBytes);
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ error: 'Erreur lors de la génération du rapport' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}