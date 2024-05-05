class Hotel {
    constructor(idHotel, nome, localizacao, quartos) {
        this.idHotel = idHotel;
        this.nome = nome;
        this.localizacao = localizacao;
        this.contadorReservas = 0;
        this.quartos = quartos;
    }

    atualizarContadorReservas() {
        this.contadorReservas++;
    }
}

class Quarto {
    constructor(idQuarto, disponibilidade, reservas) {
        this.idQuarto = idQuarto;
        this.disponibilidade = disponibilidade;
        this.reservas = reservas;
    }
}

class Reserva {
    constructor(idReserva, periodo) {
        this.idReserva = idReserva;
        this.periodo = periodo;
    }
}

module.exports = { Hotel, Quarto, Reserva };