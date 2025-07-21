// src/data/extendedLearningData.js

// --- Cursos ---
export const extendedCourses = [
    { id: 'C001', code: 'SAP-BO-FND', name: 'Fundamentos de SAP Business One', instructor: 'Dr. Leonardo Torres', duration: '20h', status: 'Activo', type: 'Online', category: 'SAP ERP', totalStudents: 150, description: 'Curso introductorio a la gestión empresarial con SAP Business One, cubriendo módulos clave.' },
    { id: 'C002', code: 'INV-ADV-BO', name: 'Gestión de Inventario Avanzada en SAP BO', instructor: 'Ing. Ana Sofía García', duration: '15h', status: 'Activo', type: 'Presencial', category: 'Logística', totalStudents: 80, description: 'Profundiza en las funcionalidades de inventario, valoración y optimización dentro de SAP BO.' },
    { id: 'C003', code: 'CONT-NO-CPA', name: 'Contabilidad Financiera para No Contadores', instructor: 'Cont. María Fernanda Pérez', duration: '25h', status: 'Activo', type: 'Mixto', category: 'Finanzas', totalStudents: 200, description: 'Conceptos esenciales de contabilidad para profesionales de otras áreas.' },
    { id: 'C004', code: 'PBI-INT', name: 'Introducción a Power BI para Análisis de Datos', instructor: 'Lic. Andrés Rojas', duration: '10h', status: 'Inactivo', type: 'Online', category: 'Business Intelligence', totalStudents: 0, description: 'Primeros pasos en la creación de paneles interactivos con Power BI.' },
    { id: 'C005', code: 'CS-FUND', name: 'Fundamentos de Ciberseguridad', instructor: 'Esp. Carlos Morales', duration: '30h', status: 'Próximamente', type: 'Online', category: 'Tecnología', totalStudents: 0, description: 'Principios básicos de protección de datos y sistemas en el entorno empresarial.' },
    { id: 'C006', code: 'PM-AGILE', name: 'Gestión Ágil de Proyectos (Scrum)', instructor: 'PMP Laura Castro', duration: '18h', status: 'Activo', type: 'Online', category: 'Habilidades Blandas', totalStudents: 120, description: 'Metodologías ágiles para la gestión eficiente de proyectos, con enfoque en Scrum.' },
    { id: 'C007', code: 'ETL-BAS', name: 'ETL y Data Warehousing Básico', instructor: 'Ing. Javier Solano', duration: '22h', status: 'Activo', type: 'Online', category: 'Business Intelligence', totalStudents: 75, description: 'Introducción a los procesos de Extracción, Transformación y Carga de datos.' },
    { id: 'C008', code: 'COMM-EFF', name: 'Comunicación Efectiva en el Trabajo', instructor: 'Psic. Viviana Díaz', duration: '12h', status: 'Activo', type: 'Presencial', category: 'Habilidades Blandas', totalStudents: 90, description: 'Desarrollo de habilidades de comunicación para un ambiente laboral productivo.' },
    { id: 'C009', code: 'SALES-CRM', name: 'Estrategias de Ventas con CRM', instructor: 'Lic. Ricardo Vélez', duration: '16h', status: 'Activo', type: 'Online', category: 'Ventas', totalStudents: 60, description: 'Optimización de procesos de ventas utilizando herramientas CRM.' },
    { id: 'C010', code: 'HR-DIGITAL', name: 'Transformación Digital en RRHH', instructor: 'MSc. Elena Soto', duration: '20h', status: 'Próximamente', type: 'Online', category: 'Recursos Humanos', totalStudents: 0, description: 'Impacto y aplicación de tecnologías digitales en la gestión de talento.' },
    { id: 'C011', code: 'FIN-EXCEL', name: 'Excel Avanzado para Finanzas', instructor: 'Cont. Jorge Noguera', duration: '14h', status: 'Activo', type: 'Online', category: 'Finanzas', totalStudents: 110, description: 'Funciones avanzadas de Excel aplicadas a modelos financieros y análisis de datos.' },
    { id: 'C012', code: 'LEAN-SIX', name: 'Introducción a Lean Six Sigma', instructor: 'Ing. Patricia Rivas', duration: '28h', status: 'Activo', type: 'Mixto', category: 'Operaciones', totalStudents: 45, description: 'Conceptos y herramientas básicas de Lean Six Sigma para la mejora de procesos.' },
];

