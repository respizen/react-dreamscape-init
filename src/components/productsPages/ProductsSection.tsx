import React, { useState } from "react";
import ProductCard from "../ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../services/productsApi";
import { useParams, useLocation } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { Product } from "@/types/product";

const ProductsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { category } = useParams();
  const location = useLocation();

  // Parse the path to get filter parameters
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '' && segment !== 'category');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', category, ...pathSegments],
    queryFn: fetchAllProducts,
    select: (data) => {
      return data.filter((product: Product) => {
        // If we're on a specific category path, apply filters
        if (pathSegments.length > 0) {
          const [type, category, itemGroup] = pathSegments;
          
          // Convert to lowercase for case-insensitive comparison
          const productType = product.type_product.toLowerCase();
          const productCategory = product.category_product.toLowerCase();
          const productItemGroup = product.itemGroup.toLowerCase();
          
          // Match based on available path segments
          const typeMatch = !type || productType === type.toLowerCase();
          const categoryMatch = !category || productCategory === category.toLowerCase();
          const itemGroupMatch = !itemGroup || productItemGroup === itemGroup.toLowerCase();
          
          return typeMatch && categoryMatch && itemGroupMatch;
        }
        
        // If no specific filters, return all products
        return true;
      });
    }
  });

  if (error) {
    console.error('Error loading products:', error);
    return <div className="text-center text-red-500">Failed to load products</div>;
  }

  const filteredProducts = products || [];
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
            ))
          ) : (
            currentProducts.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-[#471818] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;