const Consul = require("consul");
const { MICROSERVICE_B_SERVICE_NAME,
  IP_ADDRESS,
  PORT,
  CONSUL_SERVER_IP_ADDRESS,
  CONSUL_SERVER_PORT } = process.env

const client = new Consul({
    host: CONSUL_SERVER_IP_ADDRESS,
    port: parseInt(CONSUL_SERVER_PORT)
})

const getConsulClient = () => {
    return client
}

const registerServiceInConcil = async () => {
    await client.agent.service.register({
        name: MICROSERVICE_B_SERVICE_NAME,
        address: IP_ADDRESS,
        port: parseInt(PORT),
        check: {
          http: `http://${IP_ADDRESS}:${PORT}/health`,
          interval: '10s'
        }
      }, function(err) {
        if (err) throw err;
        console.log('my-app registrado en Consul');
      }); 
}

module.exports = {
    registerServiceInConcil,
    getConsulClient
}