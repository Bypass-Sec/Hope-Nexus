import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Welcome to Our Discord-like Forum
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          Join the conversation and connect with others!
        </p>
        <code className="block text-lg font-mono text-gray-700 dark:text-gray-300 mb-4">
          Role: {user.role}
        </code>
        <Link href="/forums" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go to Forums
        </Link>
        <SignOut />
      </div>
    </div>
  );
}