export const courseContent = {
    'C001': [
        { id: 1, type: 'Module', title: 'Módulo 1: Introducción a SAP BO', order: 1, content: [] },
        { id: 11, type: 'Lesson', parentId: 1, title: 'Lección 1.1: ¿Qué es un ERP y SAP BO?', order: 1.1, url: 'http://www.youtube.com/embed/dQw4w9WgXcQ', duration: '15 min' },
        { id: 12, type: 'Document', parentId: 1, title: 'Guía de Usuario Básica (PDF)', order: 1.2, url: '/dummy_files/guia_sapbo.pdf' },
        { id: 2, type: 'Module', title: 'Módulo 2: Maestros de Datos', order: 2, content: [] },
        { id: 21, type: 'Lesson', parentId: 2, title: 'Lección 2.1: Socios de Negocio', order: 2.1, url: 'http://www.youtube.com/embed/dQw4w9WgXcQ', duration: '20 min' },
        { id: 22, type: 'Quiz', parentId: 2, title: 'Quiz Módulo 2', order: 2.2, questions: 5, passingScore: 70 },
        { id: 3, type: 'Module', title: 'Módulo 3: Procesos de Ventas', order: 3, content: [] },
        { id: 31, type: 'Lesson', parentId: 3, title: 'Lección 3.1: Creación de Pedidos de Venta', order: 3.1, url: 'http://www.youtube.com/embed/dQw4w9WgXcQ', duration: '25 min' },
    ],
    'C002': [
        { id: 1, type: 'Module', title: 'Módulo 1: Conceptos de Inventario', order: 1, content: [] },
        { id: 11, type: 'Lesson', parentId: 1, title: 'Lección 1.1: Tipos de Artículos y Almacenes', order: 1.1, url: 'http://www.youtube.com/embed/dQw4w9WgXcQ', duration: '18 min' },
        { id: 2, type: 'Module', title: 'Módulo 2: Valoración de Inventario', order: 2, content: [] },
        { id: 21, type: 'Document', parentId: 2, title: 'Guía de Valoración de Inventario (PDF)', order: 2.1, url: '/dummy_files/guia_valoracion_inv.pdf' },
    ],
    'C009': [
        { id: 1, type: 'Module', title: 'Módulo 1: Fundamentos de CRM para Ventas', order: 1, content: [] },
        { id: 11, type: 'Lesson', parentId: 1, title: 'Lección 1.1: ¿Qué es un CRM y por qué es importante?', order: 1.1, url: 'http://www.youtube.com/embed/dQw4w9WgXcQ', duration: '10 min' },
        { id: 2, type: 'Module', title: 'Módulo 2: Gestión de Oportunidades', order: 2, content: [] },
        { id: 21, type: 'Lesson', parentId: 2, title: 'Lección 2.1: Pipeline de Ventas y Pronósticos', order: 2.1, url: 'http://www.youtube.com/embed/dQw4w9WgXcQ', duration: '20 min' },
    ],
};

export const assignments = [
    { id: 'ASS001', courseId: 'C001', title: 'Práctica de Creación de SN', description: 'Crear 5 socios de negocio en el entorno de pruebas.', dueDate: '2024-08-01', type: 'Práctica', maxScore: 100 },
    { id: 'ASS002', courseId: 'C001', title: 'Examen Final Fundamentos', description: 'Evaluación de conocimientos del curso completo.', dueDate: '2024-08-15', type: 'Examen', maxScore: 100 },
    { id: 'ASS003', courseId: 'C002', title: 'Caso de Estudio: Optimización de Almacén', description: 'Analizar un caso real de optimización de inventario.', dueDate: '2024-08-20', type: 'Proyecto', maxScore: 100 },
    { id: 'ASS004', courseId: 'C003', title: 'Quiz Contabilidad Básica', description: 'Quiz sobre los principios básicos de contabilidad.', dueDate: '2024-08-05', type: 'Quiz', maxScore: 100 },
    { id: 'ASS005', courseId: 'C006', title: 'Simulación de Sprint Scrum', description: 'Realizar una simulación de un sprint de 2 semanas.', dueDate: '2024-09-01', type: 'Proyecto', maxScore: 100 },
    { id: 'ASS006', courseId: 'C009', title: 'Creación de Reporte de Ventas en CRM', description: 'Diseñar un reporte personalizado en el CRM para la gerencia de ventas.', dueDate: '2024-09-10', type: 'Práctica', maxScore: 100 },
];

// --- Rutas de Aprendizaje ---
export const extendedLearningPaths = [
    { id: 'LP001', code: 'SAP-BO-ESP', name: 'Certificación Especialista SAP Business One', description: 'Ruta completa para dominar SAP Business One y su integración.', status: 'Activo', creator: 'Dpto. Formación', totalCourses: 3, enrollmentCount: 75 },
    { id: 'LP002', code: 'FIN-PRO', name: 'Desarrollo Profesional Financiero y Contable', description: 'Programa para profesionales de finanzas y contabilidad.', status: 'Activo', creator: 'Dpto. Finanzas', totalCourses: 2, enrollmentCount: 120 },
    { id: 'LP003', code: 'BI-ANALYST', name: 'Analista de Business Intelligence', description: 'Formación en herramientas y metodologías de BI.', status: 'Activo', creator: 'Dpto. TI', totalCourses: 4, enrollmentCount: 60 },
    { id: 'LP004', code: 'LIDER-DIG', name: 'Liderazgo en la Era Digital', description: 'Habilidades de liderazgo y gestión en entornos digitales.', status: 'Próximamente', creator: 'RRHH', totalCourses: 3, enrollmentCount: 0 },
    { id: 'LP005', code: 'SALES-MASTERY', name: 'Maestría en Estrategias de Ventas', description: 'Ruta avanzada para el equipo de ventas, cubriendo CRM, negociación y cierre.', status: 'Activo', creator: 'Dpto. Ventas', totalCourses: 3, enrollmentCount: 40 },
];

export const learningPathCourses = {
    'LP001': [
        { courseCode: 'C001', order: 1, mandatory: true },
        { courseCode: 'C002', order: 2, mandatory: true },
        { courseCode: 'CS-FUND', order: 3, mandatory: false }, // Opcional, pero parte de la ruta
    ],
    'LP002': [
        { courseCode: 'C003', order: 1, mandatory: true },
        { courseCode: 'FIN-EXCEL', order: 2, mandatory: true },
    ],
    'LP005': [
        { courseCode: 'C009', order: 1, mandatory: true },
        { courseCode: 'COMM-EFF', order: 2, mandatory: true },
        // Asumimos un curso de negociación que no está en la lista principal aún
        { courseCode: 'NEG-ADV', order: 3, mandatory: false },
    ]
};

