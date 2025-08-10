# Column Visibility Usage Guide

This guide shows how to use the reusable Column Visibility components in other pages.

## Components Available

### 1. `useColumnVisibility` Hook
A custom hook that manages the column visibility popup state and positioning.

### 2. `ColumnVisibilityButton` Component
A styled button with Eye icon and tooltip for opening the column visibility popup.

### 3. `ColumnVisibilityPopup` Component
The popup that shows checkboxes for each column with Show All/Hide All buttons.

### 4. `MobileColumnVisibility` Component
Mobile-friendly column visibility controls with toggle buttons.

## Basic Usage Example

```tsx
import React from 'react'
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table'
import { 
  useColumnVisibility, 
  ColumnVisibilityButton, 
  ColumnVisibilityPopup,
  MobileColumnVisibility 
} from '@/components/DataTable'

const MyTablePage = () => {
  // Your table data and columns
  const data = [...]
  const columns = [...]
  
  // Initialize table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  })

  // Use the column visibility hook
  const { 
    columnVisibilityMenu, 
    handleColumnVisibilityMenu, 
    closeColumnVisibilityMenu 
  } = useColumnVisibility()

  return (
    <div>
      {/* Toolbar with Column Visibility Button */}
      <div className="flex items-center space-x-2">
        <ColumnVisibilityButton 
          onClick={(e) => handleColumnVisibilityMenu(e, table)}
        />
        {/* Other toolbar buttons */}
      </div>

      {/* Column Visibility Popup */}
      <ColumnVisibilityPopup 
        table={table}
        columnVisibilityMenu={columnVisibilityMenu}
      />

      {/* Mobile Column Visibility */}
      <div className="sm:hidden">
        <MobileColumnVisibility table={table} />
      </div>

      {/* Your table component */}
      <table>
        {/* Table content */}
      </table>
    </div>
  )
}
```

## Advanced Usage with Custom Styling

```tsx
// Custom styled button
<ColumnVisibilityButton 
  onClick={(e) => handleColumnVisibilityMenu(e, table)}
  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
/>

// Custom popup positioning
const customHandleColumnVisibilityMenu = (e: React.MouseEvent, table: Table<T>) => {
  // Custom positioning logic
  const rect = e.currentTarget.getBoundingClientRect()
  setColumnVisibilityMenu({
    show: true,
    x: rect.left,
    y: rect.bottom + 20
  })
}
```

## Integration with Existing Tables

### 1. Add to Existing Toolbar
```tsx
// Find your existing toolbar and add the button
<div className="toolbar">
  <ColumnVisibilityButton 
    onClick={(e) => handleColumnVisibilityMenu(e, table)}
  />
  {/* Your existing buttons */}
</div>
```

### 2. Add Popup to Page
```tsx
// Add this near the end of your component, before the closing div
<ColumnVisibilityPopup 
  table={table}
  columnVisibilityMenu={columnVisibilityMenu}
/>
```

### 3. Add Mobile Controls
```tsx
// Add this in your mobile-responsive section
<div className="sm:hidden">
  <MobileColumnVisibility table={table} />
</div>
```

## Required Dependencies

Make sure you have these in your project:
- `@tanstack/react-table` - For table functionality
- `lucide-react` - For the Eye icon
- Tailwind CSS - For styling

## Features

✅ **Responsive Design** - Works on desktop and mobile  
✅ **Smart Positioning** - Automatically adjusts popup position to stay in viewport  
✅ **Keyboard Accessible** - Proper focus management and keyboard navigation  
✅ **Dark Mode Support** - Automatically adapts to your theme  
✅ **TypeScript Support** - Fully typed with generics  
✅ **Customizable** - Easy to style and modify  
✅ **Performance Optimized** - Minimal re-renders and efficient state management  

## Troubleshooting

### Popup not showing?
- Check that `columnVisibilityMenu.show` is `true`
- Verify the popup is rendered in your component
- Check z-index if popup is behind other elements

### Button not working?
- Ensure `handleColumnVisibilityMenu` is properly bound
- Check that the table instance is valid
- Verify the Eye icon is imported

### Mobile controls not visible?
- Make sure you're on a small screen or using `sm:hidden`
- Check that the component is properly imported
- Verify the table has columns that can be hidden

## Examples in Existing Pages

See these files for complete implementation examples:
- `src/components/DataTable/DataTable.tsx` - Main implementation
- `src/pages/Dashboard.tsx` - Example usage in a page
- `src/pages/Trading.tsx` - Another example

## Support

For issues or questions, check:
1. The DataTable component implementation
2. The hooks.ts file for context menu logic
3. The component exports in index.ts 