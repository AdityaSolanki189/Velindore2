// // ProductGrid.jsx
// import ProductCard from './product';

// const ProductGrid = ({ products = [] }) => {

//   const displayProducts = products.length > 0 
//     ? products 
//     : Array(7).fill(null);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
//         {displayProducts.map((product, index) => (
//           <ProductCard 
//             key={product?.id || `placeholder-${index}`} 
//             product={product} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;