// --- Certificaciones ---
export const extendedCertifications = [
    { id: 'CERT001', name: 'Especialista Certificado SAP Business One', issuingBody: 'Consulnetworks Formación', validityPeriod: '2 años', requiredCourses: ['C001', 'C002'], associatedPath: 'SAP-BO-ESP' },
    { id: 'CERT002', name: 'Certificación en Gestión de Proyectos Ágiles (Scrum Master)', issuingBody: 'PMI Local Chapter', validityPeriod: '3 años', requiredCourses: ['PM-AGILE'], associatedPath: null },
    { id: 'CERT003', name: 'Analista de Datos Certificado', issuingBody: 'Consulnetworks BI', validityPeriod: '2 años', requiredCourses: ['PBI-INT', 'ETL-BAS'], associatedPath: 'BI-ANALYST' },
    { id: 'CERT004', name: 'Especialista en Estrategias CRM', issuingBody: 'Consulnetworks Ventas', validityPeriod: '2 años', requiredCourses: ['C009'], associatedPath: 'SALES-MASTERY' },
];

// --- Matrículas y Progreso ---
export const extendedEnrollments = [
    { id: 'ENR001', participantId: 'E001', participantName: 'Juan Pérez', courseId: 'C001', courseName: 'Fundamentos de SAP Business One', progress: 75, status: 'En Curso', lastActivity: '2024-07-18', completedModules: 2, totalModules: 3, score: null, startDate: '2024-07-01' },
    { id: 'ENR002', participantId: 'E002', participantName: 'Ana Gómez', courseId: 'C002', courseName: 'Gestión de Inventario Avanzada en SAP BO', progress: 100, status: 'Completado', lastActivity: '2024-07-10', completedModules: 2, totalModules: 2, score: 92, startDate: '2024-06-01' },
    { id: 'ENR03', participantId: 'E001', participantName: 'Juan Pérez', courseId: 'C006', courseName: 'Gestión Ágil de Proyectos (Scrum)', progress: 30, status: 'En Curso', lastActivity: '2024-07-15', completedModules: 1, totalModules: 3, score: null, startDate: '2024-07-10' },
    { id: 'ENR04', participantId: 'E003', participantName: 'María López', courseId: 'C001', courseName: 'Fundamentos de SAP Business One', progress: 50, status: 'En Curso', lastActivity: '2024-07-16', completedModules: 1, totalModules: 3, score: null, startDate: '2024-07-05' },
    { id: 'ENR05', participantId: 'E002', participantName: 'Ana Gómez', courseId: 'C003', courseName: 'Contabilidad Financiera para No Contadores', progress: 10, status: 'En Curso', lastActivity: '2024-07-19', completedModules: 0, totalModules: 4, score: null, startDate: '2024-07-18' },
    { id: 'ENR06', participantId: 'E004', participantName: 'Pedro Martínez', courseId: 'C001', courseName: 'Fundamentos de SAP Business One', progress: 100, status: 'Completado', lastActivity: '2024-07-05', completedModules: 3, totalModules: 3, score: 88, startDate: '2024-06-15' },
    { id: 'ENR07', participantId: 'E001', participantName: 'Juan Pérez', courseId: 'C009', courseName: 'Estrategias de Ventas con CRM', progress: 15, status: 'En Curso', lastActivity: '2024-07-20', completedModules: 0, totalModules: 2, score: null, startDate: '2024-07-19' },
    { id: 'ENR08', participantId: 'E005', participantName: 'Carlos Sánchez', courseId: 'C011', courseName: 'Excel Avanzado para Finanzas', progress: 60, status: 'En Curso', lastActivity: '2024-07-17', completedModules: 2, totalModules: 3, score: null, startDate: '2024-07-01' },
];

export const issuedCertificates = [
    { id: 'ISC001', enrollmentId: 'ENR002', certId: 'CERT001', certName: 'Especialista Certificado SAP Business One', participantId: 'E002', participantName: 'Ana Gómez', issueDate: '2024-07-10', expiryDate: '2026-07-10', status: 'Válido' },
    { id: 'ISC002', enrollmentId: 'ENR06', certId: 'CERT001', certName: 'Especialista Certificado SAP Business One', participantId: 'E004', participantName: 'Pedro Martínez', issueDate: '2024-07-05', expiryDate: '2026-07-05', status: 'Válido' },
];

// --- Resultados de Evaluaciones ---
export const evaluationResults = [
    { id: 'ER001', assignmentId: 'ASS001', participantId: 'E001', participantName: 'Juan Pérez', courseId: 'C001', score: 85, status: 'Calificado', submissionDate: '2024-07-28' },
    { id: 'ER002', assignmentId: 'ASS001', participantId: 'E003', participantName: 'María López', courseId: 'C001', score: 70, status: 'Calificado', submissionDate: '2024-07-29' },
    { id: 'ER003', assignmentId: 'ASS002', participantId: 'E004', participantName: 'Pedro Martínez', courseId: 'C001', score: 90, status: 'Calificado', submissionDate: '2024-08-14' },
    { id: 'ER004', assignmentId: 'ASS004', participantId: 'E002', participantName: 'Ana Gómez', courseId: 'C003', score: 95, status: 'Calificado', submissionDate: '2024-08-04' },
    { id: 'ER005', assignmentId: 'ASS005', participantId: 'E001', participantName: 'Juan Pérez', courseId: 'C006', score: null, status: 'Pendiente', submissionDate: null },
    { id: 'ER006', assignmentId: 'ASS006', participantId: 'E001', participantName: 'Juan Pérez', courseId: 'C009', score: null, status: 'Pendiente', submissionDate: null },
];

