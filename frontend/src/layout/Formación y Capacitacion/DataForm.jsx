// src/common/DataForm.jsx
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, MenuItem } from '@mui/material';

const DataForm = ({ title, fields, initialData = {}, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 3, bgcolor: '#ffffff' }}>
            <Typography variant="h6" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
                {title}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {fields.map((field) => (
                        <Grid item xs={12} sm={field.halfWidth ? 6 : 12} key={field.name}>
                            {field.type === 'select' ? (
                                <TextField
                                    select
                                    label={field.label}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required={field.required}
                                    disabled={field.disabled}
                                >
                                    {field.options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : field.type === 'date' ? (
                                <TextField
                                    type="date"
                                    label={field.label}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    required={field.required}
                                    disabled={field.disabled}
                                    InputLabelProps={{ shrink: true }}
                                />
                            ) : (
                                <TextField
                                    label={field.label}
                                    name={field.name}
                                    type={field.type || 'text'}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline={field.multiline}
                                    rows={field.rows}
                                    required={field.required}
                                    disabled={field.disabled}
                                    placeholder={field.placeholder}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default DataForm;