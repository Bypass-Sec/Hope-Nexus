import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Navbar from '../components/Navbar';
import AuthProvider from '../components/AuthProvider';
import '../styles/globals.css';
import '../styles/SignInStyles.css';

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <Navbar />
        <AuthProvider accessToken={session?.access_token}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