// --- Feedback y Encuestas ---
export const feedbackSurveys = [
    { id: 'FB001', title: 'Encuesta de Satisfacción del Curso SAP BO', courseId: 'C001', status: 'Activa', creationDate: '2024-07-01', totalResponses: 50 },
    { id: 'FB002', title: 'Feedback sobre Instructor: Ana García', instructorId: 'Ana Sofía García', status: 'Cerrada', creationDate: '2024-06-15', totalResponses: 30 },
    { id: 'FB003', title: 'Sugerencias para la Plataforma de Aprendizaje', courseId: null, status: 'Activa', creationDate: '2024-05-20', totalResponses: 120 },
];

export const surveyResponses = [
    { id: 'SR001', surveyId: 'FB001', participantId: 'E001', participantName: 'Juan Pérez', responseDate: '2024-07-10', rating: 4, comments: 'Curso muy útil, el instructor explica bien.' },
    { id: 'SR002', surveyId: 'FB001', participantId: 'E003', participantName: 'María López', responseDate: '2024-07-12', rating: 5, comments: 'Excelente contenido y material de apoyo.' },
    { id: 'SR003', surveyId: 'FB003', participantId: 'E002', participantName: 'Ana Gómez', responseDate: '2024-06-01', rating: null, comments: 'Sería bueno tener más cursos de Power BI avanzados.' },
];

// --- Recursos de Cursos (Existentes - estos son específicos de curso) ---
export const extendedResources = [
    { id: 'RES001', title: 'Manual de usuario SAP BO v10 (PDF)', type: 'Documento', courseId: 'C001', uploadDate: '2023-11-01', url: '/dummy_files/manual_sapbo_v10.pdf', tags: ['SAP', 'Manual'] },
    { id: 'RES002', title: 'Video: Flujo de Inventario en SAP BO', type: 'Video', courseId: 'C002', uploadDate: '2024-01-10', url: 'http://www.youtube.com/embed/dQw4w9WgXcQ', tags: ['Inventario', 'Video'] },
    { id: 'RES003', title: 'Lista de Cuentas Contables Clave', type: 'Documento', courseId: 'C003', uploadDate: '2024-03-05', url: '/dummy_files/cuentas_contables.pdf', tags: ['Contabilidad'] },
    { id: 'RES004', title: 'Ejercicios Prácticos Power BI', type: 'Archivo', courseId: 'C004', uploadDate: '2024-04-20', url: '/dummy_files/powerbi_exercises.zip', tags: ['Power BI', 'Ejercicios'] },
    { id: 'RES005', title: 'Webinar: Novedades Ciberseguridad 2024', type: 'Video', courseId: 'C005', uploadDate: '2024-06-15', url: 'http://www.youtube.com/embed/dQw4w9WgXcQ', tags: ['Ciberseguridad', 'Webinar'] },
    { id: 'RES006', title: 'Plantilla Scrum Board (Excel)', type: 'Archivo', courseId: 'C006', uploadDate: '2024-05-10', url: '/dummy_files/scrum_template.xlsx', tags: ['Agile', 'Proyecto'] },
];

// --- Base de Conocimiento (Enfoque en Formación) ---
export const knowledgeBaseArticles = [
    { id: 'KB001', title: 'Cómo restablecer tu contraseña en la Plataforma de Formación', category: 'Acceso y Cuenta', content: 'Si olvidaste tu contraseña de acceso a la plataforma de cursos, haz clic en "Olvidé mi contraseña" en la página de inicio...', lastUpdated: '2024-07-01', tags: ['contraseña', 'acceso', 'plataforma', 'FAQ'] },
    { id: 'KB002', title: 'Requisitos técnicos para la reproducción de videos de curso', category: 'Problemas Técnicos de Cursos', content: 'Asegúrate de tener un navegador actualizado (Chrome, Firefox, Edge) y una conexión a internet estable para una reproducción óptima de los videos de los cursos.', lastUpdated: '2024-06-20', tags: ['video', 'técnico', 'navegador', 'cursos'] },
    { id: 'KB003', title: 'Guía de Inscripción en Cursos y Rutas de Aprendizaje', category: 'Inscripción', content: 'Navega a la sección "Plataforma de Aprendizaje", luego a "Cursos" o "Rutas" y haz clic en "Inscribirse" en el curso o ruta deseada.', lastUpdated: '2024-07-15', tags: ['inscripción', 'curso', 'guía', 'rutas'] },
    { id: 'KB004', title: 'Uso de Foros de Discusión en los Módulos de Curso', category: 'Interacción en Cursos', content: 'Los foros son un espacio para interactuar con instructores y compañeros. Aprende a publicar preguntas, responder y seguir hilos relevantes en tus cursos.', lastUpdated: '2024-07-20', tags: ['foros', 'interacción', 'cursos', 'comunidad'] },
    { id: 'KB005', title: 'Cómo descargar materiales de apoyo de los cursos', category: 'Materiales de Curso', content: 'Dentro de cada lección, busca el ícono de descarga o un enlace para acceder a PDFs, plantillas o ejercicios adicionales.', lastUpdated: '2024-07-22', tags: ['descargas', 'materiales', 'cursos'] },
];

