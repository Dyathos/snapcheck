# CarCheck - Application de Gestion des Inspections de Véhicules

CarCheck est une Progressive Web Application (PWA) conçue pour gérer efficacement les inspections de véhicules. Elle permet de suivre l'état de santé des véhicules, d'effectuer des inspections détaillées et de gérer les problèmes détectés.

## Fonctionnalités

- Gestion des véhicules (ajout, modification, suppression)
- Inspections détaillées avec prise de photos
- Suivi des problèmes et de leur gravité
- Vue d'inventaire avec filtres avancés
- Fonctionnement hors ligne
- Interface responsive (mobile-first)

## Technologies utilisées

- Next.js 14 avec TypeScript
- Tailwind CSS pour le design
- Supabase pour la base de données et le stockage
- PWA pour le fonctionnement hors ligne

## Installation

1. Cloner le projet :
\`\`\`bash
git clone https://github.com/votre-username/carcheck.git
cd carcheck
\`\`\`

2. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Configurer les variables d'environnement :
Créer un fichier \`.env.local\` à la racine du projet avec :
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
\`\`\`

4. Lancer le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

## Structure de la base de données

### Table Vehicles
- id: string (primary key)
- name: string
- brand: string
- health_status: enum ('excellent', 'good', 'fair', 'poor', 'critical')
- created_at: timestamp
- last_inspection: timestamp

### Table Parts
- id: string (primary key)
- vehicle_id: string (foreign key)
- name: string
- status: string
- severity: enum ('low', 'medium', 'high', 'critical')
- description: string
- photo_url: string
- created_at: timestamp
- updated_at: timestamp

### Table Inspections
- id: string (primary key)
- vehicle_id: string (foreign key)
- date: timestamp
- inspector: string
- status: string
- notes: string
- created_at: timestamp

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT
