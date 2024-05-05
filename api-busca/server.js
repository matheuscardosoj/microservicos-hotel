const express = require('express');
require('dotenv').config();
const server = express();
const { eachDayOfInterval } = require('date-fns');
const { Hotel, Quarto, Reserva } = require('./classes/Classes.js');

server.use(express.json());

const porta = process.env.PORT
const hostname = process.env.HOSTNAME

const arrayDisponibilidadeAnual = eachDayOfInterval({ start: new Date(`${(anoAtual())}-1-1`), end: new Date(`${(anoAtual())}-12-31`) });

const hoteis = [
    new Hotel(1, "Habbo Hotel", "Rio Verde", [
        new Quarto(1, arrayDisponibilidadeAnual, []),
        new Quarto(2, arrayDisponibilidadeAnual, [])
    ]),
    new Hotel(2, "Pineapple Hotel", "Rio de Janeiro", [
        new Quarto(1, arrayDisponibilidadeAnual, []),
        new Quarto(2, arrayDisponibilidadeAnual, [])
    ])
];

function anoAtual() {
    return new Date().getFullYear();
}

function estaDisponivel(datasReserva, datasDisponiveis) {
    for(let i = 0; i < datasReserva.length; i++) {

        let encontrou = false;

        for(let j = 0; j < datasDisponiveis.length; j++) {
            if(datasReserva[i].getTime() === datasDisponiveis[j].getTime()) {
                encontrou = true;
                break;
            }
        }

        if(!encontrou) return false;
    }
    
    return true;
}

function verificaData(data) {
    const dia = data.split('-')[2];
    const mes = data.split('-')[1];
    const ano = data.split('-')[0];

    const anoAtual = new Date().getFullYear();

    if(ano < anoAtual) {
        return false;
    } 

    if(mes < 1 || mes > 12) {
        return false;
    } 
    
    if(mes === 2) {
        if(dia < 1 || dia > 28) {
            return false;
        }
    }

    if(mes === 4 || mes === 6 || mes === 9 || mes === 11) {
        if(dia < 1 || dia > 30) {
            return false;
        }
    } else {
        if(dia < 1 || dia > 31) {
            return false;
        }
    }

    return true;
}

function converteArrayStringParaArrayDate(arrayString) {
    return arrayString.map(data => new Date(data));
}

function getHotel(idHotel) {
    const hotel = hoteis.find(hotel => hotel.idHotel === idHotel);

    if(!hotel) return null;

    return hotel;
}

function getQuarto(hotel, idQuarto) {
    const quarto = hotel.quartos.find(quarto => quarto.idQuarto === idQuarto);

    if(!quarto) return null;

    return quarto;
}

function getReserva(quarto, idReserva) {
    const reserva = quarto.reservas.find(reserva => reserva.idReserva === idReserva);

    if(!reserva) return null;

    return reserva;
}

function realizarReserva(hotel, quarto, datasReserva) {
    hotel.atualizarContadorReservas(1)

    const reserva = new Reserva(hotel.contadorReservas, datasReserva);
    quarto.reservas.push(reserva);

    quarto.disponibilidade = quarto.disponibilidade.filter(dataDisponibilidade => {
        return !datasReserva.some(dataReserva => dataReserva.getTime() === dataDisponibilidade.getTime());
    });

    return reserva;
}

function cancelarReserva(quarto, reserva) {
    const idReserva = reserva.idReserva;

    quarto.disponibilidade = quarto.disponibilidade.concat(reserva.periodo);
    quarto.reservas = quarto.reservas.filter(reserva => reserva.idReserva !== idReserva);
}