// --- Tickets de Soporte (Enfoque en Formación) ---
export const supportTickets = [
    { id: 'TKT001', subject: 'No puedo acceder al curso SAP BO', description: 'El curso aparece bloqueado en la plataforma y no me permite iniciar las lecciones o ver el contenido.', requesterId: 'E001', requesterName: 'Juan Pérez', status: 'Abierto', priority: 'Alta', assignedTo: 'E005', submissionDate: '2024-07-20', resolutionDate: null, resolutionComments: '' },
    { id: 'TKT002', subject: 'Problema con la calificación del Quiz de Contabilidad', description: 'Mi puntuación del quiz no se actualiza después de completarlo, y la plataforma lo marca como pendiente.', requesterId: 'E002', requesterName: 'Ana Gómez', status: 'En Progreso', priority: 'Media', assignedTo: 'E006', submissionDate: '2024-07-19', resolutionDate: null, resolutionComments: '' },
    { id: 'TKT003', subject: 'Sugerencia de nuevo curso de Inteligencia Artificial', description: 'Me gustaría sugerir la creación de un curso avanzado sobre "Machine Learning" aplicado a negocios.', requesterId: 'E003', requesterName: 'María López', status: 'Resuelto', priority: 'Baja', assignedTo: 'E006', submissionDate: '2024-07-15', resolutionDate: '2024-07-18', resolutionComments: 'Sugerencia reenviada al equipo de desarrollo de contenido para evaluación.' },
    { id: 'TKT004', subject: 'Error al reproducir video de Módulo 2 en Curso Ciberseguridad', description: 'El video de la Lección 2.1 del curso "Fundamentos de Ciberseguridad" no carga. Se queda en pantalla negra.', requesterId: 'E004', requesterName: 'Pedro Martínez', status: 'Cerrado', priority: 'Media', assignedTo: 'E005', submissionDate: '2024-07-10', resolutionDate: '2024-07-12', resolutionComments: 'Video re-codificado y subido nuevamente. Problema resuelto.' },
];

// --- Recursos y Descargas (Generales para Formación) ---
export const generalResources = [
    { id: 'GR001', title: 'Guía de Estilos para Materiales de Formación', type: 'Documento', uploadDate: '2024-01-15', url: '/dummy_files/guia_estilos_formacion.pdf', description: 'Documento con pautas de diseño y contenido para crear materiales de capacitación interna.', tags: ['Diseño Instruccional', 'Guía', 'Contenido'] },
    { id: 'GR002', title: 'Plantilla de Plan de Aprendizaje Personalizado', type: 'Plantilla', uploadDate: '2023-10-01', url: '/dummy_files/plantilla_plan_aprendizaje.xlsx', description: 'Plantilla para que los empleados diseñen su propia ruta de desarrollo profesional.', tags: ['Desarrollo', 'Planificación', 'Crecimiento'] },
    { id: 'GR003', title: 'Enlace al Blog de Tendencias en e-Learning', type: 'Enlace', uploadDate: '2024-03-01', url: 'http://blog.elearning-trends.com', description: 'Acceso a un blog externo con artículos relevantes sobre las últimas tendencias en educación corporativa.', tags: ['Tendencias', 'e-Learning', 'Innovación'] },
    { id: 'GR004', title: 'Herramienta de Captura de Pantalla para Tutoriales', type: 'Software', uploadDate: '2024-05-10', url: '/dummy_files/screencapture_tool.exe', description: 'Pequeña herramienta para grabar videos cortos o capturas de pantalla para crear micro-tutoriales.', tags: ['Herramienta', 'Tutoriales', 'Contenido'] },
    { id: 'GR005', title: 'Manual de Usuario Avanzado de la Plataforma de Capacitación', type: 'Documento', uploadDate: '2024-07-22', url: '/dummy_files/manual_plataforma_avanzado.pdf', description: 'Guía detallada para administradores y usuarios avanzados de la plataforma de formación.', tags: ['Plataforma', 'Administración', 'Guía'] },
];

// --- Anuncios (Enfoque en Formación) ---
export const announcements = [
    { id: 'ANN001', title: '¡Nueva Integración! Calendario de Formación Disponible', content: 'Hemos integrado el calendario de formación con tu calendario corporativo. Ahora puedes ver tus cursos y eventos de capacitación directamente en tu agenda.', publishDate: '2024-07-20', author: 'Equipo de Formación', status: 'Activo' },
    { id: 'ANN002', title: 'Mantenimiento Programado de la Plataforma de Aprendizaje', content: 'La plataforma de capacitación estará inactiva por mantenimiento técnico el 25 de agosto de 2024 de 2 AM a 4 AM (hora local).', publishDate: '2024-07-15', author: 'Soporte de Plataforma', status: 'Activo' },
    { id: 'ANN003', title: 'Convocatoria para Voluntarios de Contenido de Curso', content: '¿Te apasiona algún tema empresarial y quieres compartir tu conocimiento? ¡Ayúdanos a crear nuevos módulos! Contáctanos si quieres ser un autor de contenido de formación.', publishDate: '2024-07-01', author: 'Dpto. Contenido de Formación', status: 'Activo' },
    { id: 'ANN004', title: 'Lanzamiento de Nuevos Cursos de Inteligencia Artificial', content: '¡Descubre nuestra nueva serie de cursos sobre fundamentos y aplicaciones de la Inteligencia Artificial en los negocios! Ya disponibles en la sección "Cursos".', publishDate: '2024-07-22', author: 'Equipo de Contenido', status: 'Activo' },
];

