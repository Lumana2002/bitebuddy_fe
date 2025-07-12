
// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY!;

// export default function WeatherRecommendations() {
//   const [weatherCondition, setWeatherCondition] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 1️⃣ Get geolocation
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;

//         // 2️⃣ Fetch weather
//         axios
//           .get(
//             https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}
//           )
//           .then((res) => {
//             const condition = res.data.weather[0].main; // "Rain", "Clear", etc.
//             setWeatherCondition(condition);
//           })
//           .catch((err) => {
//             console.error('Weather fetch error', err);
//             setLoading(false);
//           });
//       },
//       (err) => {
//         console.error('Geolocation error', err);
//         setLoading(false);
//       }
//     );
//   }, []);

//   // 3️⃣ Fetch recommendations from your own backend
//   useEffect(() => {
//     if (!weatherCondition) return;

//     axios
//       .get(/api/recommendations?weatherCondition=${weatherCondition})
//       .then((res) => {
//         setRecommendations(res.data);
//       })
//       .catch((err) => console.error('Recommendation fetch error', err))
//       .finally(() => setLoading(false));
//   }, [weatherCondition]);

//   if (loading) return <p>Loading recommendations...</p>;
//   if (!recommendations.length) return <p>No recommendations found.</p>;

//   return (
//     <div className="p-4 border rounded shadow-md">
//       <h2 className="text-lg font-semibold mb-2">
//         Recommended for {weatherCondition} weather
//       </h2>
//       <ul className="space-y-1 text-sm">
//         {recommendations.map((item: any, idx: number) => (
//           <li key={idx}>🍴 {item.item} — ordered {item.count} times</li>
//         ))}
//       </ul>
//     </div>
//   );
// }    