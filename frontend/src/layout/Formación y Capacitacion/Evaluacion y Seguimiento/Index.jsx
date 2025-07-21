// src/modules/EvaluationSupportModule.jsx
import React, { useState } from 'react';
import {
    Box, Typography, Divider, Button, Tabs, Tab, Paper, Grid,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip,
    List, ListItem, ListItemText, ListItemIcon, IconButton, Link,
    Avatar, Tooltip, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import TableViewer from '../TableViewer';
import DataForm from '../DataForm';
import ReportViewer from '../ReportViewer';

// Iconos relevantes para el módulo de Evaluación y Soporte
import AssessmentIcon from '@mui/icons-material/Assessment'; // Módulo principal
import LoopIcon from '@mui/icons-material/Loop'; // Ciclos de Evaluación
import ReviewsIcon from '@mui/icons-material/Reviews'; // Revisiones de Desempeño
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Objetivos
import PsychologyIcon from '@mui/icons-material/Psychology'; // Planes de Desarrollo
import GavelIcon from '@mui/icons-material/Gavel'; // Competencias
import BarChartIcon from '@mui/icons-material/BarChart'; // Evaluaciones de Competencias
import ForumIcon from '@mui/icons-material/Forum'; // Encuestas de Compromiso
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'; // Preguntas de Encuesta
import PollIcon from '@mui/icons-material/Poll'; // Respuestas de Encuesta
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Gestión de Tickets
import CategoryIcon from '@mui/icons-material/Category'; // Categorías de Tickets
import SpeedIcon from '@mui/icons-material/Speed'; // SLAs
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'; // Agentes de Soporte
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Base de Conocimiento
import ArticleIcon from '@mui/icons-material/Article'; // Artículos KB
import SettingsIcon from '@mui/icons-material/Settings'; // Configuración de Soporte
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Informes

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


// Datos de prueba extendidos para Evaluación y Soporte
import {
    employees,
    performanceCycles, performanceReviews, employeeGoals, developmentPlans,
    competencyCatalog, competencyAssessments,
    engagementSurveys, surveyQuestions, engagementSurveyResponses,
    supportTicketCategories, serviceLevelAgreements, supportAgents, supportTickets,
    kbArticleCategories, knowledgeBaseArticles,
} from './extendedEvaluationSupportData';

// --- Columnas para TableViewer ---

// Evaluación de Desempeño
const performanceCycleColumns = [
    { field: 'name', headerName: 'Nombre del Ciclo', width: 250 },
    { field: 'type', headerName: 'Tipo', width: 120 },
    { field: 'startDate', headerName: 'Fecha Inicio', width: 130 },
    { field: 'endDate', headerName: 'Fecha Fin', width: 130 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Activo' ? 'success' :
                    params.value === 'Cerrado' ? 'error' : 'warning'
            } size="small" />
        )},
    { field: 'description', headerName: 'Descripción', width: 300 },
];

const performanceReviewColumns = [
    { field: 'employeeName', headerName: 'Empleado', width: 180 },
    { field: 'managerName', headerName: 'Gerente', width: 180 },
    { field: 'cycleName', headerName: 'Ciclo Evaluación', width: 200, valueGetter: (params) => performanceCycles.find(c => c.id === params.row.cycleId)?.name || params.row.cycleId },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Finalizado' ? 'success' :
                    params.value === 'En Curso' ? 'primary' : 'warning'
            } size="small" />
        )},
    { field: 'overallRating', headerName: 'Calificación General', width: 150, valueFormatter: (params) => params.value || 'N/A' },
    { field: 'lastUpdate', headerName: 'Última Actualización', width: 150 },
];

const employeeGoalColumns = [
    { field: 'employeeName', headerName: 'Empleado', width: 180, valueGetter: (params) => employees.find(e => e.id === params.row.employeeId)?.name || params.row.employeeId },
    { field: 'title', headerName: 'Objetivo', width: 300 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Completado' ? 'success' :
                    params.value === 'En Progreso' ? 'primary' : 'warning'
            } size="small" />
        )},
    { field: 'dueDate', headerName: 'Fecha Límite', width: 150 },
    { field: 'metric', headerName: 'Métrica', width: 150 },
    { field: 'target', headerName: 'Meta', width: 100 },
    { field: 'current', headerName: 'Actual', width: 100 },
];

const developmentPlanColumns = [
    { field: 'employeeName', headerName: 'Empleado', width: 180 },
    { field: 'managerName', headerName: 'Gerente', width: 180 },
    { field: 'title', headerName: 'Plan de Desarrollo', width: 300 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Activo' ? 'success' : 'default'
            } size="small" />
        )},
    { field: 'startDate', headerName: 'Fecha Inicio', width: 130 },
    { field: 'endDate', headerName: 'Fecha Fin', width: 130 },
];

// Gestión de Competencias
const competencyCatalogColumns = [
    { field: 'name', headerName: 'Nombre Competencia', width: 250 },
    { field: 'category', headerName: 'Categoría', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 400 },
];

const competencyAssessmentColumns = [
    { field: 'employeeName', headerName: 'Empleado', width: 180 },
    { field: 'competencyName', headerName: 'Competencia', width: 250 },
    { field: 'assessorName', headerName: 'Evaluador', width: 180 },
    { field: 'rating', headerName: 'Calificación (1-5)', type: 'number', width: 150 },
    { field: 'assessmentDate', headerName: 'Fecha Evaluación', width: 150 },
];

// Encuestas de Clima y Compromiso
const engagementSurveyColumns = [
    { field: 'title', headerName: 'Título de Encuesta', width: 300 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Activa' ? 'success' :
                    params.value === 'Cerrada' ? 'error' : 'warning'
            } size="small" />
        )},
    { field: 'startDate', headerName: 'Fecha Inicio', width: 130 },
    { field: 'endDate', headerName: 'Fecha Fin', width: 130 },
    { field: 'totalParticipants', headerName: 'Participantes', type: 'number', width: 120 },
    { field: 'completionRate', headerName: 'Tasa Completitud', width: 120 },
];

