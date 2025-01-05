"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Lock, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            if (result?.error) {
                setError('Identifiants invalides');
                return;
            }

            // Redirection après connexion réussie
            router.push('/');
        } catch (error) {
            setError('Une erreur est survenue lors de la connexion');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-xl overflow-hidden">
                <div className="bg-primary-700 dark:bg-gray-900 text-white p-6 text-center">
                    <Lock className="mx-auto mb-4" size={48} />
                    <h1 className="text-2xl md:text-3xl font-bold">Connexion</h1>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative" role="alert">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    <button 
                        type="submit" 
                        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-primary-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                        <Lock size={20} />
                        <span>Se connecter</span>
                    </button>
                </form>
                <div className="bg-gray-50 p-4 text-center border-t">
                    <p className="text-sm text-gray-600 mb-2">Vous n'avez pas de compte ?</p>
                    <button 
                        onClick={() => router.push('/signup')}
                        className="w-full bg-white border border-gray-900 text-gray-900 py-2 rounded-md hover:bg-primary-50 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                        <UserPlus size={20} />
                        <span>S'inscrire</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;