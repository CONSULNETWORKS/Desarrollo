// src/modules/ResourcesSupportModule.jsx
// ESTE ARCHIVO PERMANECE IGUAL AL DE LA RESPUESTA ANTERIOR.
// LOS CAMBIOS SE REFLEJAN EN LOS DATOS CARGADOS DESDE extendedLearningData.js

import React, { useState } from 'react';
import {
    Box, Typography, Divider, Button, Tabs, Tab, Paper, Grid,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip,
    List, ListItem, ListItemText, ListItemIcon, IconButton, Link
} from '@mui/material';
import TableViewer from '../TableViewer';
import DataForm from '../DataForm';
import ReportViewer from '../ReportViewer';

// Iconos relevantes
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Módulo principal
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Base de Conocimiento
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Tickets de Soporte
import DownloadIcon from '@mui/icons-material/Download'; // Recursos y Descargas
import CampaignIcon from '@mui/icons-material/Campaign'; // Anuncios
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'; // Contactos de Soporte
import AssessmentIcon from '@mui/icons-material/Assessment'; // Informes

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import LinkIcon from '@mui/icons-material/Link';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

// Datos de prueba extendidos (AHORA MÁS ENFOCADOS EN FORMACIÓN)
import {
    knowledgeBaseArticles,
    supportTickets,
    generalResources,
    announcements,
    supportContacts,
    employees, // Usado para asignar a tickets
} from '../extendedLearningData';

// --- Columnas para TableViewer (SIN CAMBIOS, YA ERAN GENÉRICAS) ---
const knowledgeBaseColumns = [
    { field: 'title', headerName: 'Título del Artículo', width: 300 },
    { field: 'category', headerName: 'Categoría', width: 150 },
    { field: 'lastUpdated', headerName: 'Última Actualización', width: 180 },
    { field: 'tags', headerName: 'Etiquetas', width: 250, renderCell: (row) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {row.tags?.map((tag, index) => <Chip key={index} label={tag} size="small" />)}
            </Box>
        )},
];

const supportTicketColumns = [
    { field: 'subject', headerName: 'Asunto', width: 250 },
    { field: 'requesterName', headerName: 'Solicitante', width: 180 },
    { field: 'status', headerName: 'Estado', width: 100, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Abierto' ? 'error' :
                    params.value === 'En Progreso' ? 'warning' :
                        params.value === 'Resuelto' ? 'success' : 'default'
            } size="small" />
        )},
    { field: 'priority', headerName: 'Prioridad', width: 100 },
    { field: 'assignedTo', headerName: 'Asignado a', width: 150, renderCell: (params) => employees.find(e => e.id === params.value)?.name || params.value },
    { field: 'submissionDate', headerName: 'Fecha Solicitud', width: 150 },
];

const generalResourceColumns = [
    { field: 'title', headerName: 'Título del Recurso', width: 300 },
    { field: 'type', headerName: 'Tipo', width: 120 },
    { field: 'uploadDate', headerName: 'Fecha Carga', width: 150 },
    { field: 'tags', headerName: 'Etiquetas', width: 250, renderCell: (row) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {row.tags?.map((tag, index) => <Chip key={index} label={tag} size="small" />)}
            </Box>
        )},
];

const announcementColumns = [
    { field: 'title', headerName: 'Título del Anuncio', width: 300 },
    { field: 'publishDate', headerName: 'Fecha Publicación', width: 180 },
    { field: 'author', headerName: 'Autor', width: 150 },
    { field: 'status', headerName: 'Estado', width: 100, renderCell: (params) => (
            <Chip label={params.value} color={params.value === 'Activo' ? 'primary' : 'default'} size="small" />
        )},
];

