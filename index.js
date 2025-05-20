import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import usuarioRoutes from './src/routes/usuario.routes.js';
import loginRoutes from './src/routes/login.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('Login OK, DevOps');
});


app.use('/usuario', usuarioRoutes);
app.use('/auth', loginRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
