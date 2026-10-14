export const API_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') ? 'https://botaanik-defteri.onrender.com' : 'http://localhost:3001');

export const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:3001';
  }
  return 'https://botaanik-defteri.onrender.com';
};
