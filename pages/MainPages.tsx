import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductCard, Button, Input, QuantityControl, StarRating } from '../components/Components';
import { useProductStore, useCartStore, useAuthStore } from '../stores';
import { ProductCategory, Product } from '../types';
import { CATEGORY_IMAGES } from '../data/mockData';

// --- Helper Components ---
const FilterItem = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
  <label className="flex items-center gap-3 cursor-pointer py-1.5 group select-none">
    <div
      className={`w-6 h-6 flex-shrink-0 rounded-[8px] border flex items-center justify-center transition-all duration-200 ${
        checked ? 'bg-primary border-primary' : 'bg-transparent border-gray-300'
      }`}
    >
      {checked && (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className={`text-base font-medium transition-colors ${checked ? 'text-primary' : 'text-dark group-hover:text-primary/70'}`}>{label}</span>
  </label>
);

// --- Home Page ---
export const Home: React.FC = () => {
  const products = useProductStore((s) => s.products);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = searchTerm 
    ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const bestSelling = products.slice(0, 4);
  const exclusive = products.slice(4, 6);

  return (
    <div className="pb-8 space-y-8">
      {/* Search Header for Mobile */}
      <div className="flex flex-col items-center gap-2 pt-4 px-4 md:hidden">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M15.4857 7.72895L9.62312 2.76813C9.3361 2.52554 8.90796 2.5739 8.6798 2.87274L7.54516 4.35964C8.42841 4.70678 9.20819 5.28911 9.8091 6.06899C10.4216 6.86411 10.7497 7.82823 10.75 8.82895C10.7503 9.82967 10.4227 10.7941 9.81057 11.5896L14.0722 15.1963C16.9429 17.6253 21.242 17.2711 23.6709 14.4004C26.1002 11.5298 25.746 7.23075 22.8753 4.80145C20.9328 3.15764 18.2392 2.84478 16.0336 3.9189L15.4857 7.72895Z" fill="#53B175"/></svg>
        <div className="flex items-center gap-1 text-graytext text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>
          <span className="font-semibold text-dark">Dhaka, Banasree</span>
        </div>
      </div>

      <div className="px-4">
        <div className="bg-gray-100 rounded-2xl p-3 flex items-center gap-2 text-gray-500">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           <input 
             className="bg-transparent w-full focus:outline-none text-dark" 
             placeholder="Search Store" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
           {searchTerm && (
             <button onClick={() => setSearchTerm('')}>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
             </button>
           )}
        </div>
      </div>

      {searchTerm ? (
        <div className="px-4">
           <h2 className="text-xl font-bold text-dark mb-4">Search Results</h2>
           {filteredProducts.length > 0 ? (
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
             </div>
           ) : (
             <div className="text-center py-12 text-graytext">
                <p className="text-lg">No products found for "{searchTerm}"</p>
             </div>
           )}
        </div>
      ) : (
        <>
          {/* Banner */}
          <div className="px-4">
            <div className="rounded-xl overflow-hidden relative h-32 md:h-64 bg-gradient-to-r from-orange-100 to-primary/20 flex items-center px-6">
                <div className="z-10">
                    <div className="text-primary font-bold text-xl md:text-3xl">Fresh Vegetables</div>
                    <div className="text-primary/80 text-sm md:text-lg">Get Up To 40% OFF</div>
                </div>
                <img src="https://picsum.photos/400/200?random=veg" className="absolute right-0 bottom-0 h-full object-contain opacity-80" alt="Banner"/>
            </div>
          </div>

          {/* Sections */}
          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-dark">Exclusive Offer</h2>
              <span className="text-primary text-sm font-semibold cursor-pointer">See all</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {exclusive.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>

          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-dark">Best Selling</h2>
              <span className="text-primary text-sm font-semibold cursor-pointer">See all</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {bestSelling.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>

          {/* All Products Section */}
          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-dark">Groceries</h2>
              <span className="text-primary text-sm font-semibold cursor-pointer">See all</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- Explore / Categories ---
export const Explore: React.FC = () => {
  const categories = useProductStore(s => s.categories);
  const navigate = useNavigate();

  const colors = [
    'bg-green-50 border-green-200',
    'bg-orange-50 border-orange-200',
    'bg-red-50 border-red-200',
    'bg-purple-50 border-purple-200',
    'bg-yellow-50 border-yellow-200',
    'bg-blue-50 border-blue-200',
  ];

  return (
    <div className="p-4 pb-20 md:pb-0">
      <h2 className="text-xl font-bold text-center mb-6">Find Products</h2>
      <div className="mb-6 bg-gray-100 rounded-2xl p-3 flex items-center gap-2">
         <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
         <input className="bg-transparent w-full focus:outline-none" placeholder="Search Store" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <div 
            key={cat} 
            onClick={() => navigate(`/category/${cat}`)}
            className={`border rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:shadow-md transition-shadow h-48 ${colors[idx % colors.length]}`}
          >
            <img src={CATEGORY_IMAGES[cat]} alt={cat} className="w-20 h-20 object-contain mix-blend-multiply" />
            <span className="font-bold text-dark text-sm leading-tight">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Category Detail with Filter ---
export const CategoryDetail: React.FC = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    
    // Use Store for logic
    const { 
        filteredProducts, 
        activeSubCategories, 
        activeBrands, 
        toggleSubCategory, 
        toggleBrand, 
        setCategoryFilter,
        resetFilters
    } = useProductStore();

    // Initialize View based on URL
    useEffect(() => {
        setCategoryFilter(categoryId || null);
        return () => {
            resetFilters();
        };
    }, [categoryId, setCategoryFilter, resetFilters]);

    // Filter Options
    const CATEGORY_OPTIONS = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
    const BRAND_OPTIONS = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];

    return (
        <div className="p-4 relative">
             {/* Header matching the image provided (Search Input style) */}
             <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="md:hidden">
                   <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3">
                     <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                     <input 
                        type="text" 
                        defaultValue={categoryId === 'Dairy & Eggs' ? 'Egg' : categoryId} 
                        className="bg-transparent w-full focus:outline-none font-semibold text-dark placeholder-gray-400"
                     />
                     <button className="text-gray-400 hover:text-dark">
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                     </button>
                </div>
                <button onClick={() => setShowFilter(!showFilter)} className="p-2">
                    <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </button>
             </div>

             <div className="flex gap-6 items-start">
                 {/* Desktop Filter Sidebar */}
                 <div className="hidden md:block w-72 flex-shrink-0 bg-gray-50 p-6 rounded-2xl h-fit sticky top-24">
                     <div className="mb-8">
                        <h3 className="font-bold text-xl text-dark mb-4">Categories</h3>
                        <div className="space-y-3">
                            {CATEGORY_OPTIONS.map((c) => (
                                <FilterItem 
                                    key={c} 
                                    label={c} 
                                    checked={activeSubCategories.includes(c)} 
                                    onChange={() => toggleSubCategory(c)} 
                                />
                            ))}
                        </div>
                     </div>
                     <div>
                        <h3 className="font-bold text-xl text-dark mb-4">Brand</h3>
                        <div className="space-y-3">
                            {BRAND_OPTIONS.map((b) => (
                                <FilterItem 
                                    key={b} 
                                    label={b} 
                                    checked={activeBrands.includes(b)} 
                                    onChange={() => toggleBrand(b)} 
                                />
                            ))}
                        </div>
                     </div>
                 </div>

                 {/* Results Grid */}
                 <div className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-graytext">
                            <p className="text-lg">No products found matching filters.</p>
                            <Button variant="ghost" onClick={resetFilters}>Clear Filters</Button>
                        </div>
                    )}
                 </div>
             </div>

             {/* Mobile Filter Modal */}
             {showFilter && (
                 <div className="fixed inset-0 bg-black/50 z-50 flex justify-end md:hidden">
                     <div className="bg-white w-4/5 h-full p-6 animate-slide-left rounded-l-3xl overflow-y-auto">
                        <div className="flex justify-between items-center mb-8 pt-4">
                             <h2 className="text-2xl font-bold text-dark">Filters</h2>
                             <button onClick={() => setShowFilter(false)} className="text-3xl">&times;</button>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-xl text-dark mb-4">Categories</h3>
                                <div className="space-y-3">
                                    {CATEGORY_OPTIONS.map((c) => (
                                        <FilterItem 
                                            key={c} 
                                            label={c} 
                                            checked={activeSubCategories.includes(c)} 
                                            onChange={() => toggleSubCategory(c)} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-dark mb-4">Brand</h3>
                                <div className="space-y-3">
                                    {BRAND_OPTIONS.map((b) => (
                                        <FilterItem 
                                            key={b} 
                                            label={b} 
                                            checked={activeBrands.includes(b)} 
                                            onChange={() => toggleBrand(b)} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 mb-6">
                            <Button fullWidth onClick={() => setShowFilter(false)}>Apply Filter</Button>
                        </div>
                     </div>
                 </div>
             )}
        </div>
    )
}

// --- Product Details ---
export const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useProductStore(s => s.products.find(p => p.id === id));
    const { toggleFavorite, favorites, addReview } = useProductStore();
    const { user } = useAuthStore();
    const addToCart = useCartStore(s => s.addToCart);
    
    const [qty, setQty] = useState(1);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    
    // Derived state from store
    const isFav = product ? favorites.includes(product.id) : false;
    const reviews = product?.reviews || [];
    const reviewCount = reviews.length;

    const handleSubmitReview = () => {
        if (!product || !reviewComment.trim()) return;
        
        addReview(product.id, {
            userName: user?.name || 'Guest User',
            rating: reviewRating,
            comment: reviewComment,
        });
        
        // Reset form
        setReviewComment('');
        setReviewRating(5);
        setIsReviewFormOpen(false);
    };

    if (!product) return <div>Not Found</div>;

    return (
        <div className="bg-white min-h-screen pb-24 md:pb-0">
            {/* Header Image Area */}
            <div className="relative bg-gray-50 rounded-b-[30px] overflow-hidden mb-4">
                <div className="absolute top-4 left-4 md:hidden z-10">
                    <button onClick={() => navigate(-1)}><svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                </div>
                <div className="flex justify-center py-10">
                    <img src={product.image} alt={product.name} className="h-48 md:h-80 object-contain" />
                </div>
            </div>

            <div className="px-6 md:px-0">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl font-bold text-dark">{product.name}</h1>
                    <button onClick={() => toggleFavorite(product.id)}>
                        <svg className={`w-6 h-6 ${isFav ? 'text-danger fill-current' : 'text-gray-400'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isFav ? 0 : 2}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
                <div className="text-graytext font-medium mb-6">{product.unit}, Price</div>

                <div className="flex justify-between items-center mb-8">
                    <QuantityControl quantity={qty} onDecrease={() => setQty(Math.max(1, qty - 1))} onIncrease={() => setQty(qty + 1)} size="lg" />
                    <span className="text-2xl font-bold text-dark">${(product.price * qty).toFixed(2)}</span>
                </div>

                {/* Product Detail Expansion */}
                <div className="border-t border-gray-100 py-4">
                    <details className="group" open>
                        <summary className="flex justify-between items-center font-bold text-dark cursor-pointer list-none">
                            Product Detail
                            <span className="transition group-open:rotate-180">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </span>
                        </summary>
                        <p className="text-graytext text-sm mt-2 leading-relaxed">
                            {product.description} Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart. As part of a healthful and varied diet.
                        </p>
                    </details>
                </div>
                
                <div className="border-t border-gray-100 py-4 flex justify-between items-center">
                    <span className="font-bold text-dark">Nutritions</span>
                    <div className="flex items-center gap-2">
                         <span className="bg-gray-100 text-graytext text-xs px-2 py-1 rounded">100gr</span>
                         <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t border-gray-100 py-4">
                    <details className="group">
                        <summary className="flex justify-between items-center font-bold text-dark cursor-pointer list-none">
                            <div className="flex items-center gap-2">
                                Reviews
                                <div className="flex items-center">
                                    <StarRating rating={product.rating} size="sm" readonly />
                                    <span className="text-graytext text-xs ml-1">({reviewCount})</span>
                                </div>
                            </div>
                            <span className="transition group-open:rotate-180">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </span>
                        </summary>
                        
                        <div className="mt-4 space-y-4">
                            {/* Review List */}
                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="bg-gray-50 p-3 rounded-xl">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-sm text-dark">{review.userName}</span>
                                                <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="mb-2">
                                                <StarRating rating={review.rating} size="sm" readonly />
                                            </div>
                                            <p className="text-graytext text-sm">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 text-graytext text-sm">No reviews yet. Be the first!</div>
                            )}

                            {/* Add Review Button/Form */}
                            {!isReviewFormOpen ? (
                                <Button 
                                    variant="outline" 
                                    fullWidth 
                                    onClick={() => setIsReviewFormOpen(true)}
                                    className="mt-4"
                                >
                                    Write a Review
                                </Button>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-xl p-4 mt-4 animate-slide-up">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-dark">Write a Review</h4>
                                        <button onClick={() => setIsReviewFormOpen(false)} className="text-gray-400 hover:text-dark">&times;</button>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-graytext mb-1 block">Rating</label>
                                            <StarRating 
                                                rating={reviewRating} 
                                                readonly={false} 
                                                onRatingChange={setReviewRating} 
                                                size="lg"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="text-xs font-semibold text-graytext mb-1 block">Comment</label>
                                            <textarea 
                                                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-primary"
                                                rows={3}
                                                placeholder="Tell us about the product..."
                                                value={reviewComment}
                                                onChange={(e) => setReviewComment(e.target.value)}
                                            />
                                        </div>
                                        
                                        <Button fullWidth onClick={handleSubmitReview}>Submit Review</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </details>
                </div>

                <div className="mt-4 md:mt-8">
                    <Button fullWidth onClick={() => addToCart(product, qty)}>Add To Basket</Button>
                </div>
            </div>
        </div>
    );
};

// --- Favorites ---
export const Favorites: React.FC = () => {
    const navigate = useNavigate();
    // Get real favorites from store
    const { products, favorites } = useProductStore();
    const favItems = products.filter(p => favorites.includes(p.id));
    const addToCart = useCartStore(s => s.addToCart);

    const handleAddAll = () => {
        favItems.forEach(p => addToCart(p, 1));
        navigate('/cart');
    };
    
    return (
        <div className="p-4 pb-24 md:pb-0">
            <h2 className="text-xl font-bold text-center mb-6 border-b pb-4">Favorite</h2>
            <div className="space-y-4">
                {favItems.length > 0 ? (
                    favItems.map(p => (
                        <div key={p.id} className="flex items-center justify-between border-b border-gray-100 pb-4 cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
                            <div className="flex items-center gap-4">
                                <img src={p.image} alt={p.name} className="w-16 h-16 object-contain" />
                                <div>
                                    <h4 className="font-bold text-dark">{p.name}</h4>
                                    <div className="text-graytext text-sm">{p.unit}, Price</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-dark">${p.price}</span>
                                <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 text-graytext">
                        <div className="text-4xl mb-4">💔</div>
                        <p>No favorites yet</p>
                    </div>
                )}
            </div>
            {favItems.length > 0 && (
                <div className="mt-8">
                    <Button fullWidth onClick={handleAddAll}>Add All To Cart</Button>
                </div>
            )}
        </div>
    )
}