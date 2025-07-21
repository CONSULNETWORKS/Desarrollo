// src/data/extendedEvaluationSupportData.js

// Reutilizamos empleados, o una versión simplificada si no tienes un módulo de HR completo
export const employees = [
    { id: 'E001', username: 'juan.perez', name: 'Juan Pérez', email: 'juan.perez@example.com', department: 'Ventas', position: 'Vendedor Senior', managerId: 'E007' },
    { id: 'E002', username: 'ana.gomez', name: 'Ana Gómez', email: 'ana.gomez@example.com', department: 'Contabilidad', position: 'Contador Junior', managerId: 'E008' },
    { id: 'E003', username: 'maria.lopez', name: 'María López', email: 'maria.lopez@example.com', department: 'Marketing', position: 'Especialista Marketing Digital', managerId: 'E007' },
    { id: 'E004', username: 'pedro.martinez', name: 'Pedro Martínez', email: 'pedro.martinez@example.com', department: 'TI', position: 'Desarrollador Backend', managerId: 'E009' },
    { id: 'E005', username: 'laura.diaz', name: 'Laura Díaz', email: 'laura.diaz@example.com', department: 'Recursos Humanos', position: 'Analista RRHH', managerId: 'E008' },
    { id: 'E006', username: 'carlos.sanchez', name: 'Carlos Sánchez', email: 'carlos.sanchez@example.com', department: 'Operaciones', position: 'Gerente de Operaciones', managerId: 'E007' },
    { id: 'E007', username: 'luisa.fernandez', name: 'Luisa Fernández', email: 'luisa.fernandez@example.com', department: 'Dirección', position: 'Director de Ventas', managerId: null }, // Gerente de Juan y María
    { id: 'E008', username: 'roberto.gomez', name: 'Roberto Gómez', email: 'roberto.gomez@example.com', department: 'Dirección', position: 'Director Financiero', managerId: null }, // Gerente de Ana y Laura
    { id: 'E009', username: 'sofia.castro', name: 'Sofía Castro', email: 'sofia.castro@example.com', department: 'Dirección', position: 'CIO', managerId: null }, // Gerente de Pedro
    { id: 'E010', username: 'miguel.torres', name: 'Miguel Torres', email: 'miguel.torres@example.com', department: 'Soporte TI', position: 'Técnico Soporte N1', managerId: 'E009' },
    { id: 'E011', username: 'valeria.rios', name: 'Valeria Ríos', email: 'valeria.rios@example.com', department: 'Soporte RRHH', position: 'Especialista Soporte RRHH', managerId: 'E005' },
];

// --- EVALUACIÓN DE DESEMPEÑO ---