const engagementSurveyResponseColumns = [
    { field: 'surveyTitle', headerName: 'Encuesta', width: 250, valueGetter: (params) => engagementSurveys.find(s => s.id === params.row.surveyId)?.title || params.row.surveyId },
    { field: 'questionText', headerName: 'Pregunta', width: 300, valueGetter: (params) => {
            const surveyQ = surveyQuestions[params.row.surveyId]?.find(q => q.id === params.row.questionId);
            return surveyQ ? surveyQ.text : params.row.questionId;
        }},
    { field: 'averageRating', headerName: 'Calificación Promedio', type: 'number', width: 150, valueFormatter: (params) => params.value ? params.value.toFixed(1) : 'N/A' },
    { field: 'commentsSummary', headerName: 'Resumen Comentarios', width: 400 },
];

// Gestión de Tickets de Soporte
const supportTicketColumns = [
    { field: 'subject', headerName: 'Asunto', width: 250 },
    { field: 'requesterName', headerName: 'Solicitante', width: 180 },
    { field: 'categoryName', headerName: 'Categoría', width: 180 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Abierto' ? 'error' :
                    params.value === 'En Progreso' ? 'primary' :
                        params.value === 'Resuelto' ? 'info' :
                            params.value === 'Cerrado' ? 'success' : 'warning'
            } size="small" />
        )},
    { field: 'priority', headerName: 'Prioridad', width: 100, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Alta' ? 'error' :
                    params.value === 'Media' ? 'warning' : 'default'
            } size="small" />
        )},
    { field: 'assignedToName', headerName: 'Asignado A', width: 180, valueFormatter: (params) => params.value || 'Sin Asignar' },
    { field: 'submissionDate', headerName: 'Fecha Creación', width: 150, valueFormatter: (params) => new Date(params.value).toLocaleString() },
];

// Configuración de Soporte
const supportTicketCategoryColumns = [
    { field: 'name', headerName: 'Nombre Categoría', width: 250 },
    { field: 'department', headerName: 'Departamento', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 400 },
];

const slaDefinitionColumns = [
    { field: 'name', headerName: 'Nombre SLA', width: 250 },
    { field: 'categoryName', headerName: 'Categoría Ticket', width: 250, valueGetter: (params) => supportTicketCategories.find(c => c.id === params.row.categoryId)?.name || params.row.categoryId },
    { field: 'priority', headerName: 'Prioridad', width: 100 },
    { field: 'responseTime', headerName: 'Tiempo Respuesta', width: 150 },
    { field: 'resolutionTime', headerName: 'Tiempo Resolución', width: 150 },
];

const supportAgentColumns = [
    { field: 'employeeName', headerName: 'Nombre Agente', width: 200 },
    { field: 'department', headerName: 'Departamento', width: 150 },
    { field: 'specialties', headerName: 'Especialidades', width: 300, renderCell: (params) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {params.value?.map((spec, index) => <Chip key={index} label={spec} size="small" />)}
            </Box>
        )},
    { field: 'status', headerName: 'Estado', width: 100, renderCell: (params) => (
            <Chip label={params.value} color={params.value === 'Activo' ? 'success' : 'error'} size="small" />
        )},
    { field: 'available', headerName: 'Disponible', width: 100, renderCell: (params) => params.value ? <CheckCircleOutlineIcon color="success" /> : <CancelIcon color="error" /> },
    { field: 'currentTickets', headerName: 'Tickets Activos', type: 'number', width: 120 },
];

// Base de Conocimiento
const kbArticleCategoryColumns = [
    { field: 'name', headerName: 'Nombre Categoría', width: 250 },
    { field: 'description', headerName: 'Descripción', width: 400 },
];

const knowledgeBaseArticleColumns = [
    { field: 'title', headerName: 'Título del Artículo', width: 300 },
    { field: 'categoryName', headerName: 'Categoría', width: 200 },
    { field: 'authorName', headerName: 'Autor', width: 180 },
    { field: 'publishDate', headerName: 'Fecha Publicación', width: 150 },
    { field: 'views', headerName: 'Vistas', type: 'number', width: 100 },
];

// --- Campos de formulario ---

// Evaluación de Desempeño
const performanceCycleFormFields = [
    { name: 'name', label: 'Nombre del Ciclo', type: 'text', fullWidth: true },
    { name: 'type', label: 'Tipo', type: 'select', options: [{ value: 'Anual', label: 'Anual' }, { value: 'Trimestral', label: 'Trimestral' }, { value: 'Semestral', label: 'Semestral' }, { value: 'Inicial', label: 'Inicial' }], halfWidth: true },
    { name: 'startDate', label: 'Fecha Inicio', type: 'date', halfWidth: true },
    { name: 'endDate', label: 'Fecha Fin', type: 'date', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activo', label: 'Activo' }, { value: 'Cerrado', label: 'Cerrado' }, { value: 'Próximo', label: 'Próximo' }], halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

const performanceReviewFormFields = [
    { name: 'employeeId', label: 'Empleado', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'managerId', label: 'Gerente Evaluador', type: 'select', options: employees.filter(e => e.position.includes('Director') || e.position.includes('Gerente')).map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'cycleId', label: 'Ciclo de Evaluación', type: 'select', options: performanceCycles.map(pc => ({ value: pc.id, label: pc.name })), fullWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'En Curso', label: 'En Curso' }, { value: 'Finalizado', label: 'Finalizado' }, { value: 'Pendiente', label: 'Pendiente' }], halfWidth: true },
    { name: 'overallRating', label: 'Calificación General', type: 'select', options: [{ value: 'Excede Expectativas', label: 'Excede Expectativas' }, { value: 'Cumple Expectativas', label: 'Cumple Expectativas' }, { value: 'Necesita Desarrollo', label: 'Necesita Desarrollo' }], halfWidth: true, nullable: true },
    { name: 'selfAssessmentCompleted', label: 'Autoevaluación Completada', type: 'boolean', halfWidth: true },
    { name: 'managerAssessmentCompleted', label: 'Evaluación Gerente Completada', type: 'boolean', halfWidth: true },
    { name: 'feedback360Collected', label: 'Feedback 360 Recopilado', type: 'boolean', halfWidth: true },
    { name: 'lastUpdate', label: 'Última Actualización', type: 'date', halfWidth: true },
];

