import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Navbar from 'src/components/Navbar';
import AuthProvider from 'src/components/AuthProvider';
import 'src/styles/globals.css';
import 'src/styles/SignInStyles.css';

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
