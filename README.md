# PhoneSpecs - Mobile Phone Specifications Platform

A comprehensive React.js frontend application for mobile phone specifications, pricing, and market analysis. This platform helps users find the perfect phone based on their requirements, calculate custom configurations, and discover the best deals on used and refurbished phones.

## Features

### 🏠 Home Page
- Overview of all platform features
- Use case examples for different user types (photographers, power users, developers)
- Quick navigation to all main features

### 🔍 Phone Finder
- Advanced filtering by brand, price range, rating, storage, and RAM
- Real-time search results with detailed specifications
- Responsive grid layout for easy comparison

### 💰 Price Calculator
- Custom phone configuration builder
- Estimated price calculation based on specifications
- Detailed price breakdown (base price, upgrades, premium features)
- Dropdown selections for all major specifications

### 📱 Used & Refurbished Phones
- Comprehensive listing of used phone deals
- Scam alert system for overpriced listings
- Price comparison with new phone prices
- Hot deals identification based on price variations
- Safety tips for buying used phones

### ⭐ Features & Market Analysis
- **Ratings & Reviews**: Top-rated brands and phones with star ratings
- **Scam Alerts**: Listings priced higher than new phone prices
- **Featured Phones**: Editor's choice selections with premium features
- **Hot Deals**: Phones with significant price variations across listings

## Technology Stack

- **Frontend**: React.js 18.2.0
- **Routing**: React Router DOM 6.3.0
- **HTTP Client**: Axios 1.4.0
- **Icons**: Lucide React 0.263.1
- **Styling**: CSS3 with modern design patterns
- **Backend**: Python Flask with MySQL database

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cs411-project-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## API Integration

The application connects to a Python Flask backend with the following endpoints:

- **Base URL**: `https://cs-411-backend-717249317257.us-central1.run.app/`
- **Query Parameters**: All requests use the `query` parameter to specify the data type

### Available API Queries

- `top5` - Top 5 brands by average rating
- `scamUsed` - Used phone listings priced higher than new
- `largeDiff` - Phones with large price differences
- `highRatings` - Highest rated phones with feature counts
- `brands` - All brand information
- `features` - All feature information
- `specs` - All phone specifications
- `phoneFeatures` - Phone-feature relationships
- `processors` - Processor information
- `used` - All used phone listings

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Navigation component
│   ├── Home.js         # Home page component
│   ├── PhoneFinder.js  # Phone search component
│   ├── PriceCalculator.js # Price estimation component
│   ├── UsedPhones.js   # Used phones component
│   ├── Features.js     # Features & market analysis
│   └── *.css           # Component-specific styles
├── services/           # API and utility services
│   └── api.js         # API integration service
├── App.js             # Main application component
├── App.css            # Application styles
├── index.js           # Application entry point
└── index.css          # Global styles
```

## Key Features Implementation

### Responsive Design
- Mobile-first approach with responsive grid layouts
- Adaptive navigation with hamburger menu for mobile
- Flexible card layouts that work on all screen sizes

### Modern UI/UX
- Clean, modern design with consistent color scheme
- Smooth animations and transitions
- Intuitive navigation and user flow
- Loading states and error handling

### Data Visualization
- Star rating system with visual indicators
- Price formatting with currency symbols
- Color-coded alerts for scams and deals
- Progress indicators and status messages

## Use Cases

### For Photographers
- Filter by sensor size and battery capacity
- Find phones optimized for low-light photography
- Budget planning with price calculator
- Compare specifications across brands

### For Power Users
- Search by performance specifications
- Calculate custom configurations
- Find phones with extended battery life
- Compare high-end features

### For Developers
- Technical specification filtering
- Custom hardware requirement matching
- Development-friendly feature identification
- Performance benchmarking tools

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the CS411 course project. Please refer to your course guidelines for licensing information.

## Support

For technical support or questions about the application, please refer to your course instructor or create an issue in the repository.

---

**Note**: This application is designed to work with the provided Python Flask backend. Ensure the backend is running and accessible before using the frontend features. 