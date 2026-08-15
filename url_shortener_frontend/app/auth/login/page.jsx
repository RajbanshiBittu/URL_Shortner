'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthActions } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { loginSchema } from '@/validators';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';
  
  const { handleLogin, isLoading } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form
      loginSchema.parse(formData);

      // Login
      const result = await handleLogin(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Logged in successfully!');
        router.push(returnUrl);
      } else {
        setErrors({ api: result.error });
      }
    } catch (error) {
      if (error.errors) {
        // Zod validation errors
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">/</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">SlashURL</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {errors.api && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{errors.api}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-lg border transition ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
                } focus:ring-1 outline-none`}
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 rounded-lg border transition pr-10 ${
                    errors.password
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
                  } focus:ring-1 outline-none`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-6" disabled={isLoading} size="lg">
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
