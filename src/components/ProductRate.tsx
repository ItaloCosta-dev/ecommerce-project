'use client'

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

interface ProductRateProps {
  rate: number;
  count: number;
}

const ProductRate = ({ rate, count }: ProductRateProps) => {
  return (
    <div className='flex'>
      <Rating style={{ maxWidth: 100 }} value={rate}  readOnly/> {count}{' '}
      reviews
    </div>
  )
}

export default ProductRate
