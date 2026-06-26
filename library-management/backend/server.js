require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const errorHandler = require('./middleware/error');

const app = express();

// ── Middleware ───────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5500', credentials: true })); // adjust origin for your frontend
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 86400000 }
}));

// ── Routes ───────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/student',   require('./routes/student'));
app.use('/api/librarian', require('./routes/librarian'));

// ── Error Handler ────────────────────────────────────────
app.use(errorHandler);

// ── DB + Start ───────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => { console.error(err); process.exit(1); });