// --- Contactos de Soporte (Enfoque en Formación) ---
export const supportContacts = [
    { id: 'SC001', department: 'Soporte Técnico de Plataforma', name: 'Equipo de Soporte L&D', role: 'Soporte de Plataforma', email: 'soporte.plataforma@example.com', phone: '+57 1 800 1234', area: 'Problemas de Acceso, Errores de Plataforma, Fallos en Cursos' },
    { id: 'SC002', department: 'Contenido y Diseño Instruccional', name: 'Equipo de Contenido L&D', role: 'Gestión de Contenido', email: 'contenido.ld@example.com', phone: '+57 1 800 5678', area: 'Dudas sobre contenido de cursos, Sugerencias de nuevos cursos, Errores en materiales' },
    { id: 'SC003', department: 'Administración de Formación', name: 'Laura Vásquez', role: 'Administradora de Formación', email: 'laura.vasquez@example.com', phone: '+57 1 800 9101', area: 'Certificados, Progreso en rutas de aprendizaje, Inscripciones manuales' },
    { id: 'SC004', department: 'Coordinación de Capacitación', name: 'Dr. Leonardo Torres', role: 'Coordinador Académico', email: 'leonardo.torres@example.com', phone: '+57 1 800 3344', area: 'Consultas sobre programas académicos, Metodologías de formación' },
];

// --- Usuarios (para simular participantes) ---
export const employees = [ // Reutilizamos el mock de empleados de HRModule si existe, si no, uno básico
    { id: 'E001', username: 'juan.perez', name: 'Juan Pérez', email: 'juan.perez@example.com', department: 'Ventas', position: 'Vendedor Senior' },
    { id: 'E002', username: 'ana.gomez', name: 'Ana Gómez', email: 'ana.gomez@example.com', department: 'Contabilidad', position: 'Contador Junior' },
    { id: 'E003', username: 'maria.lopez', name: 'María López', email: 'maria.lopez@example.com', department: 'Marketing', position: 'Especialista Marketing Digital' },
    { id: 'E004', username: 'pedro.martinez', name: 'Pedro Martínez', email: 'pedro.martinez@example.com', department: 'TI', position: 'Desarrollador Backend' },
    { id: 'E005', username: 'carlos.sanchez', name: 'Carlos Sánchez', email: 'carlos.sanchez@example.com', department: 'Soporte L&D', position: 'Técnico de Soporte' }, // Soporte de Plataforma
    { id: 'E006', username: 'isabel.ruiz', name: 'Isabel Ruiz', email: 'isabel.ruiz@example.com', department: 'Contenido L&D', position: 'Diseñadora Instruccional' }, // Contenido
    { id: 'E007', username: 'luisa.fernandez', name: 'Luisa Fernández', email: 'luisa.fernandez@example.com', department: 'Ventas', position: 'Gerente de Ventas' },
    { id: 'E008', username: 'roberto.gomez', name: 'Roberto Gómez', email: 'roberto.gomez@example.com', department: 'Operaciones', position: 'Analista de Procesos' },
];

// --- NUEVAS ESTRUCTURAS DE DATOS ---

// --- Webinars ---
export const webinars = [
    { id: 'W001', title: 'Tendencias en Business Intelligence 2025', speaker: 'Lic. Andrés Rojas', date: '2025-01-15', time: '10:00 AM', duration: '60 min', status: 'Próximo', registrationLink: 'http://webinar.example.com/bi2025', recordingLink: null, category: 'Business Intelligence' },
    { id: 'W002', title: 'Optimización de Procesos con RPA', speaker: 'Ing. Patricia Rivas', date: '2024-11-20', time: '02:00 PM', duration: '90 min', status: 'Grabado', registrationLink: null, recordingLink: 'http://webinar.example.com/rpa_rec', category: 'Automatización' },
    { id: 'W003', title: 'Marketing Digital para el Crecimiento Empresarial', speaker: 'Lic. María López', date: '2024-10-05', time: '11:00 AM', duration: '75 min', status: 'Grabado', registrationLink: null, recordingLink: 'http://webinar.example.com/marketing_rec', category: 'Marketing' },
    { id: 'W004', title: 'Fundamentos de Ciberseguridad para Empleados', speaker: 'Esp. Carlos Morales', date: '2025-02-10', time: '09:00 AM', duration: '45 min', status: 'Próximo', registrationLink: 'http://webinar.example.com/ciberseguridad', recordingLink: null, category: 'Tecnología' },
];

// --- Podcasts ---
export const podcasts = [
    { id: 'P001', title: 'Liderazgo Ágil en la Práctica (Ep. 1)', host: 'PMP Laura Castro', duration: '30 min', publishDate: '2024-06-01', url: 'http://podcast.example.com/agil_ep1', description: 'Primer episodio sobre la aplicación de principios ágiles en equipos de trabajo.' },
    { id: 'P002', title: 'Innovación en Finanzas: Blockchain y Más (Ep. 2)', host: 'Cont. Jorge Noguera', duration: '45 min', publishDate: '2024-06-15', url: 'http://podcast.example.com/finanzas_ep2', description: 'Explorando el impacto de blockchain y otras tecnologías en el sector financiero.' },
    { id: 'P003', title: 'El Futuro del Trabajo y las Habilidades (Ep. 3)', host: 'MSc. Elena Soto', duration: '25 min', publishDate: '2024-07-01', url: 'http://podcast.example.com/futuro_trabajo_ep3', description: 'Análisis de las habilidades más demandadas en el mercado laboral actual y futuro.' },
];

