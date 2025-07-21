// src/modules/LearningPlatformModule.jsx
import React, { useState } from 'react';
import {
    Box, Typography, Divider, Button, Tabs, Tab, Paper, Grid,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip,
    List, ListItem, ListItemText, ListItemIcon, IconButton, Link,
    Avatar, Tooltip
} from '@mui/material';
import TableViewer from '../TableViewer';
import DataForm from '../DataForm';
import ReportViewer from '../ReportViewer';

// Iconos relevantes
import SchoolIcon from '@mui/icons-material/School'; // Módulo principal
import CourseIcon from '@mui/icons-material/Book'; // Cursos
import AssignmentIcon from '@mui/icons-material/Assignment'; // Asignaciones
import PathIcon from '@mui/icons-material/TrendingUp'; // Rutas de Aprendizaje
import CertificateIcon from '@mui/icons-material/EmojiEvents'; // Certificaciones
import EnrollmentIcon from '@mui/icons-material/HowToReg'; // Matrículas y Progreso
import AssessmentIcon from '@mui/icons-material/Assessment'; // Evaluaciones
import FeedbackIcon from '@mui/icons-material/Feedback'; // Feedback y Encuestas
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'; // Webinars
import MicIcon from '@mui/icons-material/Mic'; // Podcasts
import ScienceIcon from '@mui/icons-material/Science'; // Simulaciones
import HandymanIcon from '@mui/icons-material/Handyman'; // Habilidades
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'; // Gamificación (Insignias)
import LeaderboardIcon from '@mui/icons-material/Leaderboard'; // Gamificación (Clasificación)
import GroupIcon from '@mui/icons-material/Group'; // Grupos de Estudio
import PeopleIcon from '@mui/icons-material/People'; // Mentoría
import EventIcon from '@mui/icons-material/Event'; // Calendario de Eventos
import PersonPinIcon from '@mui/icons-material/PersonPin'; // Expertos Internos
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import LinkIcon from '@mui/icons-material/Link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';


// Datos de prueba extendidos (AHORA MÁS AMPLIOS)
import {
    extendedCourses, courseContent, assignments,
    extendedLearningPaths, learningPathCourses,
    extendedCertifications, extendedEnrollments, issuedCertificates,
    evaluationResults, feedbackSurveys, surveyResponses,
    extendedResources, // Estos son recursos específicos de curso, no generales
    employees, // Usado para participantes y asignados
    webinars, podcasts, simulations, // Nuevos tipos de contenido
    skillsCatalog, userSkillsProgress, // Habilidades
    badges, userBadges, leaderboard, // Gamificación
    mentorshipPrograms, mentorMenteePairs, // Mentoría
    studyGroups, // Grupos de estudio
    trainingEventsCalendar, // Calendario
    internalExperts, // Expertos internos
} from '../extendedLearningData';

// --- Columnas para TableViewer (actualizadas y nuevas) ---

const courseColumns = [
    { field: 'name', headerName: 'Nombre del Curso', width: 300 },
    { field: 'instructor', headerName: 'Instructor', width: 180 },
    { field: 'duration', headerName: 'Duración', width: 120 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Activo' ? 'success' :
                    params.value === 'Inactivo' ? 'error' : 'warning'
            } size="small" />
        )},
    { field: 'category', headerName: 'Categoría', width: 150 },
    { field: 'totalStudents', headerName: 'Estudiantes', type: 'number', width: 120 },
];

const assignmentColumns = [
    { field: 'title', headerName: 'Título de Asignación', width: 250 },
    { field: 'courseName', headerName: 'Curso', width: 250, valueGetter: (params) => extendedCourses.find(c => c.id === params.row.courseId)?.name || params.row.courseId },
    { field: 'type', headerName: 'Tipo', width: 120 },
    { field: 'dueDate', headerName: 'Fecha Límite', width: 150 },
    { field: 'maxScore', headerName: 'Puntuación Máx.', type: 'number', width: 150 },
];

const learningPathColumns = [
    { field: 'name', headerName: 'Nombre de la Ruta', width: 300 },
    { field: 'description', headerName: 'Descripción', width: 400 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={params.value === 'Activo' ? 'success' : 'warning'} size="small" />
        )},
    { field: 'creator', headerName: 'Creador', width: 150 },
    { field: 'totalCourses', headerName: 'Cursos', type: 'number', width: 100 },
];

const certificationColumns = [
    { field: 'name', headerName: 'Nombre de Certificación', width: 300 },
    { field: 'issuingBody', headerName: 'Organismo Emisor', width: 200 },
    { field: 'validityPeriod', headerName: 'Validez', width: 120 },
    { field: 'associatedPath', headerName: 'Ruta Asociada', width: 200, valueGetter: (params) => extendedLearningPaths.find(lp => lp.code === params.row.associatedPath)?.name || 'N/A' },
];

const enrollmentColumns = [
    { field: 'participantName', headerName: 'Participante', width: 180 },
    { field: 'courseName', headerName: 'Curso', width: 250 },
    { field: 'progress', headerName: 'Progreso (%)', type: 'number', width: 130 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Completado' ? 'success' :
                    params.value === 'En Curso' ? 'primary' : 'default'
            } size="small" />
        )},
    { field: 'lastActivity', headerName: 'Última Actividad', width: 150 },
    { field: 'score', headerName: 'Puntuación', type: 'number', width: 100, valueFormatter: (params) => params.value !== null ? params.value : 'N/A' },
];

const issuedCertificateColumns = [
    { field: 'certName', headerName: 'Certificación', width: 250 },
    { field: 'participantName', headerName: 'Participante', width: 180 },
    { field: 'issueDate', headerName: 'Fecha Emisión', width: 150 },
    { field: 'expiryDate', headerName: 'Fecha Vencimiento', width: 150 },
    { field: 'status', headerName: 'Estado', width: 100, renderCell: (params) => (
            <Chip label={params.value} color={params.value === 'Válido' ? 'success' : 'error'} size="small" />
        )},
];

const evaluationResultColumns = [
    { field: 'participantName', headerName: 'Participante', width: 180 },
    { field: 'courseName', headerName: 'Curso', width: 250 },
    { field: 'assignmentTitle', headerName: 'Asignación', width: 250, valueGetter: (params) => assignments.find(a => a.id === params.row.assignmentId)?.title || params.row.assignmentId },
    { field: 'score', headerName: 'Puntuación', type: 'number', width: 100, valueFormatter: (params) => params.value !== null ? params.value : 'N/A' },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Calificado' ? 'success' :
                    params.value === 'Pendiente' ? 'warning' : 'default'
            } size="small" />
        )},
    { field: 'submissionDate', headerName: 'Fecha Envío', width: 150 },
];

const feedbackSurveyColumns = [
    { field: 'title', headerName: 'Título de Encuesta', width: 300 },
    { field: 'courseName', headerName: 'Curso Asociado', width: 250, valueGetter: (params) => extendedCourses.find(c => c.id === params.row.courseId)?.name || 'General' },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={params.value === 'Activa' ? 'success' : 'default'} size="small" />
        )},
    { field: 'creationDate', headerName: 'Fecha Creación', width: 150 },
    { field: 'totalResponses', headerName: 'Respuestas', type: 'number', width: 100 },
];

