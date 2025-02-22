import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronDown, ChevronUp, Eye, EyeOff, Lock, HelpCircle, Camera } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import { Toast } from '../../components/Toast';

function AccountSettings() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  
  // Profile form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, ...updateData } = formData;
      await updateUser(updateData);
      setIsEditing(false);
      showSuccessToast(t('settings.profileUpdateSuccess'));
    } catch (error) {
      showErrorToast(t('settings.profileUpdateError'));
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    let hasError = false;
    const errors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (!passwordData.currentPassword) {
      errors.currentPassword = t('settings.currentPasswordRequired');
      hasError = true;
    }

    if (!passwordData.newPassword) {
      errors.newPassword = t('settings.newPasswordRequired');
      hasError = true;
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = t('settings.passwordTooShort');
      hasError = true;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(passwordData.newPassword)) {
      errors.newPassword = t('settings.passwordRequirements');
      hasError = true;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = t('settings.passwordsDoNotMatch');
      hasError = true;
    }

    if (hasError) {
      setPasswordErrors(errors);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordSection(false);
      showSuccessToast(t('settings.passwordUpdateSuccess'));
    } catch (error) {
      showErrorToast(t('settings.passwordUpdateError'));
    }
  };

  const handleAvatarUpdate = async (file: File) => {
    try {
      await updateUser({
        ...formData,
        avatarFile: file
      });
      setShowImageUploadModal(false);
      showSuccessToast(t('settings.avatarUpdateSuccess'));
    } catch (error) {
      showErrorToast(t('settings.avatarUpdateError'));
    }
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className={`text-xl font-semibold mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        {t('settings.account')}
      </h2>

      {/* Profile Picture Section */}
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <img
              src={user?.avatarUrl}
              alt={t('profile.avatar')}
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <button
              onClick={() => setShowImageUploadModal(true)}
              className="absolute bottom-2 right-2 p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg group"
              aria-label={t('profile.updateAvatar')}
            >
              <Camera className="w-5 h-5" />
              <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-sm bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {t('profile.updateAvatar')}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">{t('profile.updateAvatar')}</h3>
            <ImageUpload
              onImageSelect={handleAvatarUpdate}
              onImageRemove={() => setShowImageUploadModal(false)}
              currentImage={user?.avatarUrl}
              isCircular
              maxSizeMB={2}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowImageUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}
          >
            {t('profile.firstName')}
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}
            disabled={!isEditing}
            dir={dir}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}
          >
            {t('profile.lastName')}
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}
            disabled={!isEditing}
            dir={dir}
          />
        </div>

        <div>
          <div className={`flex items-center justify-between mb-2`}>
            <label
              htmlFor="email"
              className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              }`}
            >
              {t('auth.email')}
            </label>
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setShowEmailTooltip(true)}
                onMouseLeave={() => setShowEmailTooltip(false)}
                onClick={() => setShowEmailTooltip(!showEmailTooltip)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t('settings.emailHelp')}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              {showEmailTooltip && (
                <div className={`absolute z-10 ${dir === 'rtl' ? 'right-0' : 'left-0'} top-full mt-2 p-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg w-64`}>
                  {t('settings.emailChangeInfo')}
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={formData.email}
              className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 cursor-not-allowed ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              }`}
              readOnly
              dir="ltr"
            />
            <p className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              {t('settings.emailReadOnly')}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="bio"
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}
          >
            {t('profile.bio')}
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
              dir === 'rtl' ? 'text-right' : 'text-left'
            }`}
            rows={4}
            disabled={!isEditing}
            dir={dir}
          />
        </div>

        <div className={`flex ${dir === 'rtl' ? 'justify-start' : 'justify-end'} space-x-4`}>
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t('common.save')}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t('profile.editProfile')}
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <button
          onClick={() => setShowPasswordSection(!showPasswordSection)}
          className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            showPasswordSection ? 'mb-4' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{t('settings.changePassword')}</span>
          </div>
          {showPasswordSection ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {showPasswordSection && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <label
                htmlFor="currentPassword"
                className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  dir === 'rtl' ? 'text-right' : 'text-left'
                }`}
              >
                {t('settings.currentPassword')}
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
                    passwordErrors.currentPassword ? 'border-red-500' : ''
                  }`}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">{passwordErrors.currentPassword}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  dir === 'rtl' ? 'text-right' : 'text-left'
                }`}
              >
                {t('settings.newPassword')}
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
                    passwordErrors.newPassword ? 'border-red-500' : ''
                  }`}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="mt-1 text-sm text-red-500">{passwordErrors.newPassword}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  dir === 'rtl' ? 'text-right' : 'text-left'
                }`}
              >
                {t('settings.confirmNewPassword')}
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
                    passwordErrors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{passwordErrors.confirmPassword}</p>
              )}
            </div>

            <div className={`flex ${dir === 'rtl' ? 'justify-start' : 'justify-end'} space-x-4`}>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordSection(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setPasswordErrors({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t('settings.updatePassword')}
              </button>
            </div>
          </form>
        )}
      </div>

      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default AccountSettings;