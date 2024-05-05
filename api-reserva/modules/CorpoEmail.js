export default class CorpoEmail {
    constructor(nomeHotel, checkin, checkout) {
        this.nomeHotel = nomeHotel;
        this.checkin = checkin;
        this.checkout = checkout;
    }

    getCorpo() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmação de Reserva</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    p {
                        color: #666;
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 20px;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                        transition: background-color 0.3s;
                    }
                    .button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Confirmação de Reserva</h1>
                    <p>Sua reserva foi concluída com sucesso!</p>
                    <p>Detalhes da reserva:</p>
                    <ul>
                        <li><strong>Hotel:</strong> ${this.nomeHotel}</li>
                        <li><strong>Data de Check-in:</strong> ${this.checkin}</li>
                        <li><strong>Data de Check-out:</strong> ${this.checkout}</li>
                    </ul>
                    <p>Para mais informações ou alterações, entre em contato conosco.</p>
                    <p>Obrigado por escolher o ${this.nomeHotel}!</p>
                </div>
            </body>
            </html>
        `;
    }
}
