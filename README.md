# Sistema de reservas de hotel com Microserviços

<img src="https://miro.medium.com/v2/resize:fit:1200/0*OyMruOs5rbf09_oq." align="center">

## API de Busca de Hotéis

Esta API gerencia informações sobre hotéis e a disponibilidade de quartos.

- **URL Base:** http://localhost:7070

### Endpoints

### Verificar Disponibilidade de Quartos

- **Descrição:** Verifica a disponibilidade de quartos com base na data (check-in e check-out) e/ou localização informada.
- **Método HTTP:** POST
- **Caminho:** `/hoteis`
  
### Reservar Quarto

- **Descrição:** Reserva um quarto de hotel com base no ID do hotel, ID do quarto e data (check-in e check-out) informados.
- **Método HTTP:** POST
- **Caminho:** `/reservar`

### Cancelar Reserva

- **Descrição:** Cancela uma reserva de quarto de hotel com base no ID do hotel, ID do quarto e ID da reserva.
- **Método HTTP:** POST
- **Caminho:** `/cancelar`

## API de Cancelamento de Reserva de Quarto

Esta API gerencia o processo de cancelamento de reservas de quartos de hotel.

- **URL Base:** http://localhost:7072

### Endpoint

### Cancelar Reserva de Quarto

Esta rota é usada para cancelar a reserva de um quarto de hotel.

- **Descrição:** Cancela a reserva de um quarto de hotel a partir do ID do hotel, ID do quarto, ID da reserva e email.
- **Método HTTP:** POST
- **Caminho:** `/cancelar`

### API de Reserva de Hotel

Esta API permite que os usuários façam reservas através de uma requisição POST para o endpoint `/reservar`.

### Endpoints

- `/reservar` (POST)
- Este endpoint permite que os usuários façam uma reserva de quarto de hotel.

### Parâmetros

- idHotel: ID do hotel onde a reserva será feita.
- idQuarto: ID do quarto a ser reservado.
- data: Data da reserva.
- email: Endereço de e-mail do cliente para confirmação da reserva.