const surveyResponseColumns = [
    { field: 'surveyTitle', headerName: 'Encuesta', width: 250, valueGetter: (params) => feedbackSurveys.find(s => s.id === params.row.surveyId)?.title || params.row.surveyId },
    { field: 'participantName', headerName: 'Participante', width: 180 },
    { field: 'responseDate', headerName: 'Fecha Respuesta', width: 150 },
    { field: 'rating', headerName: 'Calificación', type: 'number', width: 100, valueFormatter: (params) => params.value !== null ? params.value : 'N/A' },
    { field: 'comments', headerName: 'Comentarios', width: 300 },
];

// --- NUEVAS COLUMNAS ---
const webinarColumns = [
    { field: 'title', headerName: 'Título del Webinar', width: 300 },
    { field: 'speaker', headerName: 'Ponente', width: 180 },
    { field: 'date', headerName: 'Fecha', width: 120 },
    { field: 'time', headerName: 'Hora', width: 100 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={
                params.value === 'Próximo' ? 'primary' :
                    params.value === 'Grabado' ? 'success' : 'default'
            } size="small" />
        )},
    { field: 'category', headerName: 'Categoría', width: 150 },
];

const podcastColumns = [
    { field: 'title', headerName: 'Título del Podcast', width: 300 },
    { field: 'host', headerName: 'Anfitrión', width: 180 },
    { field: 'duration', headerName: 'Duración', width: 120 },
    { field: 'publishDate', headerName: 'Fecha Publicación', width: 150 },
];

const simulationColumns = [
    { field: 'title', headerName: 'Título de Simulación', width: 300 },
    { field: 'type', headerName: 'Tipo', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 400 },
    { field: 'accessLink', headerName: 'Enlace de Acceso', width: 150, renderCell: (params) => params.value ? <Link href={params.value} target="_blank">Acceder</Link> : 'N/A' },
];

const skillsCatalogColumns = [
    { field: 'name', headerName: 'Habilidad', width: 200 },
    { field: 'category', headerName: 'Categoría', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 400 },
    { field: 'relatedCourses', headerName: 'Cursos Relacionados', width: 250, renderCell: (params) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {params.value?.map((courseCode, index) => {
                    const course = extendedCourses.find(c => c.code === courseCode);
                    return course ? <Chip key={index} label={course.name} size="small" /> : null;
                })}
            </Box>
        )},
];

const userSkillsProgressColumns = [
    { field: 'participantName', headerName: 'Participante', width: 180, valueGetter: (params) => employees.find(e => e.id === params.row.userId)?.name || params.row.userId },
    { field: 'skillName', headerName: 'Habilidad', width: 200 },
    { field: 'level', headerName: 'Nivel Actual', width: 120 },
    { field: 'targetLevel', headerName: 'Nivel Objetivo', width: 120 },
    { field: 'currentScore', headerName: 'Puntuación', type: 'number', width: 100 },
    { field: 'lastUpdated', headerName: 'Última Actualización', width: 150 },
];

const badgeColumns = [
    { field: 'name', headerName: 'Nombre de Insignia', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 350 },
    { field: 'criteria', headerName: 'Criterios', width: 250 },
    { field: 'icon', headerName: 'Icono', width: 80, renderCell: (params) => {
            switch(params.value) {
                case 'star': return <MilitaryTechIcon color="warning" />;
                case 'book': return <BookIcon color="info" />;
                case 'group': return <GroupIcon color="primary" />;
                case 'award': return <EmojiEventsIcon color="secondary" />;
                default: return null;
            }
        }},
];

const userBadgeColumns = [
    { field: 'participantName', headerName: 'Participante', width: 180, valueGetter: (params) => employees.find(e => e.id === params.row.userId)?.name || params.row.userId },
    { field: 'badgeName', headerName: 'Insignia', width: 200, valueGetter: (params) => badges.find(b => b.id === params.row.badgeId)?.name || params.row.badgeId },
    { field: 'issueDate', headerName: 'Fecha de Obtención', width: 150 },
];

const leaderboardColumns = [
    { field: 'userName', headerName: 'Participante', width: 200 },
    { field: 'totalCoursesCompleted', headerName: 'Cursos Completados', type: 'number', width: 150 },
    { field: 'totalPoints', headerName: 'Puntos Totales', type: 'number', width: 120 },
    { field: 'badgesEarned', headerName: 'Insignias Obtenidas', type: 'number', width: 150 },
];

const mentorshipProgramColumns = [
    { field: 'name', headerName: 'Nombre del Programa', width: 250 },
    { field: 'description', headerName: 'Descripción', width: 400 },
    { field: 'status', headerName: 'Estado', width: 120, renderCell: (params) => (
            <Chip label={params.value} color={params.value === 'Activo' ? 'success' : 'default'} size="small" />
        )},
    { field: 'coordinator', headerName: 'Coordinador', width: 150 },
    { field: 'startDate', headerName: 'Fecha Inicio', width: 120 },
];

const mentorMenteePairColumns = [
    { field: 'programName', headerName: 'Programa', width: 250, valueGetter: (params) => mentorshipPrograms.find(p => p.id === params.row.programId)?.name || params.row.programId },
    { field: 'mentorName', headerName: 'Mentor', width: 180 },
    { field: 'menteeName', headerName: 'Mentee', width: 180 },
    { field: 'startDate', headerName: 'Fecha Inicio', width: 120 },
    { field: 'status', headerName: 'Estado', width: 100, renderCell: (params) => (
            <Chip label={params.value} color={params.value === 'Activo' ? 'success' : 'default'} size="small" />
        )},
];

const studyGroupColumns = [
    { field: 'name', headerName: 'Nombre del Grupo', width: 250 },
    { field: 'topic', headerName: 'Tema', width: 200 },
    { field: 'facilitator', headerName: 'Facilitador', width: 180 },
    { field: 'membersCount', headerName: 'Miembros', type: 'number', width: 100, valueGetter: (params) => params.row.members.length },
    { field: 'status', headerName: 'Estado', width: 100, renderCell: (params) => (
            <Chip label={params.value} color={params.value === 'Activo' ? 'success' : 'default'} size="small" />
        )},
    { field: 'meetingFrequency', headerName: 'Frecuencia', width: 120 },
];

const trainingEventColumns = [
    { field: 'title', headerName: 'Título del Evento', width: 250 },
    { field: 'type', headerName: 'Tipo', width: 120 },
    { field: 'date', headerName: 'Fecha', width: 120 },
    { field: 'time', headerName: 'Hora', width: 100 },
    { field: 'location', headerName: 'Ubicación', width: 180 },
    { field: 'instructor', headerName: 'Instructor/Facilitador', width: 180 },
    { field: 'attendeesCount', headerName: 'Asistentes', type: 'number', width: 100, valueGetter: (params) => params.row.attendees.length },
];

const internalExpertColumns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'department', headerName: 'Departamento', width: 150 },
    { field: 'role', headerName: 'Rol', width: 150 },
    { field: 'expertise', headerName: 'Áreas de Experiencia', width: 300, renderCell: (params) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {params.value?.map((skill, index) => <Chip key={index} label={skill} size="small" />)}
            </Box>
        )},
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Teléfono', width: 150 },
];


// --- Campos de formulario (actualizados y nuevos) ---