// --- Simulaciones / Laboratorios ---
export const simulations = [
    { id: 'SIM001', title: 'Simulador de Gestión de Proyectos Ágiles', description: 'Entorno interactivo para practicar la gestión de un proyecto Scrum de principio a fin.', type: 'Software', accessLink: 'http://sim.example.com/agile_pm', duration: 'Ilimitado', requirements: 'Navegador moderno, conexión a internet' },
    { id: 'SIM002', title: 'Laboratorio Virtual de Ciberseguridad', description: 'Sandbox para experimentar con ataques y defensas cibernéticas en un entorno controlado.', type: 'Laboratorio Virtual', accessLink: 'http://lab.example.com/cybersec', duration: '4h por sesión', requirements: 'VPN corporativa' },
    { id: 'SIM003', title: 'Juego de Rol: Negociación con Clientes Clave', description: 'Escenarios interactivos para practicar técnicas de negociación y cierre de ventas.', type: 'Juego de Rol', accessLink: 'http://game.example.com/negotiation', duration: '2h por sesión', requirements: 'Micrófono y cámara' },
];

// --- Catálogo de Habilidades ---
export const skillsCatalog = [
    { id: 'SK001', name: 'Análisis de Datos', category: 'Técnica', description: 'Capacidad para recopilar, procesar y analizar grandes volúmenes de datos para extraer información valiosa.', relatedCourses: ['PBI-INT', 'ETL-BAS'] },
    { id: 'SK002', name: 'Liderazgo Adaptativo', category: 'Habilidades Blandas', description: 'Habilidad para ajustar el estilo de liderazgo a diferentes situaciones y equipos.', relatedCourses: ['PM-AGILE', 'COMM-EFF'] },
    { id: 'SK003', name: 'Gestión de Proyectos Ágiles', category: 'Metodología', description: 'Conocimiento y aplicación de marcos de trabajo ágiles como Scrum o Kanban.', relatedCourses: ['PM-AGILE'] },
    { id: 'SK004', name: 'Contabilidad Financiera', category: 'Finanzas', description: 'Comprensión de los principios contables y la elaboración de estados financieros.', relatedCourses: ['CONT-NO-CPA', 'FIN-EXCEL'] },
    { id: 'SK005', name: 'Ciberseguridad Empresarial', category: 'Técnica', description: 'Conocimiento de amenazas cibernéticas y medidas para proteger la información y sistemas de la empresa.', relatedCourses: ['CS-FUND'] },
    { id: 'SK006', name: 'Manejo de CRM', category: 'Software', description: 'Dominio de las funcionalidades de un sistema de Customer Relationship Management para optimizar ventas y servicio.', relatedCourses: ['SALES-CRM'] },
];

// --- Progreso de Habilidades del Usuario ---
export const userSkillsProgress = [
    { userId: 'E001', skillId: 'SK001', skillName: 'Análisis de Datos', level: 'Intermedio', lastUpdated: '2024-07-10', currentScore: 75, targetLevel: 'Avanzado' },
    { userId: 'E001', skillId: 'SK003', skillName: 'Gestión de Proyectos Ágiles', level: 'Básico', lastUpdated: '2024-07-15', currentScore: 40, targetLevel: 'Intermedio' },
    { userId: 'E002', skillId: 'SK004', skillName: 'Contabilidad Financiera', level: 'Avanzado', lastUpdated: '2024-06-20', currentScore: 90, targetLevel: 'Experto' },
    { userId: 'E003', skillId: 'SK002', skillName: 'Liderazgo Adaptativo', level: 'Básico', lastUpdated: '2024-07-01', currentScore: 55, targetLevel: 'Intermedio' },
];

// --- Insignias (Gamificación) ---
export const badges = [
    { id: 'B001', name: 'Aprendiz Proactivo', description: 'Otorgada por completar el primer curso en la plataforma.', icon: 'star', criteria: 'Completar 1 curso' },
    { id: 'B002', name: 'Maestro del Conocimiento', description: 'Otorgada por completar 5 artículos de la Base de Conocimiento.', icon: 'book', criteria: 'Leer 5 artículos KB' },
    { id: 'B003', name: 'Colaborador Destacado', description: 'Otorgada por participar activamente en 3 grupos de estudio.', icon: 'group', criteria: 'Participar en 3 grupos de estudio' },
    { id: 'B004', name: 'Experto SAP BO', description: 'Otorgada al obtener la certificación de Especialista SAP Business One.', icon: 'award', criteria: 'Obtener CERT001' },
];

export const userBadges = [
    { userId: 'E001', badgeId: 'B001', issueDate: '2024-07-10' },
    { userId: 'E002', badgeId: 'B001', issueDate: '2024-06-05' },
    { userId: 'E002', badgeId: 'B004', issueDate: '2024-07-10' },
    { userId: 'E004', badgeId: 'B001', issueDate: '2024-06-20' },
    { userId: 'E004', badgeId: 'B004', issueDate: '2024-07-05' },
];

// --- Clasificaciones (Leaderboards) ---
// Simplificado: por puntos de curso completados
export const leaderboard = [
    { userId: 'E002', userName: 'Ana Gómez', totalCoursesCompleted: 2, totalPoints: 192, badgesEarned: 2 },
    { userId: 'E004', userName: 'Pedro Martínez', totalCoursesCompleted: 1, totalPoints: 188, badgesEarned: 2 },
    { userId: 'E001', userName: 'Juan Pérez', totalCoursesCompleted: 1, totalPoints: 105, badgesEarned: 1 },
    { userId: 'E005', userName: 'Carlos Sánchez', totalCoursesCompleted: 0, totalPoints: 60, badgesEarned: 0 },
    { userId: 'E003', userName: 'María López', totalCoursesCompleted: 0, totalPoints: 70, badgesEarned: 1 },
];

