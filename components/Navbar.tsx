'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FadeIn } from '@/components/magicui/fade-in';
import ThemeToggle from '@/components/theme-toggle';

import {
  BookOpen,
  FileText,
  FolderKanban,
  Github,
  Home,
  LucideIcon,
  Star,
  User
} from 'lucide-react';

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/about', icon: User, label: 'About' },
  {
    href: 'https://projects.imartin.dev/projects',
    icon: FolderKanban,
    label: 'Projects'
  },
  { href: '/resume', icon: FileText, label: 'Resume' },
  {
    href: 'https://www.bioinfometrics.com',
    icon: BookOpen,
    label: 'Blog',
    external: true
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [router]);

  // Handle clicks outside navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMenuOpen]);

  const handleNavItemClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      role='navigation'
      aria-label='Main navigation'>
      <div className='navbar-container'>
        <Link
          href='/'
          className='navbar-brand'
          onClick={handleNavItemClick}>
          <Image
            className='dark'
            src='/logo.png'
            alt='logo'
            width={60}
            height={60}
            priority // Keep this if this logo is critical for initial loading
          />
          <span className='navbar-brand-name luxury-text'>iMartinDav</span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
          aria-label='Toggle navigation menu'
          aria-expanded={isMenuOpen}
          aria-controls='navbar-nav'>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </button>
        <div
          id='navbar-nav'
          className={`navbar-nav ${isMenuOpen ? 'flex' : ''}`}
          aria-hidden={!isMenuOpen}>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              onClick={handleNavItemClick}
            />
          ))}
          <GithubButton onClick={handleNavItemClick} />
        </div>
        <div className='navbar-extra'>
          <FadeIn direction='down'>
            <ThemeToggle />
          </FadeIn>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps extends NavItem {
  onClick: () => void;
}

function NavItem({
  href,
  icon: Icon,
  label,
  external = false,
  onClick
}: NavItemProps) {
  return (
    <Link
      href={href}
      className='nav-link luxury-text'
      target={external ? '_blank' : '_self'}
      rel={external ? 'noopener noreferrer' : ''}
      onClick={onClick}>
      <Icon
        size={18}
        className='luxury-icon'
      />
      {label}
    </Link>
  );
}

interface GithubButtonProps {
  onClick: () => void;
}

function GithubButton({ onClick }: GithubButtonProps) {
  return (
    <a
      href='https://github.com/iMartinDav'
      className='github-button'
      target='_blank'
      rel='noopener noreferrer'
      onClick={onClick}>
      <Github size={20} />
      <Star
        size={16}
        className='github-star'
      />
      <span className='github-star-text'></span>
    </a>
  );
}
