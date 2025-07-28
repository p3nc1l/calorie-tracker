import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const searchFoods = async (query: string) => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_BASE_URL + "/search-foods", {
      params: { "q": query }
    });
    return response.data || "";
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
}

const Foods = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<[]>([]);

  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length > 2) {
        const result = await searchFoods(debouncedQuery);
        setResults(result.foods.food || []);
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [debouncedQuery]);

  return (
    <Box className={"w-screen flex-none flex flex-col items-center"}>
      <Box className="w-full max-w-7xl px-4 mb-16">
        <Box className="mt-16 max-w-2xl mx-auto">
          <TextField fullWidth label="Search Foods" variant="outlined" value={query} onChange={(e) => setQuery(e.target.value)} />
        </Box>
        {results.length > 0 && <TableContainer component={Paper} className="mt-8">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Food</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((food: { food_name: string, food_description: string, brand_name?: string }) => (
                <TableRow key={food.food_name}>
                  <TableCell>{food.food_name}</TableCell>
                  <TableCell align="right">{food.brand_name || "Non-branded"}</TableCell>
                  <TableCell align="right">{food.food_description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
      </Box>
    </Box>
  )
}

export default Foods