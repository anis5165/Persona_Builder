'use client';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bg-muted/50 border-t border-border py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold">P</span>
                                </div>
                                <span className="font-bold text-lg text-foreground">
                                    PersonaForge
                                </span>
                            </div>
                            <p className="text-foreground/60 text-sm">
                                Transform your resume into a stunning portfolio.
                            </p>
                        </div>

                        {/* Product */}
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        Templates
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-foreground/60 hover:text-foreground transition-colors"
                                    >
                                        Terms
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                            <div className="flex gap-4">
                                <Link
                                    href="#"
                                    className="text-foreground/60 hover:text-primary transition-colors"
                                >
                                    <Twitter className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-foreground/60 hover:text-primary transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-foreground/60 hover:text-primary transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-foreground/60 hover:text-primary transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-foreground/60">
                            © 2025 PersonaForge. All rights reserved.
                        </p>
                        <p className="text-sm text-foreground/60 mt-4 md:mt-0">
                            Made with ❤️ for professionals
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer