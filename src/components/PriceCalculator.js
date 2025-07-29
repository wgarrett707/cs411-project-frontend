import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { fetchData, apiQueries } from '../services/api';

const PriceCalculator = () => {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customConfig, setCustomConfig] = useState({
    brand: '',
    storage: '',
    ram: '',
    screenSize: '',
    batteryCapacity: '',
    processor: '',
    camera: '',
    rating: ''
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [priceBreakdown, setPriceBreakdown] = useState({});

  useEffect(() => {
    loadSpecs();
  }, []);

  const loadSpecs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(apiQueries.SPECS);
      setSpecs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (field, value) => {
    setCustomConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculatePrice = () => {
    if (!customConfig.brand || !customConfig.storage || !customConfig.ram) {
      setError('Please fill in at least Brand, Storage, and RAM to calculate price');
      return;
    }

    // Filter phones based on selected specifications
    let matchingPhones = specs.filter(phone => {
      if (customConfig.brand && phone.BrandName !== customConfig.brand) return false;
      if (customConfig.storage && phone.Storage !== parseInt(customConfig.storage)) return false;
      if (customConfig.ram && phone.RAM !== parseInt(customConfig.ram)) return false;
      if (customConfig.screenSize && phone.ScreenSize !== parseFloat(customConfig.screenSize)) return false;
      if (customConfig.batteryCapacity && phone.BatteryCapacity !== parseInt(customConfig.batteryCapacity)) return false;
      if (customConfig.processor && phone.Processor !== customConfig.processor) return false;
      if (customConfig.rating && phone.Rating < parseFloat(customConfig.rating)) return false;
      return true;
    });

    if (matchingPhones.length === 0) {
      // If no exact matches, find similar configurations
      matchingPhones = specs.filter(phone => {
        if (customConfig.brand && phone.BrandName !== customConfig.brand) return false;
        if (customConfig.storage && phone.Storage < parseInt(customConfig.storage)) return false;
        if (customConfig.ram && phone.RAM < parseInt(customConfig.ram)) return false;
        return true;
      });
    }

    if (matchingPhones.length === 0) {
      setError('No phones found matching your specifications. Try adjusting your requirements.');
      setEstimatedPrice(null);
      return;
    }

    // Calculate average price and price breakdown
    const avgPrice = matchingPhones.reduce((sum, phone) => sum + phone.Price, 0) / matchingPhones.length;
    
    // Calculate price breakdown based on specifications
    const breakdown = {
      basePrice: avgPrice * 0.6,
      storageUpgrade: customConfig.storage > 64 ? (parseInt(customConfig.storage) - 64) * 2 : 0,
      ramUpgrade: customConfig.ram > 4 ? (parseInt(customConfig.ram) - 4) * 15 : 0,
      screenUpgrade: customConfig.screenSize > 6 ? (parseFloat(customConfig.screenSize) - 6) * 50 : 0,
      batteryUpgrade: customConfig.batteryCapacity > 4000 ? (parseInt(customConfig.batteryCapacity) - 4000) * 0.01 : 0,
      premiumFeatures: customConfig.rating > 4 ? 50 : 0
    };

    const totalPrice = Object.values(breakdown).reduce((sum, value) => sum + value, 0);

    setEstimatedPrice(totalPrice);
    setPriceBreakdown(breakdown);
    setError(null);
  };

  const clearConfig = () => {
    setCustomConfig({
      brand: '',
      storage: '',
      ram: '',
      screenSize: '',
      batteryCapacity: '',
      processor: '',
      camera: '',
      rating: ''
    });
    setEstimatedPrice(null);
    setPriceBreakdown({});
    setError(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Get unique values for dropdowns
  const brands = [...new Set(specs.map(phone => phone.BrandName))].sort();
  const storageOptions = [...new Set(specs.map(phone => phone.Storage))].sort((a, b) => a - b);
  const ramOptions = [...new Set(specs.map(phone => phone.RAM))].sort((a, b) => a - b);
  const screenSizes = [...new Set(specs.map(phone => phone.ScreenSize))].sort((a, b) => a - b);
  const batteryCapacities = [...new Set(specs.map(phone => phone.BatteryCapacity))].sort((a, b) => a - b);
  const processors = [...new Set(specs.map(phone => phone.Processor).filter(Boolean))].sort();

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Price Calculator</h1>
          <p>Calculate estimated prices for custom phone configurations based on your specifications</p>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-2" style={{ gap: '30px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Calculator style={{ marginRight: '12px', color: '#10b981' }} />
              <h2>Custom Configuration</h2>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select
                value={customConfig.brand}
                onChange={(e) => handleConfigChange('brand', e.target.value)}
              >
                <option value="">Select Brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Storage (GB)</label>
              <select
                value={customConfig.storage}
                onChange={(e) => handleConfigChange('storage', e.target.value)}
              >
                <option value="">Select Storage</option>
                {storageOptions.map(storage => (
                  <option key={storage} value={storage}>{storage}GB</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>RAM (GB)</label>
              <select
                value={customConfig.ram}
                onChange={(e) => handleConfigChange('ram', e.target.value)}
              >
                <option value="">Select RAM</option>
                {ramOptions.map(ram => (
                  <option key={ram} value={ram}>{ram}GB</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Screen Size (inches)</label>
              <select
                value={customConfig.screenSize}
                onChange={(e) => handleConfigChange('screenSize', e.target.value)}
              >
                <option value="">Select Screen Size</option>
                {screenSizes.map(size => (
                  <option key={size} value={size}>{size}"</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Battery Capacity (mAh)</label>
              <select
                value={customConfig.batteryCapacity}
                onChange={(e) => handleConfigChange('batteryCapacity', e.target.value)}
              >
                <option value="">Select Battery Capacity</option>
                {batteryCapacities.map(capacity => (
                  <option key={capacity} value={capacity}>{capacity}mAh</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Processor</label>
              <select
                value={customConfig.processor}
                onChange={(e) => handleConfigChange('processor', e.target.value)}
              >
                <option value="">Select Processor</option>
                {processors.map(processor => (
                  <option key={processor} value={processor}>{processor}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Minimum Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="4.0"
                value={customConfig.rating}
                onChange={(e) => handleConfigChange('rating', e.target.value)}
              />
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={clearConfig} style={{ marginRight: '10px' }}>
                Clear
              </button>
              <button className="btn btn-primary" onClick={calculatePrice}>
                <Calculator style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                Calculate Price
              </button>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <DollarSign style={{ marginRight: '12px', color: '#f59e0b' }} />
              <h2>Price Estimate</h2>
            </div>

            {error && (
              <div className="error">
                {error}
              </div>
            )}

            {loading ? (
              <div className="loading">
                <Calculator style={{ animation: 'spin 1s linear infinite', marginBottom: '10px' }} />
                Loading specifications...
              </div>
            ) : estimatedPrice ? (
              <div>
                <div style={{ 
                  background: 'linear-gradient(135deg, #10b981, #059669)', 
                  color: 'white', 
                  padding: '24px', 
                  borderRadius: '12px',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ marginBottom: '8px' }}>Estimated Price</h3>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {formatPrice(estimatedPrice)}
                  </div>
                </div>

                <h3 style={{ marginBottom: '16px' }}>Price Breakdown</h3>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Base Price:</span>
                    <span>{formatPrice(priceBreakdown.basePrice)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Storage Upgrade:</span>
                    <span>{formatPrice(priceBreakdown.storageUpgrade)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>RAM Upgrade:</span>
                    <span>{formatPrice(priceBreakdown.ramUpgrade)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Screen Upgrade:</span>
                    <span>{formatPrice(priceBreakdown.screenUpgrade)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Battery Upgrade:</span>
                    <span>{formatPrice(priceBreakdown.batteryUpgrade)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Premium Features:</span>
                    <span>{formatPrice(priceBreakdown.premiumFeatures)}</span>
                  </div>
                  <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span>{formatPrice(estimatedPrice)}</span>
                  </div>
                </div>

                <div style={{ 
                  background: '#f0fdf4', 
                  border: '1px solid #bbf7d0', 
                  padding: '16px', 
                  borderRadius: '8px',
                  color: '#059669'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <TrendingUp style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                    <strong>Price Range</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    This estimate is based on similar configurations in our database. 
                    Actual prices may vary based on market conditions and availability.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '40px 20px' }}>
                <Calculator style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                <p>Fill in your desired specifications and click "Calculate Price" to get an estimate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator; 