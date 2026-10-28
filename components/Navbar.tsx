'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { FadeIn } from '@/components/magicui/fade-in';
import LanguageSwitcher from '@/components/language-switcher';
import ThemeToggle from '@/components/theme-toggle';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/Logo';

import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  FileText,
  FolderKanban,
  Home,
  Star,
  User
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface NavItem {
  href: string;
  icon: LucideIcon;
  labelKey: 'home' | 'about' | 'projects' | 'resume' | 'blog';
  external?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', icon: Home, labelKey: 'home' },
  { href: '/about', icon: User, labelKey: 'about' },
  {
    href: 'https://projects.imartin.dev/projects',
    icon: FolderKanban,
    labelKey: 'projects'
  },
  { href: '/resume', icon: FileText, labelKey: 'resume' },
  {
    href: 'https://www.bioinfometrics.com',
    icon: BookOpen,
    labelKey: 'blog',
    external: true
  }
];

export default function Navbar() {
  const t = useTranslations('Nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navId = useId();

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
  }, []);

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
      aria-label='Main navigation'>
      <div className='navbar-container'>
        <Link
          href='/'
          className='navbar-brand'
          onClick={handleNavItemClick}>
          <Logo className='h-[45px] w-[45px] object-contain' aria-hidden='true' />
          <span className='navbar-brand-name luxury-text'>iMartinDav</span>
        </Link>
        <button
          type='button'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
          aria-label={t('toggleMenu')}
          aria-expanded={isMenuOpen}
          aria-controls={navId}>
          <span className='bar' />
          <span className='bar' />
          <span className='bar' />
        </button>
        <div
          id={navId}
          className={`navbar-nav ${isMenuOpen ? 'flex' : ''}`}>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              onClick={handleNavItemClick}
            />
          ))}
          <GithubButton
            onClick={handleNavItemClick}
            label={t('github')}
          />
        </div>
        <div className='navbar-extra'>
          <FadeIn direction='down'>
            <div className='flex items-center gap-1'>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
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
  labelKey,
  external = false,
  onClick
}: NavItemProps) {
  const t = useTranslations('Nav');
  const content = (
    <>
      <Icon
        size={18}
        className='luxury-icon'
      />
      {t(labelKey)}
    </>
  );

  // Off-site links skip locale handling; internal ones keep the active language
  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        className='nav-link luxury-text'
        target={external ? '_blank' : '_self'}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className='nav-link luxury-text'
      onClick={onClick}>
      {content}
    </Link>
  );
}

interface GithubButtonProps {
  onClick: () => void;
  label: string;
}

function GithubButton({ onClick, label }: GithubButtonProps) {
  return (
    <a
      href='https://github.com/iMartinDav'
      aria-label={label}
      className='github-button'
      target='_blank'
      rel='noopener noreferrer'
      onClick={onClick}>
      <FaGithub size={20} />
      <Star
        size={16}
        className='github-star'
      />
      <span className='github-star-text' />
    </a>
  );
}
