// Comparison chart of materials in home page.
// Reference for swatch:
// https://github.com/dtvi2412/Reactjs-Change-Product-Color

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { getComparisonChart } from "../../utils/firebase/firebase.utils";

const TABLE_HEADERS = [
  "Starting price",
  "Min. duration of work",
  "Material composition",
  "Layers & thickness",
  "No. of colour options",
  "Visibility of groutline",
  "Anti slip rating (out of 10)",
  "Suitable for:",
  "Warranty",
];

const ComparisonChart = () => {
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getComparisonChart();
      setMaterials(data);
    };
    fetchData();
  }, []);

  const transpose = (data) => {
    let transposed = TABLE_HEADERS.map((header) => ({
      id: header,
      values: data.map((material) => material[header]),
    }));
    return transposed;
  };

  const handleClick = (materialId) => {
    navigate("/shop", {
      state: {
        pebbleFloorFilter: materialId.toLowerCase().includes("pebble"),
        pebbleWallFilter: materialId.toLowerCase().includes("pebble"),
        flakeWallFilter: materialId.toLowerCase().includes("flake"),
        lasticFloorFilter: materialId.toLowerCase().includes("lastic"),
        lasticWallFilter: materialId.toLowerCase().includes("lastic"),
      },
    });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "3%" }}
      sx={{ maxWidth: { xs: "100%" }, overflowX: { xs: "auto" } }}
    >
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="comparison table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Material</Typography>
                </TableCell>
                {materials.map((material) => (
                  <TableCell key={material.id}>
                    <Typography fontWeight="bold">{material.id}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transpose(materials).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography fontWeight="bold">{row.id}</Typography>
                  </TableCell>
                  {row.values.map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                {materials.map((material) => (
                  <TableCell key={material.id}>
                    <Button
                      size="small"
                      onClick={() => handleClick(material.id)}
                    >
                      Get {material.id}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ComparisonChart;