// --- Programas de Mentoría ---
export const mentorshipPrograms = [
    { id: 'MTP001', name: 'Mentoría para Nuevos Ingresos', description: 'Programa para emparejar a nuevos empleados con mentores experimentados.', status: 'Activo', startDate: '2024-01-01', endDate: null, coordinator: 'Elena Soto' },
    { id: 'MTP002', name: 'Mentoría de Liderazgo', description: 'Desarrollo de habilidades de liderazgo a través de mentoría individualizada.', status: 'Activo', startDate: '2024-03-01', endDate: '2024-12-31', coordinator: 'Laura Castro' },
];

export const mentorMenteePairs = [
    { id: 'PAIR001', programId: 'MTP001', mentorId: 'E007', mentorName: 'Luisa Fernández', menteeId: 'E001', menteeName: 'Juan Pérez', startDate: '2024-07-01', status: 'Activo' },
    { id: 'PAIR002', programId: 'MTP001', mentorId: 'E008', mentorName: 'Roberto Gómez', menteeId: 'E003', menteeName: 'María López', startDate: '2024-07-15', status: 'Activo' },
    { id: 'PAIR003', programId: 'MTP002', mentorId: 'E004', mentorName: 'Pedro Martínez', menteeId: 'E005', menteeName: 'Carlos Sánchez', startDate: '2024-04-01', status: 'Activo' },
];

// --- Grupos de Estudio ---
export const studyGroups = [
    { id: 'SG001', name: 'Grupo de Estudio SAP BO Avanzado', topic: 'SAP Business One', facilitator: 'Ing. Ana Sofía García', members: ['E001', 'E004'], creationDate: '2024-06-01', status: 'Activo', meetingFrequency: 'Semanal' },
    { id: 'SG002', name: 'Club de Lectura de Finanzas', topic: 'Contabilidad y Finanzas', facilitator: 'Cont. María Fernanda Pérez', members: ['E002', 'E005'], creationDate: '2024-05-10', status: 'Activo', meetingFrequency: 'Quincenal' },
    { id: 'SG003', name: 'Práctica Power BI', topic: 'Power BI', facilitator: 'Lic. Andrés Rojas', members: ['E003'], creationDate: '2024-07-01', status: 'Activo', meetingFrequency: 'Mensual' },
];

// --- Calendario de Eventos de Capacitación ---
export const trainingEventsCalendar = [
    { id: 'EVT001', title: 'Taller de Presentaciones Efectivas', type: 'Taller', date: '2024-09-05', time: '09:00 AM', duration: '4h', location: 'Sala de Capacitación 3', instructor: 'Psic. Viviana Díaz', attendees: ['E001', 'E003', 'E007'] },
    { id: 'EVT002', title: 'Charla: Novedades en Ciberseguridad', type: 'Charla', date: '2024-09-15', time: '03:00 PM', duration: '1.5h', location: 'Auditorio Principal', instructor: 'Esp. Carlos Morales', attendees: ['E004', 'E008'] },
    { id: 'EVT003', title: 'Bootcamp de Liderazgo para Gerentes', type: 'Bootcamp', date: '2024-10-01', time: '08:00 AM', duration: '3 días', location: 'Centro de Convenciones', instructor: 'PMP Laura Castro', attendees: ['E007', 'E008'] },
    { id: 'EVT004', title: 'Sesión de Preguntas y Respuestas SAP BO', type: 'Sesión Q&A', date: '2024-08-25', time: '11:00 AM', duration: '1h', location: 'Online (Zoom)', instructor: 'Dr. Leonardo Torres', attendees: ['E001', 'E003'] },
];

// --- Expertos Internos / Instructores ---
export const internalExperts = [
    { id: 'EXP001', name: 'Dr. Leonardo Torres', department: 'Formación y Desarrollo', expertise: ['SAP Business One', 'Gestión de Proyectos', 'Finanzas'], role: 'Instructor Principal', email: 'leonardo.torres@example.com', phone: '+57 1 800 3344' },
    { id: 'EXP002', name: 'Ing. Ana Sofía García', department: 'Logística', expertise: ['Gestión de Inventario', 'Cadena de Suministro', 'SAP BO Logística'], role: 'Instructora Asociada', email: 'ana.garcia@example.com', phone: '+57 1 800 5566' },
    { id: 'EXP003', name: 'PMP Laura Castro', department: 'Oficina de Proyectos (PMO)', expertise: ['Gestión Ágil (Scrum)', 'Liderazgo', 'Certificaciones PMI'], role: 'Mentora de Liderazgo', email: 'laura.castro@example.com', phone: '+57 1 800 7788' },
    { id: 'EXP004', name: 'Cont. María Fernanda Pérez', department: 'Contabilidad', expertise: ['Contabilidad Financiera', 'Análisis de Costos', 'Normas NIIF'], role: 'Instructora de Finanzas', email: 'maria.perez@example.com', phone: '+57 1 800 9900' },
    { id: 'EXP005', name: 'Lic. Andrés Rojas', department: 'Inteligencia de Negocios', expertise: ['Power BI', 'Análisis de Datos', 'Visualización de Datos'], role: 'Experto en BI', email: 'andres.rojas@example.com', phone: '+57 1 800 1122' },
];