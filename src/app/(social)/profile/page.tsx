'use client';

import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { canChangeUsername } from '@/lib/utils';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user: authUser } = useAuth();
  const { profile, loading } = useUserProfile(authUser?.id);
  const { updateProfile, loading: updating, error: updateError, success } = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    username: '',
    bio: '',
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [usernameChangeInfo, setUsernameChangeInfo] = useState<{
    canChange: boolean;
    daysRemaining: number;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
      });
      setUsernameChangeInfo(canChangeUsername(profile.last_username_change));
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser?.id) return;

    // Check if username was changed
    const usernameChanged = formData.username !== profile?.username;

    if (usernameChanged && !usernameChangeInfo?.canChange) {
      alert(`You can only change your username once every 31 days. ${usernameChangeInfo?.message}`);
      return;
    }

    // If username is being changed, validate it
    if (usernameChanged) {
      if (!formData.username || formData.username.length < 3) {
        alert('Username must be at least 3 characters');
        return;
      }

      if (!/^[a-z0-9_]+$/.test(formData.username)) {
        alert('Username can only contain lowercase letters, numbers, and underscores');
        return;
      }

      // Check if new username is already taken
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', formData.username)
        .single();

      if (existingUser && existingUser.id !== authUser.id) {
        alert('Username is already taken');
        return;
      }
    }

    const updates: any = {
      display_name: formData.display_name,
      bio: formData.bio,
      updated_at: new Date().toISOString(),
    };

    // Only update username if it changed and is allowed
    if (usernameChanged) {
      updates.username = formData.username;
      updates.last_username_change = new Date().toISOString();
    }

    await updateProfile(authUser.id, updates);
    setIsEditing(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authUser?.id) return;

    setUploadingImage(true);
    try {
      // Upload image to Supabase storage
      const fileName = `${authUser.id}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from('profile-images').getPublicUrl(fileName);

      // Update user profile with image URL
      await updateProfile(authUser.id, {
        profile_image_url: data.publicUrl,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to upload image:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-8 mb-12 pb-8 border-b border-neutral">
          {/* Profile Image */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="relative mb-4">
              <img
                src={profile?.profile_image_url || 'https://via.placeholder.com/150'}
                alt={profile?.display_name}
                className="w-32 h-32 rounded-lg object-cover bg-neutral"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-black text-white rounded-full p-2 cursor-pointer hover:bg-neutral-dark transition-colors">
                  📷
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-dark transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Display Name</p>
              <h1 className="text-3xl font-bold">{profile?.display_name || 'No name set'}</h1>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Username</p>
              <p className="text-lg">@{profile?.username}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-lg">{profile?.email}</p>
            </div>
            {profile?.bio && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Bio</p>
                <p className="text-base text-gray-800">{profile.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-neutral rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            {updateError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {updateError}
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Display Name */}
              <div>
                <label htmlFor="display_name" className="block text-sm font-medium mb-1">
                  Display Name
                </label>
                <input
                  id="display_name"
                  name="display_name"
                  type="text"
                  value={formData.display_name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Your unique username"
                  disabled={!usernameChangeInfo?.canChange}
                  className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {usernameChangeInfo?.canChange
                    ? 'Lowercase letters, numbers, underscores only. Can change once every 31 days.'
                    : usernameChangeInfo?.message}
                </p>
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                  className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={updating || uploadingImage}
                  className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-neutral rounded-lg font-medium hover:bg-neutral transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Additional Sections */}
        <div className="space-y-8">
          {/* Wishlist Preview */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Wishlist</h2>
              <Link href="/wishlist" className="text-accent hover:text-black transition-colors text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="aspect-square bg-neutral rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No items yet</span>
              </div>
            </div>
          </section>

          {/* Collections Preview */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Collections</h2>
              <Link href="/collections" className="text-accent hover:text-black transition-colors text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-24 bg-neutral rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No collections yet</span>
              </div>
            </div>
          </section>

          {/* Account Settings */}
          <section className="pt-8 border-t border-neutral">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <div className="space-y-3">
              <Link
                href="#"
                className="block px-4 py-3 border border-neutral rounded-lg hover:bg-neutral transition-colors"
              >
                Change Password
              </Link>
              <Link
                href="#"
                className="block px-4 py-3 border border-neutral rounded-lg hover:bg-neutral transition-colors"
              >
                Email Preferences
              </Link>
              <Link
                href="#"
                className="block px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600"
              >
                Delete Account
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
