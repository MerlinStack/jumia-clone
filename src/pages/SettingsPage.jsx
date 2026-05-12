import React, { useState, useEffect } from 'react'
import { Bell, Moon, Globe, Shield, Smartphone, ChevronRight } from 'lucide-react'

function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: 'english',
    twoFactorAuth: false,
    currency: 'USD'
  })
  
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')
    
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings))
      setSaveMessage('Settings saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  const sections = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates about your account' },
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Get real-time alerts on your device' },
        { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive text messages for important updates' }
      ]
    },
    {
      title: 'Preferences',
      icon: Globe,
      settings: [
        { key: 'language', label: 'Language', type: 'select', options: ['english', 'spanish', 'french', 'german'] },
        { key: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'NGN'] }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        { key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account preferences and security</p>
        </div>
        
        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-4 rounded-lg p-4 ${saveMessage.includes('successfully') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            <p className="text-sm">{saveMessage}</p>
          </div>
        )}
        
        {/* Settings Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <section.icon className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {section.settings.map((setting) => (
                  <div key={setting.key} className="px-6 py-4">
                    {setting.type === 'select' ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            {setting.label}
                          </label>
                        </div>
                        <select
                          name={setting.key}
                          value={settings[setting.key]}
                          onChange={handleChange}
                          className="ml-4 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          {setting.options.map(option => (
                            <option key={option} value={option.toLowerCase()}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{setting.label}</p>
                          {setting.description && (
                            <p className="text-sm text-gray-500">{setting.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleToggle(setting.key)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                            settings[setting.key] ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              settings[setting.key] ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-red-100">
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      console.log('Delete account')
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage