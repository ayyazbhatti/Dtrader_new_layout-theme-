import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PromotionManagement from './PromotionManagement'

const Promotion: React.FC = () => {
  return (
    <Routes>
      <Route path="management" element={<PromotionManagement />} />
      <Route path="*" element={<PromotionManagement />} />
    </Routes>
  )
}

export default Promotion 