import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SignOut from '../components/SignOut';
import Footer from '../components/Footer';

import HeroSection from "../components/LandingPage/HeroSection"
import ProblemSolutionSection from "../components/LandingPage/ProblemSolutionSection"
import FeaturesSection from "../components/LandingPage/FeaturesSection"
import NewsSection from "../components/LandingPage/NewsSection"
import ForumsSection from "../components/LandingPage/ForumsSection"
import TestimonialSection from "../components/LandingPage/TestimonialSection"
import CtaSection from "../components/LandingPage/CtaSection"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
      <main className="min-h-screen">
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <NewsSection />
      <ForumsSection />
      <TestimonialSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
