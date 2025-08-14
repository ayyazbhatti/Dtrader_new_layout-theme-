# Edit Swap Popup Guide

## Overview
The `EditSwapPopup` component provides a comprehensive interface for editing existing swap configurations in the trading system. It includes form validation, unsaved changes tracking, and proper TypeScript typing.

## Features

### Core Functionality
- **Form Editing**: Complete form for editing existing swap instruments
- **Data Pre-population**: Automatically loads existing swap data
- **Validation**: Client-side validation with error display
- **Unsaved Changes Tracking**: Warns users before closing with unsaved changes
- **Type Safety**: Full TypeScript support with proper interfaces

### Form Fields

#### Basic Information
- **Symbol**: Trading symbol (e.g., EUR/USD, BTC/USD)
- **Instrument Type**: Category of financial instrument
- **Currency**: Base currency for the swap

#### Swap Rates
- **Long Swap Rate**: Positive swap rate for long positions
- **Short Swap Rate**: Negative swap rate for short positions
- **Long Swap Percentage**: Percentage-based long swap rate
- **Short Swap Percentage**: Percentage-based short swap rate

#### Configuration
- **Swap Profile**: Predefined swap dividend profiles
- **Status**: Current status of the swap instrument
- **Description**: Detailed description of the swap

#### Volume & Commission
- **Minimum Volume**: Minimum trading volume requirement
- **Maximum Volume**: Maximum trading volume limit
- **Commission Rate**: Commission charged per trade

### Validation Rules
- Symbol is required
- Instrument type is required
- At least one swap rate must be set
- Minimum volume must be less than maximum volume
- Commission cannot be negative

## Component Structure

### Props Interface
```typescript
interface EditSwapPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SwapFormData) => void
  initialData: SwapData
}
```

### Data Interfaces
```typescript
interface SwapData {
  id: string
  symbol: string
  instrument: string
  longSwap: number
  shortSwap: number
  longSwapPercent: number
  shortSwapPercent: number
  profile: string
  status: 'Active' | 'Inactive' | 'Suspended' | 'Maintenance'
  lastUpdated: string
  description: string
  currency: string
  minVolume: number
  maxVolume: number
  commission: number
}

interface SwapFormData {
  symbol: string
  instrument: string
  longSwap: number
  shortSwap: number
  longSwapPercent: number
  shortSwapPercent: number
  profile: string
  status: string
  description: string
  currency: string
  minVolume: number
  maxVolume: number
  commission: number
}
```

### State Management
- `formData`: Current form values
- `errors`: Validation error messages
- `isLoading`: Loading state during submission
- `hasUnsavedChanges`: Tracks if user has made changes
- Form reset functionality
- Input change handling

## Usage

### Basic Implementation
```typescript
import EditSwapPopup from './EditSwapPopup'

const [showEditPopup, setShowEditPopup] = useState(false)
const [editingSwap, setEditingSwap] = useState<SwapData | null>(null)

const handleEdit = (swap: SwapData) => {
  setEditingSwap(swap)
  setShowEditPopup(true)
}

const handleUpdateSwap = (updatedSwap: SwapFormData) => {
  // Handle swap update
  console.log('Updating swap:', updatedSwap)
  setShowEditPopup(false)
  setEditingSwap(null)
}

// In JSX
{showEditPopup && editingSwap && (
  <EditSwapPopup
    isOpen={showEditPopup}
    onClose={() => setShowEditPopup(false)}
    onSubmit={handleUpdateSwap}
    initialData={editingSwap}
  />
)}
```

### Integration with SwapsTable
The popup is integrated into the `SwapsTable` component and replaces the placeholder "Edit Swap" functionality.

## UI/UX Features

### Visual Design
- **Modern Interface**: Clean, professional design with gradient accents
- **Icon Integration**: Lucide React icons for visual clarity
- **Color Coding**: Green for positive rates, red for negative rates
- **Responsive Grid**: 3-column layout that adapts to mobile
- **Edit Icon**: Green-to-blue gradient icon to distinguish from create

