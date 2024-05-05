import express from 'express';
import SendEmail from './modules/SendEmail.js';
import CorpoEmail from './modules/CorpoEmail.js';
import 'dotenv/config';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const porta = process.env.PORT;
const hostname = process.env.HOSTNAME;

server.post('/reservar', async (req, res) => {
    const { idHotel, idQuarto, data, email } = req.body;

    if(!idHotel && !idQuarto && !data) {
        return res.send({
            message: "ERRO! Parâmetro obrigatório não informado."
        })
    }

    try {
        const resposta = await fetch('http://localhost:7070/reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idHotel, 
                idQuarto,
                data
            })
        })
        const dados = await resposta.json()

        if (resposta.status != 200) {
            return res.send(dados)
        }

        if(email) {
            SendEmail.sendMail(email, 'Confirmação de reserva', new CorpoEmail(dados.hotel.nomeHotel, dados.reserva.checkin, dados.reserva.checkout).getCorpo());
        }
        res.end(JSON.stringify(dados))
    } 
    catch(error) {
        console.log(error)
    }
});

server.listen(porta, hostname, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
