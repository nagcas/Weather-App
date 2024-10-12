# Weather App 🌦️

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2024-orange)

Weather App è un'applicazione che permette di visualizzare il meteo corrente e le previsioni per più città utilizzando l'API di OpenWeatherMap. L'app consente agli utenti registrati di salvare le loro città preferite. Il progetto include un backend per l'autenticazione (login e registrazione) e la gestione delle preferenze.

## Funzionalità

- 🌍 **Visualizza il meteo attuale** di qualsiasi città.
- 🔮 **Previsioni meteo a 5 giorni**.
- 🔐 **Autenticazione**: sistema di login e registrazione.
- ⭐ **Salvataggio delle città preferite** per gli utenti registrati.
- 💻 **Design responsive** per un'esperienza ottimale su mobile e desktop.

## Tecnologie utilizzate

- **Frontend**:
  - React con Vite
  - CSS3 (Flexbox per il layout responsive)
  - fetch (per chiamate API)
  
- **Backend**:
  - Node.js con Express
  - MongoDB (per la gestione utenti e città preferite)
  - JWT (per l'autenticazione)
  - Bcrypt (per la gestione delle password)

- **API**:
  - OpenWeatherMap

## Installazione e utilizzo

### Prerequisiti

Assicurati di avere installato Node.js, npm e MongoDB sul tuo computer.

### Installazione

1. Clona il repository:

  ```bash
  git clone
  cd weather-app
  ```

## Installa le dipendenze per il frontend e il backend

## Per il frontend

  ```bash
  cd frontend
  npm install
  ```

## Per il backend

  ```bash
  cd ../backend
  npm install
  ```

## Configura le variabili d'ambiente

Crea un file `.env` nella cartella `backend` con il seguente contenuto:
  
  ```bash
  PORT=5000
  MONGO_URI=<la tua stringa di connessione MongoDB>
  JWT_SECRET=<una stringa segreta per i token>
  OPENWEATHER_API_KEY=<la tua chiave API di OpenWeatherMap>
  ```

## Avvia il backend
  
  ```bash
  cd backend
  npm start
  ```

## Avvia il frontend usando Vite

  ```bash
  cd frontend
  npm run dev
  ```

## Contribuire

Contribuire al progetto è semplice! Se vuoi partecipare, segui le istruzioni nel file CONTRIBUTING.md.

### Fai un fork del progetto

Crea un nuovo branch per la tua feature: `git checkout -b feature/nome-feature`.
Fai il commit delle tue modifiche: `git commit -m "Aggiunge una nuova feature"`.
Fai un push al branch: `git push origin feature/nome-feature`.
Invia una pull request.

### Licenza

Distribuito sotto licenza MIT. Vedi il file LICENSE per maggiori dettagli.

Progetto creato per Hacktoberfest 2024. 🎃
