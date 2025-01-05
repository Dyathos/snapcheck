// src/app/metadata.tsx
import type { Metadata } from 'next';

export type ExtendedMetadata = Metadata & {
  jsonLd?: {
    '@context': string;
    '@type': string;
    name: string;
    url: string;
    description: string;
    image: string;
    potentialAction: {
      '@type': string;
      target: string;
      'query-input': string;
    };
  };
};

export const metadata: ExtendedMetadata = {
  title: 'CarCheck',
  description: 'Application de suivi des véhicules',
  keywords: 'véhicules, entretien, inspections, suivi, CarCheck',
  authors: [{ name: 'Votre Nom', url: 'https://votre-site.com' }],
  openGraph: {
    title: 'CarCheck',
    description: 'Application de suivi des véhicules',
    url: 'https://votre-site.com', // Remplacez par l'URL de votre site
    siteName: 'CarCheck',
    images: [
      {
        url: 'https://votre-site.com/image.jpg', // Remplacez par l'URL de votre image
        width: 800,
        height: 600,
        alt: 'Image de CarCheck',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarCheck',
    description: 'Application de suivi des véhicules',
    images: 'https://votre-site.com/image.jpg', // Remplacez par l'URL de votre image
  },
  // Ajout de balisage Schema.org
  alternates: {
    canonical: 'https://votre-site.com', // Remplacez par l'URL canonique de votre site
  },
  // Balisage JSON-LD pour Schema.org
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CarCheck',
    url: 'https://votre-site.com', // Remplacez par l'URL de votre site
    description: 'Application de suivi des véhicules',
    image: 'https://votre-site.com/image.jpg', // Remplacez par l'URL de votre image
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://votre-site.com/?s={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
};