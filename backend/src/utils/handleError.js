// NOTE: funzione helper per la gestione centralizzata degli errori HTTP
// Questa funzione invia una risposta JSON con un messaggio di errore personalizzato
// e un codice di stato HTTP (default 500).
// Viene usata nei controller per uniformare la gestione e la risposta degli errori.
const handleHttpError = (res, message = 'Internal server error. Your request cannot be processed at this time', code = 500) => {
  res.status(code).json(
    {
      success: false,
      status: code,
      message,
      meta: {
        timestamp: new Date().toISOString()
      }
    }
  )
}

export default handleHttpError
