import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react'

function ProfilePage() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    
    const loadUserData = async () => {
      try {
        const userData = localStorage.getItem('user')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setFormData(parsedUser)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [navigate])

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData(user)
    }
    setIsEditing(!isEditing)
    setSuccessMessage('')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      localStorage.setItem('user', JSON.stringify(formData))
      setUser(formData)
      setIsEditing(false)
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No user data found</p>
          <button onClick={() => navigate('/login')} className="mt-4 text-indigo-600">
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 rounded-lg bg-green-50 p-4 border border-green-200">
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-3">
                  <User className="h-12 w-12 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Profile</h1>
                  <p className="text-indigo-200">Manage your personal information</p>
                </div>
              </div>
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Profile Information */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{user.firstName || 'Not set'}</p>
                )}
              </div>
              
              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{user.lastName || 'Not set'}</p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address
                </label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                ) : (
                  <p className="text-gray-900">{user.phone || 'Not set'}</p>
                )}
              </div>
              
              {/* KYC Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  KYC Status
                </label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.kycStatus === 'VERIFIED' 
                    ? 'bg-green-100 text-green-800'
                    : user.kycStatus === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.kycStatus || 'Not Submitted'}
                </span>
              </div>
              
              {/* Member Since */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Member Since
                </label>
                <p className="text-gray-900">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage