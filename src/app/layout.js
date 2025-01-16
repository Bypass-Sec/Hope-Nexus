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
      <body className=" bg-[url('https://cdn.discordapp.com/attachments/807935266588327956/1329349133068275753/image.png?ex=678a045b&is=6788b2db&hm=4ba5598c2d6008f1ef5aec877e98195251cbbbdfc33cd7a9d16a56cddc6aa4d4&')] bg-cover bg-center bg-no-repeat">
        {/*overlay div*/}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 to-slate-950/50 z-0"></div>
        <Navbar />
        <div className="flex min-h-screen flex-col">
          <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-20 pt-24">
            <div className="w-full max-w-md">
              <AuthProvider accessToken={session?.access_token}>{children}</AuthProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
