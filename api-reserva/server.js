import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import path from 'path';
import SendEmail from './modules/SendEmail.js';
import CorpoEmail from './modules/CorpoEmail.js';

const porta = process.env.PORT;
const hostname = process.env.HOSTNAME;

const swaggerDocument = JSON.parse(await readFile(path.resolve("./swagger.json")));

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/documentacao", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.post('/reservar', async (req, res) => {
    const { idHotel, idQuarto, data, email } = req.body;

    if(!idHotel || !idQuarto || !data || !email) {
        return res.status(400).json({ status: 400, message: "ERRO! Parâmetro obrigatório não informado." });
    }

    try {
        const resposta = await fetch('http://localhost:7070/reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idHotel, idQuarto, data })
        });

        const dados = await resposta.json();

        if (dados.status != 200) {
            return res.status(200).json(dados);
        }

        SendEmail.sendMail(email, 'Confirmação de reserva', new CorpoEmail(dados.hotel.nomeHotel, dados.reserva.idReserva, dados.idQuarto, dados.reserva.checkin, dados.reserva.checkout).getCorpo());

        res.status(200).json(dados);
    } 
    catch(error) {
        console.log(error)
    }
});

server.listen(porta, hostname, () => {
    console.log(`API de reserva rodando em: http://${hostname}:${porta}`)
});
