// src/common/ReportViewer.jsx
import { Box, Typography, Paper, Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const ReportViewer = ({ reportName, description, onGenerate }) => {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fbfbfb' }}>
            <Box>
                <Typography variant="h6" sx={{ color: '#424242', fontWeight: 'medium' }}>
                    {reportName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    variant="outlined"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={() => {
                        alert(`Generando PDF para: ${reportName}`);
                        onGenerate && onGenerate('pdf');
                    }}
                >
                    PDF
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    onClick={() => {
                        alert(`Generando Excel para: ${reportName}`);
                        onGenerate && onGenerate('excel');
                    }}
                >
                    Excel
                </Button>
                <Button
                    variant="contained"
                    startIcon={<InsertChartIcon />}
                    onClick={() => {
                        alert(`Mostrando en pantalla: ${reportName}`);
                        onGenerate && onGenerate('screen');
                    }}
                    color="primary"
                >
                    Ver Informe
                </Button>
            </Box>
        </Paper>
    );
};

export default ReportViewer;