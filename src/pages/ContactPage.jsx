import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: "Email",
      content: "support@fintechapp.com",
      link: "mailto:support@fintechapp.com",
      description: "Our average response time is 24 hours"
    },
    {
      icon: PhoneIcon,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: MapPinIcon,
      title: "Office",
      content: "123 Finance Street, Silicon Valley, CA 94025",
      link: "https://maps.google.com",
      description: "Come visit our headquarters"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      content: "Chat with us",
      link: "#",
      description: "Available 24/7 for support"
    }
  ];

  useEffect(() => {
    document.title = "Contact Us - FinTech App";
    
    // Load saved form data from localStorage
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage on input change
  useEffect(() => {
    localStorage.setItem('contactFormData', JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Replace with actual API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('contactFormData');
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear the form?')) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('contactFormData');
      setErrors({});
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate bg-gradient-to-b from-indigo-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Get in touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have questions about our platform? We're here to help. 
              Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <div 
              key={index} 
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 fade-in"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <info.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{info.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{info.description}</p>
                <a 
                  href={info.link}
                  className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {info.content}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Side */}
              <div className="p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">✅ Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">❌ Failed to send message. Please try again.</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none`}
                      placeholder="Please describe your question or concern..."
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <button
                      type="button"
                      onClick={handleClearForm}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Info Side */}
              <div className="bg-indigo-600 p-8 lg:p-12 text-white">
                <h3 className="text-2xl font-bold mb-6">Why choose us?</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">⚡ Fast Response</h4>
                    <p className="text-indigo-100 text-sm">Average response time under 24 hours</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🔒 Secure & Private</h4>
                    <p className="text-indigo-100 text-sm">Your data is encrypted and protected</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🌍 24/7 Support</h4>
                    <p className="text-indigo-100 text-sm">Global support team always ready</p>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-indigo-500">
                  <h4 className="font-semibold mb-4">Follow us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                      Twitter
                    </a>
                    <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                      LinkedIn
                    </a>
                    <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="bg-gray-100 rounded-2xl overflow-hidden h-96">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.637849905514!2d-122.085465!3d37.421999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e!2sGoogleplex!5e0!3m2!1sen!2sus!4v1644262071854!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in:nth-child(1) { animation-delay: 0.1s; }
        .fade-in:nth-child(2) { animation-delay: 0.2s; }
        .fade-in:nth-child(3) { animation-delay: 0.3s; }
        .fade-in:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}

export default ContactPage;