import express from 'express';
import 'dotenv/config';
import SendEmail from './modules/SendEmail.js';
import CorpoEmail from './modules/CorpoEmail.js';

const porta = process.env.PORT;
const hostname = process.env.HOSTNAME;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post('/cancelar', async (req, res) => {
    const { idHotel, idQuarto, idReserva, email } = req.body;

    if(!idHotel || !idQuarto || !idReserva || !email) {
        return res.status(400).send({ status: 400, message: "ERRO! Parâmetro obrigatório não informado." })
    }

    try {
        const resposta = await fetch('http://localhost:7070/cancelar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idHotel, 
                idQuarto,
                idReserva
            })
        })

        const dados = await resposta.json()

        if (dados.status != 200) {
            return res.send(dados)
        }

        SendEmail.sendMail(email, 'Cancelamento de reserva', new CorpoEmail(dados.hotel.nomeHotel, dados.reserva.idReserva, dados.idQuarto, dados.reserva.checkin, dados.reserva.checkout).getCorpo());
        
        res.status(200).json(dados);
    } 
    catch(error) {
        console.log(error)
    }
});

server.listen(porta, hostname, () => {
    console.log(`API de cancelamento rodando em: http://${hostname}:${porta}`)
});