server.post('/hoteis', function(req, res) {
    const { localizacao, data } = req.body;

    if(!data) return res.status(400).json({ message: "ERRO! Parâmetro obrigatório não informado." });

    let copiaHoteis = JSON.parse(JSON.stringify(hoteis));
    let hoteisFiltrados;

    if(localizacao && data) {
        hoteisFiltrados = copiaHoteis.filter(hotel => hotel.localizacao.toLowerCase() === localizacao.toLowerCase());

        if(!verificaData(data.checkin) || !verificaData(data.checkout)) return res.status(400).json({ message: "Data inválida." });

        const arrayDatasReserva = eachDayOfInterval({ start: new Date(data.checkin), end: new Date(data.checkout) });

        hoteisFiltrados = hoteisFiltrados.filter(hotel => {
            if(hotel.localizacao.toLowerCase() === localizacao.toLowerCase()) {
                hotel.quartos = hotel.quartos.filter(quarto => {
                    quarto.disponibilidade = converteArrayStringParaArrayDate(quarto.disponibilidade);

                    return estaDisponivel(arrayDatasReserva, quarto.disponibilidade);
                });
                
                return hotel.quartos.length > 0;
            }
        });
    }
    else {
        if(!verificaData(data.checkin) || !verificaData(data.checkout)) return res.status(400).json({ message: "Data inválida." });
        
        const arrayDatasReserva = eachDayOfInterval({ start: new Date(data.checkin), end: new Date(data.checkout) });

        hoteisFiltrados = copiaHoteis.filter(hotel => {
            hotel.quartos = hotel.quartos.filter(quarto => {
                quarto.disponibilidade = converteArrayStringParaArrayDate(quarto.disponibilidade);

                return estaDisponivel(arrayDatasReserva, quarto.disponibilidade);
            });
            
            return hotel.quartos.length > 0;
        });
    } 

    let resposta = hoteisFiltrados.map(hotel => {
        return {
            idHotel: hotel.idHotel,
            nome: hotel.nome,
            localizacao: hotel.localizacao,
            quartos: hotel.quartos.map(quarto => {
                return {
                    idQuarto: quarto.idQuarto
                }
            })
        }
    });

    res.json(resposta);
});

server.post('/reservar', function(req, res) {
    const { idHotel, idQuarto, data } = req.body;

    if(!idHotel || !idQuarto || !data) {
        return res.status(400).json({ message: "ERRO! Parâmetro obrigatório não informado." });
    }

    let hotel = getHotel(idHotel);
    if(!hotel) {
        return res.status(400).json({ message: "Hotel não encontrado." });
    }

    let quarto = getQuarto(hotel, idQuarto);
    if(!quarto) {
        return res.status(400).json({ message: "Quarto não encontrado." });
    }

    if(!verificaData(data.checkin) || !verificaData(data.checkin)) return res.status(400).json({ message: "Data inválida." });

    const arrayDatasReserva = eachDayOfInterval({ start: new Date(data.checkin), end: new Date(data.checkin) });
    if(!estaDisponivel(arrayDatasReserva, quarto.disponibilidade)) {
        return res.status(400).json({ message: "Quarto indisponível." })
    }

    const reserva = realizarReserva(hotel, quarto, arrayDatasReserva);
    return res.json({ message: "Reserva realizada com sucesso.", idHotel: hotel.idHotel, idQuarto: quarto.idQuarto, idReserva: reserva.idReserva});
});

server.post('/cancelar', function(req, res) {
    const { idHotel, idQuarto, idReserva } = req.body;

    if(!idHotel || !idQuarto || !idReserva) {
        return res.status(400).json({ message: "ERRO! Parâmetro obrigatório não informado." });
    }

    let hotel = getHotel(idHotel);
    if(!hotel) {
        return res.status(400).json({ message: "Hotel não encontrado." });
    }

    let quarto = getQuarto(hotel, idQuarto);
    if(!quarto) {
        return res.status(400).json({ message: "Quarto não encontrado." });
    }

    let reserva = getReserva(quarto, idReserva);
    if(!reserva) {
        return res.status(400).json({ message: "Reserva não encontrada." });
    }

    cancelarReserva(quarto, reserva);

    return res.json({ message: "Reserva cancelada com sucesso." });
});

server.listen(porta, hostname, () => {
    console.log(`Rodando: http://localhost:${porta}`)
});
