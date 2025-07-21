// src/common/TableViewer.jsx
import React, { useState } from 'react';
import {
    Box, Typography, Paper, Button, IconButton,
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    TablePagination, TextField, InputAdornment, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';


const TableViewer = ({ title, data, columns, onAdd, onEdit, onDelete, onView, renderActions = true }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0); // Reset to first page on search
    };

    const filteredData = data.filter(row =>
        columns.some(col =>
            String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#ffffff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                {onAdd && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        color="primary"
                    >
                        Añadir Nuevo
                    </Button>
                )}
            </Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: '300px' }}
                />
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label={`${title} table`}>
                    <TableHead>
                        <TableRow sx={{ '& th': { backgroundColor: '#f5f5f5', fontWeight: 'bold' } }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.width }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                            {renderActions && (onEdit || onDelete || onView) && (
                                <TableCell align="center" style={{ minWidth: 150 }}>Acciones</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredData
                        ).map((row) => (
                            <TableRow hover key={row.id || JSON.stringify(row)}>
                                {columns.map((column) => (
                                    <TableCell key={column.field} align={column.align || 'left'}>
                                        {column.renderCell ? column.renderCell(row) : row[column.field]}
                                    </TableCell>
                                ))}
                                {renderActions && (onEdit || onDelete || onView) && (
                                    <TableCell align="center">
                                        {onView && (
                                            <IconButton aria-label="view" onClick={() => onView(row)} color="info" size="small">
                                                <VisibilityIcon />
                                            </IconButton>
                                        )}
                                        {onEdit && (
                                            <IconButton aria-label="edit" onClick={() => onEdit(row)} color="primary" size="small">
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                        {onDelete && (
                                            <IconButton aria-label="delete" onClick={() => onDelete(row)} color="error" size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                        {filteredData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + (renderActions && (onEdit || onDelete || onView) ? 1 : 0)} align="center">
                                    No se encontraron datos.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                }
            />
        </Paper>
    );
};

export default TableViewer;