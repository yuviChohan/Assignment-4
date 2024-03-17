"use client";

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../auth-context"; // Adjust the path as needed
import Link from "next/link";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const { user } = useUserAuth(); // Assume no need for firebaseSignOut directly here unless a logout feature on this page is desired

  // TODO: Implement fetchWeather function to fetch weather data using the OpenWeatherMap API.
  async function fetchWeather() {
    try {
      const response = await fetch("https://api.weatherapi.com/v1/current.json?key=d06e704813dd438187644537241603&q=T3J3R7&aqi=no");

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  // TODO: Implement loadWeather function that calls fetchWeather and sets the returned data into the weather state.
  async function loadWeather() {
    await fetchWeather();
  }

  useEffect(() => {
    // TODO: Check if the user is logged in. If yes, call loadWeather to fetch weather data.
    if (user) {
      loadWeather();
    }
  }, [user]); // Dependency array ensures this effect runs when the user state changes.

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-black">
      <h1 className="text-6xl text-purple-800 font-bold">
        Weather in Calgary
      </h1>
      {weather ? (
        <>
          {/* TODO: Display the weather information if available. Include temperature and weather condition. */}
          <div className="mt-20 mr-8 text-2xl text-center ">
            <h1> Current Temperature: {weather.current.temp_c}°C</h1>
            <h1 className=" mt-5"> Weather Condition: {weather.current.condition.text}</h1>
          </div>
          {/* Optional: Display additional weather details as needed. */}
          <button className="mt-10 text-2xl bg-green-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mr-10">
            {/* TODO: If needed, provide a Logout button here or ensure there's a way to navigate back or log out. */}
            <Link href="/">Home</Link>
          </button>
        </>
      ) : (
        <>
          <p>Please log in to see the weather information.</p>
          <Link href="/">
            <span className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Home
            </span>
          </Link>
        </>
      )}
    </main>
  );
}
