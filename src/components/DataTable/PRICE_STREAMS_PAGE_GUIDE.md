# Price Streams Page Guide

## Overview
The Price Streams page provides comprehensive management of real-time price data streams from various financial sources including cryptocurrencies, forex, commodities, and other financial instruments.

## Key Features

### Core Functionality
- **Real-time Data Management**: Create, edit, and monitor price streams from multiple sources
- **Multi-Source Support**: Integrate with exchanges (Binance, Coinbase), forex providers (FXCM, OANDA), and commodity platforms (ICE)
- **Performance Monitoring**: Track stream status, update frequency, and error handling
- **Flexible Configuration**: Customize update frequencies, retry policies, and stream parameters

### Data Display
- **Stream Overview**: Name, symbol, source, status, and current price
- **Performance Metrics**: Price changes, volume, 24h high/low, and update frequency
- **Status Indicators**: Visual status badges with icons (Active, Inactive, Error, Maintenance)
- **Real-time Updates**: Live price data with change indicators and percentages

### Management Actions
- **Create New Streams**: Add new price data sources with full configuration
- **Edit Existing Streams**: Modify stream parameters and settings
- **Delete Streams**: Remove unused or problematic streams
- **View Details**: Access comprehensive stream information and metrics

## Component Structure

### Main Components
1. **PriceStreamsTable** - Main table component displaying all price streams
2. **CreatePriceStreamPopup** - Modal for adding new price streams
3. **EditPriceStreamPopup** - Modal for editing existing streams

### Data Models

#### PriceStreamData Interface
```typescript
interface PriceStreamData {
  id: string
  name: string
  symbol: string
  source: string
  status: 'active' | 'inactive' | 'error' | 'maintenance'
  lastUpdate: string
  updateFrequency: string
  price: number
  change: number
  changePercent: number
  volume: number
  high24h: number
  low24h: number
  description: string
  isRealTime: boolean
  retryAttempts: number
  maxRetries: number
}
```

#### PriceStreamFormData Interface
```typescript
interface PriceStreamFormData {
  name: string
  symbol: string
  source: string
  status: 'active' | 'inactive' | 'error' | 'maintenance'
  updateFrequency: string
  description: string
  isRealTime: boolean
  retryAttempts: number
  maxRetries: number
}
```

## Table Features

### Columns
1. **Stream Name** - Display name with symbol underneath and activity icon
2. **Source** - Data provider/exchange name
3. **Status** - Current stream status with color-coded badges
4. **Current Price** - Live price with change percentage and trend arrows
5. **Last Update** - Timestamp of most recent data update
6. **Frequency** - Update interval (100ms to 1 minute)
7. **Actions** - View, edit, delete, and more options

### Interactive Features
- **Sorting**: Click column headers to sort by any field
- **Search**: Global search across all stream data
- **Filtering**: Advanced filtering options for status, source, etc.
- **Pagination**: Navigate through large datasets
- **Hover Effects**: Visual feedback on table rows

## Form Fields

### Basic Information
- **Stream Name*** (Required): Human-readable identifier for the stream
- **Symbol*** (Required): Trading pair or instrument symbol
- **Data Source*** (Required): Exchange, broker, or data provider
- **Status**: Current operational state
- **Description*** (Required): Purpose and details about the stream

### Stream Configuration
- **Update Frequency**: Data refresh rate selection
  - 100ms, 500ms, 1 second, 5 seconds, 10 seconds, 1 minute
- **Real-time Stream**: Checkbox for live data vs. delayed updates
- **Retry Attempts**: Number of failed connection attempts
- **Max Retries*** (Required): Maximum retry attempts before marking as failed

## Status Management

### Status Types
- **Active**: Stream is functioning normally and providing data
- **Inactive**: Stream is paused or stopped
- **Error**: Stream has encountered an error and needs attention
- **Maintenance**: Stream is temporarily unavailable for maintenance

### Status Indicators
- **Green Badge**: Active streams with play icon
- **Gray Badge**: Inactive streams with pause icon
- **Red Badge**: Error streams with refresh icon
- **Yellow Badge**: Maintenance streams with clock icon

## Error Handling

### Validation Rules
- **Required Fields**: Name, symbol, source, description, max retries
- **Numeric Constraints**: Retry attempts ≥ 0, max retries ≥ 1
- **Real-time Validation**: Immediate feedback on form errors
- **Unsaved Changes**: Confirmation dialog when closing with changes

### Error Display
- **Field-level Errors**: Red borders and error messages below inputs
- **Icon Indicators**: Alert circle icons for visual error identification
- **Clear on Input**: Errors automatically clear when user starts typing