const courseFormFields = [
    { name: 'name', label: 'Nombre del Curso', type: 'text', halfWidth: true },
    { name: 'code', label: 'Código del Curso', type: 'text', halfWidth: true },
    { name: 'instructor', label: 'Instructor', type: 'text', halfWidth: true },
    { name: 'duration', label: 'Duración (ej. 20h)', type: 'text', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activo', label: 'Activo' }, { value: 'Inactivo', label: 'Inactivo' }, { value: 'Próximamente', label: 'Próximamente' }], halfWidth: true },
    { name: 'type', label: 'Tipo', type: 'select', options: [{ value: 'Online', label: 'Online' }, { value: 'Presencial', label: 'Presencial' }, { value: 'Mixto', label: 'Mixto' }], halfWidth: true },
    { name: 'category', label: 'Categoría', type: 'text', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

const assignmentFormFields = [
    { name: 'title', label: 'Título de Asignación', type: 'text', fullWidth: true },
    { name: 'courseId', label: 'Curso Asociado', type: 'select', options: extendedCourses.map(c => ({ value: c.id, label: c.name })), halfWidth: true },
    { name: 'type', label: 'Tipo', type: 'select', options: [{ value: 'Práctica', label: 'Práctica' }, { value: 'Examen', label: 'Examen' }, { value: 'Proyecto', label: 'Proyecto' }, { value: 'Quiz', label: 'Quiz' }], halfWidth: true },
    { name: 'dueDate', label: 'Fecha Límite', type: 'date', halfWidth: true },
    { name: 'maxScore', label: 'Puntuación Máxima', type: 'number', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

const learningPathFormFields = [
    { name: 'name', label: 'Nombre de la Ruta', type: 'text', fullWidth: true },
    { name: 'code', label: 'Código de la Ruta', type: 'text', halfWidth: true },
    { name: 'creator', label: 'Creador', type: 'text', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activo', label: 'Activo' }, { value: 'Inactivo', label: 'Inactivo' }, { value: 'Próximamente', label: 'Próximamente' }], halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
    // Nota: La gestión de cursos dentro de la ruta sería un formulario anidado o un proceso separado
];

const certificationFormFields = [
    { name: 'name', label: 'Nombre de Certificación', type: 'text', fullWidth: true },
    { name: 'issuingBody', label: 'Organismo Emisor', type: 'text', halfWidth: true },
    { name: 'validityPeriod', label: 'Período de Validez (ej. 2 años)', type: 'text', halfWidth: true },
    { name: 'associatedPath', label: 'Ruta de Aprendizaje Asociada', type: 'select', options: [{ value: null, label: 'Ninguna' }, ...extendedLearningPaths.map(lp => ({ value: lp.code, label: lp.name }))], halfWidth: true },
    // La selección de requiredCourses sería un multi-select o un componente separado
];

const enrollmentFormFields = [
    { name: 'participantId', label: 'Participante', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'courseId', label: 'Curso', type: 'select', options: extendedCourses.map(c => ({ value: c.id, label: c.name })), halfWidth: true },
    { name: 'startDate', label: 'Fecha de Inicio', type: 'date', halfWidth: true },
    { name: 'lastActivity', label: 'Última Actividad', type: 'date', halfWidth: true },
    { name: 'progress', label: 'Progreso (%)', type: 'number', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'En Curso', label: 'En Curso' }, { value: 'Completado', label: 'Completado' }, { value: 'Abandonado', label: 'Abandonado' }], halfWidth: true },
    { name: 'score', label: 'Puntuación Final', type: 'number', halfWidth: true },
    { name: 'completedModules', label: 'Módulos Completados', type: 'number', halfWidth: true },
    { name: 'totalModules', label: 'Total Módulos', type: 'number', halfWidth: true },
];

const issuedCertificateFormFields = [
    { name: 'enrollmentId', label: 'Matrícula Asociada', type: 'select', options: extendedEnrollments.map(e => ({ value: e.id, label: `${e.participantName} - ${e.courseName}` })), fullWidth: true },
    { name: 'certId', label: 'Certificación', type: 'select', options: extendedCertifications.map(c => ({ value: c.id, label: c.name })), halfWidth: true },
    { name: 'issueDate', label: 'Fecha de Emisión', type: 'date', halfWidth: true },
    { name: 'expiryDate', label: 'Fecha de Vencimiento', type: 'date', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Válido', label: 'Válido' }, { value: 'Expirado', label: 'Expirado' }], halfWidth: true },
];

const evaluationResultFormFields = [
    { name: 'assignmentId', label: 'Asignación', type: 'select', options: assignments.map(a => ({ value: a.id, label: `${a.title} (${extendedCourses.find(c => c.id === a.courseId)?.name || ''})` })), fullWidth: true },
    { name: 'participantId', label: 'Participante', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'score', label: 'Puntuación', type: 'number', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Calificado', label: 'Calificado' }, { value: 'Pendiente', label: 'Pendiente' }, { value: 'No Entregado', label: 'No Entregado' }], halfWidth: true },
    { name: 'submissionDate', label: 'Fecha de Envío', type: 'date', halfWidth: true },
];

const feedbackSurveyFormFields = [
    { name: 'title', label: 'Título de Encuesta', type: 'text', fullWidth: true },
    { name: 'courseId', label: 'Curso Asociado (Opcional)', type: 'select', options: [{ value: null, label: 'General' }, ...extendedCourses.map(c => ({ value: c.id, label: c.name }))], halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activa', label: 'Activa' }, { value: 'Cerrada', label: 'Cerrada' }, { value: 'Borrador', label: 'Borrador' }], halfWidth: true },
    { name: 'creationDate', label: 'Fecha de Creación', type: 'date', halfWidth: true },
    // totalResponses se calcularía automáticamente
];

const surveyResponseFormFields = [
    { name: 'surveyId', label: 'Encuesta', type: 'select', options: feedbackSurveys.map(s => ({ value: s.id, label: s.title })), fullWidth: true },
    { name: 'participantId', label: 'Participante', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'responseDate', label: 'Fecha de Respuesta', type: 'date', halfWidth: true },
    { name: 'rating', label: 'Calificación (1-5)', type: 'number', halfWidth: true, inputProps: { min: 1, max: 5 } },
    { name: 'comments', label: 'Comentarios', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

// --- NUEVOS CAMPOS DE FORMULARIO ---
const webinarFormFields = [
    { name: 'title', label: 'Título del Webinar', type: 'text', fullWidth: true },
    { name: 'speaker', label: 'Ponente', type: 'text', halfWidth: true },
    { name: 'date', label: 'Fecha', type: 'date', halfWidth: true },
    { name: 'time', label: 'Hora (HH:MM AM/PM)', type: 'text', halfWidth: true },
    { name: 'duration', label: 'Duración (ej. 60 min)', type: 'text', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Próximo', label: 'Próximo' }, { value: 'Grabado', label: 'Grabado' }, { value: 'Cancelado', label: 'Cancelado' }], halfWidth: true },
    { name: 'category', label: 'Categoría', type: 'text', halfWidth: true },
    { name: 'registrationLink', label: 'Enlace de Registro', type: 'text', fullWidth: true },
    { name: 'recordingLink', label: 'Enlace de Grabación', type: 'text', fullWidth: true },
];

const podcastFormFields = [
    { name: 'title', label: 'Título del Podcast', type: 'text', fullWidth: true },
    { name: 'host', label: 'Anfitrión', type: 'text', halfWidth: true },
    { name: 'duration', label: 'Duración (ej. 30 min)', type: 'text', halfWidth: true },
    { name: 'publishDate', label: 'Fecha de Publicación', type: 'date', halfWidth: true },
    { name: 'url', label: 'URL del Podcast', type: 'text', fullWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

const simulationFormFields = [
    { name: 'title', label: 'Título de Simulación', type: 'text', fullWidth: true },
    { name: 'type', label: 'Tipo', type: 'select', options: [{ value: 'Software', label: 'Software' }, { value: 'Laboratorio Virtual', label: 'Laboratorio Virtual' }, { value: 'Juego de Rol', label: 'Juego de Rol' }], halfWidth: true },
    { name: 'accessLink', label: 'Enlace de Acceso', type: 'text', fullWidth: true },
    { name: 'duration', label: 'Duración (ej. Ilimitado, 4h)', type: 'text', halfWidth: true },
    { name: 'requirements', label: 'Requisitos', type: 'text', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
];

const skillsCatalogFormFields = [
    { name: 'name', label: 'Nombre de Habilidad', type: 'text', halfWidth: true },
    { name: 'category', label: 'Categoría', type: 'text', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
    // relatedCourses sería un multi-select complejo
];

const userSkillsProgressFormFields = [
    { name: 'userId', label: 'Participante', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'skillId', label: 'Habilidad', type: 'select', options: skillsCatalog.map(s => ({ value: s.id, label: s.name })), halfWidth: true },
    { name: 'level', label: 'Nivel Actual', type: 'select', options: [{ value: 'Básico', label: 'Básico' }, { value: 'Intermedio', label: 'Intermedio' }, { value: 'Avanzado', label: 'Avanzado' }, { value: 'Experto', label: 'Experto' }], halfWidth: true },
    { name: 'targetLevel', label: 'Nivel Objetivo', type: 'select', options: [{ value: 'Básico', label: 'Básico' }, { value: 'Intermedio', label: 'Intermedio' }, { value: 'Avanzado', label: 'Avanzado' }, { value: 'Experto', label: 'Experto' }], halfWidth: true },
    { name: 'currentScore', label: 'Puntuación Actual', type: 'number', halfWidth: true },
    { name: 'lastUpdated', label: 'Última Actualización', type: 'date', halfWidth: true },
];

const badgeFormFields = [
    { name: 'name', label: 'Nombre de Insignia', type: 'text', halfWidth: true },
    { name: 'icon', label: 'Icono (ej. star, book, group, award)', type: 'text', halfWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 2, fullWidth: true },
    { name: 'criteria', label: 'Criterios de Obtención', type: 'text', multiline: true, rows: 2, fullWidth: true },
];

const mentorshipProgramFormFields = [
    { name: 'name', label: 'Nombre del Programa', type: 'text', fullWidth: true },
    { name: 'description', label: 'Descripción', type: 'text', multiline: true, rows: 3, fullWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activo', label: 'Activo' }, { value: 'Inactivo', label: 'Inactivo' }, { value: 'Próximamente', label: 'Próximamente' }], halfWidth: true },
    { name: 'coordinator', label: 'Coordinador', type: 'text', halfWidth: true },
    { name: 'startDate', label: 'Fecha de Inicio', type: 'date', halfWidth: true },
    { name: 'endDate', label: 'Fecha de Fin (Opcional)', type: 'date', halfWidth: true },
];

const mentorMenteePairFormFields = [
    { name: 'programId', label: 'Programa de Mentoría', type: 'select', options: mentorshipPrograms.map(p => ({ value: p.id, label: p.name })), fullWidth: true },
    { name: 'mentorId', label: 'Mentor', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'menteeId', label: 'Mentee', type: 'select', options: employees.map(e => ({ value: e.id, label: e.name })), halfWidth: true },
    { name: 'startDate', label: 'Fecha de Inicio', type: 'date', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activo', label: 'Activo' }, { value: 'Finalizado', label: 'Finalizado' }, { value: 'Inactivo', label: 'Inactivo' }], halfWidth: true },
];

const studyGroupFormFields = [
    { name: 'name', label: 'Nombre del Grupo', type: 'text', fullWidth: true },
    { name: 'topic', label: 'Tema Principal', type: 'text', halfWidth: true },
    { name: 'facilitator', label: 'Facilitador', type: 'text', halfWidth: true },
    { name: 'creationDate', label: 'Fecha de Creación', type: 'date', halfWidth: true },
    { name: 'status', label: 'Estado', type: 'select', options: [{ value: 'Activo', label: 'Activo' }, { value: 'Inactivo', label: 'Inactivo' }], halfWidth: true },
    { name: 'meetingFrequency', label: 'Frecuencia de Reunión', type: 'text', halfWidth: true },
    // members sería un multi-select
];

const trainingEventFormFields = [
    { name: 'title', label: 'Título del Evento', type: 'text', fullWidth: true },
    { name: 'type', label: 'Tipo de Evento', type: 'select', options: [{ value: 'Taller', label: 'Taller' }, { value: 'Charla', label: 'Charla' }, { value: 'Bootcamp', label: 'Bootcamp' }, { value: 'Sesión Q&A', label: 'Sesión Q&A' }, { value: 'Conferencia', label: 'Conferencia' }], halfWidth: true },
    { name: 'date', label: 'Fecha', type: 'date', halfWidth: true },
    { name: 'time', label: 'Hora (HH:MM AM/PM)', type: 'text', halfWidth: true },
    { name: 'duration', label: 'Duración (ej. 4h, 3 días)', type: 'text', halfWidth: true },
    { name: 'location', label: 'Ubicación (Física/Online)', type: 'text', halfWidth: true },
    { name: 'instructor', label: 'Instructor/Facilitador', type: 'text', halfWidth: true },
    // attendees sería un multi-select
];

const internalExpertFormFields = [
    { name: 'name', label: 'Nombre del Experto', type: 'text', halfWidth: true },
    { name: 'department', label: 'Departamento', type: 'text', halfWidth: true },
    { name: 'role', label: 'Rol', type: 'text', halfWidth: true },
    { name: 'email', label: 'Email', type: 'email', halfWidth: true },
    { name: 'phone', label: 'Teléfono', type: 'text', halfWidth: true },
    { name: 'expertise', label: 'Áreas de Experiencia (separadas por coma)', type: 'text', fullWidth: true },
];


const LearningPlatformModule = () => {
    const [currentView, setCurrentView] = useState('courses'); // Vista inicial
    const [formType, setFormType] = useState(null); // Tipo de formulario (ej. 'course', 'assignment')
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
            case 'course': setCurrentView('courses'); break;
            case 'assignment': setCurrentView('assignments'); break;
            case 'learningPath': setCurrentView('learningPaths'); break;
            case 'certification': setCurrentView('certifications'); break;
            case 'enrollment': setCurrentView('enrollments'); break;
            case 'issuedCertificate': setCurrentView('issuedCertificates'); break;
            case 'evaluationResult': setCurrentView('evaluationResults'); break;
            case 'feedbackSurvey': setCurrentView('feedbackSurveys'); break;
            case 'surveyResponse': setCurrentView('surveyResponses'); break;
            case 'webinar': setCurrentView('webinars'); break;
            case 'podcast': setCurrentView('podcasts'); break;
            case 'simulation': setCurrentView('simulations'); break;
            case 'skill': setCurrentView('skillsCatalog'); break;
            case 'userSkillProgress': setCurrentView('userSkillsProgress'); break;
            case 'badge': setCurrentView('gamificationBadges'); break;
            case 'mentorshipProgram': setCurrentView('mentorshipPrograms'); break;
            case 'mentorMenteePair': setCurrentView('mentorMenteePairs'); break;
            case 'studyGroup': setCurrentView('studyGroups'); break;
            case 'trainingEvent': setCurrentView('trainingEventsCalendar'); break;
            case 'internalExpert': setCurrentView('internalExperts'); break;
            default: setCurrentView('courses'); // Fallback
        }
        setFormType(null);
        setSelectedData(null);
    };

    // Manejador para cancelar la edición/creación en el formulario
    const handleCancelForm = () => {
        // Volvemos a la vista de lista anterior
        switch (formType) {
            case 'course': setCurrentView('courses'); break;
            case 'assignment': setCurrentView('assignments'); break;
            case 'learningPath': setCurrentView('learningPaths'); break;
            case 'certification': setCurrentView('certifications'); break;
            case 'enrollment': setCurrentView('enrollments'); break;
            case 'issuedCertificate': setCurrentView('issuedCertificates'); break;
            case 'evaluationResult': setCurrentView('evaluationResults'); break;
            case 'feedbackSurvey': setCurrentView('feedbackSurveys'); break;
            case 'surveyResponse': setCurrentView('surveyResponses'); break;
            case 'webinar': setCurrentView('webinars'); break;
            case 'podcast': setCurrentView('podcasts'); break;
            case 'simulation': setCurrentView('simulations'); break;
            case 'skill': setCurrentView('skillsCatalog'); break;
            case 'userSkillProgress': setCurrentView('userSkillsProgress'); break;
            case 'badge': setCurrentView('gamificationBadges'); break;
            case 'mentorshipProgram': setCurrentView('mentorshipPrograms'); break;
            case 'mentorMenteePair': setCurrentView('mentorMenteePairs'); break;
            case 'studyGroup': setCurrentView('studyGroups'); break;
            case 'trainingEvent': setCurrentView('trainingEventsCalendar'); break;
            case 'internalExpert': setCurrentView('internalExperts'); break;
            default: setCurrentView('courses'); // Fallback
        }
        setFormType(null);
        setSelectedData(null);
    };

    // Manejador para ver detalles de elementos (ej. contenido de curso, descripción completa)
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
            case 'course':
                const content = courseContent[data.id] || [];
                return (
                    <>
                        <DialogTitle>Detalles del Curso: {data.name}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Instructor: {data.instructor} | Duración: {data.duration} | Categoría: {data.category}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{data.description}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Contenido del Curso:</Typography>
                            {content.length > 0 ? (
                                <List>
                                    {content.map((item) => (
                                        <ListItem key={item.id} disablePadding>
                                            <ListItemIcon>
                                                {item.type === 'Module' ? <BookIcon /> :
                                                    item.type === 'Lesson' ? <PlayArrowIcon /> :
                                                        item.type === 'Document' ? <DescriptionIcon /> :
                                                            item.type === 'Quiz' ? <QuizIcon /> : null}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`${item.order}. ${item.title} (${item.type})`}
                                                secondary={item.duration || item.url ? (
                                                    <>
                                                        {item.duration && `Duración: ${item.duration}`}
                                                        {item.url && (
                                                            <Link href={item.url} target="_blank" sx={{ ml: item.duration ? 1 : 0 }}>
                                                                {item.type === 'Lesson' ? 'Ver Lección' : 'Descargar'}
                                                            </Link>
                                                        )}
                                                    </>
                                                ) : null}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">No hay contenido detallado disponible para este curso.</Typography>
                            )}
                        </DialogContent>
                    </>
                );
            case 'learningPath':
                const pathCourses = learningPathCourses[data.id] || [];
                return (
                    <>
                        <DialogTitle>Detalles de la Ruta de Aprendizaje: {data.name}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Creador: {data.creator} | Estado: {data.status} | Cursos: {data.totalCourses}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{data.description}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Cursos en esta Ruta:</Typography>
                            {pathCourses.length > 0 ? (
                                <List>
                                    {pathCourses.map((pc, index) => {
                                        const course = extendedCourses.find(c => c.code === pc.courseCode);
                                        return course ? (
                                            <ListItem key={index} disablePadding>
                                                <ListItemIcon>
                                                    {pc.mandatory ? <CheckCircleOutlineIcon color="primary" /> : <HourglassEmptyIcon color="action" />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`${pc.order}. ${course.name} (${course.code})`}
                                                    secondary={pc.mandatory ? 'Obligatorio' : 'Opcional'}
                                                />
                                            </ListItem>
                                        ) : null;
                                    })}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">No hay cursos definidos para esta ruta.</Typography>
                            )}
                        </DialogContent>
                    </>
                );
            case 'webinar':
                return (
                    <>
                        <DialogTitle>Detalles del Webinar: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Ponente: {data.speaker} | Fecha: {data.date} {data.time} | Duración: {data.duration}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>Categoría: {data.category}</Typography>
                            {data.registrationLink && (
                                <Button variant="contained" startIcon={<LinkIcon />} href={data.registrationLink} target="_blank" sx={{ mr: 1 }}>
                                    Registrarse
                                </Button>
                            )}
                            {data.recordingLink && (
                                <Button variant="outlined" startIcon={<PlayArrowIcon />} href={data.recordingLink} target="_blank">
                                    Ver Grabación
                                </Button>
                            )}
                        </DialogContent>
                    </>
                );
            case 'podcast':
                return (
                    <>
                        <DialogTitle>Detalles del Podcast: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Anfitrión: {data.host} | Duración: {data.duration} | Publicado: {data.publishDate}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{data.description}</Typography>
                            {data.url && (
                                <Button variant="contained" startIcon={<PlayArrowIcon />} href={data.url} target="_blank">
                                    Escuchar Podcast
                                </Button>
                            )}
                        </DialogContent>
                    </>
                );
            case 'simulation':
                return (
                    <>
                        <DialogTitle>Detalles de Simulación: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Tipo: {data.type} | Duración: {data.duration}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{data.description}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Requisitos: {data.requirements}</Typography>
                            {data.accessLink && (
                                <Button variant="contained" startIcon={<LinkIcon />} href={data.accessLink} target="_blank">
                                    Acceder a la Simulación
                                </Button>
                            )}
                        </DialogContent>
                    </>
                );
            case 'skill':
                return (
                    <>
                        <DialogTitle>Detalles de Habilidad: {data.name}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Categoría: {data.category}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{data.description}</Typography>
                            {data.relatedCourses && data.relatedCourses.length > 0 && (
                                <>
                                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Cursos Relacionados:</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {data.relatedCourses.map((courseCode, index) => {
                                            const course = extendedCourses.find(c => c.code === courseCode);
                                            return course ? <Chip key={index} label={course.name} /> : null;
                                        })}
                                    </Box>
                                </>
                            )}
                        </DialogContent>
                    </>
                );
            case 'mentorshipProgram':
                return (
                    <>
                        <DialogTitle>Detalles del Programa de Mentoría: {data.name}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Coordinador: {data.coordinator} | Estado: {data.status} | Inicio: {data.startDate} {data.endDate ? ` - Fin: ${data.endDate}` : ''}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{data.description}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Parejas de Mentoría Activas:</Typography>
                            <List>
                                {mentorMenteePairs.filter(p => p.programId === data.id && p.status === 'Activo').map(pair => (
                                    <ListItem key={pair.id}>
                                        <ListItemText primary={`${pair.mentorName} (Mentor) con ${pair.menteeName} (Mentee)`} secondary={`Desde: ${pair.startDate}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </DialogContent>
                    </>
                );
            case 'studyGroup':
                return (
                    <>
                        <DialogTitle>Detalles del Grupo de Estudio: {data.name}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Tema: {data.topic} | Facilitador: {data.facilitator} | Frecuencia: {data.meetingFrequency}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>Estado: {data.status} | Creado: {data.creationDate}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Miembros del Grupo:</Typography>
                            <List>
                                {data.members.map(memberId => {
                                    const member = employees.find(e => e.id === memberId);
                                    return member ? (
                                        <ListItem key={member.id}>
                                            <ListItemText primary={member.name} secondary={member.department} />
                                        </ListItem>
                                    ) : null;
                                })}
                            </List>
                        </DialogContent>
                    </>
                );
            case 'trainingEvent':
                return (
                    <>
                        <DialogTitle>Detalles del Evento de Capacitación: {data.title}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Tipo: {data.type} | Fecha: {data.date} {data.time} | Duración: {data.duration}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>Ubicación: {data.location} | Instructor: {data.instructor}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Asistentes Confirmados:</Typography>
                            <List>
                                {data.attendees.map(attendeeId => {
                                    const attendee = employees.find(e => e.id === attendeeId);
                                    return attendee ? (
                                        <ListItem key={attendee.id}>
                                            <ListItemText primary={attendee.name} secondary={attendee.department} />
                                        </ListItem>
                                    ) : null;
                                })}
                            </List>
                        </DialogContent>
                    </>
                );
            case 'internalExpert':
                return (
                    <>
                        <DialogTitle>Detalles del Experto Interno: {data.name}</DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Departamento: {data.department} | Rol: {data.role}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>Email: {data.email} | Teléfono: {data.phone}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>Áreas de Experiencia:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {data.expertise.map((skill, index) => <Chip key={index} label={skill} />)}
                            </Box>
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
            case 'courses':
                return (
                    <TableViewer
                        title="Catálogo de Cursos"
                        data={extendedCourses}
                        columns={courseColumns}
                        onEdit={(data) => handleOpenForm('course', data)}
                        onDelete={(data) => console.log('Eliminar curso:', data)}
                        onAdd={() => handleOpenForm('course')}
                        onView={(data) => handleViewDetail('course', data)}
                    />
                );
            case 'assignments':
                return (
                    <TableViewer
                        title="Gestión de Asignaciones"
                        data={assignments}
                        columns={assignmentColumns}
                        onEdit={(data) => handleOpenForm('assignment', data)}
                        onDelete={(data) => console.log('Eliminar asignación:', data)}
                        onAdd={() => handleOpenForm('assignment')}
                    />
                );
            case 'learningPaths':
                return (
                    <TableViewer
                        title="Rutas de Aprendizaje"
                        data={extendedLearningPaths}
                        columns={learningPathColumns}
                        onEdit={(data) => handleOpenForm('learningPath', data)}
                        onDelete={(data) => console.log('Eliminar ruta:', data)}
                        onAdd={() => handleOpenForm('learningPath')}
                        onView={(data) => handleViewDetail('learningPath', data)}
                    />
                );
            case 'certifications':
                return (
                    <TableViewer
                        title="Certificaciones Disponibles"
                        data={extendedCertifications}
                        columns={certificationColumns}
                        onEdit={(data) => handleOpenForm('certification', data)}
                        onDelete={(data) => console.log('Eliminar certificación:', data)}
                        onAdd={() => handleOpenForm('certification')}
                    />
                );
            case 'enrollments':
                return (
                    <TableViewer
                        title="Matrículas y Progreso de Cursos"
                        data={extendedEnrollments}
                        columns={enrollmentColumns}
                        onEdit={(data) => handleOpenForm('enrollment', data)}
                        onDelete={(data) => console.log('Eliminar matrícula:', data)}
                        onAdd={() => handleOpenForm('enrollment', { startDate: new Date().toISOString().slice(0, 10), status: 'En Curso' })}
                    />
                );
            case 'issuedCertificates':
                return (
                    <TableViewer
                        title="Certificados Emitidos"
                        data={issuedCertificates}
                        columns={issuedCertificateColumns}
                        onEdit={(data) => handleOpenForm('issuedCertificate', data)}
                        onDelete={(data) => console.log('Eliminar certificado emitido:', data)}
                        onAdd={() => handleOpenForm('issuedCertificate', { issueDate: new Date().toISOString().slice(0, 10) })}
                    />
                );
            case 'evaluationResults':
                return (
                    <TableViewer
                        title="Resultados de Evaluaciones"
                        data={evaluationResults}
                        columns={evaluationResultColumns}
                        onEdit={(data) => handleOpenForm('evaluationResult', data)}
                        onDelete={(data) => console.log('Eliminar resultado:', data)}
                        onAdd={() => handleOpenForm('evaluationResult')}
                    />
                );
            case 'feedbackSurveys':
                return (
                    <TableViewer
                        title="Encuestas de Feedback"
                        data={feedbackSurveys}
                        columns={feedbackSurveyColumns}
                        onEdit={(data) => handleOpenForm('feedbackSurvey', data)}
                        onDelete={(data) => console.log('Eliminar encuesta:', data)}
                        onAdd={() => handleOpenForm('feedbackSurvey', { creationDate: new Date().toISOString().slice(0, 10), status: 'Activa' })}
                    />
                );
            case 'surveyResponses':
                return (
                    <TableViewer
                        title="Respuestas a Encuestas"
                        data={surveyResponses}
                        columns={surveyResponseColumns}
                        onEdit={(data) => handleOpenForm('surveyResponse', data)}
                        onDelete={(data) => console.log('Eliminar respuesta:', data)}
                        onAdd={() => handleOpenForm('surveyResponse', { responseDate: new Date().toISOString().slice(0, 10) })}
                    />
                );
            case 'webinars':
                return (
                    <TableViewer
                        title="Webinars y Seminarios Online"
                        data={webinars}
                        columns={webinarColumns}
                        onEdit={(data) => handleOpenForm('webinar', data)}
                        onDelete={(data) => console.log('Eliminar webinar:', data)}
                        onAdd={() => handleOpenForm('webinar')}
                        onView={(data) => handleViewDetail('webinar', data)}
                    />
                );
            case 'podcasts':
                return (
                    <TableViewer
                        title="Podcasts Educativos Internos"
                        data={podcasts}
                        columns={podcastColumns}
                        onEdit={(data) => handleOpenForm('podcast', data)}
                        onDelete={(data) => console.log('Eliminar podcast:', data)}
                        onAdd={() => handleOpenForm('podcast')}
                        onView={(data) => handleViewDetail('podcast', data)}
                    />
                );
            case 'simulations':
                return (
                    <TableViewer
                        title="Simulaciones y Laboratorios Virtuales"
                        data={simulations}
                        columns={simulationColumns}
                        onEdit={(data) => handleOpenForm('simulation', data)}
                        onDelete={(data) => console.log('Eliminar simulación:', data)}
                        onAdd={() => handleOpenForm('simulation')}
                        onView={(data) => handleViewDetail('simulation', data)}
                    />
                );
            case 'skillsCatalog':
                return (
                    <TableViewer
                        title="Catálogo de Habilidades y Competencias"
                        data={skillsCatalog}
                        columns={skillsCatalogColumns}
                        onEdit={(data) => handleOpenForm('skill', data)}
                        onDelete={(data) => console.log('Eliminar habilidad:', data)}
                        onAdd={() => handleOpenForm('skill')}
                        onView={(data) => handleViewDetail('skill', data)}
                    />
                );
            case 'userSkillsProgress':
                return (
                    <TableViewer
                        title="Progreso de Habilidades de Empleados"
                        data={userSkillsProgress}
                        columns={userSkillsProgressColumns}
                        onEdit={(data) => handleOpenForm('userSkillProgress', data)}
                        onDelete={(data) => console.log('Eliminar progreso de habilidad:', data)}
                        onAdd={() => handleOpenForm('userSkillProgress', { lastUpdated: new Date().toISOString().slice(0, 10) })}
                    />
                );
            case 'gamificationBadges':
                return (
                    <>
                        <TableViewer
                            title="Insignias de Gamificación"
                            data={badges}
                            columns={badgeColumns}
                            onEdit={(data) => handleOpenForm('badge', data)}
                            onDelete={(data) => console.log('Eliminar insignia:', data)}
                            onAdd={() => handleOpenForm('badge')}
                        />
                        <Box sx={{ mt: 4 }}>
                            <TableViewer
                                title="Insignias Obtenidas por Empleados"
                                data={userBadges}
                                columns={userBadgeColumns}
                                // No permitir edición/borrado directo aquí, solo visualización
                                renderActions={false}
                            />
                        </Box>
                    </>
                );
            case 'gamificationLeaderboard':
                return (
                    <TableViewer
                        title="Clasificación de Aprendizaje (Top Participantes)"
                        data={leaderboard}
                        columns={leaderboardColumns}
                        // Esto es solo un reporte, no se edita directamente
                        renderActions={false}
                    />
                );
            case 'mentorshipPrograms':
                return (
                    <>
                        <TableViewer
                            title="Programas de Mentoría"
                            data={mentorshipPrograms}
                            columns={mentorshipProgramColumns}
                            onEdit={(data) => handleOpenForm('mentorshipProgram', data)}
                            onDelete={(data) => console.log('Eliminar programa de mentoría:', data)}
                            onAdd={() => handleOpenForm('mentorshipProgram', { startDate: new Date().toISOString().slice(0, 10), status: 'Activo' })}
                            onView={(data) => handleViewDetail('mentorshipProgram', data)}
                        />
                        <Box sx={{ mt: 4 }}>
                            <TableViewer
                                title="Parejas de Mentoría Activas"
                                data={mentorMenteePairs}
                                columns={mentorMenteePairColumns}
                                onEdit={(data) => handleOpenForm('mentorMenteePair', data)}
                                onDelete={(data) => console.log('Eliminar pareja de mentoría:', data)}
                                onAdd={() => handleOpenForm('mentorMenteePair', { startDate: new Date().toISOString().slice(0, 10), status: 'Activo' })}
                            />
                        </Box>
                    </>
                );
            case 'studyGroups':
                return (
                    <TableViewer
                        title="Grupos de Estudio y Colaboración"
                        data={studyGroups}
                        columns={studyGroupColumns}
                        onEdit={(data) => handleOpenForm('studyGroup', data)}
                        onDelete={(data) => console.log('Eliminar grupo de estudio:', data)}
                        onAdd={() => handleOpenForm('studyGroup', { creationDate: new Date().toISOString().slice(0, 10), status: 'Activo' })}
                        onView={(data) => handleViewDetail('studyGroup', data)}
                    />
                );
            case 'trainingEventsCalendar':
                return (
                    <TableViewer
                        title="Calendario de Eventos de Capacitación"
                        data={trainingEventsCalendar}
                        columns={trainingEventColumns}
                        onEdit={(data) => handleOpenForm('trainingEvent', data)}
                        onDelete={(data) => console.log('Eliminar evento:', data)}
                        onAdd={() => handleOpenForm('trainingEvent', { date: new Date().toISOString().slice(0, 10) })}
                        onView={(data) => handleViewDetail('trainingEvent', data)}
                    />
                );
            case 'internalExperts':
                return (
                    <TableViewer
                        title="Directorio de Expertos Internos / Instructores"
                        data={internalExperts}
                        columns={internalExpertColumns}
                        onEdit={(data) => handleOpenForm('internalExpert', data)}
                        onDelete={(data) => console.log('Eliminar experto:', data)}
                        onAdd={() => handleOpenForm('internalExpert')}
                        onView={(data) => handleViewDetail('internalExpert', data)}
                    />
                );
            case 'reports':
                return (
                    <Box>
                        <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Informes de la Plataforma de Aprendizaje
                        </Typography>
                        <ReportViewer
                            reportName="Progreso General de Cursos por Departamento"
                            description="Visualización del avance promedio de los empleados en los cursos, agrupado por departamento."
                            onGenerate={() => console.log('Generando informe: Progreso General de Cursos por Departamento')}
                        />
                        <ReportViewer
                            reportName="Cursos Más Populares y Menos Completados"
                            description="Identifica los cursos con mayor número de matrículas y aquellos con las tasas de finalización más bajas."
                            onGenerate={() => console.log('Generando informe: Cursos Más Populares y Menos Completados')}
                        />
                        <ReportViewer
                            reportName="Análisis de Habilidades Desarrolladas por Empleado"
                            description="Reporte detallado sobre las habilidades que cada empleado ha estado desarrollando y su nivel de progreso."
                            onGenerate={() => console.log('Generando informe: Análisis de Habilidades Desarrolladas por Empleado')}
                        />
                        <ReportViewer
                            reportName="Participación en Programas de Mentoría y Grupos de Estudio"
                            description="Métricas sobre la implicación de los empleados en iniciativas de colaboración y mentoría."
                            onGenerate={() => console.log('Generando informe: Participación en Programas de Mentoría y Grupos de Estudio')}
                        />
                        <ReportViewer
                            reportName="Impacto de Webinars y Podcasts en el Aprendizaje"
                            description="Evaluación de la asistencia y el feedback de los webinars y podcasts para medir su efectividad."
                            onGenerate={() => console.log('Generando informe: Impacto de Webinars y Podcasts')}
                        />
                    </Box>
                );
            case 'form':
                let formFields, formTitle;
                switch (formType) {
                    case 'course': formFields = courseFormFields; formTitle = selectedData.id ? "Editar Curso" : "Crear Nuevo Curso"; break;
                    case 'assignment': formFields = assignmentFormFields; formTitle = selectedData.id ? "Editar Asignación" : "Crear Nueva Asignación"; break;
                    case 'learningPath': formFields = learningPathFormFields; formTitle = selectedData.id ? "Editar Ruta de Aprendizaje" : "Crear Nueva Ruta de Aprendizaje"; break;
                    case 'certification': formFields = certificationFormFields; formTitle = selectedData.id ? "Editar Certificación" : "Crear Nueva Certificación"; break;
                    case 'enrollment': formFields = enrollmentFormFields; formTitle = selectedData.id ? "Editar Matrícula" : "Crear Nueva Matrícula"; break;
                    case 'issuedCertificate': formFields = issuedCertificateFormFields; formTitle = selectedData.id ? "Editar Certificado Emitido" : "Registrar Nuevo Certificado Emitido"; break;
                    case 'evaluationResult': formFields = evaluationResultFormFields; formTitle = selectedData.id ? "Editar Resultado de Evaluación" : "Registrar Nuevo Resultado de Evaluación"; break;
                    case 'feedbackSurvey': formFields = feedbackSurveyFormFields; formTitle = selectedData.id ? "Editar Encuesta de Feedback" : "Crear Nueva Encuesta de Feedback"; break;
                    case 'surveyResponse': formFields = surveyResponseFormFields; formTitle = selectedData.id ? "Editar Respuesta a Encuesta" : "Registrar Nueva Respuesta a Encuesta"; break;
                    case 'webinar': formFields = webinarFormFields; formTitle = selectedData.id ? "Editar Webinar" : "Crear Nuevo Webinar"; break;
                    case 'podcast': formFields = podcastFormFields; formTitle = selectedData.id ? "Editar Podcast" : "Crear Nuevo Podcast"; break;
                    case 'simulation': formFields = simulationFormFields; formTitle = selectedData.id ? "Editar Simulación" : "Crear Nueva Simulación"; break;
                    case 'skill': formFields = skillsCatalogFormFields; formTitle = selectedData.id ? "Editar Habilidad" : "Añadir Nueva Habilidad al Catálogo"; break;
                    case 'userSkillProgress': formFields = userSkillsProgressFormFields; formTitle = selectedData.id ? "Editar Progreso de Habilidad" : "Registrar Progreso de Habilidad"; break;
                    case 'badge': formFields = badgeFormFields; formTitle = selectedData.id ? "Editar Insignia" : "Crear Nueva Insignia"; break;
                    case 'mentorshipProgram': formFields = mentorshipProgramFormFields; formTitle = selectedData.id ? "Editar Programa de Mentoría" : "Crear Nuevo Programa de Mentoría"; break;
                    case 'mentorMenteePair': formFields = mentorMenteePairFormFields; formTitle = selectedData.id ? "Editar Pareja de Mentoría" : "Crear Nueva Pareja de Mentoría"; break;
                    case 'studyGroup': formFields = studyGroupFormFields; formTitle = selectedData.id ? "Editar Grupo de Estudio" : "Crear Nuevo Grupo de Estudio"; break;
                    case 'trainingEvent': formFields = trainingEventFormFields; formTitle = selectedData.id ? "Editar Evento de Capacitación" : "Crear Nuevo Evento de Capacitación"; break;
                    case 'internalExpert': formFields = internalExpertFormFields; formTitle = selectedData.id ? "Editar Experto Interno" : "Añadir Nuevo Experto Interno"; break;
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
                <SchoolIcon sx={{ mr: 1 }} /> Plataforma de Aprendizaje Empresarial
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Menú de pestañas para navegar entre las sub-secciones del módulo */}
            <Tabs
                value={currentView === 'form' ? (
                    formType === 'course' ? 'courses' :
                        formType === 'assignment' ? 'assignments' :
                            formType === 'learningPath' ? 'learningPaths' :
                                formType === 'certification' ? 'certifications' :
                                    formType === 'enrollment' ? 'enrollments' :
                                        formType === 'issuedCertificate' ? 'issuedCertificates' :
                                            formType === 'evaluationResult' ? 'evaluationResults' :
                                                formType === 'feedbackSurvey' ? 'feedbackSurveys' :
                                                    formType === 'surveyResponse' ? 'surveyResponses' :
                                                        formType === 'webinar' ? 'webinars' :
                                                            formType === 'podcast' ? 'podcasts' :
                                                                formType === 'simulation' ? 'simulations' :
                                                                    formType === 'skill' ? 'skillsCatalog' :
                                                                        formType === 'userSkillProgress' ? 'userSkillsProgress' :
                                                                            formType === 'badge' ? 'gamificationBadges' :
                                                                                formType === 'mentorshipProgram' ? 'mentorshipPrograms' :
                                                                                    formType === 'mentorMenteePair' ? 'mentorshipPrograms' : // Vuelve a la pestaña principal de mentoría
                                                                                        formType === 'studyGroup' ? 'studyGroups' :
                                                                                            formType === 'trainingEvent' ? 'trainingEventsCalendar' :
                                                                                                formType === 'internalExpert' ? 'internalExperts' :
                                                                                                    'courses' // Fallback para el caso de formulario
                ) : currentView}
                onChange={(event, newValue) => setCurrentView(newValue)}
                aria-label="learning platform module tabs"
                variant="scrollable" // Permite desplazamiento si hay muchas pestañas
                scrollButtons="auto"
                sx={{ mb: 3 }}
            >
                <Tab label="Cursos" value="courses" icon={<CourseIcon />} iconPosition="start" />
                <Tab label="Asignaciones" value="assignments" icon={<AssignmentIcon />} iconPosition="start" />
                <Tab label="Rutas de Aprendizaje" value="learningPaths" icon={<PathIcon />} iconPosition="start" />
                <Tab label="Certificaciones" value="certifications" icon={<CertificateIcon />} iconPosition="start" />
                <Tab label="Matrículas y Progreso" value="enrollments" icon={<EnrollmentIcon />} iconPosition="start" />
                <Tab label="Certificados Emitidos" value="issuedCertificates" icon={<DoneAllIcon />} iconPosition="start" />
                <Tab label="Resultados de Evaluaciones" value="evaluationResults" icon={<AssessmentIcon />} iconPosition="start" />
                <Tab label="Feedback y Encuestas" value="feedbackSurveys" icon={<FeedbackIcon />} iconPosition="start" />
                <Tab label="Webinars" value="webinars" icon={<VideoCameraFrontIcon />} iconPosition="start" />
                <Tab label="Podcasts" value="podcasts" icon={<MicIcon />} iconPosition="start" />
                <Tab label="Simulaciones" value="simulations" icon={<ScienceIcon />} iconPosition="start" />
                <Tab label="Habilidades" value="skillsCatalog" icon={<HandymanIcon />} iconPosition="start" />
                <Tab label="Progreso de Habilidades" value="userSkillsProgress" icon={<TrendingUpIcon />} iconPosition="start" />
                <Tab label="Gamificación (Insignias)" value="gamificationBadges" icon={<MilitaryTechIcon />} iconPosition="start" />
                <Tab label="Gamificación (Clasificación)" value="gamificationLeaderboard" icon={<LeaderboardIcon />} iconPosition="start" />
                <Tab label="Programas de Mentoría" value="mentorshipPrograms" icon={<PeopleIcon />} iconPosition="start" />
                <Tab label="Grupos de Estudio" value="studyGroups" icon={<GroupIcon />} iconPosition="start" />
                <Tab label="Calendario de Eventos" value="trainingEventsCalendar" icon={<EventIcon />} iconPosition="start" />
                <Tab label="Expertos Internos" value="internalExperts" icon={<PersonPinIcon />} iconPosition="start" />
                <Tab label="Informes" value="reports" icon={<AssessmentIcon />} iconPosition="start" />
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

export default LearningPlatformModule;