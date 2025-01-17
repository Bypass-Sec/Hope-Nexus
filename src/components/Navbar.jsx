'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/NavbarStyles.module.css';

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isAffix, setIsAffix] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      setIsHidden(scrollTop > lastScrollTop && scrollTop > 50);
      
      setIsAffix(scrollTop > 50);
      
      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isHidden ? styles['nav--hidden'] : ''} ${isAffix ? styles.affix : ''} z-[10]`}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/Logo_text.png"
              alt="Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>
        
        <div className={styles.main_list}>
          <ul className={styles.navlinks}>
            <li className='font-semibold'><Link href="/about">Home</Link></li>
            <li className='font-semibold'><Link href="/crisismap">Crisis Map</Link></li>
            <li className='font-semibold'><Link href="/newspage">News</Link></li>
            <li className='font-semibold'><Link href="/contact">Forums</Link></li>
          </ul>
        </div>

        <Link href="/auth/sign-up" className={styles.registerBtn}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;