"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Heart, Check, X, Box, Undo2 } from "lucide-react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import dynamic from "next/dynamic";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { fetchSingleProduct } from '@/backend/services/products'; 
import toast, { Toaster } from 'react-hot-toast';

const Product3DModel = dynamic(() => import("../../components/product3DModel"), {
  ssr: false,
});

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  status: string;
  quantity: number;
  categoryId: string;
  labelId: string | null;
  categoryName: string;
  threeDImage: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string[];
  rating?: number;
  reviews?: number;
  stock?: number;
  categories?: string[];
  tag?: string;
  discount?: number;
  hot?: boolean;
}

type NavigationDirection = "next" | "prev";

export default function ProductPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [show3D, setShow3D] = useState<boolean>(false);
  const [show3DLightbox, setShow3DLightbox] = useState<boolean>(false);

  const { id } = useParams();

  const fetchProductById = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      const foundProduct = await fetchSingleProduct(productId);

      if (foundProduct) {
        const transformedProduct: Product = {
          ...foundProduct,
          rating: 5,
          reviews: 1,
          stock: foundProduct.quantity,
          categories: [foundProduct.categoryName],
          tag: foundProduct.categoryName,
        };
        setProduct(transformedProduct);
      } else {
        throw new Error('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
      toast.error('Error fetching product');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductById(id as string);
    } else {
      setError('No product ID provided');
      setLoading(false);
    }
  }, [id]);

  // Move navigateImage function BEFORE the useEffect that uses it
  const navigateImage = useCallback((direction: NavigationDirection): void => {
    setShow3DLightbox(false);
    setShow3D(false);
    setSelectedImage((prev) => {
      if (!product) return prev;
      const images = product.imageUrl && product.imageUrl.length > 0 
        ? product.imageUrl 
        : [
            '/assets/bed room.jpg', 
            '/assets/image-2.png',
            '/assets/image-2.png',
            '/assets/image-1.png',
            '/assets/image-4.png',
            '/assets/image-3.png',
          ];
      if (direction === "next") {
        return prev === images.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? images.length - 1 : prev - 1;
      }
    });
  }, [product]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen, navigateImage]);

  const openLightbox = (index: number): void => {
    setSelectedImage(index);
    setLightboxOpen(true);
    setShow3DLightbox(false);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = (): void => {
    setLightboxOpen(false);
    setShow3DLightbox(false);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-6xl mx-auto p-4 font-sans">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading product...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-6xl mx-auto p-4 font-sans">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">
              {error || 'Product not found'}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const images: string[] = product.imageUrl && product.imageUrl.length > 0 
    ? product.imageUrl 
    : [
        '/assets/bed room.jpg', 
        '/assets/image-2.png',
        '/assets/image-2.png',
        '/assets/image-1.png',
        '/assets/image-4.png',
        '/assets/image-3.png',
      ];

  const has3DModel = product.threeDImage && product.threeDImage.trim() !== '';

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-6xl mx-auto p-4 font-sans">
        <div className="text-sm text-gray-600 mb-4">
          {product.tag || product.categoryName || 'Product'}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* MAIN IMAGE/3D AREA */}
            <div
              className="w-full aspect-square border border-gray-200 mb-4 overflow-hidden cursor-pointer bg-white rounded-lg shadow-sm relative group"
              onClick={() => {
                if (!show3D) openLightbox(selectedImage);
              }}
            >
              {/* Show 3D if toggled and threeDImage available, else image */}
              {show3D && has3DModel ? (
                <Product3DModel url={product.threeDImage} />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform hover:scale-105 duration-300 cursor-pointer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/placeholder.jpg';
                    }}
                  />
                </div>
              )}

              {/* 3D Model Icon - Only show if product has 3D model */}
              {has3DModel && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShow3D((v) => !v);
                  }}
                  className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 group-hover:opacity-100 opacity-80 cursor-pointer"
                  title={show3D ? "Close 3D Model" : "View 3D Model"}
                >
                  {show3D ? (
                    <Undo2 className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
                  ) : (
                    <Box className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
                  )}
                </button>
              )}
            </div>

            <div className="grid grid-cols-6 gap-2">
              {images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`aspect-square border ${
                    selectedImage === index
                      ? "border-black border-2"
                      : "border-gray-200"
                  } cursor-pointer overflow-hidden bg-white rounded relative`}
                  onClick={() => {
                    setSelectedImage(index);
                    setShow3D(false); // Always return to image when thumbnail is clicked
                  }}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 20vw, 10vw"
                    className="object-cover hover:scale-110 transition-transform duration-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/placeholder.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- Product Info --- */}
          <div className="flex-1 lg:pl-4">
            <h1 className="text-3xl font-bold mb-4 text-black">{product.name}</h1>
            
            {/* Rating section */}
            {product.rating && (
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i: number) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < product.rating! ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviews || 0} customer review)
                </span>
              </div>
            )}
            
            <div className="text-sm text-gray-600 mb-4">SKU: {product.id}</div>
            
            <div className="text-3xl text-black font-bold mb-4">${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price || 0).toFixed(2)}</div>
            
            <div className="mb-6 text-gray-600 leading-relaxed">
              <p>{product.description || 'No description available.'}</p>
            </div>

            <div className="flex items-center mb-6 text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <span>{product.stock || product.quantity || 0} in stock</span>
            </div>
            
            <div className="flex gap-3 mb-6">
              <div className="w-20">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuantity(parseInt(e.target.value) || 1)
                  }
                  className="w-full h-12 px-2 text-center border text-black border-gray-300 rounded"
                />
              </div>
              
              <button className="flex-1 bg-black text-white h-12 font-semibold rounded hover:bg-gray-800 transition-colors">
                ADD TO CART
              </button>
              
              <button 
                className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded hover:border-black transition-colors"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${isFavorite ? 'fill-red-500 text-red-500' : 'stroke-gray-500'}`} 
                  stroke={isFavorite ? 'none' : 'gray'} 
                  strokeWidth={1.5}
                />
              </button>
            </div>
            
            <div className="mb-4 text-sm text-gray-600">
              <span>Categories: </span>
              {product.categories && product.categories.length > 0 ? (
                product.categories.map((category: string, index: number) => (
                  <span key={index} className="text-black">
                    {category}{index < product.categories!.length - 1 ? ', ' : ''}
                  </span>
                ))
              ) : (
                <span className="text-black">{product.categoryName || 'No category'}</span>
              )}
            </div>
            
            <div className="mb-4 text-sm text-gray-600">
              <span>Tag: </span>
              <span className="text-black">{product.tag || product.categoryName || 'No tag'}</span>
            </div>
            
            <Link href={`/checkout?productId=${product.id}`}>
              <div className="block w-full bg-black text-white py-3 mb-6 font-semibold rounded text-center hover:bg-gray-800 transition-colors">
                BUY IT NOW
              </div>
            </Link>
            
            <div className="border border-gray-200 p-4 rounded mt-6">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xl">🔥</span>
                <span className="text-red-500 font-semibold">
                  SPECIAL OFFERS
                </span>
              </div>
              <div className="text-sm text-gray-800">
                Get 1,000/- Off on your first order!! USE CODE HEY1000
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX for images/3D */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <span className="text-2xl px-1">&lsaquo;</span>
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <span className="text-2xl px-1">&rsaquo;</span>
            </button>
            <div className="w-full h-full max-w-4xl max-h-4xl flex items-center justify-center">
              <div className="relative w-full h-full max-w-3xl max-h-3xl bg-white bg-opacity-5 rounded-lg">
                {/* Show 3D if toggled and threeDImage available, else image */}
                {show3DLightbox && has3DModel ? (
                  <Product3DModel url={product.threeDImage} />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={images[selectedImage]}
                      alt={product.name}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/placeholder.jpg';
                      }}
                    />
                  </div>
                )}

                {/* 3D Model Icon in Lightbox - Only show if product has 3D model */}
                {has3DModel && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShow3DLightbox((v) => !v);
                    }}
                    className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 opacity-90"
                    title={show3DLightbox ? "Close 3D Model" : "View 3D Model"}
                  >
                    {show3DLightbox ? (
                      <Undo2 className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
                    ) : (
                      <Box className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2 mx-4 rounded">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}