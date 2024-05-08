# Sistema de reservas de hotel com Microserviços

## API de Busca de Hotéis

Esta é uma API RESTful desenvolvida para gerenciar informações sobre hotéis e a disponibilidade de quartos.


- **URL Base:** http://localhost:7070
- **Descrição:** API de teste para desenvolvimento e avaliação

## Endpoints

### Verificar Disponibilidade de Quartos

- **Descrição:** Verifica a disponibilidade de quartos com base na data (check-in e check-out) e/ou localização informada.
- **Método HTTP:** POST
- **Caminho:** `/hoteis`

#### Exemplos de Requisição

1. **Sem Localização:**
    ```json
    {
        "data": {
            "checkin": "2024-01-01",
            "checkout": "2024-01-05"
        }
    }
    ```

2. **Com Localização:**
    ```json
    {
        "data": {
            "checkin": "2024-01-01",
            "checkout": "2024-01-05"
        },
        "localizacao": "Rio Verde"
    }
    ```

### Reservar Quarto

- **Descrição:** Reserva um quarto de hotel com base no ID do hotel, ID do quarto e data (check-in e check-out) informados.
- **Método HTTP:** POST
- **Caminho:** `/reservar`

#### Exemplo de Requisição

```json
{
    "idHotel": 1,
    "idQuarto": 1,
    "data": {
        "checkin": "2024-01-01",
        "checkout": "2024-01-05"
    }
}
```

### Cancelar Reserva

- **Descrição:** Cancela uma reserva de quarto de hotel com base no ID do hotel, ID do quarto e ID da reserva.
- **Método HTTP:** POST
- **Caminho:** `/cancelar`

#### Exemplo de Requisição

```json
{
    "idHotel": 1,
    "idQuarto": 1,
    "idReserva": 1
}
```

# API de Cancelamento de Reserva de Quarto

Esta API gerencia o processo de cancelamento de reservas de quartos de hotel.

## Rotas

### Cancelar Reserva de Quarto

Esta rota é usada para cancelar a reserva de um quarto de hotel.

- **URL:** `/cancelar`
- **Método:** POST
- **Descrição:** Cancela a reserva de um quarto de hotel a partir do ID do hotel, ID do quarto, ID da reserva e email.
- **Tags:** Cancelamento de Reserva

#### Parâmetros de Requisição

O corpo da requisição deve conter os seguintes parâmetros em formato JSON:

```json
{
    "idHotel": 1,
    "idQuarto": 1,
    "idReserva": 1,
    "email": "example@gmail.com"
}
