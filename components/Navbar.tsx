'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  User,
  FolderKanban,
  FileText,
  BookOpen,
  Github,
  Star,
  LucideIcon
} from 'lucide-react';
import { FadeIn } from '@/components/magicui/fade-in';
import ThemeToggle from '@/components/theme-toggle';

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link
          href="/"
          className="navbar-brand"
        >
          <Image
            className="dark"
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
            priority
          />
          <span className="navbar-brand-name luxury-text">iMartinDav</span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={`navbar-nav ${isMenuOpen ? 'flex' : ''}`}>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
            />
          ))}
          <GithubButton />
        </div>
        <div className="navbar-extra">
          <FadeIn direction="down">
            <ThemeToggle />
          </FadeIn>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, icon: Icon, label, external = false }: NavItem) {
  return (
    <Link
      href={href}
      className="nav-link luxury-text"
      target={external ? '_blank' : '_self'}
      rel={external ? 'noopener noreferrer' : ''}
    >
      <Icon
        size={18}
        className="luxury-icon"
      />
      {label}
    </Link>
  );
}

function GithubButton() {
  return (
    <a
      href="https://github.com/iMartinDav"
      className="github-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Github size={20} />
      <Star
        size={16}
        className="github-star"
      />
      <span className="github-star-text"></span>
    </a>
  );
}
