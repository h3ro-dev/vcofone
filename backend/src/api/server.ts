import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vcofone.ai', 'https://www.vcofone.ai']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'vCFO of One API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      leads: '/api/leads',
      consultation: '/api/consultation',
      contact: '/api/contact'
    }
  });
});

// Lead capture endpoint
app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const { email, name, businessName, revenue } = req.body;
    
    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ 
        error: 'Email and name are required' 
      });
    }
    
    // TODO: Integrate with CRM/Email service (e.g., SendGrid, Mailchimp)
    // For now, just log and return success
    console.log('New lead captured:', { email, name, businessName, revenue });
    
    res.status(201).json({ 
      success: true,
      message: 'Thank you for your interest! We\'ll be in touch soon.' 
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ 
      error: 'Failed to process your request. Please try again.' 
    });
  }
});

// Consultation booking endpoint
app.post('/api/consultation', async (req: Request, res: Response) => {
  try {
    const { 
      email, 
      name, 
      businessName, 
      phone,
      preferredTime,
      message 
    } = req.body;
    
    // Validate required fields
    if (!email || !name || !phone) {
      return res.status(400).json({ 
        error: 'Email, name, and phone are required' 
      });
    }
    
    // TODO: Integrate with calendar service (e.g., Calendly, Cal.com)
    console.log('New consultation request:', { 
      email, 
      name, 
      businessName, 
      phone,
      preferredTime,
      message 
    });
    
    res.status(201).json({ 
      success: true,
      message: 'Consultation request received! We\'ll contact you within 24 hours to confirm your session.' 
    });
  } catch (error) {
    console.error('Consultation booking error:', error);
    res.status(500).json({ 
      error: 'Failed to book consultation. Please try again.' 
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { email, name, subject, message } = req.body;
    
    // Validate required fields
    if (!email || !name || !message) {
      return res.status(400).json({ 
        error: 'Email, name, and message are required' 
      });
    }
    
    // TODO: Send email notification
    console.log('New contact form submission:', { 
      email, 
      name, 
      subject, 
      message 
    });
    
    res.status(201).json({ 
      success: true,
      message: 'Message received! We\'ll get back to you within 24 hours.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again.' 
    });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.path 
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server (not for Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export for Vercel
export default app; 