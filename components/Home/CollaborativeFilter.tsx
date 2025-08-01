"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "@/apicalls/weather";
import WeatherRecommendation from "./WeatherRecommendation";
import Loading from "../Loading";

const CollaborativeFilter = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("coords");
    if (saved) {
      try {
        setCoords(JSON.parse(saved));
        return;
      } catch (_) {}
    }

    // Ask for location permission
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = { lat: latitude, lon: longitude };
        localStorage.setItem("coords", JSON.stringify(loc));
        setCoords(loc);
      },
      (err) => {
        console.error("Location permission denied:", err.message);
      }
    );
  }, []);

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations", coords],
    queryFn: () => {
      if (!coords) return Promise.resolve([]);
      return fetchRecommendations(coords.lat, coords.lon);
    },
    enabled: !!coords,
  });

  // Transform the recommendations to match the expected type
  const transformedRecommendations = (recommendations || []).map(rec => ({
    // @ts-ignore
    food: rec.food,
    // @ts-ignore
    restaurant: rec.restaurant,
    // @ts-ignore
    score: rec.score
  }));


  return (
    <div>
      {isLoading ? <Loading/> : <WeatherRecommendation recommendations={transformedRecommendations}/>}
    </div>
  );
};

export default CollaborativeFilter;
