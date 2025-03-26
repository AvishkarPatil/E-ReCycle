import React from 'react';
import { Wrench, Video, Book, Users } from 'lucide-react';

export default function Repair() {
  const resources = [
    {
      title: 'DIY Smartphone Screen Repair',
      type: 'Video Tutorial',
      icon: <Video className="text-blue-600" size={24} />,
      link: '#',
    },
    {
      title: 'Laptop Battery Replacement Guide',
      type: 'Article',
      icon: <Book className="text-green-600" size={24} />,
      link: '#',
    },
    {
      title: 'Local Repair Shops',
      type: 'Directory',
      icon: <Wrench className="text-yellow-600" size={24} />,
      link: '#',
    },
    {
      title: 'E-Waste Repurposing Community',
      type: 'Forum',
      icon: <Users className="text-purple-600" size={24} />,
      link: '#',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Repair and Repurpose Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    {resource.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-800">{resource.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{resource.type}</p>
                <a
                  href={resource.link}
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  View Resource
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}