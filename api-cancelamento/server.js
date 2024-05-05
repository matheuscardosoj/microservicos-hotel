import express from 'express';
import SendEmail from './modules/SendEmail.js';
import CorpoEmail from './modules/CorpoEmail.js';
import 'dotenv/config';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const porta = process.env.PORT;
const hostname = process.env.HOSTNAME;

server.post('/cancelar', async (req, res) => {
    const { idHotel, idQuarto, idReserva, email } = req.body;

    if(!idHotel && !idQuarto && !idReserva && !email) {
        return res.send({
            message: "ERRO! Parâmetro obrigatório não informado."
        })
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

        if (resposta.status != 200) {
            return res.send(dados)
        }

        SendEmail.sendMail(email, 'Cancelamento de reserva', new CorpoEmail(dados.hotel.nomeHotel, dados.reserva.idReserva, dados.idQuarto, dados.reserva.checkin, dados.reserva.checkout).getCorpo());
        
        res.end(JSON.stringify(dados))
    } 
    catch(error) {
        console.log(error)
    }
});

server.listen(porta, hostname, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
