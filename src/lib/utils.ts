import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getHealthStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'critical':
      return 'bg-red-100 text-red-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'good':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case 'low':
      return 'bg-blue-100 text-blue-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'high':
      return 'bg-orange-100 text-orange-800'
    case 'critical':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

export const getErrorMessage = (
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
): string | undefined => {
  if (!error) return undefined;
  const errorMessage = error;
  if (typeof errorMessage === 'string') {
    return errorMessage;
  } else if (errorMessage && 'message' in errorMessage && typeof errorMessage.message === 'string') {
    return errorMessage.message;
  } else {
    return undefined;
  }
};
