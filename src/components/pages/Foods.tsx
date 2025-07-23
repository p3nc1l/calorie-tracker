import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
//import axios from "axios";

const searchFoods = async (query: string) => {
  try {
    //fetch api and return response
    return query || "";
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
}

const Foods = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        const result = await searchFoods(query);
        setResults(result || "");
      } else {
        setResults("");
      }
    };
    fetchResults();
  }, [query]);

  return (
    <Box className={"w-screen flex-none flex flex-col items-center"}>
      <Box className="w-full max-w-7xl px-4 mb-16">
        <Box className="mt-16">
          <TextField fullWidth label="Search Foods" variant="outlined" value={query} onChange={(e) => setQuery(e.target.value)} />
          {results}
        </Box>
      </Box>
    </Box>
  )
}

export default Foods