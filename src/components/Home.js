import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calculator, DollarSign, Star, Camera, Battery, Cpu } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Phone Finder',
      description: 'Find exact phone models based on your specific technical requirements and preferences.',
      path: '/phone-finder',
      color: '#3b82f6'
    },
    {
      icon: Calculator,
      title: 'Price Calculator',
      description: 'Calculate estimated prices for custom phone configurations with your desired specifications.',
      path: '/price-calculator',
      color: '#10b981'
    },
    {
      icon: DollarSign,
      title: 'Used Phones',
      description: 'Browse refurbished and used phone listings with price comparisons and market trends.',
      path: '/used-phones',
      color: '#f59e0b'
    },
    {
      icon: Star,
      title: 'Features & Ratings',
      description: 'Explore phone features, ratings, scam alerts, and hot deals in the market.',
      path: '/features',
      color: '#8b5cf6'
    }
  ];

  const useCases = [
    {
      icon: Camera,
      title: 'Professional Photography',
      description: 'Perfect for photographers needing specific sensor sizes and battery capacities for low-light photography.',
      specs: ['Large sensor size', 'High battery capacity', 'Professional camera features']
    },
    {
      icon: Battery,
      title: 'Power Users',
      description: 'Ideal for users who need long battery life and high-performance specifications.',
      specs: ['Extended battery life', 'High-performance processors', 'Large storage capacity']
    },
    {
      icon: Cpu,
      title: 'Developers & Tech Enthusiasts',
      description: 'Great for developers and tech enthusiasts who need specific hardware configurations.',
      specs: ['Custom processor requirements', 'Development-friendly features', 'High RAM capacity']
    }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>PhoneSpecs</h1>
          <p>
            Your comprehensive platform for mobile phone specifications, pricing, and market analysis. 
            Find the perfect phone for your needs, calculate custom configurations, and discover the best deals.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="section">
          <h2>Our Features</h2>
          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon" style={{ background: feature.color }}>
                    <Icon />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <Link to={feature.path} className="btn btn-primary" style={{ marginTop: '20px' }}>
                    Explore {feature.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section">
          <h2>Perfect For</h2>
          <div className="feature-grid">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon" style={{ background: '#64748b' }}>
                    <Icon />
                  </div>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                  <div style={{ marginTop: '16px' }}>
                    {useCase.specs.map((spec, specIndex) => (
                      <div key={specIndex} style={{ 
                        background: '#f1f5f9', 
                        padding: '8px 12px', 
                        borderRadius: '6px', 
                        marginBottom: '8px',
                        fontSize: '0.9rem',
                        color: '#475569'
                      }}>
                        • {spec}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="card">
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Why Choose PhoneSpecs?</h2>
            <div className="grid grid-3">
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#3b82f6', marginBottom: '12px' }}>Comprehensive Database</h3>
                <p>Access detailed specifications for thousands of mobile phone models from all major brands.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#10b981', marginBottom: '12px' }}>Smart Pricing</h3>
                <p>Get accurate price estimates for custom configurations and find the best deals on used phones.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '12px' }}>Eco-Friendly</h3>
                <p>Promote sustainability by finding quality refurbished phones and reducing electronic waste.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 