## User Experience Features

### Form Management
- **Auto-save Prevention**: Form validation prevents invalid submissions
- **Loading States**: Visual feedback during form submission
- **Reset Functionality**: Revert changes to original values
- **Unsaved Changes Warning**: Prevents accidental data loss

### Responsive Design
- **Mobile Optimized**: Adapts to different screen sizes
- **Touch Friendly**: Appropriate button sizes and spacing
- **Keyboard Navigation**: Full keyboard accessibility
- **Dark Mode Support**: Consistent theming across the application

## Performance Considerations

### Data Management
- **Efficient Rendering**: Virtual scrolling for large datasets
- **Optimized Updates**: Minimal re-renders on data changes
- **Memory Management**: Proper cleanup of event listeners
- **Lazy Loading**: Load data only when needed

### Real-time Updates
- **WebSocket Support**: Efficient real-time data streaming
- **Connection Management**: Automatic reconnection and retry logic
- **Rate Limiting**: Respect API rate limits and quotas
- **Error Recovery**: Graceful handling of connection failures

## Integration Points

### External APIs
- **Exchange APIs**: Binance, Coinbase, Kraken, etc.
- **Forex Providers**: FXCM, OANDA, Interactive Brokers
- **Commodity Data**: ICE, CME, LME
- **News Sources**: Reuters, Bloomberg, MarketWatch

### Internal Systems
- **User Management**: Access control and permissions
- **Audit Logging**: Track all stream modifications
- **Notification System**: Alert users to stream issues
- **Analytics**: Monitor stream performance and usage

## Security Considerations

### Access Control
- **Role-based Permissions**: Different access levels for users
- **API Key Management**: Secure storage of external API credentials
- **Rate Limiting**: Prevent abuse of external APIs
- **Audit Trail**: Log all stream modifications and access

### Data Protection
- **Encryption**: Secure transmission of sensitive data
- **Authentication**: Verify user identity before modifications
- **Authorization**: Check permissions for each operation
- **Input Validation**: Prevent injection attacks and data corruption

## Testing Strategy

### Unit Tests
- **Component Testing**: Test individual React components
- **Form Validation**: Verify all validation rules work correctly
- **Error Handling**: Test error states and edge cases
- **State Management**: Ensure proper state updates

### Integration Tests
- **API Integration**: Test external API connections
- **Data Flow**: Verify data flows correctly through components
- **User Interactions**: Test complete user workflows
- **Error Scenarios**: Test system behavior under failure conditions

### Performance Tests
- **Load Testing**: Verify performance with large datasets
- **Memory Usage**: Monitor memory consumption
- **Response Times**: Ensure acceptable UI responsiveness
- **Scalability**: Test with increasing data volumes

## Future Enhancements

### Planned Features
- **Advanced Filtering**: Multi-criteria filtering and search
- **Bulk Operations**: Select and modify multiple streams
- **Stream Templates**: Pre-configured stream configurations
- **Performance Analytics**: Detailed performance metrics and charts
- **Alert System**: Customizable alerts for price movements

### Technical Improvements
- **WebSocket Optimization**: Enhanced real-time data handling
- **Caching Strategy**: Implement intelligent data caching
- **Offline Support**: Handle network interruptions gracefully
- **Mobile App**: Native mobile application for stream management

## Troubleshooting

### Common Issues
- **Stream Not Updating**: Check source API status and credentials
- **High Latency**: Verify network connectivity and API response times
- **Authentication Errors**: Validate API keys and permissions
- **Memory Leaks**: Monitor component lifecycle and cleanup

### Debug Tools
- **Console Logging**: Detailed error and status logging
- **Network Monitoring**: Track API calls and responses
- **Performance Profiling**: Identify bottlenecks and optimization opportunities
- **Error Reporting**: Collect and analyze error patterns

## Best Practices

### Development
- **Component Reusability**: Create reusable form components
- **Type Safety**: Use TypeScript interfaces for all data structures
- **Error Boundaries**: Implement proper error handling
- **Performance Monitoring**: Track and optimize rendering performance

### User Experience
- **Consistent Design**: Maintain visual consistency across components
- **Accessibility**: Ensure keyboard navigation and screen reader support
- **Loading States**: Provide clear feedback during operations
- **Error Messages**: Use clear, actionable error descriptions

### Data Management
- **Validation**: Validate all user inputs and API responses
- **Error Handling**: Gracefully handle all error conditions
- **State Management**: Use appropriate state management patterns
- **Performance**: Optimize for large datasets and real-time updates 