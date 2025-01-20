'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from '../styles/NavbarStyles.module.css';

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isAffix, setIsAffix] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/crisismap', label: 'Crisis Map' },
    { href: '/newspage', label: 'News' },
    { href: '/contact', label: 'Forums' },
  ];

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
            {navLinks.map(({ href, label }) => (
              <li key={href} className='font-semibold'>
                <Link 
                  href={href}
                  className={pathname === href ? styles.active : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
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