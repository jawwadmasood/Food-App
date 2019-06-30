// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 700,
//   },
// });

// let id = 0;
// function createData(id, name, calories) {
//   id += 1;
//   return { id, name, calories };
// }

// const rows = [
//   createData(id, 'Frozen yoghurt', 159),
//   createData(id, 'Ice cream sandwich', 237, 9.0),
// //   createData('Eclair', 262, 16.0, 24, 6.0),
// //   createData('Cupcake', 305, 3.7, 67, 4.3),
// //   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// function SimpleTable(props) {
//   const { classes } = props;

//   return (
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>SNo.</TableCell>
//             <TableCell align="center">Names</TableCell>
//             <TableCell align="center">I.D</TableCell>
//             {/* <TableCell align="right">Carbs (g)</TableCell>
//             <TableCell align="right">Protein (g)</TableCell> */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
         
//             <TableRow >
//             {rows.map(row => (
//               <TableCell component="th" scope="row">
//                 {row.id}
//               </TableCell>
//               ))}
//               <TableCell align="center"></TableCell>
//               {/* <TableCell align="center">{row.calories}</TableCell> */}
//               {/* <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell> */}
//             </TableRow>
//     {/* ))} */}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }

// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles (styles) (SimpleTable);