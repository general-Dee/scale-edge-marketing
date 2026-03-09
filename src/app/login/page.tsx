'use client';

import { createClient } from '@/lib/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if we already have a session (e.g., from magic link)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log('Already have session, redirecting to /admin');
        router.push('/admin');
      }
    });

    // Listen for auth changes (when user signs in)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log('Auth state changed, redirecting to /admin');
        router.push('/admin');
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, [router, supabase]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Admin Login</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
          redirectTo={`${window.location.origin}/admin`}
          onlyThirdPartyProviders={false}
        />
      </div>
    </div>
  );
}