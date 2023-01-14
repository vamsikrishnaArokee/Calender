import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

export default function BasicTable() {
  const [dateObj, setDayObj] = useState(moment("2002-5"));
  const [months, setMonths] = useState(moment.months());
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const firstDay = moment(dateObj).startOf("month").format("d");
    const noOfDaysInMonth = moment(dateObj).daysInMonth();
    console.log("test days in month", noOfDaysInMonth);
    console.log("test days in firstDay", firstDay);
    let blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push({ day: "-" });
    }
    let daysInMonth = [];
    for (let d = 1; d <= noOfDaysInMonth; d++) {
      daysInMonth.push({
        day: d,
        isCurrentDate: d == moment(dateObj).format("DD")
      });
    }
    // setDayObj(firstDay)
    var totalSlots = [...blanks, ...daysInMonth];
    // console.log("test days in a month", totalSlots);
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows
        cells = []; // empty container
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) {
        // when end loop we add remain date
        rows.push(cells);
      }
    });
    setRows(rows);
    console.log("rows in a month", rows);
  }, []);

  const weekDayShort = moment.weekdaysShort();
  return (
    <>
      <Typography variant="h3" component="h3" align="center">
        {dateObj.format("MMMM")}
      </Typography>
      {/* {months.map((each) => <Typography variant="h3" component="h3" align="center">
        {each} 
      </Typography>)} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {weekDayShort.map((day, i) => (
                <TableCell align="center">{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.map((each) => (
                  <TableCell component="th" scope="row" height="100">
                    {each.day} {each.isCurrentDate ? "yes" : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
