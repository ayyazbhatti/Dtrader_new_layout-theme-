# Groups Column Visibility Popup - Implementation Guide

## 📝 Overview
This guide documents the implementation of the column visibility popup for the Groups management table, providing users with the ability to show/hide table columns dynamically. The popup follows the same design pattern as the user page column visibility popup for consistency across the application.

## 🎯 Features Implemented

### 1. **Column Visibility Management**
- **Dynamic Column Control**: Show/hide individual table columns
- **Bulk Operations**: Show all or hide all columns with single clicks
- **Real-time Updates**: Immediate visibility changes without page refresh
- **State Persistence**: Column visibility state maintained during session

### 2. **User Interface**
- **Professional Design**: Consistent with application design system
- **Dark Mode Support**: Full dark mode compatibility
- **Responsive Layout**: Works across all device sizes
- **Intuitive Controls**: Clear checkboxes and action buttons

### 3. **Integration**
- **Seamless Integration**: Works with existing GroupsTable structure
- **Table Integration**: Directly connected to React Table instance
- **State Management**: Proper state handling and updates

## 🏗️ Technical Implementation

### **Components Used**
1. **`useColumnVisibility` Hook**: Manages popup state and positioning
2. **`ColumnVisibilityPopup` Component**: Renders the popup interface
3. **GroupsTable Integration**: Connected to table instance and state

### **Import Statements**
```tsx
import { useColumnVisibility } from './useColumnVisibility'
import { ColumnVisibilityPopup } from './ColumnVisibilityPopup'
```

### **Hook Integration**
```tsx
// Column visibility hook
const { columnVisibilityMenu, handleColumnVisibilityMenu, closeColumnVisibilityMenu } = useColumnVisibility<GroupData>()
```

### **Button Connection**
```tsx
<button 
  onClick={(e) => handleColumnVisibilityMenu(e, table)}
  className="p-2 text-white hover:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-400 relative group overflow-visible"
>
  <Eye className="w-4 h-4" />
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
    Column Visibility
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
  </div>
</button>
```

### **Popup Rendering**
```tsx
{/* Column Visibility Popup */}
<ColumnVisibilityPopup 
  table={table}
  columnVisibilityMenu={columnVisibilityMenu}
  onClose={closeColumnVisibilityMenu}
/>
```

## 🎨 User Interface Design

### **Popup Structure**
- **Header**: "Column Visibility" title with close button
- **Description**: "Show or hide table columns as needed"
- **Column Counter**: Shows number of visible columns
- **Action Buttons**: "All" and "None" for bulk operations
- **Column List**: Checkboxes for individual column control
- **Footer**: Close and Apply Changes buttons

### **Visual Elements**
- **Background**: Semi-transparent black overlay
- **Container**: White/dark gray rounded container with shadow
- **Checkboxes**: Green-themed with proper focus states
- **Buttons**: Consistent styling with hover effects
- **Typography**: Clear hierarchy with appropriate sizing

### **Interactive Features**
- **Hover Effects**: Smooth transitions on interactive elements
- **Focus States**: Proper focus indicators for accessibility
- **Click Handling**: Efficient event handling and state updates
- **Responsive Design**: Adapts to different screen sizes

## 🔧 Column Management

### **Available Columns**
The GroupsTable includes the following columns that can be controlled:

1. **Select**: Row selection checkboxes
2. **Name**: Group name and identifier
3. **Stop Out %**: Stop out level percentage
4. **Price Feed**: Price stream configuration
5. **Members**: Member count
6. **Balance**: Total balance amount
7. **Equity**: Total equity amount
8. **Status**: Active/Inactive status
9. **Created**: Creation date
10. **Description**: Group description
11. **Actions**: Settings, Edit, Delete buttons

### **Column Properties**
```tsx
// Each column has these visibility properties
enableHiding: true,        // Can be hidden/shown
enableResizing: true,      // Can be resized
enableSorting: true,       // Can be sorted
enableGlobalFilter: true,  // Can be filtered
```

### **State Management**
```tsx
// Column visibility state
const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

// Table configuration
const table = useReactTable({
  // ... other config
  state: {
    columnVisibility,
    // ... other state
  },
  onColumnVisibilityChange: setColumnVisibility,
  // ... other config
})
```

## 🚀 Functionality

### **Opening the Popup**
1. **Click Trigger**: User clicks the Eye icon in the toolbar
2. **Position Calculation**: Popup position calculated relative to button
3. **State Update**: `columnVisibilityMenu.show` set to `true`
4. **Popup Display**: ColumnVisibilityPopup component renders

### **Column Operations**
1. **Individual Toggle**: Click checkbox to show/hide specific column
2. **Show All**: Click "All" button to make all columns visible
3. **Hide All**: Click "None" button to hide all columns
4. **Real-time Update**: Changes immediately reflected in table

### **Closing the Popup**
1. **Close Button**: Click X button in header
2. **Apply Changes**: Click "Apply Changes" button
3. **State Reset**: `columnVisibilityMenu.show` set to `false`
4. **Popup Hide**: Component unmounts

