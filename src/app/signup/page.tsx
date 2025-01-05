"use client";
import React, { useState } from 'react';
import { UserPlus, LogIn, Users, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Importez useRouter pour la redirection
import { z } from 'zod';

const signupSchema = z.object({
    firstName: z.string().min(1, 'Prénom requis'),
    lastName: z.string().min(1, 'Nom requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères'),
    role: z.enum(['Inspecteur', 'Maintenance', 'Safety']),
});

const SignupPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter(); // Utilisez useRouter pour la redirection

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // Réinitialiser l'erreur

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            signupSchema.parse(data); // Validation des données

            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json(); // Récupérer la réponse JSON

            if (!response.ok) {
                // Si la réponse n'est pas OK, afficher le message d'erreur
                throw new Error(responseData.error || 'Erreur lors de la création du compte.');
            }

            // Redirection vers la page d'accueil après une inscription réussie
            router.push('/'); // Remplacez '/' par le chemin de votre page d'accueil
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError(error.errors[0].message); // Afficher le message de validation
            } else {
                setError(error instanceof Error ? error.message : 'Une erreur est survenue');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-xl overflow-hidden">
                <div className="bg-gray-900 text-white p-6 text-center">
                    <UserPlus className="mx-auto mb-4" size={48} />
                    <h1 className="text-2xl md:text-3xl font-bold">Créer un compte</h1>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative" role="alert">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input 
                            id="firstName"
                            type="text" 
                            name="firstName" 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" 
                            placeholder="Votre prénom" 
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input 
                            id="lastName"
                            type="text" 
                            name="lastName" 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" 
                            placeholder="Votre nom" 
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            name="email" 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" 
                            placeholder="votre@email.com" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                        <div className="relative">
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password" 
                                required 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 pr-10" 
                                placeholder="••••••••" 
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-primary-600 focus:outline-none"
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Équipe</label>
                        <div className="relative">
                            <select 
                                id="role"
                                name="role" 
                                required 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 appearance-none"
                            >
                                <option value="" disabled>Choisir une équipe</option>
                                <option value="Inspecteur">Inspecteur</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Safety">Safety</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <Users size={20} />
                            </div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-primary-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                        <UserPlus size={20} />
                        <span>Créer un compte</span>
                    </button>
                </form>
                <div className="bg-gray-50 p-4 text-center border-t">
                    <p className="text-sm text-gray-600 mb-2">Vous avez déjà un compte ?</p>
                    <button 
                        onClick={() => window.location.href = '/login'}
                        className="w-full bg-white border border-gray-900 text-gray-900 py-2 rounded-md hover:bg-primary-50 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                        <LogIn size={20} />
                        <span>Se connecter</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;