import React from 'react'
import { useSelector } from 'react-redux';
import { selectedProduct } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';

function ProductInfo() {
  const { product } = useSelector(selectedProduct);
  console.log(product)

  return (
    <div className='w-[100vw] md:w-[75vw] min-h-[80vh] mx-auto flex flex-col justify-center items-center gap-10 text-[var(--textColor)]'>
      <ProductCard product={product} />
    </div>
  )
}

export default ProductInfo