### User Experience
- **Form Pre-population**: Automatically loads existing data
- **Real-time Validation**: Immediate error feedback
- **Unsaved Changes Warning**: Prevents accidental data loss
- **Reset Functionality**: Revert to original values
- **Loading States**: Visual feedback during submission

### Form Layout
- **3-Column Grid**: Organized field layout for desktop
- **Mobile Responsive**: Single column layout on small screens
- **Logical Grouping**: Related fields grouped together
- **Clear Hierarchy**: Visual separation between sections

## Advanced Features

### Unsaved Changes Tracking
- **Change Detection**: Automatically detects when form values differ from initial data
- **Visual Indicator**: "Unsaved Changes" badge displayed in header
- **Confirmation Dialog**: Warns users before closing with unsaved changes
- **Reset Button**: Allows users to revert all changes

### Form Reset Functionality
- **Reset Button**: Located in footer for easy access
- **State Restoration**: Restores original form values
- **Error Clearing**: Clears all validation errors
- **Change Tracking Reset**: Resets unsaved changes flag

### Loading States
- **Submit Loading**: Shows spinner and "Updating..." text during submission
- **Button States**: Disables buttons during loading
- **User Feedback**: Clear indication of ongoing operation

## Styling

### CSS Classes
- **Tailwind CSS**: Utility-first styling approach
- **Dark Mode Support**: Full dark/light theme compatibility
- **Consistent Spacing**: Standardized padding and margins
- **Hover Effects**: Interactive elements with hover states