const supportContactColumns = [
    { field: 'department', headerName: 'Departamento', width: 180 },
    { field: 'name', headerName: 'Contacto/Equipo', width: 200 },
    { field: 'role', headerName: 'Rol', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Teléfono', width: 150 },
    { field: 'area', headerName: 'Área de Soporte', width: 250 },
];

// --- Campos de formulario (SIN CAMBIOS, YA ERAN GENÉRICAS) ---
const knowledgeBaseFormFields = [
    { name: 'title', label: 'Título del Artículo', type: 'text', halfWidth: true },
    { name: 'category', label: 'Categoría', type: 'text', halfWidth: true },
    { name: 'content', label: 'Contenido del Artículo', type: 'text', multiline: true, rows: 6 },
    { name: 'lastUpdated', label: 'Última Actualización', type: 'date', halfWidth: true },
    { name: 'tags', label: 'Etiquetas (separadas por coma)', type: 'text', halfWidth: true },
];

const supportTicketFormFields = [
    { name: 'subject', label: 'Asunto del Ticket', type: 'text', fullWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 4, fullWidth: true },
    { name: 'requesterId', label: 'Solicitante', type: 'select', options: employees.map(e => ({ value: e.id, label: `${e.name} (${e.username})` })), halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [
            { value: 'Abierto', label: 'Abierto' },
            { value: 'En Progreso', label: 'En Progreso' },
            { value: 'Resuelto', label: 'Resuelto' },
            { value: 'Cerrado', label: 'Cerrado' },
        ], halfWidth: true },
    { name: 'priority', label: 'Prioridad', type: 'select', options: [
            { value: 'Baja', label: 'Baja' },
            { value: 'Media', label: 'Media' },
            { value: 'Alta', label: 'Alta' },
        ], halfWidth: true },
    { name: 'assignedTo', label: 'Asignado a', type: 'select', options: [{value: null, label: 'Sin Asignar'}, ...employees.filter(e => ['Soporte L&D', 'Contenido L&D'].includes(e.department)).map(e => ({ value: e.id, label: `${e.name} (${e.department})` }))], halfWidth: true },
    { name: 'submissionDate', label: 'Fecha de Solicitud', type: 'date', halfWidth: true, disabled: true }, // Auto-fill on new
    { name: 'resolutionDate', label: 'Fecha de Resolución', type: 'date', halfWidth: true },
    { name: 'resolutionComments', label: 'Comentarios de Resolución', type: 'text', multiline: true, rows: 2, fullWidth: true },
];

const generalResourceFormFields = [
    { name: 'title', label: 'Título del Recurso', type: 'text', halfWidth: true },
    { name: 'type', label: 'Tipo de Recurso', type: 'select', options: [
            { value: 'Documento', label: 'Documento (PDF, DOC)' },
            { value: 'Plantilla', label: 'Plantilla (XLS, PPT)' },
            { value: 'Enlace', label: 'Enlace Web' },
            { value: 'Software', label: 'Software/Herramienta' },
            { value: 'Otro', label: 'Otro Archivo' },
        ], halfWidth: true },
    { name: 'url', label: 'URL / Ruta de Archivo', type: 'text', halfWidth: true },
    { name: 'uploadDate', label: 'Fecha de Carga', type: 'date', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 2, fullWidth: true },
    { name: 'tags', label: 'Etiquetas (separadas por coma)', type: 'text', halfWidth: true },
];

const announcementFormFields = [
    { name: 'title', label: 'Título del Anuncio', type: 'text', fullWidth: true },
    { name: 'content', label: 'Contenido del Anuncio', type: 'text', multiline: true, rows: 5, fullWidth: true },
    { name: 'publishDate', label: 'Fecha de Publicación', type: 'date', halfWidth: true },
    { name: 'author', label: 'Autor', type: 'text', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [
            { value: 'Activo', label: 'Activo' },
            { value: 'Archivado', label: 'Archivado' },
            { value: 'Borrador', label: 'Borrador' },
        ], halfWidth: true },
];

const supportContactFormFields = [
    { name: 'department', label: 'Departamento', type: 'text', halfWidth: true },
    { name: 'name', label: 'Nombre del Contacto/Equipo', type: 'text', halfWidth: true },
    { name: 'role', label: 'Rol', type: 'text', halfWidth: true },
    { name: 'email', label: 'Email', type: 'email', halfWidth: true },
    { name: 'phone', label: 'Teléfono', type: 'text', halfWidth: true },
    { name: 'area', label: 'Área de Soporte (Ej: Acceso, Contenido)', type: 'text', halfWidth: true },
];


const ResourcesSupportModule = () => {
    const [currentView, setCurrentView] = useState('knowledgeBase'); // Vista inicial
    const [formType, setFormType] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [detailData, setDetailData] = useState(null);

    // Manejador para abrir un formulario (crear o editar)
    const handleOpenForm = (type, data = {}) => {
        setFormType(type);
        setSelectedData(data);
        setCurrentView('form');
    };

    // Manejador para guardar datos (simulado)
    const handleSaveData = (data) => {
        console.log(`Guardando ${formType}:`, data);
        alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} guardado (simulado)`);
        // En un sistema real, aquí se enviarían los datos a un API y se actualizaría el estado global o se re-fetch los datos.
        // Volvemos a la vista de lista después de guardar.
        switch (formType) {
            case 'knowledgeBaseArticle':
                setCurrentView('knowledgeBase');
                break;
            case 'supportTicket':
                setCurrentView('supportTickets');
                break;
            case 'generalResource':
                setCurrentView('resourcesDownloads');
                break;
            case 'announcement':
                setCurrentView('announcements');
                break;
            case 'supportContact':
                setCurrentView('supportContacts');
                break;
            default:
                setCurrentView('knowledgeBase'); // Fallback
        }
        setFormType(null);
        setSelectedData(null);
    };

    // Manejador para cancelar la edición/creación en el formulario
    const handleCancelForm = () => {
        // Volvemos a la vista de lista anterior
        switch (formType) {
            case 'knowledgeBaseArticle':
                setCurrentView('knowledgeBase');
                break;
            case 'supportTicket':
                setCurrentView('supportTickets');
                break;
            case 'generalResource':
                setCurrentView('resourcesDownloads');
                break;
            case 'announcement':
                setCurrentView('announcements');
                break;
            case 'supportContact':
                setCurrentView('supportContacts');
                break;
            default:
                setCurrentView('knowledgeBase'); // Fallback
        }
        setFormType(null);
        setSelectedData(null);
    };

    // Manejador para ver detalles de artículos, tickets o recursos
    const handleViewDetail = (type, data) => {
        setDetailData({ type, data });
        setOpenDetailDialog(true);
    };

    const handleCloseDetailDialog = () => {
        setOpenDetailDialog(false);
        setDetailData(null);
    };

    // Función para renderizar el contenido del diálogo de detalle
    const renderDetailDialogContent = () => {
        if (!detailData) return null;
        const { type, data } = detailData;

        switch (type) {
            case 'knowledgeBaseArticle':
                return (
                    <>
                        <DialogTitle>Artículo: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Categoría: {data.category} | Última Actualización: {data.lastUpdated}
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{data.content}</Typography>
                            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {data.tags?.map((tag, index) => <Chip key={index} label={tag} size="small" />)}
                            </Box>
                        </DialogContent>
                    </>
                );
            case 'supportTicket':
                const assignedEmployee = employees.find(e => e.id === data.assignedTo);
                return (
                    <>
                        <DialogTitle>Ticket de Soporte: {data.subject}</DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Solicitante:</Typography>
                                    <Typography variant="body1">{data.requesterName}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Fecha de Solicitud:</Typography>
                                    <Typography variant="body1">{data.submissionDate}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Estado:</Typography>
                                    <Chip label={data.status} color={
                                        data.status === 'Abierto' ? 'error' :
                                            data.status === 'En Progreso' ? 'warning' :
                                                data.status === 'Resuelto' ? 'success' : 'default'
                                    } />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Prioridad:</Typography>
                                    <Typography variant="body1">{data.priority}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Asignado a:</Typography>
                                    <Typography variant="body1">{assignedEmployee ? assignedEmployee.name : 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Fecha de Resolución:</Typography>
                                    <Typography variant="body1">{data.resolutionDate || 'Pendiente'}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Descripción:</Typography>
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{data.description}</Typography>
                                </Grid>
                                {data.resolutionComments && (
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Comentarios de Resolución:</Typography>
                                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{data.resolutionComments}</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent>
                    </>
                );
            case 'generalResource':
                return (
                    <>
                        <DialogTitle>Recurso: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Tipo: {data.type} | Fecha de Carga: {data.uploadDate}
                            </Typography>
                            <Typography variant="body1" sx={{mb: 2}}>{data.description || 'No hay descripción disponible.'}</Typography>
                            {data.url && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={data.type === 'Enlace' ? <LinkIcon /> : <DownloadIcon />}
                                    onClick={() => window.open(data.url, '_blank')}
                                    sx={{ mt: 2 }}
                                >
                                    {data.type === 'Enlace' ? 'Ir al Enlace' : 'Descargar Recurso'}
                                </Button>
                            )}
                            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {data.tags?.map((tag, index) => <Chip key={index} label={tag} size="small" />)}
                            </Box>
                        </DialogContent>
                    </>
                );
            case 'announcement':
                return (
                    <>
                        <DialogTitle>Anuncio: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Autor: {data.author} | Publicado: {data.publishDate} | Estado: {data.status}
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{data.content}</Typography>
                        </DialogContent>
                    </>
                );
            default:
                return null;
        }
    };


    // Función principal para renderizar el contenido de la vista actual
    const renderCurrentViewContent = () => {
        switch (currentView) {
            case 'knowledgeBase':
                return (
                    <TableViewer
                        title="Base de Conocimiento y Artículos de Ayuda para Formación"
                        data={knowledgeBaseArticles}
                        columns={knowledgeBaseColumns}
                        onEdit={(data) => handleOpenForm('knowledgeBaseArticle', data)}
                        onDelete={(data) => console.log('Eliminar artículo:', data)}
                        onAdd={() => handleOpenForm('knowledgeBaseArticle')}
                        onView={(data) => handleViewDetail('knowledgeBaseArticle', data)}
                    />
                );
            case 'supportTickets':
                return (
                    <TableViewer
                        title="Gestión de Tickets de Soporte de Formación"
                        data={supportTickets}
                        columns={supportTicketColumns}
                        onEdit={(data) => handleOpenForm('supportTicket', data)}
                        onDelete={(data) => console.log('Eliminar ticket:', data)}
                        onAdd={() => handleOpenForm('supportTicket', { submissionDate: new Date().toISOString().slice(0, 10), status: 'Abierto' })} // Pre-llenar fecha y estado
                        onView={(data) => handleViewDetail('supportTicket', data)}
                    />
                );
            case 'resourcesDownloads':
                return (
                    <TableViewer
                        title="Recursos Generales y Descargas para la Capacitación"
                        data={generalResources}
                        columns={generalResourceColumns}
                        onEdit={(data) => handleOpenForm('generalResource', data)}
                        onDelete={(data) => console.log('Eliminar recurso:', data)}
                        onAdd={() => handleOpenForm('generalResource', { uploadDate: new Date().toISOString().slice(0, 10) })} // Pre-llenar fecha
                        onView={(data) => handleViewDetail('generalResource', data)}
                    />
                );
            case 'announcements':
                return (
                    <TableViewer
                        title="Anuncios y Comunicaciones de Formación"
                        data={announcements}
                        columns={announcementColumns}
                        onEdit={(data) => handleOpenForm('announcement', data)}
                        onDelete={(data) => console.log('Eliminar anuncio:', data)}
                        onAdd={() => handleOpenForm('announcement', { publishDate: new Date().toISOString().slice(0, 10), status: 'Activo' })} // Pre-llenar fecha y estado
                        onView={(data) => handleViewDetail('announcement', data)}
                    />
                );
            case 'supportContacts':
                return (
                    <TableViewer
                        title="Contactos Clave de Soporte para Formación"
                        data={supportContacts}
                        columns={supportContactColumns}
                        onEdit={(data) => handleOpenForm('supportContact', data)}
                        onDelete={(data) => console.log('Eliminar contacto:', data)}
                        onAdd={() => handleOpenForm('supportContact')}
                        renderActions={true} // Permite añadir/editar/eliminar
                    />
                );
            case 'reports':
                return (
                    <Box>
                        <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Informes de Soporte y Recursos de Formación
                        </Typography>
                        <ReportViewer
                            reportName="Tickets de Formación por Estado y Prioridad"
                            description="Visualización del volumen de tickets de soporte *de formación* desglosado por su estado actual y nivel de prioridad."
                            onGenerate={() => console.log('Generando informe: Tickets de Formación por Estado y Prioridad')}
                        />
                        <ReportViewer
                            reportName="Tiempo Promedio de Resolución de Tickets de Formación"
                            description="Análisis del tiempo que toma resolver los tickets *relacionados con la formación*, por categoría o asignado."
                            onGenerate={() => console.log('Generando informe: Tiempo de Resolución de Tickets de Formación')}
                        />
                        <ReportViewer
                            reportName="Artículos de Conocimiento de Formación Más Vistos"
                            description="Identifica los artículos de la base de conocimiento *relacionados con la formación* que son más consultados por los usuarios."
                            onGenerate={() => console.log('Generando informe: Artículos de Conocimiento de Formación Más Vistos')}
                        />
                    </Box>
                );
            case 'form':
                let formFields, formTitle;
                switch (formType) {
                    case 'knowledgeBaseArticle':
                        formFields = knowledgeBaseFormFields;
                        formTitle = selectedData.id ? "Editar Artículo de Base de Conocimiento de Formación" : "Crear Nuevo Artículo de Formación";
                        break;
                    case 'supportTicket':
                        formFields = supportTicketFormFields;
                        formTitle = selectedData.id ? "Editar Ticket de Soporte de Formación" : "Crear Nuevo Ticket de Soporte de Formación";
                        break;
                    case 'generalResource':
                        formFields = generalResourceFormFields;
                        formTitle = selectedData.id ? "Editar Recurso General de Capacitación" : "Añadir Nuevo Recurso General de Capacitación";
                        break;
                    case 'announcement':
                        formFields = announcementFormFields;
                        formTitle = selectedData.id ? "Editar Anuncio de Formación" : "Crear Nuevo Anuncio de Formación";
                        break;
                    case 'supportContact':
                        formFields = supportContactFormFields;
                        formTitle = selectedData.id ? "Editar Contacto de Soporte de Formación" : "Añadir Nuevo Contacto de Soporte de Formación";
                        break;
                    default:
                        return <Typography>Error: Formulario no especificado.</Typography>;
                }
                return (
                    <DataForm
                        title={formTitle}
                        fields={formFields}
                        initialData={selectedData}
                        onSubmit={handleSaveData}
                        onCancel={handleCancelForm}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 3 }}> {/* Padding general para el contenido del módulo */}
            {/* Título del módulo de Recursos y Soporte */}
            <Typography variant="h5" color="text.primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <HelpOutlineIcon sx={{ mr: 1 }} /> Módulo de Recursos y Soporte para Formación
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Menú de pestañas para navegar entre las sub-secciones del módulo */}
            <Tabs
                value={currentView === 'form' ? (formType === 'knowledgeBaseArticle' ? 'knowledgeBase' : formType === 'supportTicket' ? 'supportTickets' : formType === 'generalResource' ? 'resourcesDownloads' : formType === 'announcement' ? 'announcements' : formType === 'supportContact' ? 'supportContacts' : 'knowledgeBase') : currentView}
                onChange={(event, newValue) => setCurrentView(newValue)}
                aria-label="resources and support module tabs"
                sx={{ mb: 3 }}
            >
                <Tab label="Base de Conocimiento" value="knowledgeBase" icon={<LightbulbIcon />} iconPosition="start" />
                <Tab label="Tickets de Soporte" value="supportTickets" icon={<SupportAgentIcon />} iconPosition="start" />
                <Tab label="Recursos y Descargas" value="resourcesDownloads" icon={<DownloadIcon />} iconPosition="start" />
                <Tab label="Anuncios" value="announcements" icon={<CampaignIcon />} iconPosition="start" />
                <Tab label="Contactos de Soporte" value="supportContacts" icon={<ContactPhoneIcon />} iconPosition="start" />
                <Tab label="Informes" value="reports" icon={<AssessmentIcon />} iconPosition="start" />
            </Tabs>

            {/* Contenido dinámico según la pestaña seleccionada o la acción */}
            {renderCurrentViewContent()}

            {/* Diálogo para ver detalles (Base de Conocimiento, Tickets, Recursos, Anuncios) */}
            <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="md" fullWidth>
                {renderDetailDialogContent()}
                <DialogActions>
                    <Button onClick={handleCloseDetailDialog} color="primary">Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ResourcesSupportModule;