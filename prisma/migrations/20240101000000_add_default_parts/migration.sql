-- CreateTable
CREATE TABLE "default_parts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "default_parts_name_key" UNIQUE ("name")
);

-- Insert default parts
INSERT INTO "default_parts" ("id", "name", "icon", "category", "description", "isActive", "isDefault") VALUES
-- Moteur
('dp1', 'Huile moteur', '🛢️', 'Moteur', 'Niveau et qualité de l''huile moteur', true, true),
('dp2', 'Filtre à huile', '🔧', 'Moteur', 'État du filtre à huile', true, true),
('dp3', 'Courroie de distribution', '⚙️', 'Moteur', 'État et tension de la courroie', true, true),
('dp4', 'Radiateur', '🌡️', 'Moteur', 'État et niveau du liquide de refroidissement', true, true),

-- Freins
('dp5', 'Plaquettes avant', '🛑', 'Freins', 'État des plaquettes de frein avant', true, true),
('dp6', 'Plaquettes arrière', '🛑', 'Freins', 'État des plaquettes de frein arrière', true, true),
('dp7', 'Disques avant', '⭕', 'Freins', 'État des disques de frein avant', true, true),
('dp8', 'Disques arrière', '⭕', 'Freins', 'État des disques de frein arrière', true, true),

-- Pneumatiques
('dp9', 'Pneus avant', '🛞', 'Pneumatiques', 'État et pression des pneus avant', true, true),
('dp10', 'Pneus arrière', '🛞', 'Pneumatiques', 'État et pression des pneus arrière', true, true),

-- Éclairage
('dp11', 'Phares avant', '💡', 'Éclairage', 'Fonctionnement des feux avant', true, true),
('dp12', 'Feux arrière', '🚨', 'Éclairage', 'Fonctionnement des feux arrière', true, true),
('dp13', 'Clignotants', '↔️', 'Éclairage', 'Fonctionnement des clignotants', true, true),

-- Suspension
('dp14', 'Amortisseurs avant', '🔩', 'Suspension', 'État des amortisseurs avant', true, true),
('dp15', 'Amortisseurs arrière', '🔩', 'Suspension', 'État des amortisseurs arrière', true, true),
('dp16', 'Rotules de direction', '🔧', 'Suspension', 'État des rotules', true, true),

-- Autres
('dp17', 'Batterie', '🔋', 'Électricité', 'État et charge de la batterie', true, true),
('dp18', 'Balais d''essuie-glace', '🌧️', 'Visibilité', 'État des balais d''essuie-glace', true, true),
('dp19', 'Filtre à air', '💨', 'Moteur', 'État du filtre à air', true, true),
('dp20', 'Liquide de frein', '💧', 'Freins', 'Niveau et qualité du liquide de frein', true, true);
