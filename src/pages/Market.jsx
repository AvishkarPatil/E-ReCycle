import React, { useState, useRef } from 'react';
import { Heart, ShoppingCart, Smartphone, Tv, Home, Coffee, Cable, Cpu, Battery, Lightbulb, MoreHorizontal, Wrench, ChevronLeft, ChevronRight } from "lucide-react";


const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className, ...props }) => (
  <span className={`px-2 py-1 bg-green-500 text-white text-xs rounded-full ${className}`} {...props}>
    {children}
  </span>
);

const categories = [
  { id: 'all', name: 'All', icon: <ShoppingCart size={24} />, color: 'bg-blue-100' },
  { id: 1, name: 'Mobile Devices', icon: <Smartphone size={24} />, color: 'bg-green-100' },
  { id: 2, name: 'Home Entertainment', icon: <Tv size={24} />, color: 'bg-yellow-100' },
  { id: 3, name: 'Large Appliances', icon: <Home size={24} />, color: 'bg-red-100' },
  { id: 4, name: 'Small Appliances', icon: <Coffee size={24} />, color: 'bg-purple-100' },
  { id: 5, name: 'Tools', icon: <Wrench size={24} />, color: 'bg-pink-100' },
  { id: 6, name: 'Cables', icon: <Cable size={24} />, color: 'bg-indigo-100' },
  { id: 7, name: 'Computer Parts', icon: <Cpu size={24} />, color: 'bg-teal-100' },
  { id: 8, name: 'Batteries', icon: <Battery size={24} />, color: 'bg-orange-100' },
  { id: 9, name: 'Lighting', icon: <Lightbulb size={24} />, color: 'bg-cyan-100' },
  { id: 10, name: 'Other Devices', icon: <MoreHorizontal size={24} />, color: 'bg-gray-100' },
];


export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categoriesRef = useRef(null);

const products = [
  {
    id: 1,
    name: "Refurbished iPhone 8",
    price: 14999,
    image: "https://refurbished.techyuga.com/wp-content/uploads/2020/12/Refurbished-Apple-iPhone-8.jpg",
    category: 1, // Mobile Devices
    condition: "Excellent",
    isRefurbished: true,
  },
  {
    id: 2,
    name: "Used Dell Latitude E7470 Laptop",
    price: 22999,
    image: "https://www.gorefurbo.com/cdn/shop/products/DellLatitude7470_547a8a65-241e-4fce-874e-d3bad1140a67.png?v=1677933817",
    category: 7, // Computer Parts
    condition: "Good",
    isRefurbished: false,
  },
  {
    id: 3,
    name: "Refurbished Sony 40\" LED TV",
    price: 11999,
    image: "https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=900",
    category: 2, // Home Entertainment
    condition: "Very Good",
    isRefurbished: true,
  },
  {
    id: 4,
    name: "Used Fitbit Charge 3",
    price: 3499,
    image: "https://di2ponv0v5otw.cloudfront.net/posts/2024/07/02/6684345a4fbbfd8717c36eef/m_6684345a4fbbfd8717c36ef0.jpeg",
    category: 1, // Mobile Devices
    condition: "Fair",
    isRefurbished: false,
  },
  {
    id: 5,
    name: "Refurbished Canon PIXMA Printer",
    price: 4599,
    image: "https://m.media-amazon.com/images/I/51Q+WJ6+JrL.jpg",
    category: 10, // Other Devices
    condition: "Excellent",
    isRefurbished: true,
  },
  {
    id: 6,
    name: "Used Keurig K-Classic Coffee Maker",
    price: 2999,
    image: "https://assets.wfcdn.com/im/05034211/resize-h500-w500%5Ecompr-r85/6273/62730390/default_name.jpg",
    category: 4, // Small Appliances
    condition: "Good",
    isRefurbished: false,
  },
  {
    id: 7,
    name: "Refurbished Samsung Galaxy S9",
    price: 9999,
    image: "https://247mobileshop.co.uk/cdn/shop/products/samsung-galaxy-s9-plus-sm-g965fzbdins-original-imaf372ukhepfgcu.jpg?v=1665494239",
    category: 1, // Mobile Devices
    condition: "Very Good",
    isRefurbished: true,
  },
  {
    id: 8,
    name: "Used LG 7kg Front Load Washing Machine",
    price: 13999,
    image: "https://5.imimg.com/data5/GLADMIN/Default/2022/3/TD/KG/PL/24641887/used-front-loading-washing-machines-500x500.jpg",
    category: 3, // Large Appliances
    condition: "Good",
    isRefurbished: false,
  },
  {
    id: 9,
    name: "Refurbished Bose SoundLink II Bluetooth Speaker",
    price: 7499,
    image: "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/speakers/soundlink_mini_ii/product_silo_images/slmiise_silver_EC_hero.PNG/jcr:content/renditions/cq5dam.web.1280.1280.png",
    category: 2, // Home Entertainment
    condition: "Excellent",
    isRefurbished: true,
  },
  {
    id: 10,
    name: "Used Apple iPad Air 2",
    price: 12999,
    image: "https://di2ponv0v5otw.cloudfront.net/posts/2022/02/12/62083c187f80d275c9517b24/m_62083c3ba4de4173d04d2452.jpg",
    category: 1, // Mobile Devices
    condition: "Good",
    isRefurbished: false,
  },
  {
    id: 11,
    name: "Refurbished Philips Air Fryer",
    price: 3999,
    image: "https://ik.imagekit.io/anscommerce/image/tr:e-usm-2-2-0.8-0.024,dpr-3,h-1000,w-1000,q-85,cm-pad_resize/data/philips/08sept2023/259-2022_02_06-new70.jpg",
    category: 4, // Small Appliances
    condition: "Very Good",
    isRefurbished: true,
  },
  {
    id: 12,
    name: "Used Lenovo ThinkPad Laptop Charger",
    price: 999,
    image: "https://adapterkart.com/cdn/shop/files/51RYMGeIoML._SL1020.jpg?v=1683975516&width=416",
    category: 6, // Cables
    condition: "Fair",
    isRefurbished: false,
  }
];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

    const handleScroll = (scrollOffset) => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">E-Waste Marketplace</h1>

          {/* Categories Section */}
          <div className="mb-8 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
              <div className="flex sm:hidden">
                <button onClick={() => handleScroll(-100)} className="p-2 text-gray-600 hover:text-gray-900">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => handleScroll(100)} className="p-2 text-gray-600 hover:text-gray-900">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            <div
              ref={categoriesRef}
              className="flex overflow-x-auto sm:flex-wrap gap-4 pb-4 sm:pb-0 scrollbar-hide"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full ${category.color} transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  <div className="text-gray-800">{category.icon}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group">
  <div className="relative">
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <Button
        className="absolute top-2 right-2 rounded-full bg-white/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className="h-5 w-5 text-gray-600" />
        <span className="sr-only">Add to wishlist</span>
      </Button>
              {product.isRefurbished && <Badge className="absolute top-2 left-2 bg-blue-500">Refurbished</Badge>}
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-gray-600 mb-1">
              {categories.find(cat => cat.id === product.category)?.name || 'Uncategorized'}
            </div>
            <h3 className="font-medium text-lg mb-2 text-gray-800 truncate">{product.name}</h3>
            <div className="flex justify-between items-center">
              <div className="font-bold text-gray-900">Rs.{product.price.toFixed(2)}</div>
              <div className="text-sm font-medium text-gray-500">Condition: {product.condition}</div>
            </div>
          </div>
          <div className="p-4 pt-0">
            <Button className="w-full flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}