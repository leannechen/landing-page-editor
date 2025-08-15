import React, { useState } from 'react';
import { FAQsComponent } from '../../types/course';

interface FAQsProps {
  data: FAQsComponent;
}

const FAQs: React.FC<FAQsProps> = ({ data }) => {
  const { faqs } = data;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about this course
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-gray-400">
                  {openIndex === index ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="text-gray-700 whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {faqs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-gray-400">❓</span>
            </div>
            <p className="text-gray-500">No FAQs added yet. Use the properties panel to add frequently asked questions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQs;