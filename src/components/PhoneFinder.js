import React, { useState, useEffect } from 'react';
import { Search, Filter, Smartphone } from 'lucide-react';
import { fetchData, apiQueries } from '../services/api';

const PhoneFinder = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    minStorage: '',
    minRam: ''
  });

  // Initially load phones
  useEffect(() => {
    loadPhones(filters);
  }, []);

  // Call API whenever filters change
  useEffect(() => {
    loadPhones(filters);
  }, [filters]);

  const loadPhones = async (filtersParam) => {
    setLoading(true);
    setError(null);
    try {
      // Pass filters as query parameters along with the query type
      const response = await fetchData(apiQueries.SPECS, filtersParam);
      setPhones(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      minStorage: '',
      minRam: ''
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Phone Finder</h1>
          <p>Find the perfect phone based on your specific requirements and preferences</p>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Filter style={{ marginRight: '12px', color: '#3b82f6' }} />
            <h2>Search Filters</h2>
          </div>

          <div className="grid grid-3">
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                placeholder="e.g., Apple, Samsung"
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Min Price ($)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Max Price ($)</label>
              <input
                type="number"
                placeholder="1000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Min Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="4.0"
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Min Storage (GB)</label>
              <input
                type="number"
                placeholder="64"
                value={filters.minStorage}
                onChange={(e) => handleFilterChange('minStorage', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Min RAM (GB)</label>
              <input
                type="number"
                placeholder="4"
                value={filters.minRam}
                onChange={(e) => handleFilterChange('minRam', e.target.value)}
              />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className="btn btn-secondary" onClick={clearFilters} style={{ marginRight: '10px' }}>
              Clear Filters
            </button>
            <button className="btn btn-primary" onClick={() => loadPhones(filters)}>
              <Search style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Refresh Results
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
            <Smartphone style={{ animation: 'spin 1s linear infinite', marginBottom: '10px' }} />
            Loading phones...
          </div>
        ) : (
          <div className="section">
            <h2>Results ({phones.length} phones found)</h2>
            
            {phones.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>
                <Smartphone style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                <p>No phones found matching your criteria. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-2">
                {phones.map((phone, index) => (
                  <div key={index} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>{phone.ModelName}</h3>
                        <p style={{ color: '#64748b', marginBottom: '8px' }}>{phone.BrandName}</p>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ color: '#f59e0b', marginRight: '8px' }}>★</span>
                          <span>{phone.Rating || 'N/A'} / 5</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                          {formatPrice(phone.Price)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-2" style={{ gap: '12px' }}>
                      <div>
                        <strong>Storage:</strong> {phone.Storage}GB
                      </div>
                      <div>
                        <strong>RAM:</strong> {phone.RAM}GB
                      </div>
                      <div>
                        <strong>Screen:</strong> {phone.ScreenSize}" {phone.Resolution}
                      </div>
                      <div>
                        <strong>Battery:</strong> {phone.BatteryCapacity}mAh
                      </div>
                    </div>

                    {phone.Processor && (
                      <div style={{ marginTop: '12px', padding: '8px', background: '#f1f5f9', borderRadius: '6px' }}>
                        <strong>Processor:</strong> {phone.Processor}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneFinder;
