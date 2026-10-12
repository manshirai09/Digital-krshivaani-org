import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Star, ShoppingBag, Plus } from 'lucide-react';

const SmartShop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Tools'];

  const products = [
    {
      id: 1,
      name: 'Premium Wheat Seeds (PBW-343)',
      category: 'Seeds',
      price: '1,250',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=300&h=300',
      tag: 'Best Seller'
    },
    {
      id: 2,
      name: 'Organic NPK Fertilizer (5kg)',
      category: 'Fertilizers',
      price: '850',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=300&h=300',
      tag: 'Eco Friendly'
    },
    {
      id: 3,
      name: 'Smart Soil Moisture Sensor',
      category: 'Tools',
      price: '2,400',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=300&h=300',
      tag: 'New Arrival'
    },
    {
      id: 4,
      name: 'Broad Spectrum Fungicide',
      category: 'Pesticides',
      price: '450',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: 5,
      name: 'Hybrid Tomato Seeds',
      category: 'Seeds',
      price: '120',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: 6,
      name: 'Heavy Duty Garden Trowel',
      category: 'Tools',
      price: '350',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Smart Shop</h2>
            <p className="text-gray-500 text-sm">Quality inputs for your farm delivered home.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm w-full md:w-64">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full"
            />
          </div>
          <button className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">2</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-gray-500 border border-gray-100 hover:border-indigo-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-indigo-600 shadow-sm">
                  {product.tag}
                </div>
              )}
              <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                <span className="text-[10px] text-gray-400 ml-1">(120 Reviews)</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-xs text-gray-400 mb-4">{product.category}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-medium">Price</span>
                  <p className="text-xl font-black text-gray-900">â‚¹{product.price}</p>
                </div>
                <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-50">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartShop;
