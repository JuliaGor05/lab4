const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
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