## 📱 Responsive Behavior

### **Mobile Compatibility**
- **Touch Friendly**: Proper touch targets for mobile devices
- **Responsive Layout**: Adapts to small screen sizes
- **Overflow Handling**: Proper scrolling for long column lists
- **Touch Events**: Works with touch hover simulation

### **Cross-Device Support**
- **Desktop**: Full mouse hover and click support
- **Tablet**: Touch and hover support
- **Mobile**: Touch support with hover simulation
- **All Browsers**: Consistent behavior across browsers

## 🔄 State Flow

### **Opening Flow**
```
User clicks Eye icon → handleColumnVisibilityMenu() → 
Update columnVisibilityMenu state → Popup renders
```

### **Column Toggle Flow**
```
User clicks checkbox → Update table column visibility → 
Table re-renders with new column state
```

### **Closing Flow**
```
User clicks close → closeColumnVisibilityMenu() → 
Reset columnVisibilityMenu state → Popup unmounts
```

## 🧪 Testing Considerations

### **Functionality Testing**
- **Popup Opening**: Verify popup appears on Eye icon click
- **Column Toggle**: Test individual column show/hide
- **Bulk Operations**: Test "All" and "None" buttons
- **State Persistence**: Verify visibility state maintained
- **Popup Closing**: Test all close methods

### **Integration Testing**
- **Table Integration**: Verify column changes reflect in table
- **State Management**: Test state updates and persistence
- **Event Handling**: Verify proper event propagation
- **Performance**: Test with large numbers of columns

### **User Experience Testing**
- **Accessibility**: Test with screen readers and keyboard navigation
- **Mobile Experience**: Test on various mobile devices
- **Cross-browser**: Test across different browsers
- **Performance**: Verify smooth animations and responsiveness

## 🔧 Customization Options

### **Column Configuration**
```tsx
// Customize which columns can be hidden
{
  id: 'customColumn',
  header: 'Custom Column',
  enableHiding: true,  // Can be controlled
  enableHiding: false, // Cannot be controlled
}
```

### **Popup Styling**
```tsx
// Customize popup appearance
<ColumnVisibilityPopup 
  table={table}
  columnVisibilityMenu={columnVisibilityMenu}
  onClose={closeColumnVisibilityMenu}
  // Custom props for styling
  className="custom-popup"
  theme="dark" // or "light"
/>
```

### **Behavior Customization**
```tsx
// Customize popup behavior
const customHandleColumnVisibilityMenu = (e: React.MouseEvent, table: Table<T>) => {
  // Custom positioning logic
  // Custom state management
  // Custom validation
}
```

## 📋 Usage Examples

### **Basic Implementation**
```tsx
// In GroupsTable component
const { columnVisibilityMenu, handleColumnVisibilityMenu, closeColumnVisibilityMenu } = useColumnVisibility<GroupData>()

// Connect to button
<button onClick={(e) => handleColumnVisibilityMenu(e, table)}>
  <Eye className="w-4 h-4" />
</button>

// Render popup
<ColumnVisibilityPopup 
  table={table}
  columnVisibilityMenu={columnVisibilityMenu}
  onClose={closeColumnVisibilityMenu}
/>
```

### **Enhanced Implementation**
```tsx
// With custom styling and behavior
const customColumnVisibility = {
  show: false,
  x: 0,
  y: 0,
  theme: 'dark',
  position: 'fixed'
}

// Custom handler
const handleCustomColumnVisibility = (e: React.MouseEvent) => {
  // Custom logic
  setCustomColumnVisibility(prev => ({ ...prev, show: true }))
}
```

## 🔮 Future Enhancements

### **Advanced Features**
1. **Column Presets**: Save and load column visibility configurations
2. **Column Reordering**: Drag and drop to reorder columns
3. **Column Width Control**: Adjust column widths from popup
4. **Column Search**: Search through available columns
5. **Export Settings**: Export/import column configurations

### **Performance Improvements**
1. **Lazy Loading**: Load column data on demand
2. **Virtual Scrolling**: Handle large numbers of columns efficiently
3. **Caching**: Cache column visibility preferences
4. **Optimization**: Reduce re-renders during column changes

### **User Experience**
1. **Keyboard Shortcuts**: Quick column visibility shortcuts
2. **Touch Gestures**: Enhanced mobile interactions
3. **Animations**: Smooth column show/hide animations
4. **Accessibility**: Enhanced screen reader support

---

## 📱 Summary

The Groups Column Visibility Popup provides:
- ✅ **Complete column control** for the Groups management table
- ✅ **Consistent design** matching the user page implementation
- ✅ **Professional interface** with smooth interactions
- ✅ **Mobile compatibility** across all device types
- ✅ **Efficient state management** with React Table integration
- ✅ **Accessibility features** for inclusive design
- ✅ **Easy customization** for future enhancements
- ✅ **Performance optimized** for smooth operation

This implementation enhances the Groups management experience by giving users full control over table column visibility, improving data presentation and user workflow efficiency. 