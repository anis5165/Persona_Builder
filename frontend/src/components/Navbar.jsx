'use client';
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)


  return (
    <div>
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  P
                </span>
              </div>
              <span className="font-bold text-xl text-foreground">
                PersonaForge
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#how-it-works"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#features"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#templates"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Templates
              </Link>
              <Link
                href="#faq"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline">Sign In</Button>
              <Button className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden pb-4 space-y-3">
              <Link
                href="#how-it-works"
                className="block text-foreground/70 hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#features"
                className="block text-foreground/70 hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#templates"
                className="block text-foreground/70 hover:text-foreground transition-colors"
              >
                Templates
              </Link>
              <Link
                href="#faq"
                className="block text-foreground/70 hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Sign In
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  )
}

export default Navbar