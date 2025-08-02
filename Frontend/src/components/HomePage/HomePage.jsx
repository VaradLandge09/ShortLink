import React, { useState } from 'react';
import { Link, Copy, BarChart3, Shield, Zap, Globe, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShortenUrl = async () => {
    if (!url) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const alias = customAlias || Math.random().toString(36).substring(2, 8);
      setShortenedUrl(`https://short.ly/${alias}`);
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setUrl('');
    setCustomAlias('');
    setShortenedUrl('');
  };

  const stats = [
    { number: '10M+', label: 'URLs Shortened', icon: Link },
    { number: '500K+', label: 'Active Users', icon: Globe },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '50ms', label: 'Avg Response', icon: Zap }
  ];

  const features = [
    {
      icon: Link,
      title: 'Custom Short Links',
      description: 'Create branded short links with custom aliases that reflect your brand identity.'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Track clicks, locations, devices, and referrers with comprehensive analytics dashboard.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Advanced security features including SSL encryption and malware protection.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized infrastructure ensures your short links redirect in milliseconds.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Link className="h-16 w-16 text-blue-600" />
              <span className="ml-4 text-4xl font-bold text-gray-900">ShortLink</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Shorten URLs with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 ml-3">
                Style
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform long, complex URLs into short, memorable links that are easy to share, 
              track, and manage. Perfect for social media, marketing campaigns, and more.
            </p>

            {/* URL Shortener Form */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="space-y-6">
                  {/* URL Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Enter your long URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/very-long-url-that-needs-shortening"
                        className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Custom Alias */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Custom alias (optional)
                    </label>
                    <div className="flex items-center">
                      <span className="px-4 py-4 bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-xl text-lg">
                        short.ly/
                      </span>
                      <input
                        type="text"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        placeholder="my-custom-link"
                        className="flex-1 px-4 py-4 text-lg border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Shorten Button */}
                  <button
                    onClick={handleShortenUrl}
                    disabled={!url || isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Shortening...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Shorten URL
                      </>
                    )}
                  </button>

                  {/* Result */}
                  {shortenedUrl && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-green-800 mb-1">Success! Your URL has been shortened:</p>
                            <a 
                              href={shortenedUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-lg font-mono text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              {shortenedUrl}
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={copyToClipboard}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                          <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            New URL
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShortURL?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just a URL shortener. Get powerful features that help you manage, 
              track, and optimize your links for maximum impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of users who trust ShortURL for their link management needs.
            Create your account today and start shortening URLs in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors text-lg">
              Get Started Free
            </button>
            <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-colors text-lg">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;