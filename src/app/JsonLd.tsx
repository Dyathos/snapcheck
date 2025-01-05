// src/app/JsonLd.tsx
"use client"; // Assurez-vous que ce composant est un composant client

const JsonLd = ({ jsonLd }) => {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
};

export default JsonLd;