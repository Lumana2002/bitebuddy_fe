export const getWeatherCondition = async (): Promise<string> => {
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    const { latitude, longitude } = pos.coords;

    const res = await fetch(
      `http://localhost:8080/api/v1/weather?lat=${latitude}&lon=${longitude}`
    );
    const data = await res.json();
    return data.weather[0].main || "Unknown";  // Adjust as needed
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return "Unknown";
  }
};
