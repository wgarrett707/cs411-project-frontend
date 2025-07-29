import React, { useState, useEffect } from 'react';
import { Star, AlertTriangle, TrendingUp, Award, Zap } from 'lucide-react';
import { fetchData, apiQueries } from '../services/api';

const Features = () => {
  const [topBrands, setTopBrands] = useState([]);
  const [highRatings, setHighRatings] = useState([]);
  const [scamListings, setScamListings] = useState([]);
  const [largeDiffListings, setLargeDiffListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('ratings');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [brandsData, ratingsData, scamData, diffData] = await Promise.all([
        fetchData(apiQueries.TOP_5_BRANDS),
        fetchData(apiQueries.HIGH_RATINGS),
        fetchData(apiQueries.SCAM_USED),
        fetchData(apiQueries.LARGE_DIFF)
      ]);
      
      setTopBrands(brandsData);
      setHighRatings(ratingsData);
      setScamListings(scamData);
      setLargeDiffListings(diffData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: '#f59e0b' }}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: '#f59e0b' }}>☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ color: '#d1d5db' }}>★</span>);
    }

    return stars;
  };

  const renderRatingsSection = () => (
    <div>
      <div className="section">
        <h2>Top Rated Brands</h2>
        <div className="grid grid-2">
          {topBrands.map((brand, index) => (
            <div key={index} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>{brand.BrandName}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    {renderStars(brand.Avg_Rating)}
                    <span style={{ marginLeft: '8px', color: '#64748b' }}>
                      {brand.Avg_Rating.toFixed(1)} / 5
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                    {brand.Num_Models}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Models</div>
                </div>
              </div>
              <div style={{ 
                background: '#eff6ff', 
                padding: '12px', 
                borderRadius: '8px',
                color: '#1e40af'
              }}>
                <strong>Average Rating:</strong> {brand.Avg_Rating.toFixed(1)}/5
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Highest Rated Phones</h2>
        <div className="grid grid-2">
          {highRatings.map((phone, index) => (
            <div key={index} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>{phone.ModelName}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    {renderStars(phone.Rating)}
                    <span style={{ marginLeft: '8px', color: '#64748b' }}>
                      {phone.Rating} / 5
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                    {phone.Num_Features}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Features</div>
                </div>
              </div>
              <div style={{ 
                background: '#f0fdf4', 
                padding: '12px', 
                borderRadius: '8px',
                color: '#059669'
              }}>
                <strong>Feature Count:</strong> {phone.Num_Features} features
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScamSection = () => (
    <div className="section">
      <h2>Scam Alert Listings</h2>
      <div style={{ 
        background: '#fef2f2', 
        border: '1px solid #fecaca', 
        padding: '16px', 
        borderRadius: '8px',
        marginBottom: '20px',
        color: '#dc2626'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <AlertTriangle style={{ marginRight: '8px', width: '20px', height: '20px' }} />
          <strong>Warning: Potential Scam Listings</strong>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          These listings are priced higher than the new phone price. Proceed with extreme caution.
        </p>
      </div>

      <div className="grid grid-2">
        {scamListings.map((listing, index) => (
          <div key={index} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>{listing.ModelName}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '8px' }}>
                  Listing ID: {listing.ListingID}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#dc2626' }}>
                  {formatPrice(listing.ListingPrice)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b', textDecoration: 'line-through' }}>
                  New: {formatPrice(listing.NewPrice)}
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#fef2f2', 
              border: '1px solid #fecaca', 
              padding: '12px', 
              borderRadius: '8px',
              color: '#dc2626'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <AlertTriangle style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                <strong>Overpriced by {formatPrice(listing.ListingPrice - listing.NewPrice)}</strong>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>
                This listing is priced higher than the new phone price. This is likely a scam.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeaturedSection = () => (
    <div className="section">
      <h2>Featured Phones</h2>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '24px', 
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Award style={{ marginRight: '12px', width: '24px', height: '24px' }} />
          <h3 style={{ margin: 0 }}>Editor's Choice</h3>
        </div>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Our top picks based on performance, value, and user satisfaction. These phones represent the best 
          combination of features and price in their respective categories.
        </p>
      </div>

      <div className="grid grid-3">
        {highRatings.slice(0, 6).map((phone, index) => (
          <div key={index} className="card" style={{ 
            border: index === 0 ? '2px solid #3b82f6' : '1px solid #e2e8f0',
            position: 'relative'
          }}>
            {index === 0 && (
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: '#3b82f6',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                TOP PICK
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>{phone.ModelName}</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                {renderStars(phone.Rating)}
                <span style={{ marginLeft: '8px', color: '#64748b' }}>
                  {phone.Rating} / 5
                </span>
              </div>
            </div>

            <div style={{ 
              background: '#f8fafc', 
              padding: '12px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
                {phone.Num_Features}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Premium Features</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHotDealsSection = () => (
    <div className="section">
      <h2>Hot Deals - Large Price Differences</h2>
      <div style={{ 
        background: '#fef3c7', 
        border: '1px solid #fde68a', 
        padding: '16px', 
        borderRadius: '8px',
        marginBottom: '20px',
        color: '#d97706'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Zap style={{ marginRight: '8px', width: '20px', height: '20px' }} />
          <strong>Hot Deals Alert</strong>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          These phones show significant price variations across listings, indicating potential great deals.
        </p>
      </div>

      <div className="grid grid-2">
        {largeDiffListings.map((deal, index) => (
          <div key={index} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>{deal.ModelName}</h3>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  {deal.Num_Listings} listings available
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                  {formatPrice(deal.Min_Used_Price)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  Starting Price
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#f0fdf4', 
              padding: '12px', 
              borderRadius: '8px',
              color: '#059669'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><strong>Average Price:</strong></span>
                <span>{formatPrice(deal.Avg_Used_Price)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><strong>Lowest Price:</strong></span>
                <span>{formatPrice(deal.Min_Used_Price)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>Price Range:</strong></span>
                <span>{formatPrice(deal.Price_Difference)}</span>
              </div>
            </div>

            <div style={{ 
              background: '#fef3c7', 
              border: '1px solid #fde68a', 
              padding: '8px 12px', 
              borderRadius: '6px',
              marginTop: '12px',
              color: '#d97706',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              <strong>Great opportunity for negotiation!</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Features & Market Analysis</h1>
          <p>Explore phone ratings, scam alerts, featured phones, and hot deals in the market</p>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button 
              className={`btn ${activeSection === 'ratings' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSection('ratings')}
            >
              <Star style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Ratings & Reviews
            </button>
            <button 
              className={`btn ${activeSection === 'scam' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSection('scam')}
            >
              <AlertTriangle style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Scam Alerts ({scamListings.length})
            </button>
            <button 
              className={`btn ${activeSection === 'featured' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSection('featured')}
            >
              <Award style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Featured Phones
            </button>
            <button 
              className={`btn ${activeSection === 'deals' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSection('deals')}
            >
              <TrendingUp style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Hot Deals ({largeDiffListings.length})
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={loadAllData}>
              <TrendingUp style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Refresh Data
            </button>
          </div>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <TrendingUp style={{ animation: 'spin 1s linear infinite', marginBottom: '10px' }} />
            Loading market data...
          </div>
        ) : (
          <div>
            {activeSection === 'ratings' && renderRatingsSection()}
            {activeSection === 'scam' && renderScamSection()}
            {activeSection === 'featured' && renderFeaturedSection()}
            {activeSection === 'deals' && renderHotDealsSection()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Features; 