const express = require('express');
const { body, param, validationResult } = require('express-validator');
const app = express();
const port = process.env.PORT || 3000;


app.post(
  '/api/users',
  [
    body('name', 'Imię jest wymagane i nie może być puste').notEmpty(),
    body('email', 'Podaj poprawny adres e-mail').isEmail()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = req.body;
    res.status(201).json({
      message: 'Użytkownik utworzony pomyślnie',
      user
    });
  }
);

app.put(
  '/api/users/:id',
  [
    param('id').isInt().withMessage('ID użytkownika musi być liczbą całkowitą'),
    body('name').optional().notEmpty().withMessage('Imię nie może być puste')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = Number(req.params.id);
    res.status(200).json({
      message: `Zaktualizowano użytkownika o ID: ${id}`,
      data: req.body
    });
  }
);

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log('Żądanie przeszło przez middleware routera użytkowników');
  next();
});

userRouter.get('/', (req, res) => {
  res.json({ list: ['Jan', 'Anna', 'Katarzyna'] });
});

app.use('/api/v2/users', userRouter);


app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', (req, res) => {
 res.send('Witaj w aplikacji Express!');
});
app.listen(port, () => {
 console.log(`Serwer działa na porcie ${port}`);
});

app.get('/contact', (req, res) => {
  res.send('Kontakt z administratorem: admin@example.com');
});

app.get('/api/info', (req, res) => {
  res.json({
    application: 'Express LAB4',
    version: '1.0'
  });
});

app.get('/api/users/search', (req, res) => {
  const { name, page = 1 } = req.query;
  res.json({ 
    message: 'Wyniki wyszukiwania',
    name, 
    page 
  });
});

app.use(express.json());

app.post('/api/users', (req, res) => {
  const user = req.body;

  res.status(201).json({
    message: 'Użytkownik utworzony pomyślnie',
    data: user
  });
});

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const numericId = Number(id);

  res.json({
    message: 'Pobrano użytkownika',
    id: id,
    parsedId: numericId
  });
});

app.post('/api/users', (req, res) => {
  res.status(201).json({ message: 'Użytkownik został utworzony pomyślnie' });
});

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID użytkownika' });
  }
  
  res.status(200).json({ message: `Zaktualizowano użytkownika o ID: ${id}` });
});

app.delete('/api/users/:id', (req, res) => {
  res.status(204).send();
});

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);
