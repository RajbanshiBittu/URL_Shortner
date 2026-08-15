'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { registerSchema } from '@/validators';
import { validatePassword } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const { handleRegister, isLoading } = useAuthActions();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Check password strength
    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form
      registerSchema.parse(formData);

      // Register
      const result = await handleRegister(formData.name, formData.email, formData.password);
      
      if (result.success) {
        toast.success('Account created successfully! Please log in.');
        router.push('/auth/login');
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

  const isPasswordValid = passwordErrors.length === 0 && formData.password.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">/</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">SlashURL</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-600 mt-2">Join us and start shortening URLs</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {errors.api && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{errors.api}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-2.5 rounded-lg border transition ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
                } focus:ring-1 outline-none`}
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

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

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-medium text-gray-700">Password requirements:</p>
                  <div className="space-y-1">
                    {[
                      { check: formData.password.length >= 8, text: 'At least 8 characters' },
                      { check: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
                      { check: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
                      { check: /[0-9]/.test(formData.password), text: 'One number' },
                      { check: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), text: 'One special character' },
                    ].map((requirement, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        {requirement.check ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <X size={14} className="text-gray-300" />
                        )}
                        <span className={requirement.check ? 'text-green-600' : 'text-gray-500'}>
                          {requirement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 rounded-lg border transition pr-10 ${
                    errors.confirmPassword
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
                  } focus:ring-1 outline-none`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer mt-6">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
                disabled={isLoading}
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-6" disabled={isLoading} size="lg">
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
