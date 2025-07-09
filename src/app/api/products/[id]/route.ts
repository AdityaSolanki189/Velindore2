import { NextRequest, NextResponse } from 'next/server';
import { fetchSingleProduct } from '../../../../backend/services/products';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const productId = (await params).id;;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = await fetchSingleProduct(productId);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error); // Logs the error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}