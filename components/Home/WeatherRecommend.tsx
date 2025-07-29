
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function WeatherRecommendations() {
  const [weatherCondition, setWeatherCondition] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Get geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // 2️⃣ Fetch weather
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
        )
        .then(res => res.json())
        .then(data => {
          const condition = data.weather[0].main;
          setWeatherCondition(condition);
        })
        .catch(err => {
          console.error('Weather fetch error', err);
          setLoading(false);
        });
      },
      (err) => {
        console.error('Geolocation error', err);
        setLoading(false);
      }
    );
  }, []);

  // 3️⃣ Fetch recommendations from your own backend
  useEffect(() => {
    if (!weatherCondition) return;

    fetch(`/api/recommendations?weatherCondition=${weatherCondition}`)
      .then(res => res.json())
      .then(data => {
        setRecommendations(data);
      })
      .catch(err => console.error('Recommendation fetch error', err))
      .finally(() => setLoading(false));
  }, [weatherCondition]);

  if (loading) return <p>Loading recommendations...</p>;
  if (!recommendations.length) return <p>No recommendations found.</p>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold mb-4 text-gray-800"
      >
        Recommended for {weatherCondition} weather
      </motion.h2>
      <motion.ul 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 text-sm"
      >
        {recommendations.map((item: any, idx: number) => (
          <motion.li 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="text-amber-400">🍴</span>
            <span className="font-medium">{item.item}</span>
            <span className="text-gray-500">— ordered {item.count} times</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}    