export const performanceCycles = [
    { id: 'PC2024A', name: 'Evaluación Anual 2024', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Activo', type: 'Anual', description: 'Ciclo de evaluación de desempeño para todo el personal, incluyendo objetivos y feedback 360.' },
    { id: 'PC2024Q2', name: 'Revisión Trimestral Q2 2024', startDate: '2024-04-01', endDate: '2024-06-30', status: 'Cerrado', type: 'Trimestral', description: 'Revisión intermedia de objetivos para el segundo trimestre del año.' },
    { id: 'PC2025A', name: 'Evaluación Anual 2025', startDate: '2025-01-01', endDate: '2025-12-31', status: 'Próximo', type: 'Anual', description: 'Ciclo de evaluación de desempeño planificado para el próximo año.' },
];

export const performanceReviews = [
    { id: 'PR001', cycleId: 'PC2024A', employeeId: 'E001', employeeName: 'Juan Pérez', managerId: 'E007', managerName: 'Luisa Fernández', status: 'En Curso', overallRating: null, lastUpdate: '2024-07-20', selfAssessmentCompleted: true, managerAssessmentCompleted: false, feedback360Collected: true },
    { id: 'PR002', cycleId: 'PC2024A', employeeId: 'E002', employeeName: 'Ana Gómez', managerId: 'E008', managerName: 'Roberto Gómez', status: 'Finalizado', overallRating: 'Excede Expectativas', lastUpdate: '2024-07-15', selfAssessmentCompleted: true, managerAssessmentCompleted: true, feedback360Collected: true },
    { id: 'PR003', cycleId: 'PC2024Q2', employeeId: 'E003', employeeName: 'María López', managerId: 'E007', managerName: 'Luisa Fernández', status: 'Finalizado', overallRating: 'Cumple Expectativas', lastUpdate: '2024-06-25', selfAssessmentCompleted: true, managerAssessmentCompleted: true, feedback360Collected: false },
    { id: 'PR004', cycleId: 'PC2024A', employeeId: 'E004', employeeName: 'Pedro Martínez', managerId: 'E009', managerName: 'Sofía Castro', status: 'En Curso', overallRating: null, lastUpdate: '2024-07-18', selfAssessmentCompleted: true, managerAssessmentCompleted: false, feedback360Collected: false },
];

export const employeeGoals = [
    { id: 'G001', reviewId: 'PR001', employeeId: 'E001', title: 'Aumentar Ventas en un 15%', description: 'Incrementar el volumen de ventas en mi cartera de clientes en un 15% para fin de año.', metric: 'Crecimiento de Ventas', target: 15, current: 8, status: 'En Progreso', dueDate: '2024-12-31' },
    { id: 'G002', reviewId: 'PR001', employeeId: 'E001', title: 'Certificación en CRM Avanzado', description: 'Completar y aprobar la certificación de CRM avanzada de SAP para Q4.', metric: 'Certificación', target: 'Aprobado', current: 'En Curso', status: 'En Progreso', dueDate: '2024-11-30' },
    { id: 'G003', reviewId: 'PR002', employeeId: 'E002', title: 'Reducir Errores de Conciliación en 10%', description: 'Disminuir los errores en los procesos de conciliación bancaria en un 10%.', metric: 'Tasa de Error', target: 90, current: 95, status: 'Completado', dueDate: '2024-06-30' },
    { id: 'G004', reviewId: 'PR004', employeeId: 'E004', title: 'Implementar Microservicios para Módulo X', description: 'Diseñar e implementar arquitectura de microservicios para el módulo de inventario.', metric: 'Hitos', target: 'Implementado', current: 'Diseño Completado', status: 'En Progreso', dueDate: '2024-10-31' },
];

export const developmentPlans = [
    { id: 'DP001', employeeId: 'E001', employeeName: 'Juan Pérez', managerId: 'E007', managerName: 'Luisa Fernández', title: 'Desarrollo en Liderazgo de Equipos', description: 'Plan enfocado en fortalecer habilidades de liderazgo para futuras posiciones de gestión.', status: 'Activo', startDate: '2024-08-01', endDate: '2025-07-31', activities: [
            { type: 'Curso', name: 'Liderazgo Situacional', status: 'Pendiente' },
            { type: 'Mentoría', name: 'Programa de Mentoría con Director', status: 'En Curso' },
            { type: 'Proyecto', name: 'Liderar Proyecto Piloto X', status: 'Pendiente' },
        ]},
    { id: 'DP002', employeeId: 'E003', employeeName: 'María López', managerId: 'E007', managerName: 'Luisa Fernández', title: 'Dominio de Analytics Avanzados', description: 'Plan para mejorar el análisis de datos de marketing con herramientas avanzadas.', status: 'Activo', startDate: '2024-07-01', endDate: '2025-01-31', activities: [
            { type: 'Curso', name: 'Power BI Avanzado', status: 'En Curso' },
            { type: 'Certificación', name: 'Certificación Google Analytics', status: 'Pendiente' },
        ]},
];

// --- GESTIÓN DE COMPETENCIAS ---

export const competencyCatalog = [
    { id: 'COMP001', name: 'Comunicación Efectiva', category: 'Habilidades Blandas', description: 'Capacidad para expresar ideas de forma clara y concisa, tanto verbalmente como por escrito, y escuchar activamente.' },
    { id: 'COMP002', name: 'Análisis Estratégico', category: 'Gestión', description: 'Habilidad para evaluar información compleja, identificar patrones, prever tendencias y tomar decisiones informadas.' },
    { id: 'COMP003', name: 'Resolución de Problemas', category: 'Habilidades Blandas', description: 'Capacidad para identificar la causa raíz de los problemas, desarrollar soluciones creativas y aplicarlas eficazmente.' },
    { id: 'COMP004', name: 'Dominio Tecnológico', category: 'Técnica', description: 'Conocimiento y habilidad para aplicar herramientas, sistemas y software relevantes para el rol.' },
    { id: 'COMP005', name: 'Orientación al Cliente', category: 'Comercial', description: 'Enfoque en comprender y satisfacer las necesidades de los clientes internos y externos.' },
];

export const competencyAssessments = [
    { id: 'CA001', employeeId: 'E001', employeeName: 'Juan Pérez', competencyId: 'COMP005', competencyName: 'Orientación al Cliente', assessedBy: 'E007', assessorName: 'Luisa Fernández', rating: 4, comments: 'Demuestra excelente proactividad en el entendimiento de las necesidades del cliente.', assessmentDate: '2024-07-15' },
    { id: 'CA002', employeeId: 'E001', employeeName: 'Juan Pérez', competencyId: 'COMP001', competencyName: 'Comunicación Efectiva', assessedBy: 'E007', assessorName: 'Luisa Fernández', rating: 3, comments: 'Necesita mejorar en la claridad al presentar informes escritos.', assessmentDate: '2024-07-15' },
    { id: 'CA003', employeeId: 'E002', employeeName: 'Ana Gómez', competencyId: 'COMP004', competencyName: 'Dominio Tecnológico', assessedBy: 'E008', assessorName: 'Roberto Gómez', rating: 5, comments: 'Experta en el uso de herramientas contables y ERP.', assessmentDate: '2024-07-10' },
    { id: 'CA004', employeeId: 'E004', employeeName: 'Pedro Martínez', competencyId: 'COMP003', competencyName: 'Resolución de Problemas', assessedBy: 'E009', assessorName: 'Sofía Castro', rating: 4, comments: 'Aborda los desafíos técnicos con lógica y eficiencia.', assessmentDate: '2024-07-18' },
];


// --- ENCUESTAS DE CLIMA Y COMPROMISO ---

export const engagementSurveys = [
    { id: 'ES001', title: 'Encuesta de Clima Laboral 2024', status: 'Activa', startDate: '2024-06-01', endDate: '2024-07-31', totalParticipants: 150, completionRate: '65%', description: 'Encuesta anual para medir la percepción de los empleados sobre el ambiente de trabajo.' },
    { id: 'ES002', title: 'Pulso de Bienestar Emocional', status: 'Cerrada', startDate: '2024-03-01', endDate: '2024-03-15', totalParticipants: 100, completionRate: '80%', description: 'Encuesta corta para evaluar el bienestar emocional del equipo.' },
];

export const surveyQuestions = {
    'ES001': [
        { id: 'Q1', text: 'Me siento valorado/a por mi trabajo en la empresa.', type: 'Escala 1-5' },
        { id: 'Q2', text: 'Mi gerente me proporciona feedback útil para mi desarrollo.', type: 'Escala 1-5' },
        { id: 'Q3', text: '¿Qué es lo que más te gusta de trabajar aquí?', type: 'Abierta' },
        { id: 'Q4', text: '¿Qué áreas crees que necesitan mejorar en la empresa?', type: 'Abierta' },
    ],
    'ES002': [
        { id: 'Q1', text: 'Me siento equilibrado/a entre mi vida laboral y personal.', type: 'Escala 1-5' },
        { id: 'Q2', text: 'La empresa apoya mi bienestar mental.', type: 'Escala 1-5' },
    ],
};

export const engagementSurveyResponses = [
    // Esto simula respuestas agregadas, no respuestas individuales para proteger la privacidad
    { surveyId: 'ES001', questionId: 'Q1', averageRating: 4.2, commentsSummary: 'Alto nivel de valoración, con algunas sugerencias para programas de reconocimiento.' },
    { surveyId: 'ES001', questionId: 'Q2', averageRating: 3.8, commentsSummary: 'Generalmente positivo, pero con necesidad de mayor frecuencia de feedback estructurado.' },
    { surveyId: 'ES002', questionId: 'Q1', averageRating: 3.5, commentsSummary: 'Sensación de desequilibrio en algunos sectores, alta carga laboral reportada.' },
    // Aquí podrías agregar más respuestas resumidas
];


// --- GESTIÓN DE TICKETS DE SOPORTE ---

export const supportTicketCategories = [
    { id: 'CAT001', name: 'Soporte de Software (IT)', description: 'Problemas con aplicaciones internas o de terceros.', department: 'TI' },
    { id: 'CAT002', name: 'Soporte de Hardware (IT)', description: 'Problemas con equipos físicos (computadoras, impresoras).', department: 'TI' },
    { id: 'CAT003', name: 'Consultas de Nómina (RRHH)', description: 'Dudas sobre pago, deducciones, beneficios.', department: 'RRHH' },
    { id: 'CAT004', name: 'Solicitud de Vacaciones (RRHH)', description: 'Gestión de solicitudes de días libres.', department: 'RRHH' },
    { id: 'CAT005', name: 'Mantenimiento General (Operaciones)', description: 'Problemas con instalaciones, mobiliario, etc.', department: 'Operaciones' },
];

export const serviceLevelAgreements = [
    { id: 'SLA001', categoryId: 'CAT001', name: 'Soporte Crítico TI', priority: 'Alta', responseTime: '1 hora', resolutionTime: '4 horas', description: 'Para problemas que impiden el trabajo crítico.' },
    { id: 'SLA002', categoryId: 'CAT003', name: 'Consulta Nómina Urgente', priority: 'Media', responseTime: '4 horas', resolutionTime: '1 día', description: 'Para consultas de nómina con impacto inmediato.' },
    { id: 'SLA003', categoryId: 'CAT005', name: 'Mantenimiento Rutinario', priority: 'Baja', responseTime: '24 horas', resolutionTime: '3 días', description: 'Para solicitudes no urgentes de mantenimiento.' },
];

export const supportAgents = [
    { id: 'AGT001', employeeId: 'E010', employeeName: 'Miguel Torres', department: 'Soporte TI', specialties: ['Redes', 'Software ERP'], status: 'Activo', available: true, currentTickets: 3 },
    { id: 'AGT002', employeeId: 'E011', employeeName: 'Valeria Ríos', department: 'Soporte RRHH', specialties: ['Nómina', 'Beneficios'], status: 'Activo', available: true, currentTickets: 2 },
    { id: 'AGT003', employeeId: 'E009', employeeName: 'Sofía Castro', department: 'TI', specialties: ['Soporte N2', 'Ciberseguridad'], status: 'Activo', available: false, currentTickets: 5 }, // Gerente de TI, también puede ser agente
    { id: 'AGT004', employeeId: 'E005', employeeName: 'Laura Díaz', department: 'RRHH', specialties: ['Legislación Laboral', 'Bienestar'], status: 'Activo', available: false, currentTickets: 4 }, // Analista de RRHH, también puede ser agente
];

export const supportTickets = [
    {
        id: 'T001',
        requesterId: 'E001',
        requesterName: 'Juan Pérez',
        categoryId: 'CAT001',
        categoryName: 'Soporte de Software (IT)',
        subject: 'Problema con SAP Business One',
        description: 'No puedo iniciar sesión en SAP Business One. Aparece un error de conexión con la base de datos.',
        status: 'Abierto',
        priority: 'Alta',
        assignedToId: 'AGT001',
        assignedToName: 'Miguel Torres',
        submissionDate: '2024-07-20T10:30:00Z',
        lastUpdate: '2024-07-21T14:00:00Z',
        resolutionDate: null,
        resolutionComments: null,
        history: [
            { date: '2024-07-20T10:30:00Z', event: 'Ticket creado por Juan Pérez' },
            { date: '2024-07-20T10:35:00Z', event: 'Asignado automáticamente a Miguel Torres' },
            { date: '2024-07-21T09:00:00Z', event: 'Miguel Torres solicitó credenciales de acceso remoto.' },
        ],
        slaMet: null, // Se calcularía en tiempo real
        attachments: [
            { name: 'error_sap.png', url: '/dummy_files/error_sap.png' }
        ]
    },
    {
        id: 'T002',
        requesterId: 'E002',
        requesterName: 'Ana Gómez',
        categoryId: 'CAT003',
        categoryName: 'Consultas de Nómina (RRHH)',
        subject: 'Duda sobre deducción en mi recibo de pago',
        description: 'En mi último recibo de pago aparece una deducción que no reconozco, necesito aclaración.',
        status: 'En Progreso',
        priority: 'Media',
        assignedToId: 'AGT002',
        assignedToName: 'Valeria Ríos',
        submissionDate: '2024-07-19T11:45:00Z',
        lastUpdate: '2024-07-20T09:15:00Z',
        resolutionDate: null,
        resolutionComments: null,
        history: [
            { date: '2024-07-19T11:45:00Z', event: 'Ticket creado por Ana Gómez' },
            { date: '2024-07-19T12:00:00Z', event: 'Asignado automáticamente a Valeria Ríos' },
            { date: '2024-07-20T09:15:00Z', event: 'Valeria Ríos solicitó el envío del recibo de pago por correo.' },
        ],
        slaMet: null,
        attachments: []
    },
    {
        id: 'T003',
        requesterId: 'E003',
        requesterName: 'María López',
        categoryId: 'CAT002',
        categoryName: 'Soporte de Hardware (IT)',
        subject: 'Mi monitor parpadea constantemente',
        description: 'Desde esta mañana, el monitor de mi escritorio parpadea, lo que dificulta trabajar.',
        status: 'Cerrado',
        priority: 'Media',
        assignedToId: 'AGT001',
        assignedToName: 'Miguel Torres',
        submissionDate: '2024-07-18T09:00:00Z',
        lastUpdate: '2024-07-18T16:30:00Z',
        resolutionDate: '2024-07-18T16:30:00Z',
        resolutionComments: 'Se realizó reemplazo de cable HDMI y prueba del monitor. Funciona correctamente. Ticket cerrado.',
        history: [
            { date: '2024-07-18T09:00:00Z', event: 'Ticket creado por María López' },
            { date: '2024-07-18T09:05:00Z', event: 'Asignado automáticamente a Miguel Torres' },
            { date: '2024-07-18T14:00:00Z', event: 'Miguel Torres diagnosticó cable defectuoso.' },
            { date: '2024-07-18T16:30:00Z', event: 'Ticket cerrado por Miguel Torres.' },
        ],
        slaMet: true,
        attachments: []
    },
    {
        id: 'T004',
        requesterId: 'E004',
        requesterName: 'Pedro Martínez',
        categoryId: 'CAT005',
        categoryName: 'Mantenimiento General (Operaciones)',
        subject: 'Fuga de agua en el lavamanos del baño de TI',
        description: 'Hay una pequeña fuga constante en el lavamanos del baño de hombres en el área de TI.',
        status: 'Pendiente',
        priority: 'Baja',
        assignedToId: null, // Aún no asignado
        assignedToName: null,
        submissionDate: '2024-07-21T09:00:00Z',
        lastUpdate: '2024-07-21T09:00:00Z',
        resolutionDate: null,
        resolutionComments: null,
        history: [
            { date: '2024-07-21T09:00:00Z', event: 'Ticket creado por Pedro Martínez' },
        ],
        slaMet: null,
        attachments: [
            { name: 'fuga_lavamanos.jpeg', url: '/dummy_files/fuga_lavamanos.jpeg' }
        ]
    },
];


// --- BASE DE CONOCIMIENTO DE SOPORTE ---

export const kbArticleCategories = [
    { id: 'KBC001', name: 'Software y Aplicaciones', description: 'Artículos sobre el uso y solución de problemas de software.' },
    { id: 'KBC002', name: 'Hardware y Periféricos', description: 'Guías para configurar y solucionar problemas de hardware.' },
    { id: 'KBC003', name: 'Recursos Humanos', description: 'Preguntas frecuentes sobre políticas, beneficios y procesos de RRHH.' },
    { id: 'KBC004', name: 'Preguntas Frecuentes Generales', description: 'Información general de la empresa y servicios.' },
    { id: 'KBC005', name: 'Seguridad Informática', description: 'Consejos y pautas de seguridad para los empleados.' },
];

export const knowledgeBaseArticles = [
    { id: 'KBA001', categoryId: 'KBC001', categoryName: 'Software y Aplicaciones', title: 'Cómo restablecer tu contraseña de Active Directory', content: 'Para restablecer tu contraseña, visita portal.empresa.com/resetpassword y sigue los pasos. Si tienes problemas, contacta a Soporte TI.', authorId: 'E010', authorName: 'Miguel Torres', publishDate: '2024-01-10', lastUpdate: '2024-06-01', views: 520, tags: ['contraseña', 'acceso', 'Active Directory', 'IT'] },
    { id: 'KBA002', categoryId: 'KBC003', categoryName: 'Recursos Humanos', title: 'Proceso para solicitar vacaciones', content: 'Las solicitudes de vacaciones se realizan a través del portal de RRHH en la sección "Mis Vacaciones". Recuerda enviar tu solicitud con al menos 15 días de anticipación.', authorId: 'E005', authorName: 'Laura Díaz', publishDate: '2023-11-15', lastUpdate: '2024-02-20', views: 380, tags: ['vacaciones', 'RRHH', 'licencias'] },
    { id: 'KBA003', categoryId: 'KBC001', categoryName: 'Software y Aplicaciones', title: 'Guía Rápida de Uso de Microsoft Teams', content: 'Tutorial sobre cómo usar las funciones básicas de Teams: chats, llamadas, reuniones y compartición de archivos.', authorId: 'E009', authorName: 'Sofía Castro', publishDate: '2024-03-01', lastUpdate: '2024-03-01', views: 210, tags: ['Teams', 'colaboración', 'ofimática'] },
    { id: 'KBA004', categoryId: 'KBC005', categoryName: 'Seguridad Informática', title: 'Identificación de Correos de Phishing', content: 'Consejos para reconocer correos electrónicos maliciosos: revisa el remitente, enlaces sospechosos y solicitudes de información personal.', authorId: 'E009', authorName: 'Sofía Castro', publishDate: '2024-05-10', lastUpdate: '2024-05-10', views: 150, tags: ['phishing', 'seguridad', 'email'] },
    { id: 'KBA005', categoryId: 'KBC004', categoryName: 'Preguntas Frecuentes Generales', title: 'Horario de Oficinas y Días Feriados 2024', content: 'Consulta el calendario oficial de la empresa para horarios de atención y lista de días festivos aplicables.', authorId: 'E005', authorName: 'Laura Díaz', publishDate: '2024-01-05', lastUpdate: '2024-01-05', views: 400, tags: ['horario', 'feriados', 'oficina'] },
];