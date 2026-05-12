import React, { useEffect, useState } from 'react';
import { UsersIcon, CurrencyDollarIcon, ShieldCheckIcon, GlobeAltIcon, StarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

function AboutPage() {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "CEO & Founder",
      bio: "Former fintech executive with 15+ years of experience",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "CTO",
      bio: "Tech lead specializing in secure payment systems",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Head of Product",
      bio: "Product strategist with a passion for user experience",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      social: { twitter: "#", linkedin: "#", github: "#" }
    }
  ]);

  const [stats, setStats] = useState([
    { id: 1, label: "Active Users", value: "50K+", icon: UsersIcon },
    { id: 2, label: "Transactions Processed", value: "$10M+", icon: CurrencyDollarIcon },
    { id: 3, label: "Security Rating", value: "99.9%", icon: ShieldCheckIcon },
    { id: 4, label: "Countries Served", value: "15+", icon: GlobeAltIcon }
  ]);

  const [values, setValues] = useState([
    {
      title: "Security First",
      description: "Bank-grade security with end-to-end encryption",
      icon: ShieldCheckIcon
    },
    {
      title: "Innovation",
      description: "Constantly evolving to bring you the best fintech solutions",
      icon: RocketLaunchIcon
    },
    {
      title: "Customer Focus",
      description: "Your satisfaction is our top priority",
      icon: StarIcon
    }
  ]);

  useEffect(() => {
    // Track page view
    document.title = "About Us - FinTech App";
    
    // You can add analytics here
    console.log("About page viewed");
    
    // Animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Building the Future of
              <span className="text-indigo-600"> Digital Finance</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're on a mission to make financial services accessible, secure, and 
              delightful for everyone around the world.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Get Started
              </button>
              <button className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4 fade-in">
                <dt className="text-base leading-7 text-gray-600 flex flex-col items-center">
                  <stat.icon className="h-8 w-8 text-indigo-600 mb-2" />
                  {stat.label}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Mission</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Democratizing financial services
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe that everyone deserves access to modern financial tools. Our platform 
            removes barriers and provides seamless, secure, and innovative solutions for all.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {values.map((value) => (
              <div key={value.title} className="relative pl-16 fade-in">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {value.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our leadership
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're a diverse team of fintech experts, engineers, and designers
              working together to revolutionize digital payments.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center fade-in">
                <img
                  alt={member.name}
                  src={member.image}
                  className="mx-auto h-40 w-40 rounded-full object-cover ring-4 ring-indigo-600/20"
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">{member.name}</h3>
                <p className="text-base leading-7 text-indigo-600">{member.role}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{member.bio}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href={member.social.twitter} className="text-gray-400 hover:text-indigo-600">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-indigo-600">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-6 text-lg leading-8 text-indigo-100">
                Join thousands of users who trust us with their financial transactions.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">
                  Create an account
                </button>
                <button className="text-sm font-semibold leading-6 text-white">
                  Contact sales <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default AboutPage;