const employeeGoalFormFields = [
    { name: 'reviewId', label: 'Revisión de Desempeño Asociada', type: 'select', options: performanceReviews.map(pr => ({ value: pr.id, label: `${pr.employeeName} - ${pr.cycleName}` })), fullWidth: true },
    { name: 'employeeId', label: 'Empleado', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'title', label: 'Título del Objetivo', type: 'text', fullWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 2, fullWidth: true },
    { name: 'metric', label: 'Métrica', type: 'text', halfWidth: true },
    { name: 'target', label: 'Meta', type: 'text', halfWidth: true },
    { name: 'current', label: 'Progreso Actual', type: 'text', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'En Progreso', label: 'En Progreso' }, { value: 'Completado', label: 'Completado' }, { value: 'Atrasado', label: 'Atrasado' }], halfWidth: true },
    { name: 'dueDate', label: 'Fecha Límite', type: 'date', halfWidth: true },
];

const developmentPlanFormFields = [
    { name: 'employeeId', label: 'Empleado', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'managerId', label: 'Gerente', type: 'select', options: employees.filter(e => e.position.includes('Director') || e.position.includes('Gerente')).map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'title', label: 'Título del Plan', type: 'text', fullWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activo', label: 'Activo' }, { value: 'Completado', label: 'Completado' }, { value: 'Pausado', label: 'Pausado' }], halfWidth: true },
    { name: 'startDate', label: 'Fecha Inicio', type: 'date', halfWidth: true },
    { name: 'endDate', label: 'Fecha Fin', type: 'date', halfWidth: true },
    // Las actividades serían un array anidado, manejado en un componente más complejo o por separado
];

// Gestión de Competencias
const competencyCatalogFormFields = [
    { name: 'name', label: 'Nombre de la Competencia', type: 'text', halfWidth: true },
    { name: 'category', label: 'Categoría', type: 'text', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

const competencyAssessmentFormFields = [
    { name: 'employeeId', label: 'Empleado', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'competencyId', label: 'Competencia', type: 'select', options: competencyCatalog.map(c => ({ value: c.id, label: c.name })), halfWidth: true },
    { name: 'assessedBy', label: 'Evaluador', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'rating', label: 'Calificación (1-5)', type: 'number', inputProps: { min: 1, max: 5 }, halfWidth: true },
    { name: 'assessmentDate', label: 'Fecha de Evaluación', type: 'date', halfWidth: true },
    { name: 'comments', label: 'Comentarios', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

// Encuestas de Clima y Compromiso
const engagementSurveyFormFields = [
    { name: 'title', label: 'Título de la Encuesta', type: 'text', fullWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activa', label: 'Activa' }, { value: 'Cerrada', label: 'Cerrada' }, { value: 'Borrador', label: 'Borrador' }], halfWidth: true },
    { name: 'startDate', label: 'Fecha Inicio', type: 'date', halfWidth: true },
    { name: 'endDate', label: 'Fecha Fin', type: 'date', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
    // totalParticipants y completionRate se calcularían automáticamente
];

// Gestión de Tickets de Soporte
const supportTicketFormFields = [
    { name: 'requesterId', label: 'Solicitante', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'categoryId', label: 'Categoría', type: 'select', options: supportTicketCategories.map(c => ({ value: c.id, label: c.name })), halfWidth: true },
    { name: 'subject', label: 'Asunto', type: 'text', fullWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Abierto', label: 'Abierto' }, { value: 'En Progreso', label: 'En Progreso' }, { value: 'Resuelto', label: 'Resuelto' }, { value: 'Cerrado', label: 'Cerrado' }, { value: 'Pendiente', label: 'Pendiente' }], halfWidth: true },
    { name: 'priority', label: 'Prioridad', type: 'select', options: [{ value: 'Alta', label: 'Alta' }, { value: 'Media', label: 'Media' }, { value: 'Baja', label: 'Baja' }], halfWidth: true },
    { name: 'assignedToId', label: 'Asignado A', type: 'select', options: [{ value: null, label: 'Sin Asignar' }, ...supportAgents.map(a => ({ value: a.id, label: a.employeeName }))], halfWidth: true },
    { name: 'submissionDate', label: 'Fecha Creación', type: 'datetime-local', halfWidth: true }, // Usar datetime-local para incluir hora
    { name: 'resolutionDate', label: 'Fecha Resolución', type: 'date', halfWidth: true, nullable: true },
    { name: 'resolutionComments', label: 'Comentarios de Resolución', type: 'text', multiline: true, rows: 2, fullWidth: true },
    // Historial y adjuntos serían componentes aparte
];

// Configuración de Soporte
const supportTicketCategoryFormFields = [
    { name: 'name', label: 'Nombre de la Categoría', type: 'text', halfWidth: true },
    { name: 'department', label: 'Departamento', type: 'text', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

const slaDefinitionFormFields = [
    { name: 'name', label: 'Nombre del SLA', type: 'text', fullWidth: true },
    { name: 'categoryId', label: 'Categoría de Ticket', type: 'select', options: supportTicketCategories.map(c => ({ value: c.id, label: c.name })), halfWidth: true },
    { name: 'priority', label: 'Prioridad Aplicable', type: 'select', options: [{ value: 'Alta', label: 'Alta' }, { value: 'Media', label: 'Media' }, { value: 'Baja', label: 'Baja' }], halfWidth: true },
    { name: 'responseTime', label: 'Tiempo de Respuesta (ej. "1 hora", "4 horas")', type: 'text', halfWidth: true },
    { name: 'resolutionTime', label: 'Tiempo de Resolución (ej. "4 horas", "1 día")', type: 'text', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 2, fullWidth: true },
];

const supportAgentFormFields = [
    { name: 'employeeId', label: 'Empleado (Agente)', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'department', label: 'Departamento de Soporte', type: 'text', halfWidth: true },
    { name: 'specialties', label: 'Especialidades (separadas por coma)', type: 'text', fullWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activo', label: 'Activo' }, { value: 'Inactivo', label: 'Inactivo' }, { value: 'Vacaciones', label: 'Vacaciones' }], halfWidth: true },
    { name: 'available', label: 'Disponible Ahora', type: 'boolean', halfWidth: true },
    // currentTickets se actualiza dinámicamente
];

// Base de Conocimiento
const kbArticleCategoryFormFields = [
    { name: 'name', label: 'Nombre de la Categoría', type: 'text', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

const knowledgeBaseArticleFormFields = [
    { name: 'categoryId', label: 'Categoría', type: 'select', options: kbArticleCategories.map(c => ({ value: c.id, label: c.name })), halfWidth: true },
    { name: 'title', label: 'Título del Artículo', type: 'text', fullWidth: true },
    { name: 'content', label: 'Contenido', type: 'text', multiline: true, rows: 5, fullWidth: true },
    { name: 'authorId', label: 'Autor', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'publishDate', label: 'Fecha de Publicación', type: 'date', halfWidth: true },
    { name: 'lastUpdate', label: 'Última Actualización', type: 'date', halfWidth: true },
    { name: 'tags', label: 'Etiquetas (separadas por coma)', type: 'text', fullWidth: true },
    // views se actualiza dinámicamente
];

const EvaluationSupportModule = () => {
    const [currentView, setCurrentView] = useState('performanceReviews'); // Vista inicial
    const [formType, setFormType] = useState(null); // Tipo de formulario (ej. 'performanceReview', 'supportTicket')
    const [selectedData, setSelectedData] = useState(null); // Datos para editar en el formulario
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [detailData, setDetailData] = useState(null);

    // Manejador para abrir un formulario (crear o editar)
    const handleOpenForm = (type, data = {}) => {
        setFormType(type);
        setSelectedData(data);
        setCurrentView('form'); // Cambia a la vista de formulario
    };

    // Manejador para guardar datos (simulado)
    const handleSaveData = (data) => {
        console.log(`Guardando ${formType}:`, data);
        alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} guardado (simulado)`);
        // En un sistema real, aquí se enviarían los datos a un API y se actualizaría el estado global o se re-fetch los datos.
        // Volvemos a la vista de lista después de guardar.
        switch (formType) {
            case 'performanceCycle': setCurrentView('performanceCycles'); break;
            case 'performanceReview': setCurrentView('performanceReviews'); break;
            case 'employeeGoal': setCurrentView('employeeGoals'); break;
            case 'developmentPlan': setCurrentView('developmentPlans'); break;
            case 'competency': setCurrentView('competencyCatalog'); break;
            case 'competencyAssessment': setCurrentView('competencyAssessments'); break;
            case 'engagementSurvey': setCurrentView('engagementSurveys'); break;
            case 'supportTicket': setCurrentView('supportTickets'); break;
            case 'ticketCategory': setCurrentView('supportTicketCategories'); break;
            case 'slaDefinition': setCurrentView('slaDefinitions'); break;
            case 'supportAgent': setCurrentView('supportAgents'); break;
            case 'kbArticleCategory': setCurrentView('kbArticleCategories'); break;
            case 'knowledgeBaseArticle': setCurrentView('knowledgeBaseArticles'); break;
            default: setCurrentView('performanceReviews'); // Fallback
        }
        setFormType(null);
        setSelectedData(null);
    };

    // Manejador para cancelar la edición/creación en el formulario
    const handleCancelForm = () => {
        // Volvemos a la vista de lista anterior
        switch (formType) {
            case 'performanceCycle': setCurrentView('performanceCycles'); break;
            case 'performanceReview': setCurrentView('performanceReviews'); break;
            case 'employeeGoal': setCurrentView('employeeGoals'); break;
            case 'developmentPlan': setCurrentView('developmentPlans'); break;
            case 'competency': setCurrentView('competencyCatalog'); break;
            case 'competencyAssessment': setCurrentView('competencyAssessments'); break;
            case 'engagementSurvey': setCurrentView('engagementSurveys'); break;
            case 'supportTicket': setCurrentView('supportTickets'); break;
            case 'ticketCategory': setCurrentView('supportTicketCategories'); break;
            case 'slaDefinition': setCurrentView('slaDefinitions'); break;
            case 'supportAgent': setCurrentView('supportAgents'); break;
            case 'kbArticleCategory': setCurrentView('kbArticleCategories'); break;
            case 'knowledgeBaseArticle': setCurrentView('knowledgeBaseArticles'); break;
            default: setCurrentView('performanceReviews'); // Fallback
        }
        setFormType(null);
        setSelectedData(null);
    };

    // Manejador para ver detalles de elementos (ej. contenido de ticket, historial, etc.)
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
            case 'performanceReview':
                const employee = employees.find(e => e.id === data.employeeId);
                const manager = employees.find(e => e.id === data.managerId);
                const cycle = performanceCycles.find(c => c.id === data.cycleId);
                const relatedGoals = employeeGoals.filter(g => g.reviewId === data.id);
                const relatedCompetencyAssessments = competencyAssessments.filter(ca => ca.employeeId === data.employeeId && ca.assessmentDate.startsWith(cycle.startDate.substring(0,4))); // Simple match por año
                return (
                    <>
                        <DialogTitle>Revisión de Desempeño: {employee?.name}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Ciclo: {cycle?.name} | Gerente: {manager?.name}
                            </Typography>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Estado: <Chip label={data.status} color={data.status === 'Finalizado' ? 'success' : data.status === 'En Curso' ? 'primary' : 'warning'} size="small" /></Typography>
                                    <Typography variant="body2">Calificación General: {data.overallRating || 'Pendiente'}</Typography>
                                    <Typography variant="body2">Última Actualización: {data.lastUpdate}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Autoevaluación Completada: {data.selfAssessmentCompleted ? <CheckCircleOutlineIcon color="success" fontSize="small" /> : <CancelIcon color="error" fontSize="small" />}</Typography>
                                    <Typography variant="body2">Evaluación Gerente Completada: {data.managerAssessmentCompleted ? <CheckCircleOutlineIcon color="success" fontSize="small" /> : <CancelIcon color="error" fontSize="small" />}</Typography>
                                    <Typography variant="body2">Feedback 360 Recopilado: {data.feedback360Collected ? <CheckCircleOutlineIcon color="success" fontSize="small" /> : <CancelIcon color="error" fontSize="small" />}</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Objetivos Asociados:</Typography>
                            {relatedGoals.length > 0 ? (
                                <List>
                                    {relatedGoals.map(goal => (
                                        <ListItem key={goal.id} disablePadding>
                                            <ListItemText primary={goal.title} secondary={`Métrica: ${goal.metric} | Meta: ${goal.target} | Actual: ${goal.current} | Estado: ${goal.status}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">No hay objetivos asociados.</Typography>
                            )}
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Evaluaciones de Competencias Relevantes:</Typography>
                            {relatedCompetencyAssessments.length > 0 ? (
                                <List>
                                    {relatedCompetencyAssessments.map(compAss => (
                                        <ListItem key={compAss.id} disablePadding>
                                            <ListItemText primary={`${compAss.competencyName}: ${compAss.rating}/5`} secondary={`Evaluado por ${compAss.assessorName} el ${compAss.assessmentDate}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">No hay evaluaciones de competencias recientes.</Typography>
                            )}
                        </DialogContent>
                    </>
                );
            case 'developmentPlan':
                const dpEmployee = employees.find(e => e.id === data.employeeId);
                const dpManager = employees.find(e => e.id === data.managerId);
                return (
                    <>
                        <DialogTitle>Plan de Desarrollo: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Empleado: {dpEmployee?.name} | Gerente: {dpManager?.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{data.description}</Typography>
                            <Typography variant="body2">Estado: <Chip label={data.status} color={data.status === 'Activo' ? 'success' : 'default'} size="small" /></Typography>
                            <Typography variant="body2">Período: {data.startDate} al {data.endDate || 'Indefinido'}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Actividades Planificadas:</Typography>
                            {data.activities && data.activities.length > 0 ? (
                                <List>
                                    {data.activities.map((activity, index) => (
                                        <ListItem key={index} disablePadding>
                                            <ListItemText primary={`${activity.type}: ${activity.name}`} secondary={`Estado: ${activity.status}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">No hay actividades definidas para este plan.</Typography>
                            )}
                        </DialogContent>
                    </>
                );
            case 'engagementSurvey':
                const surveyQuestionsData = surveyQuestions[data.id] || [];
                const surveyResponsesData = engagementSurveyResponses.filter(r => r.surveyId === data.id);
                return (
                    <>
                        <DialogTitle>Detalles de la Encuesta: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Estado: <Chip label={data.status} color={data.status === 'Activa' ? 'success' : 'error'} size="small" /> | Período: {data.startDate} al {data.endDate}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{data.description}</Typography>
                            <Typography variant="body2">Participantes Esperados: {data.totalParticipants} | Tasa de Completitud: {data.completionRate}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Preguntas de la Encuesta:</Typography>
                            {surveyQuestionsData.length > 0 ? (
                                <List>
                                    {surveyQuestionsData.map(q => (
                                        <ListItem key={q.id} disablePadding>
                                            <ListItemText primary={q.text} secondary={`Tipo: ${q.type}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">No hay preguntas definidas para esta encuesta.</Typography>
                            )}
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Resumen de Respuestas:</Typography>
                            {surveyResponsesData.length > 0 ? (
                                <List>
                                    {surveyResponsesData.map((resp, index) => (
                                        <ListItem key={index} disablePadding>
                                            <ListItemText primary={`Pregunta: ${surveyQuestionsData.find(q => q.id === resp.questionId)?.text || resp.questionId}`} secondary={
                                                <>
                                                    {resp.averageRating && `Calificación Promedio: ${resp.averageRating.toFixed(1)}/5`}
                                                    {resp.commentsSummary && <><br/>Resumen Comentarios: {resp.commentsSummary}</>}
                                                </>
                                            } />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">No hay resumen de respuestas disponible.</Typography>
                            )}
                        </DialogContent>
                    </>
                );
            case 'supportTicket':
                const requester = employees.find(e => e.id === data.requesterId);
                const assignedTo = supportAgents.find(a => a.id === data.assignedToId);
                const category = supportTicketCategories.find(c => c.id === data.categoryId);
                return (
                    <>
                        <DialogTitle>Ticket de Soporte #{data.id}: {data.subject}</DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Solicitante: {requester?.name} ({requester?.department})</Typography>
                                    <Typography variant="body2">Categoría: {category?.name}</Typography>
                                    <Typography variant="body2">Estado: <Chip label={data.status} color={data.status === 'Cerrado' ? 'success' : 'primary'} size="small" /></Typography>
                                    <Typography variant="body2">Prioridad: <Chip label={data.priority} color={data.priority === 'Alta' ? 'error' : 'warning'} size="small" /></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Asignado a: {assignedTo?.employeeName || 'Sin Asignar'}</Typography>
                                    <Typography variant="body2">Creación: {new Date(data.submissionDate).toLocaleString()}</Typography>
                                    <Typography variant="body2">Última Actualización: {new Date(data.lastUpdate).toLocaleString()}</Typography>
                                    {data.resolutionDate && <Typography variant="body2">Resolución: {new Date(data.resolutionDate).toLocaleString()}</Typography>}
                                </Grid>
                            </Grid>
                            <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>**Descripción:** {data.description}</Typography>
                            {data.resolutionComments && (
                                <Box sx={{ mt: 2, p: 2, borderLeft: '4px solid', borderColor: 'info.main', backgroundColor: 'info.light', borderRadius: 1 }}>
                                    <Typography variant="subtitle2">Comentarios de Resolución:</Typography>
                                    <Typography variant="body2">{data.resolutionComments}</Typography>
                                </Box>
                            )}
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Historial del Ticket:</Typography>
                            {data.history && data.history.length > 0 ? (
                                <List dense>
                                    {data.history.map((item, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon><HistoryIcon fontSize="small" /></ListItemIcon>
                                            <ListItemText primary={item.event} secondary={new Date(item.date).toLocaleString()} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">No hay historial disponible.</Typography>
                            )}
                            {data.attachments && data.attachments.length > 0 && (
                                <>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="h6" sx={{ mb: 1 }}>Adjuntos:</Typography>
                                    <List dense>
                                        {data.attachments.map((attach, index) => (
                                            <ListItem key={index}>
                                                <ListItemIcon><AttachFileIcon fontSize="small" /></ListItemIcon>
                                                <ListItemText primary={<Link href={attach.url} target="_blank">{attach.name}</Link>} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </>
                            )}
                        </DialogContent>
                    </>
                );
            case 'knowledgeBaseArticle':
                const kbAuthor = employees.find(e => e.id === data.authorId);
                const kbCategory = kbArticleCategories.find(c => c.id === data.categoryId);
                return (
                    <>
                        <DialogTitle>Artículo KB: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Categoría: {kbCategory?.name} | Autor: {kbAuthor?.name}
                            </Typography>
                            <Typography variant="body2">Publicado: {data.publishDate} | Última Actualización: {data.lastUpdate} | Vistas: {data.views}</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 1 }}>
                                {data.tags?.map((tag, index) => <Chip key={index} label={tag} size="small" />)}
                            </Box>
                            <Divider sx={{ my: 2 }} />
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
            // EVALUACIÓN DE DESEMPEÑO
            case 'performanceCycles':
                return (
                    <TableViewer
                        title="Ciclos de Evaluación de Desempeño"
                        data={performanceCycles}
                        columns={performanceCycleColumns}
                        onEdit={(data) => handleOpenForm('performanceCycle', data)}
                        onDelete={(data) => console.log('Eliminar ciclo:', data)}
                        onAdd={() => handleOpenForm('performanceCycle', { startDate: new Date().toISOString().slice(0, 10), endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10), status: 'Próximo', type: 'Anual' })}
                    />
                );
            case 'performanceReviews':
                return (
                    <TableViewer
                        title="Revisiones de Desempeño de Empleados"
                        data={performanceReviews}
                        columns={performanceReviewColumns}
                        onEdit={(data) => handleOpenForm('performanceReview', data)}
                        onDelete={(data) => console.log('Eliminar revisión:', data)}
                        onAdd={() => handleOpenForm('performanceReview', { lastUpdate: new Date().toISOString().slice(0, 10), status: 'En Curso', selfAssessmentCompleted: false, managerAssessmentCompleted: false, feedback360Collected: false })}
                        onView={(data) => handleViewDetail('performanceReview', data)}
                    />
                );
            case 'employeeGoals':
                return (
                    <TableViewer
                        title="Objetivos Individuales (SMART)"
                        data={employeeGoals}
                        columns={employeeGoalColumns}
                        onEdit={(data) => handleOpenForm('employeeGoal', data)}
                        onDelete={(data) => console.log('Eliminar objetivo:', data)}
                        onAdd={() => handleOpenForm('employeeGoal', { status: 'En Progreso', dueDate: new Date().toISOString().slice(0, 10) })}
                    />
                );
            case 'developmentPlans':
                return (
                    <TableViewer
                        title="Planes de Desarrollo Individual"
                        data={developmentPlans}
                        columns={developmentPlanColumns}
                        onEdit={(data) => handleOpenForm('developmentPlan', data)}
                        onDelete={(data) => console.log('Eliminar plan:', data)}
                        onAdd={() => handleOpenForm('developmentPlan', { startDate: new Date().toISOString().slice(0, 10), status: 'Activo' })}
                        onView={(data) => handleViewDetail('developmentPlan', data)}
                    />
                );

            // GESTIÓN DE COMPETENCIAS
            case 'competencyCatalog':
                return (
                    <TableViewer
                        title="Catálogo de Competencias"
                        data={competencyCatalog}
                        columns={competencyCatalogColumns}
                        onEdit={(data) => handleOpenForm('competency', data)}
                        onDelete={(data) => console.log('Eliminar competencia:', data)}
                        onAdd={() => handleOpenForm('competency')}
                    />
                );
            case 'competencyAssessments':
                return (
                    <TableViewer
                        title="Evaluaciones de Competencias por Empleado"
                        data={competencyAssessments}
                        columns={competencyAssessmentColumns}
                        onEdit={(data) => handleOpenForm('competencyAssessment', data)}
                        onDelete={(data) => console.log('Eliminar evaluación de competencia:', data)}
                        onAdd={() => handleOpenForm('competencyAssessment', { assessmentDate: new Date().toISOString().slice(0, 10) })}
                    />
                );

            // ENCUESTAS DE CLIMA Y COMPROMISO
            case 'engagementSurveys':
                return (
                    <>
                        <TableViewer
                            title="Encuestas de Clima y Compromiso"
                            data={engagementSurveys}
                            columns={engagementSurveyColumns}
                            onEdit={(data) => handleOpenForm('engagementSurvey', data)}
                            onDelete={(data) => console.log('Eliminar encuesta:', data)}
                            onAdd={() => handleOpenForm('engagementSurvey', { startDate: new Date().toISOString().slice(0, 10), status: 'Borrador' })}
                            onView={(data) => handleViewDetail('engagementSurvey', data)}
                        />
                        <Box sx={{mt: 4}}>
                            <TableViewer
                                title="Resumen de Respuestas de Encuestas"
                                data={engagementSurveyResponses}
                                columns={engagementSurveyResponseColumns}
                                // Las respuestas resumidas no se editan directamente
                                renderActions={false}
                            />
                        </Box>
                    </>
                );

            // GESTIÓN DE TICKETS DE SOPORTE
            case 'supportTickets':
                return (
                    <TableViewer
                        title="Tickets de Soporte"
                        data={supportTickets}
                        columns={supportTicketColumns}
                        onEdit={(data) => handleOpenForm('supportTicket', {
                            ...data,
                            submissionDate: data.submissionDate ? new Date(data.submissionDate).toISOString().slice(0, 16) : null // Format for datetime-local
                        })}
                        onDelete={(data) => console.log('Eliminar ticket:', data)}
                        onAdd={() => handleOpenForm('supportTicket', {
                            submissionDate: new Date().toISOString().slice(0, 16), // Current datetime for new tickets
                            status: 'Abierto',
                            priority: 'Media'
                        })}
                        onView={(data) => handleViewDetail('supportTicket', data)}
                    />
                );

            // CONFIGURACIÓN DE SOPORTE
            case 'supportTicketCategories':
                return (
                    <TableViewer
                        title="Categorías de Tickets de Soporte"
                        data={supportTicketCategories}
                        columns={supportTicketCategoryColumns}
                        onEdit={(data) => handleOpenForm('ticketCategory', data)}
                        onDelete={(data) => console.log('Eliminar categoría:', data)}
                        onAdd={() => handleOpenForm('ticketCategory')}
                    />
                );
            case 'slaDefinitions':
                return (
                    <TableViewer
                        title="Definiciones de Acuerdos de Nivel de Servicio (SLA)"
                        data={serviceLevelAgreements}
                        columns={slaDefinitionColumns}
                        onEdit={(data) => handleOpenForm('slaDefinition', data)}
                        onDelete={(data) => console.log('Eliminar SLA:', data)}
                        onAdd={() => handleOpenForm('slaDefinition')}
                    />
                );
            case 'supportAgents':
                return (
                    <TableViewer
                        title="Agentes y Equipos de Soporte"
                        data={supportAgents}
                        columns={supportAgentColumns}
                        onEdit={(data) => handleOpenForm('supportAgent', data)}
                        onDelete={(data) => console.log('Eliminar agente:', data)}
                        onAdd={() => handleOpenForm('supportAgent', { status: 'Activo', available: true })}
                    />
                );

            // BASE DE CONOCIMIENTO
            case 'kbArticleCategories':
                return (
                    <TableViewer
                        title="Categorías de la Base de Conocimiento"
                        data={kbArticleCategories}
                        columns={kbArticleCategoryColumns}
                        onEdit={(data) => handleOpenForm('kbArticleCategory', data)}
                        onDelete={(data) => console.log('Eliminar categoría KB:', data)}
                        onAdd={() => handleOpenForm('kbArticleCategory')}
                    />
                );
            case 'knowledgeBaseArticles':
                return (
                    <TableViewer
                        title="Artículos de la Base de Conocimiento"
                        data={knowledgeBaseArticles}
                        columns={knowledgeBaseArticleColumns}
                        onEdit={(data) => handleOpenForm('knowledgeBaseArticle', data)}
                        onDelete={(data) => console.log('Eliminar artículo KB:', data)}
                        onAdd={() => handleOpenForm('knowledgeBaseArticle', { publishDate: new Date().toISOString().slice(0, 10), lastUpdate: new Date().toISOString().slice(0, 10), views: 0 })}
                        onView={(data) => handleViewDetail('knowledgeBaseArticle', data)}
                    />
                );

            // INFORMES Y ANALÍTICAS
            case 'reports':
                return (
                    <Box>
                        <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Informes y Analíticas de Evaluación y Soporte
                        </Typography>
                        <ReportViewer
                            reportName="Desempeño General por Departamento"
                            description="Visualización del promedio de calificaciones de desempeño por departamento y evolución."
                            onGenerate={() => console.log('Generando informe: Desempeño General por Departamento')}
                        />
                        <ReportViewer
                            reportName="Brechas de Competencias Clave"
                            description="Identificación de las competencias con menores calificaciones a nivel organizacional y por rol."
                            onGenerate={() => console.log('Generando informe: Brechas de Competencias Clave')}
                        />
                        <ReportViewer
                            reportName="Tendencias de Tickets de Soporte"
                            description="Análisis de volumen de tickets, tiempos de resolución, categorías más frecuentes y rendimiento de agentes."
                            onGenerate={() => console.log('Generando informe: Tendencias de Tickets de Soporte')}
                        />
                        <ReportViewer
                            reportName="Satisfacción de Empleados (Encuestas)"
                            description="Resumen de resultados de encuestas de clima y compromiso, identificando áreas de fortaleza y mejora."
                            onGenerate={() => console.log('Generando informe: Satisfacción de Empleados (Encuestas)')}
                        />
                        <ReportViewer
                            reportName="Uso de la Base de Conocimiento"
                            description="Métricas sobre los artículos más vistos y su impacto en la reducción de tickets de soporte."
                            onGenerate={() => console.log('Generando informe: Uso de la Base de Conocimiento')}
                        />
                    </Box>
                );

            // FORMULARIO DINÁMICO
            case 'form':
                let formFields, formTitle;
                switch (formType) {
                    case 'performanceCycle': formFields = performanceCycleFormFields; formTitle = selectedData.id ? "Editar Ciclo de Evaluación" : "Crear Nuevo Ciclo de Evaluación"; break;
                    case 'performanceReview': formFields = performanceReviewFormFields; formTitle = selectedData.id ? "Editar Revisión de Desempeño" : "Crear Nueva Revisión de Desempeño"; break;
                    case 'employeeGoal': formFields = employeeGoalFormFields; formTitle = selectedData.id ? "Editar Objetivo" : "Crear Nuevo Objetivo"; break;
                    case 'developmentPlan': formFields = developmentPlanFormFields; formTitle = selectedData.id ? "Editar Plan de Desarrollo" : "Crear Nuevo Plan de Desarrollo"; break;
                    case 'competency': formFields = competencyCatalogFormFields; formTitle = selectedData.id ? "Editar Competencia" : "Crear Nueva Competencia"; break;
                    case 'competencyAssessment': formFields = competencyAssessmentFormFields; formTitle = selectedData.id ? "Editar Evaluación de Competencia" : "Crear Nueva Evaluación de Competencia"; break;
                    case 'engagementSurvey': formFields = engagementSurveyFormFields; formTitle = selectedData.id ? "Editar Encuesta de Compromiso" : "Crear Nueva Encuesta de Compromiso"; break;
                    case 'supportTicket': formFields = supportTicketFormFields; formTitle = selectedData.id ? "Editar Ticket de Soporte" : "Crear Nuevo Ticket de Soporte"; break;
                    case 'ticketCategory': formFields = supportTicketCategoryFormFields; formTitle = selectedData.id ? "Editar Categoría de Ticket" : "Crear Nueva Categoría de Ticket"; break;
                    case 'slaDefinition': formFields = slaDefinitionFormFields; formTitle = selectedData.id ? "Editar Definición de SLA" : "Crear Nueva Definición de SLA"; break;
                    case 'supportAgent': formFields = supportAgentFormFields; formTitle = selectedData.id ? "Editar Agente de Soporte" : "Crear Nuevo Agente de Soporte"; break;
                    case 'kbArticleCategory': formFields = kbArticleCategoryFormFields; formTitle = selectedData.id ? "Editar Categoría de Artículo KB" : "Crear Nueva Categoría de Artículo KB"; break;
                    case 'knowledgeBaseArticle': formFields = knowledgeBaseArticleFormFields; formTitle = selectedData.id ? "Editar Artículo de Base de Conocimiento" : "Crear Nuevo Artículo de Base de Conocimiento"; break;
                    default: return <Typography>Error: Formulario no especificado.</Typography>;
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
            {/* Título del módulo */}
            <Typography variant="h5" color="text.primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <AssessmentIcon sx={{ mr: 1 }} /> Módulo de Evaluación y Soporte
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Menú de pestañas para navegar entre las sub-secciones del módulo */}
            <Tabs
                value={currentView === 'form' ? (
                    formType === 'performanceCycle' ? 'performanceCycles' :
                        formType === 'performanceReview' ? 'performanceReviews' :
                            formType === 'employeeGoal' ? 'employeeGoals' :
                                formType === 'developmentPlan' ? 'developmentPlans' :
                                    formType === 'competency' ? 'competencyCatalog' :
                                        formType === 'competencyAssessment' ? 'competencyAssessments' :
                                            formType === 'engagementSurvey' ? 'engagementSurveys' :
                                                formType === 'supportTicket' ? 'supportTickets' :
                                                    formType === 'ticketCategory' ? 'supportTicketCategories' :
                                                        formType === 'slaDefinition' ? 'slaDefinitions' :
                                                            formType === 'supportAgent' ? 'supportAgents' :
                                                                formType === 'kbArticleCategory' ? 'kbArticleCategories' :
                                                                    formType === 'knowledgeBaseArticle' ? 'knowledgeBaseArticles' :
                                                                        'performanceReviews' // Fallback para el caso de formulario
                ) : currentView}
                onChange={(event, newValue) => setCurrentView(newValue)}
                aria-label="evaluation and support module tabs"
                variant="scrollable" // Permite desplazamiento si hay muchas pestañas
                scrollButtons="auto"
                sx={{ mb: 3 }}
            >
                {/* Pestañas de Evaluación de Desempeño */}
                <Tab label="Ciclos de Evaluación" value="performanceCycles" icon={<LoopIcon />} iconPosition="start" />
                <Tab label="Revisiones de Desempeño" value="performanceReviews" icon={<ReviewsIcon />} iconPosition="start" />
                <Tab label="Objetivos Individuales" value="employeeGoals" icon={<EmojiEventsIcon />} iconPosition="start" />
                <Tab label="Planes de Desarrollo" value="developmentPlans" icon={<PsychologyIcon />} iconPosition="start" />

                {/* Pestañas de Gestión de Competencias */}
                <Tab label="Catálogo de Competencias" value="competencyCatalog" icon={<GavelIcon />} iconPosition="start" />
                <Tab label="Evaluación de Competencias" value="competencyAssessments" icon={<BarChartIcon />} iconPosition="start" />

                {/* Pestañas de Encuestas de Clima y Compromiso */}
                <Tab label="Encuestas de Compromiso" value="engagementSurveys" icon={<ForumIcon />} iconPosition="start" />

                {/* Pestañas de Gestión de Tickets de Soporte */}
                <Tab label="Tickets de Soporte" value="supportTickets" icon={<SupportAgentIcon />} iconPosition="start" />

                {/* Pestañas de Configuración de Soporte */}
                <Tab label="Categorías de Tickets" value="supportTicketCategories" icon={<CategoryIcon />} iconPosition="start" />
                <Tab label="Definiciones de SLA" value="slaDefinitions" icon={<SpeedIcon />} iconPosition="start" />
                <Tab label="Agentes de Soporte" value="supportAgents" icon={<PeopleOutlineIcon />} iconPosition="start" />

                {/* Pestañas de Base de Conocimiento */}
                <Tab label="Categorías KB" value="kbArticleCategories" icon={<LightbulbIcon />} iconPosition="start" />
                <Tab label="Artículos KB" value="knowledgeBaseArticles" icon={<ArticleIcon />} iconPosition="start" />

                {/* Pestaña de Informes */}
                <Tab label="Informes y Analíticas" value="reports" icon={<AnalyticsIcon />} iconPosition="start" />
            </Tabs>

            {/* Contenido dinámico según la pestaña seleccionada o la acción */}
            {renderCurrentViewContent()}

            {/* Diálogo para ver detalles */}
            <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="md" fullWidth>
                {renderDetailDialogContent()}
                <DialogActions>
                    <Button onClick={handleCloseDetailDialog} color="primary">Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EvaluationSupportModule;