### Color Scheme
- **Primary**: Blue (#3B82F6) for main actions
- **Success**: Green (#10B981) for positive values and edit icon
- **Error**: Red (#EF4444) for negative values and errors
- **Warning**: Yellow (#F59E0B) for unsaved changes badge
- **Neutral**: Gray scale for text and borders

## Data Handling

### Form Submission
1. **Validation**: Client-side validation before submission
2. **Data Processing**: Form data formatted for API consumption
3. **Error Handling**: User-friendly error messages
4. **Success Flow**: Form reset and popup closure on success

### Data Transformation
- **Type Conversion**: String inputs converted to appropriate types
- **Status Casting**: Ensures status matches expected union type
- **Timestamp Update**: Automatically updates lastUpdated field
- **Data Sanitization**: Input cleaning and formatting

### State Synchronization
- **Initial Data Loading**: Populates form when popup opens
- **Change Detection**: Tracks modifications from original values
- **Form Reset**: Restores original state when needed
- **Cleanup**: Proper state cleanup on popup close

## Mobile Optimization

### Responsive Design
- **Grid Adaptation**: 3-column to 1-column layout on mobile
- **Touch-Friendly**: Appropriate button sizes and spacing
- **Viewport Handling**: Proper mobile viewport management
- **Scroll Management**: Optimized scrolling for mobile devices

### Mobile-Specific Features
- **Touch Targets**: Adequate size for touch interaction
- **Keyboard Handling**: Mobile keyboard optimization
- **Viewport Scaling**: Proper mobile viewport scaling
- **Button Layout**: Optimized button arrangement for mobile

## Error Handling

### Validation Errors
- **Field-Level Errors**: Specific error messages for each field
- **Real-Time Feedback**: Errors displayed as user types
- **Error Clearing**: Errors automatically cleared on correction
- **User Guidance**: Clear instructions for error resolution

### User Experience
- **Error Display**: Red borders and error messages
- **Error Prevention**: Validation before form submission
- **Graceful Degradation**: Fallback handling for edge cases
- **Error Recovery**: Easy ways to fix validation issues

## Performance Considerations

### Optimization
- **State Management**: Efficient state updates
- **Event Handling**: Optimized event handlers
- **Rendering**: Minimal re-renders
- **Memory Management**: Proper cleanup on unmount

### Best Practices
- **Conditional Rendering**: Only renders when needed
- **Memoization**: Component memoization where appropriate
- **Lazy Loading**: Conditional rendering of heavy components
- **State Updates**: Batched state updates for better performance

## Testing

### Test Cases
- **Form Pre-population**: Verify initial data loads correctly
- **Form Validation**: All validation rules tested
- **User Interaction**: Form submission and reset
- **Error Handling**: Error display and clearing
- **Unsaved Changes**: Change tracking and warnings
- **Responsive Design**: Mobile and desktop layouts

### Testing Strategy
- **Unit Tests**: Individual component testing
- **Integration Tests**: Form submission flow
- **Visual Tests**: UI rendering and responsiveness
- **Accessibility Tests**: Screen reader and keyboard navigation
- **State Tests**: Form state management

## Future Enhancements

### Planned Features
- **Auto-save**: Draft saving functionality
- **Version History**: Track changes over time
- **Bulk Editing**: Edit multiple swaps simultaneously
- **Template System**: Save and apply common configurations

### Technical Improvements
- **Form Library**: Integration with React Hook Form
- **State Management**: Redux/Zustand integration
- **API Integration**: Real-time data validation
- **Performance**: Virtual scrolling for large datasets

## Integration Examples

### With Redux
```typescript
import { useDispatch } from 'react-redux'
import { updateSwap } from '../store/swapsSlice'

const dispatch = useDispatch()

const handleUpdateSwap = (swapData: SwapFormData) => {
  dispatch(updateSwap({ id: editingSwap.id, ...swapData }))
  setShowEditPopup(false)
  setEditingSwap(null)
}
```

### With React Query
```typescript
import { useMutation } from '@tanstack/react-query'
import { updateSwap } from '../api/swaps'

const mutation = useMutation({
  mutationFn: updateSwap,
  onSuccess: () => {
    setShowEditPopup(false)
    setEditingSwap(null)
    // Handle success
  }
})

const handleUpdateSwap = (swapData: SwapFormData) => {
  mutation.mutate({ id: editingSwap.id, ...swapData })
}
```

## Troubleshooting

### Common Issues
- **Form Not Pre-populating**: Check initialData prop
- **Type Errors**: Verify interface compatibility
- **Unsaved Changes Not Detecting**: Check change tracking logic
- **Styling Issues**: Verify Tailwind CSS classes
- **Mobile Issues**: Check responsive breakpoints

### Debug Tips
- **Console Logs**: Check browser console for errors
- **React DevTools**: Inspect component state
- **Network Tab**: Verify API calls
- **Device Testing**: Test on actual mobile devices
- **State Inspection**: Verify form data and change tracking

## Best Practices

### Code Organization
- **Single Responsibility**: Component handles only swap editing
- **Reusable Logic**: Form logic can be extracted to hooks
- **Type Safety**: Full TypeScript coverage
- **Documentation**: Comprehensive inline comments

### User Experience
- **Clear Feedback**: Immediate validation feedback
- **Intuitive Layout**: Logical field organization
- **Accessibility**: Screen reader and keyboard support
- **Mobile First**: Responsive design approach
- **Data Safety**: Unsaved changes protection

### Performance
- **Efficient Rendering**: Minimal re-renders
- **Optimized State**: Efficient state management
- **Lazy Loading**: Conditional component rendering
- **Memory Management**: Proper cleanup and disposal

## Conclusion

The `EditSwapPopup` component provides a robust, user-friendly interface for editing swap instruments. With comprehensive validation, unsaved changes tracking, responsive design, and proper TypeScript support, it serves as a solid foundation for swap management functionality in the trading system.

The component follows modern React best practices and provides an excellent user experience across all device types. Its advanced features like unsaved changes tracking and form reset functionality make it particularly user-friendly for data editing scenarios.

The modular design makes it easy to integrate into existing systems and extend with additional functionality as needed, while maintaining consistency with the CreateSwapPopup component for a cohesive user experience. 