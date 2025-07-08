import { NextResponse } from 'next/server';
import { fetchAllProducts, fetchProductsByCategory, fetchProductsByLabel } from '../../../backend/services/products';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const label = searchParams.get('label');
    
    let products;
    
    if (label) {
      // Fetch products by label
      products = await fetchProductsByLabel(label);
    } else if (category && category !== 'All Products') {
      // Fetch products by category
      products = await fetchProductsByCategory(category);
    } else {
      // Fetch all products
      products = await fetchAllProducts();
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}