export interface WeatherRecommendation {
  item: string;
  count: number;
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<string | null> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error("Failed to fetch weather");
    return null;
  }

  const data = await res.json();
  return data.weather?.[0]?.main?.toLowerCase() || null;
}


export async function fetchRecommendations(lat: number, lon: number): Promise<WeatherRecommendation[]> {
  try {
    const weatherCondition = await fetchWeatherByCoords(lat, lon);
    if (!weatherCondition) throw new Error("No weather condition found");

    console.log(weatherCondition)
    const apiUrl = process.env.NEXT_PUBLIC_APP_BASE_URL || '';
    const url = `http://localhost:8080/api/recommendations?weather=${encodeURIComponent(weatherCondition)}`;

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch recommendations: ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching recommendations:", error instanceof Error ? error.message : error);
    return [];
  }
}
