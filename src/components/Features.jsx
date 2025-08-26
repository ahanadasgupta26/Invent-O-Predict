import React, { useRef, useEffect } from 'react';

const features = [
  {
    title: 'Stock-out Date Prediction',
    description:
      'Predict exactly when your inventory will run out using advanced algorithms, helping you restock just in time.',
  },
  {
    title: 'ML-powered Forecasting Engine',
    description:
      'Leverage machine learning to analyze historical data and forecast future stock requirements with high accuracy.',
  },
  {
    title: 'Interactive Data Visualizations',
    description:
      'Explore inventory trends and patterns through intuitive, dynamic charts and graphs tailored for quick decision-making.',
  },
  {
    title: 'Low Stock Alerts & Notifications',
    description:
      'Receive instant alerts via email or dashboard notifications whenever stock levels fall below the threshold.',
  },
  {
    title: 'Secure & Encrypted Data Handling',
    description:
      'Your data is encrypted end-to-end, ensuring complete confidentiality and compliance with industry standards.',
  },
  {
    title: 'Downloadable Reports',
    description:
      'Export detailed inventory, forecast, and alert reports in multiple formats for easy sharing and offline analysis.',
  },
];

const Features = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel);
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section className="py-12 ">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Features
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 pb-4 scroll-smooth scrollbar-hide"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="max-w-[390px] min-h-[200px] flex-shrink-0 bg-blue-50 p-6 rounded-2xl shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
