'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { updateProfileSchema } from '@/validators';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

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
      updateProfileSchema.parse(formData);

      setIsUpdating(true);
      await updateProfile(formData);
      setIsUpdating(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl mb-4">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <p className="text-gray-600 text-sm">Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : 'unknown'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
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
              placeholder="Your name"
              className={`w-full px-4 py-2 rounded-lg border transition ${
                errors.name
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
              } focus:ring-1 outline-none text-sm`}
              disabled={isUpdating}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full px-4 py-2 rounded-lg border transition ${
                errors.email
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-300'
              } focus:ring-1 outline-none text-sm`}
              disabled={isUpdating}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isUpdating}
              className="flex-1"
            >
              {isUpdating ? (
                <>
                  <Loader size={16} className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h2>
        <p className="text-sm text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="destructive">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
