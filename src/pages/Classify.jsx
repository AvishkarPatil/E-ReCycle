import React, { useState } from 'react';
import { Upload, Shield, X, ShoppingCart, Gift, Trash2, Wrench } from 'lucide-react';
import {Link } from'react-router-dom';

const Classify = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [condition, setCondition] = useState('working');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  if (!image) {
    setError('Please upload an image.');
    setIsSubmitting(false);
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result?.toString().split(',')[1];
    const systemInstructions = `You are an AI assistant designed to categorize electronic waste and suggest appropriate actions. You will receive an image, condition, and its description and must return the results in JSON format. The JSON should include the category, the category_id of the e-waste, and a list of suggested actions with brief explanations. The categories and their IDs are: 'Computers & Peripherals': 1, 'Mobile Devices & Communication': 2, 'Home Entertainment & Audio/Visual': 3, 'Large Household Appliances': 4, 'Small Household Appliances': 5, 'Power Tools & Industrial Equipment': 6, 'Cables, Wires & Connectors': 7, 'Electronic Components & Circuit Boards': 8, 'Batteries & Power Storage': 9, 'Lighting Equipment': 10, 'Other Electronic Devices': 11. The actions are: 'Sell', 'Donate', 'Dispose', 'Repair/Repurpose'. Action Descriptions: Sell: List the item on our marketplace. Connect with local buyers or vendors interested in purchasing used electronics or components. Donate: Offer the item to registered organizations (schools, charities, etc.) through our donation platform. Dispose: Schedule a pickup with a certified e-waste collector or vendor for responsible recycling. Repair/Repurpose: Find tutorials or connect with repair services to extend the item's lifespan or use it for DIY projects. If the image provided is not of an electronic waste item, respond with {'error':'Invalid image'}. Return the response as JSON.`;
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=AIzaSyAONVqgf8tyavJ2CTwBpKYoqpHjwF-QU70',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Image Description: ${description}. Condition: ${condition}.`,
                  },
                  {
                    inline_data: {
                      mime_type: 'image/jpeg',
                      data: base64Image,
                    },
                  },
                  {
                    text: systemInstructions,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 1,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 8192,
              responseMimeType: 'text/plain',
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let textResult = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

      // Extract JSON from markdown code block
      textResult = textResult.replace(/```json\n/g, '').replace(/```/g, '').trim();

      try {
        const parsedResult = JSON.parse(textResult);
        setClassificationResult(parsedResult);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        setError('Failed to parse classification result');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setError('Failed to classify e-waste');
    } finally {
      setIsSubmitting(false);
    }
  };
  reader.readAsDataURL(image);
};

  const handleActionSelect = (action) => {
    setSelectedAction(action);
  };

  const handleGoHome = () => {
    setImage(null);
    setPreviewUrl(null);
    setCondition('working');
    setDescription('');
    setClassificationResult(null);
    setSelectedAction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            E-Waste Classification
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your e-waste item for classification and proper disposal recommendations.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {classificationResult ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">Classification Result</h2>
              <p className="text-xl text-gray-700 text-center">Category: {classificationResult.category || 'Not specified'}</p>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 text-center">Suggested Actions:</h3>

          {classificationResult.suggested_actions && classificationResult.suggested_actions.length > 0 ? (
            <div className={`grid gap-4 ${
              classificationResult.suggested_actions.length === 1 ? 'grid-cols-1' :
              classificationResult.suggested_actions.length === 2 ? 'grid-cols-2 md:grid-cols-2 max-w-md mx-auto' :
              classificationResult.suggested_actions.length === 3 ? 'grid-cols-2 md:grid-cols-3 max-w-lg mx-auto' :
              'grid-cols-2 md:grid-cols-4'
            }`}>
              {classificationResult.suggested_actions.map((action, index) => (
                <Link
                  key={index}
                  to={
                    action.action === 'Sell' ? '/marketplace' :
                    action.action === 'Donate' ? '/donate' :
                    action.action === 'Dispose' ? '/dispose' :
                    action.action === 'Repair/Repurpose' ? '/repair' :
                    '#'
                  }
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex flex-col items-center justify-center
                    ${selectedAction === action.action
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  onClick={() => handleActionSelect(action.action)}
                >
                  {action.action === 'Sell' && <ShoppingCart className="h-6 w-6 mb-2" />}
                  {action.action === 'Donate' && <Gift className="h-6 w-6 mb-2" />}
                  {action.action === 'Dispose' && <Trash2 className="h-6 w-6 mb-2" />}
                  {action.action === 'Repair/Repurpose' && <Wrench className="h-6 w-6 mb-2" />}
                  <span className="font-bold">{action.action}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No suggested actions available.</p>
          )}
              <div className="mt-6">
                <button
                  onClick={handleGoHome}
                  className="w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload E-Waste Image
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg h-40">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                >
                  <option value="working">Working</option>
                  <option value="dead">Dead</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                  placeholder="Please provide details about the e-waste item..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !image}
                className={`w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium 
                  ${(isSubmitting || !image)
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
              >
                {isSubmitting ? 'Classifying...' : 'Classify'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Help us improve e-waste management and recycling practices.
        </div>
      </div>
    </div>
  );
};

export default Classify;