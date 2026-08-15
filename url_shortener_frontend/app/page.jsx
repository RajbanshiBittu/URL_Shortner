'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, Zap, Shield, BarChart3, Cog } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'About', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">/</span>
                </div>
                <span className="font-bold text-xl text-gray-900 hidden sm:inline">SlashURL</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button variant="default" size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login" className="hidden sm:block">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="default" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {!user && (
                <div className="px-4 py-2 flex gap-2">
                  <Link href="/auth/login" className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full">
                      Log in
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Short links.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
              Simple sharing.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create short, powerful links in seconds and manage them from one simple dashboard.
            Track clicks, set expiration dates, and share with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Log in
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Quick Demo */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 md:p-8 border border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Try it out</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="https://example.com/very-long-url"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                defaultValue="https://example.com/my-very-long-url"
              />
              <Button disabled className="sm:w-auto">
                Shorten
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              * Sign in to create and manage your short links
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-gray-600">
              A complete URL shortener built for modern teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Generate short links instantly with our optimized engine',
              },
              {
                icon: Shield,
                title: 'Secure',
                description: 'Industry-grade security to keep your links safe',
              },
              {
                icon: BarChart3,
                title: 'Trackable',
                description: 'Monitor clicks and performance in real-time',
              },
              {
                icon: Cog,
                title: 'Easy to Manage',
                description: 'Organize, edit, and control all your links from one place',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:border-indigo-200 transition"
              >
                <feature.icon className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              {
                step: '1',
                title: 'Paste your URL',
                description: 'Enter any long URL into our shortener',
              },
              {
                step: '2',
                title: 'Generate link',
                description: 'We create a short, memorable code',
              },
              {
                step: '3',
                title: 'Share anywhere',
                description: 'Copy and share your short link',
              },
              {
                step: '4',
                title: 'Track results',
                description: 'Monitor clicks and engagement',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of users managing their links with SlashURL
          </p>
          {user ? (
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/auth/register">
              <Button size="lg" variant="secondary">
                Create Free Account
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">/</span>
                </div>
                <span className="font-bold text-gray-900">SlashURL</span>
              </div>
              <p className="text-sm text-gray-600">Short links. Simple sharing.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600 text-center">
              © 2024 SlashURL. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
