import express from 'express';
import SendEmail from './modules/SendEmail.js';
import CorpoEmail from './modules/CorpoEmail.js';
import 'dotenv/config';

SendEmail.sendMail('erickrodriguessousa2016@gmail.com', 'Confirmação de reserva', new CorpoEmail('Hotel Abacaxi', '2024/01-01', '2025/01/05').getCorpo());

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const porta = process.env.PORT;
const hostname = process.env.HOSTNAME;

server.get('/reserva', async (req, res) => {

});

server.listen(porta, hostname, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
