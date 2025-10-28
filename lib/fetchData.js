// utils/fetchData.js
export async function fetchData(summonerName, tag) {
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summonerName, tag }),
    });

    console.log("API response status:", res.status);

    if (!res.ok) {
      let errorMessage = `Request failed with status ${res.status}`;

      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        // If we can't parse the error response, use the status text
        errorMessage = res.statusText || errorMessage;
      }

      // Create a more descriptive error based on status code
      if (res.status === 404) {
        throw new Error("Summoner not found. Please verify the name and tag.");
      } else if (res.status === 400) {
        throw new Error("Invalid request format. Please use Name#TAG format.");
      } else if (res.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again."
        );
      } else if (res.status >= 500) {
        throw new Error("Server error. Please try again in a few minutes.");
      } else {
        throw new Error(errorMessage);
      }
    }

    const data = await res.json();

    // Validate that we received the expected data structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid response format from server.");
    }

    if (!data.summary || !data.matches) {
      throw new Error("Incomplete data received. Please try again.");
    }

    return data;
  } catch (error) {
    // Handle network errors and other fetch-related issues
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error. Please check your internet connection.");
    }

    // Re-throw our custom errors
    if (
      error.message.includes("Summoner not found") ||
      error.message.includes("Invalid request") ||
      error.message.includes("Rate limit") ||
      error.message.includes("Server error") ||
      error.message.includes("Network error") ||
      error.message.includes("Invalid response") ||
      error.message.includes("Incomplete data")
    ) {
      throw error;
    }

    // For any other errors, provide a generic message
    console.error("Unexpected error in fetchData:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
}
