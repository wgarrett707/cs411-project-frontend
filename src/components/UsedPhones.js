import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingDown, AlertTriangle, RefreshCw } from 'lucide-react';
import { fetchData, apiQueries } from '../services/api';

const UsedPhones = () => {
  const [usedPhones, setUsedPhones] = useState([]);
  const [scamListings, setScamListings] = useState([]);
  const [largeDiffListings, setLargeDiffListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usedData, scamData, diffData] = await Promise.all([
        fetchData(apiQueries.USED),
        fetchData(apiQueries.SCAM_USED),
        fetchData(apiQueries.LARGE_DIFF)
      ]);
      
      setUsedPhones(usedData);
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

  const calculateSavings = (usedPrice, newPrice) => {
    const savings = newPrice - usedPrice;
    const savingsPercent = (savings / newPrice) * 100;
    return { savings, savingsPercent };
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'scam':
        return scamListings;
      case 'deals':
        return largeDiffListings;
      default:
        return usedPhones;
    }
  };

  const renderUsedPhoneCard = (phone, index) => {
    const savings = phone.NewPrice ? calculateSavings(phone.ListingPrice, phone.NewPrice) : null;
    
    return (
      <div key={index} className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>{phone.ModelName}</h3>
            {phone.ListingID && (
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '8px' }}>
                Listing ID: {phone.ListingID}
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
              {formatPrice(phone.ListingPrice)}
            </div>
            {phone.NewPrice && (
              <div style={{ fontSize: '0.9rem', color: '#64748b', textDecoration: 'line-through' }}>
                New: {formatPrice(phone.NewPrice)}
              </div>
            )}
          </div>
        </div>

        {savings && (
          <div style={{ 
            background: savings.savingsPercent > 20 ? '#f0fdf4' : '#fef3c7', 
            border: savings.savingsPercent > 20 ? '1px solid #bbf7d0' : '1px solid #fde68a',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            color: savings.savingsPercent > 20 ? '#059669' : '#d97706'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <TrendingDown style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              <strong>Save {formatPrice(savings.savings)} ({savings.savingsPercent.toFixed(1)}%)</strong>
            </div>
            {savings.savingsPercent > 20 && (
              <span style={{ fontSize: '0.9rem' }}>Great deal!</span>
            )}
          </div>
        )}

        {phone.Num_Listings && (
          <div style={{ 
            background: '#f1f5f9', 
            padding: '8px 12px', 
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: '#475569'
          }}>
            <strong>Available Listings:</strong> {phone.Num_Listings}
            {phone.Avg_Used_Price && (
              <span style={{ marginLeft: '12px' }}>
                <strong>Avg Price:</strong> {formatPrice(phone.Avg_Used_Price)}
              </span>
            )}
            {phone.Min_Used_Price && (
              <span style={{ marginLeft: '12px' }}>
                <strong>Min Price:</strong> {formatPrice(phone.Min_Used_Price)}
              </span>
            )}
          </div>
        )}

        {phone.ListingPrice > phone.NewPrice && (
          <div style={{ 
            background: '#fef2f2', 
            border: '1px solid #fecaca', 
            padding: '12px', 
            borderRadius: '8px',
            marginTop: '12px',
            color: '#dc2626'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AlertTriangle style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              <strong>Potential Scam</strong>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>
              This listing is priced higher than the new phone price. Proceed with caution.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Used & Refurbished Phones</h1>
          <p>Find great deals on used and refurbished phones with price comparisons and scam alerts</p>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <DollarSign style={{ marginRight: '12px', color: '#f59e0b' }} />
            <h2>Used Phone Listings</h2>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button 
              className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('all')}
            >
              All Listings ({usedPhones.length})
            </button>
            <button 
              className={`btn ${activeTab === 'scam' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('scam')}
            >
              <AlertTriangle style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Scam Alerts ({scamListings.length})
            </button>
            <button 
              className={`btn ${activeTab === 'deals' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('deals')}
            >
              <TrendingDown style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Hot Deals ({largeDiffListings.length})
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button className="btn btn-primary" onClick={loadAllData}>
              <RefreshCw style={{ marginRight: '8px', width: '16px', height: '16px' }} />
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
            <RefreshCw style={{ animation: 'spin 1s linear infinite', marginBottom: '10px' }} />
            Loading used phone listings...
          </div>
        ) : (
          <div className="section">
            <h2>
              {activeTab === 'all' && 'All Used Phone Listings'}
              {activeTab === 'scam' && 'Potential Scam Listings'}
              {activeTab === 'deals' && 'Hot Deals - Large Price Differences'}
            </h2>
            
            {getCurrentData().length === 0 ? (
              <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>
                <DollarSign style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                <p>No listings found for the selected category.</p>
              </div>
            ) : (
              <div className="grid grid-2">
                {getCurrentData().map((phone, index) => renderUsedPhoneCard(phone, index))}
              </div>
            )}
          </div>
        )}

        <div className="card" style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>Tips for Buying Used Phones</h2>
          <div className="grid grid-2">
            <div>
              <h3 style={{ color: '#3b82f6', marginBottom: '12px' }}>✅ Do's</h3>
              <ul style={{ color: '#475569', lineHeight: '1.6' }}>
                <li>Check the seller's reputation and reviews</li>
                <li>Ask for detailed photos of the phone</li>
                <li>Verify the phone's IMEI number</li>
                <li>Test all major functions before buying</li>
                <li>Compare prices with similar listings</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: '#dc2626', marginBottom: '12px' }}>❌ Don'ts</h3>
              <ul style={{ color: '#475569', lineHeight: '1.6' }}>
                <li>Don't pay more than new phone prices</li>
                <li>Avoid sellers with no contact information</li>
                <li>Don't skip the testing phase</li>
                <li>Avoid deals that seem too good to be true</li>
                <li>Don't buy without warranty information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedPhones; 