import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BeltsSection from "../components/productsPages/BeltsSection";
import Footer from "../components/Footer";
import ProductsSection from "../components/productsPages/ProductsSection";
import BrandNavbarSection from "@/components/productsPages/BrandNavbarSection";
import MainNavbarProduct from "@/components/productsPages/MainNavbarProduct";
import { ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the full path hierarchy
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '' && segment !== 'category');

  // Format the segment for display (replace hyphens with spaces and capitalize)
  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col relative">
      <TopNavbar />
      <BrandNavbarSection />
      
      <div className="hidden lg:block">
        <MainNavbarProduct />
      </div>
      <BeltsSection />
      <br></br>
      <div className="flex-grow bg-[#F9FAFB]">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
            aria-label="Go back to home"
          >
            <ArrowLeft size={24} />
            <span>Retour à l'accueil</span>
          </button>
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a href="/" className="text-gray-700 hover:text-primary">
                    Accueil
                  </a>
                </li>
                {pathSegments.map((segment, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      <span className="mx-2.5 text-gray-400">/</span>
                      <span className={index === pathSegments.length - 1 ? "text-primary font-medium" : "text-gray-700"}>
                        {formatSegment(segment)}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
        <ProductsSection />
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;