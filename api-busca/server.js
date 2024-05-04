const express = require('express');
require('dotenv').config();
const server = express();
const { eachDayOfInterval, isWithinInterval } = require('date-fns');

server.use(express.json());

const hoteis = [
    {
        id: 1,
        nome: "Habbo Hotel",
        localizacao: "Rio Verde",
        quartos: [
            { 
                id: 1,
                tipo: "Solteiro",
                disponibilidade: { 
                    start: new Date("2024-1-1"),
                    end: new Date("2024-5-1") 
                }
            },
            {
                id: 2,
                tipo: "Casal",
                disponibilidade: {
                    start: new Date("2024-1-1"),
                    end: new Date("2024-7-1")
                }
            }
        ]
    },
    {
        id: 2,
        nome: "Pineapple Hotel",
        localizacao: "Rio de Janeiro",
        quartos: [
            { 
                id: 1,
                tipo: "Solteiro",
                disponibilidade: { 
                    start: new Date("2024-3-1"),
                    end: new Date("2024-4-25") 
                }
            },
            {
                id: 2,
                tipo: "Casal",
                disponibilidade: {
                    start: new Date("2024-10-6"),
                    end: new Date("2024-12-15")
                }
            }
        ]
    }
]

const porta = process.env.PORT
const hostname = process.env.HOSTNAME

function estaDisponivel(intervaloContido, intervaloPai) {
    for (let data of intervaloContido) {   
        if (!isWithinInterval(data, intervaloPai)) {
            return false;
        }
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

server.post('/hoteis', function(req, res) {
    const { localizacao, data } = req.body;

    if(!localizacao && !data) {
        return res.status(400).json({ message: "Parâmetro obrigatório não informado." });
    }

    let copiaHoteis = JSON.parse(JSON.stringify(hoteis));
    let hoteisFiltrados;

    if(localizacao) {
        hoteisFiltrados = copiaHoteis.filter(hotel => hotel.localizacao.toLowerCase() === localizacao.toLowerCase());
    } else if(data) {
        if(!verificaData(data.inicio) || !verificaData(data.final)) return res.status(400).json({ message: "Data inválida." });
        
        const intervaloRequisicao = eachDayOfInterval({ start: new Date(data.inicio), end: new Date(data.final) });

        hoteisFiltrados = copiaHoteis.filter(hotel => {
            hotel.quartos = hotel.quartos.filter(quarto => {
                return estaDisponivel(intervaloRequisicao, quarto.disponibilidade);
            });
            
            return hotel.quartos.length > 0;
        });
    }

    let resposta = hoteisFiltrados.map(hotel => {
        return {
            id: hotel.id,
            nome: hotel.nome,
            localizacao: hotel.localizacao,
            quartos: hotel.quartos.map(quarto => {
                return {
                    id: quarto.id,
                    tipo: quarto.tipo
                }
            })
        }
    });

    res.json(resposta);
});

server.get('/hoteis', function(req, res) {
    res.json({ message: "Teste de rota." });
});

server.listen(porta, hostname, () => {
    console.log('Rodando: http://localhost:' + porta)
});
