const express = require('express');
const path = require('path');
const app = express();

// ✅ Set the view engine to EJS
app.set('view engine', 'ejs');

// ✅ Support multiple views folders
app.set('views', [
  path.join(__dirname, 'Greeting_Page/views'),
  path.join(__dirname, 'login_page/views'),
  path.join(__dirname, 'guest_page/views')
]);

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'Greeting_Page/public')));
app.use(express.static(path.join(__dirname, 'login_page/public')));
app.use(express.static(path.join(__dirname, 'guest_page/public')));
app.use('/guest', express.static(path.join(__dirname, 'guest_page/public')));

// ✅ Middleware to parse form data from POST requests
app.use(express.urlencoded({ extended: true }));

// ✅ Load route modules
const greetingRoutes = require('./Greeting_Page/routes/greetingRoutes');
const loginRoutes = require('./login_page/routes/loginRoutes');
const registerRoutes = require('./login_page/routes/registerRoutes');
const guestRoutes = require('./guest_page/routes/guestRoutes');
const clusteringRoutes = require('./guest_page/routes/clustering');

// ✅ Use the route modules
app.use('/', greetingRoutes);
app.use('/', loginRoutes);
app.use('/', registerRoutes);
app.use('/guest', guestRoutes);
app.use('/clustering', clusteringRoutes);  // clustering route for guest card 1

// ✅ Render guest page manually
app.get('/guest', (req, res) => {
  res.render('guest');  // guest_page/views/guest.ejs
});

// ✅ Greeting page
app.get('/', (req, res) => {
  res.redirect('/greeting'); // default redirect to homepage
});
app.get('/home', (req, res) => {
  res.render('greeting');  // Greeting_Page/views/greeting.ejs
});

// ✅ Cards navigation
app.get('/routes', (req, res) => {
  res.render('routes');  // guest_page/views/routes.ejs
});
app.get('/area-info', (req, res) => {
  res.render('area-info');  // guest_page/views/area-info.ejs
});

// ✅ About Us Page (Greeting_Page/views/about.ejs)
app.get('/AboutUs', (req, res) => {
  res.render('aboutgreetingpage');
});

app.get('/contact', (req, res) => {
  res.render('contactgreetingpage');
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
