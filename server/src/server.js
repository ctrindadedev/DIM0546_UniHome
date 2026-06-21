const app = require('./app');
require('./processHandlers')

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor UniHome rodando na porta ${PORT}`);
    console.log(`Validar: http://localhost:${PORT}/api/ping`);
});