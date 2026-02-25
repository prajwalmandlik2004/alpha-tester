'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

const NORMAL_PASSWORD = 'indx2026';
const BETA_PASSWORD = 'beta2026';
const LOCKER_KEY = 'site_unlocked';
export const USER_TYPE_KEY = 'user_type'; // 'normal' or 'beta'

export default function SiteLocker({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unlocked = sessionStorage.getItem(LOCKER_KEY);
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === NORMAL_PASSWORD) {
      sessionStorage.setItem(LOCKER_KEY, 'true');
      sessionStorage.setItem(USER_TYPE_KEY, 'normal');
      setIsUnlocked(true);
      setError('');
    } else if (password === BETA_PASSWORD) {
      sessionStorage.setItem(LOCKER_KEY, 'true');
      sessionStorage.setItem(USER_TYPE_KEY, 'beta');
      setIsUnlocked(true);
      setError('');
      // Redirect beta users to /beta page
      router.push('/beta');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (isLoading) {
    return null; 
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center">
          {/* Lock Icon */}

          {/* <div className="bg-[#00008B] p-4 mb-6">
            <Lock className="w-12 h-12 text-white" />
          </div> */}

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Site Access Required
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Please enter the password to access this site
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00008B] focus:border-transparent"
                autoFocus
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#00008B] text-white font-semibold py-3 px-6 hover:bg-[#000070] transition-all duration-300"
            >
              Unlock Site
            </button>
          </form>

          {/* Optional: Contact info */}
          <p className="text-gray-500 text-sm mt-6 text-center">
            Don't have access? Contact the administrator
          </p>
        </div>
      </div>
    </div>
  );
}