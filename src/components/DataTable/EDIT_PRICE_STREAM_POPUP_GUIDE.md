# Edit Price Stream Popup Guide

## Overview
The `EditPriceStreamPopup` is a multi-tab popup component that allows users to edit price stream configurations. It features three main tabs: Basic Info, Symbol Markups, and Used in Groups.

## Component Structure

### Props Interface
```typescript
interface EditPriceStreamPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PriceStreamFormData) => void
  initialData: PriceStreamData
}
```

### State Management
- `activeTab`: Controls which tab is currently displayed ('basic', 'markups', 'groups')
- `formData`: Stores the form data for the price stream
- `errors`: Tracks validation errors
- `isLoading`: Shows loading state during submission
- `hasUnsavedChanges`: Tracks if user has made changes
- `showSymbolMarkupPopup`: Controls the nested symbol markup popup
- `selectedSymbol`: Stores the currently selected symbol for markup editing

## Tab Structure

### 1. Basic Info Tab
**Purpose**: Edit fundamental price stream information

**Fields**:
- **Stream Name*** (required): The name of the price stream
- **Status**: Dropdown with options: Active, Inactive, Error, Maintenance
- **Description*** (required): Detailed description of the price stream
- **Tags**: Comma-separated tags for categorization

**Features**:
- Real-time validation
- Required field indicators
- Error message display
- Unsaved changes tracking

### 2. Symbol Markups Tab
**Purpose**: Manage markup settings for different trading symbols

**Table Columns**:
- **Symbol**: Trading pair (e.g., BTC/USD, ETH/USD)
- **Markup Type**: Percentage or Point-based markup
- **Markup Bid**: Bid-side markup value
- **Markup Ask**: Ask-side markup value
- **Actions**: Edit/Delete buttons

**Interactive Features**:
- Clickable table rows that open markup editing popup
- Add Markup button for new entries
- Sortable columns
- Hover effects and visual feedback

**Nested Popup**: Symbol Markup Settings
- Opens when clicking on any symbol row
- Fields: Markup Type, Markup Bid, Markup Ask
- Save/Cancel functionality

### 3. Used in Groups Tab
**Purpose**: Display groups that are currently using this price stream

**Table Columns**:
- **Group Name**: Name of the group
- **Member Count**: Number of members in the group
- **Status**: Active/Inactive status with color coding
- **Usage Type**: Primary or Secondary usage
- **Actions**: Edit/Delete buttons

**Features**:
- Group count display
- Status badges with color coding
- Member count information
- Usage type classification

## Key Features

### Form Validation
- Required field validation for name and description
- Real-time error clearing when user types
- Visual error indicators with icons

### Unsaved Changes Tracking
- Monitors all form changes
- Shows "Unsaved Changes" badge
- Confirms before closing if changes exist
- Reset button to restore original values

### Responsive Design
- Mobile-friendly layout
- Responsive grid systems
- Adaptive spacing and sizing
- Touch-friendly interactions

### Dark Mode Support
- Full dark mode compatibility
- Consistent color schemes
- Proper contrast ratios
- Theme-aware styling

## Usage Examples

### Opening the Popup
```typescript
const [showEditPopup, setShowEditPopup] = useState(false)
const [editingPriceStream, setEditingPriceStream] = useState<PriceStreamData | null>(null)

const handleEditPriceStream = (priceStream: PriceStreamData) => {
  setEditingPriceStream(priceStream)
  setShowEditPopup(true)
}
```

### Handling Form Submission
```typescript
const handleUpdatePriceStream = (updatedData: PriceStreamFormData) => {
  // Update logic here
  setShowEditPopup(false)
  setEditingPriceStream(null)
}

<EditPriceStreamPopup
  isOpen={showEditPopup}
  onClose={() => setShowEditPopup(false)}
  onSubmit={handleUpdatePriceStream}
  initialData={editingPriceStream!}
/>
```

## Styling and CSS

### Tab Navigation
- Blue accent color for active tab
- Hover effects for inactive tabs
- Smooth transitions between states
- Consistent spacing and typography

### Table Styling
- Dark theme tables with proper contrast
- Hover effects on rows
- Sortable column headers
- Action button styling

### Form Elements
- Consistent input styling
- Focus states with blue rings
- Error states with red borders
- Proper spacing and alignment

## Mock Data

### Symbol Markups
```typescript
const mockSymbolMarkups: SymbolMarkup[] = [
  {
    id: '1',
    symbol: 'BTC/USD',
    markupType: 'percentage',
    markupBid: 0.1,
    markupAsk: 0.15,
    description: 'Bitcoin markup settings'
  }
  // ... more entries
]
```

### Group Usage
```typescript
const mockGroups: GroupUsage[] = [
  {
    id: '1',
    name: 'Premium Traders',
    memberCount: 150,
    status: 'active',
    usageType: 'primary'
  }
  // ... more entries
]
```

## Accessibility Features

- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## Performance Considerations

- Efficient state updates
- Minimal re-renders
- Optimized table rendering
- Lazy loading for large datasets

## Future Enhancements

- Bulk markup editing
- Advanced filtering options
- Export/import functionality
- Audit trail tracking
- Real-time collaboration 