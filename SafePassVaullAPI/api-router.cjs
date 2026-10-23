// API router loaded by the Angular SSR Express server.
// Keep this module free of app.listen() so it can be mounted by another Express app.
require('./config/conn');

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const password = require('./routes/passwordRoutes');
const users = require('./routes/userRoutes');
const tagRoutes = require('./routes/tagRoutes');
const noteRoutes = require('./routes/noteRoutes');
const proofIdRoutes = require('./routes/proofIdRoutes');
const cardRoutes = require('./routes/cardRoutes');
const securityQuestionRoutes = require('./routes/securityQuestionRoutes');
const fileRoutes = require('./routes/fileRoutes');
const shareItemRoutes = require('./routes/shareItemRoutes');
const planRoutes = require('./routes/plan-routes');
const logRoutes = require('./routes/logRoutes');
const ssoRoutes = require('./routes/ssoRoutes');
const secretRoutes = require('./routes/secretRoutes');
const auditRoutes = require('./routes/auditRoutes');
const invitationRoutes = require('./routes/invitiationRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const folderRoutes = require('./routes/folderRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const auth = require('./middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Retain the existing middleware behaviour for API requests. Since this router
// is mounted at /api, its endpoints below are relative to that prefix.
router.use(cors());
router.use(express.json());

// Simple liveness endpoint, useful for deployments and smoke tests.
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use(auth);
router.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
}));

router.use('/addresses', addressRoutes);
router.use('/folders', folderRoutes);
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use('/auth', users);
router.use('/passwords', password);
router.use('/tags', tagRoutes);
router.use('/notes', noteRoutes);
router.use('/proofIds', proofIdRoutes);
router.use('/cards', cardRoutes);
router.use('/security-questions', securityQuestionRoutes);
router.use('/files', fileRoutes);
router.use('/share', shareItemRoutes);
router.use('/plans', planRoutes);
router.use('/logs', logRoutes);
router.use('/secrets', secretRoutes);
router.use('/audit', auditRoutes);
router.use('/invitation', invitationRoutes);
router.use('/organization', organizationRoutes);
router.use('/sso-settings', ssoRoutes);
router.use('/tickets', ticketRoutes);

module.exports = router;
