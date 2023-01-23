# prueba-tecnica-superpersos
## Instrucciones de ejecución
Una vez se ha clonado el proyecto, ubicarse en la carpeta raíz y correr el siguiente comando para correr el proyecto en ambiente de desarrollo
```sh
cd microservicioA
npm run dev
cd ..
cd microservicioB
npm run dev
```
En este punto se pueden empezar a realizar las pruebas de la forma que podemos ver en la siguiente documentación:

### GET microservice A
```sh
http://localhost:3000/weather?city=sincelejo&state=sucre&countryCode=col&withForecast=true
```
#### Query Params
| Param | Description | Requerido | Examples |
| ------ | ------ |------ |------ |
| city | Nombre de la ciudad | Si| Cartagena|
| state | Nombre del departamento o estado | Si | Bolívar |
| countryCode | Código del país| Sí| Col |
| withForecast | Parametro para indicar si se quiere el clima actual (false) o el pronostico de 5 días (true)| No | true |

### GET microservice B
```sh
http://localhost:3001/weatherForecast?city=sincelejo&state=sucre&countryCode=col
```
#### Query Params
| Param | Description | Requerido | Examples |
| ------ | ------ |------ |------ |
| city | Nombre de la ciudad | Si| Cartagena|
| state | Nombre del departamento o estado | Si | Bolívar |
| countryCode | Código del país| Sí| Col |

En la carpeta raíz del proyecto tambien se encuentra un archivo con la colección de postman para mayor facilidad.

## ¿Cómo funciona?
Primero se realiza una petición al Microservicio A, quien debe recibir las peticiones entrantes y dependiendo del parametro "withForecast", en caso de que sea false, quiere decir que el usuario solo quiere obtener el clima actual, por lo que el Microservicio A continua el flujo consultando a una API externa para obtener las coordenadas en latitud y longitud de la ciudad que se quiere consultar. Una vez tenga estas coordenadas procede a consumir otra API para obtener el clima a partir de dichas coordenadas.

En caso de que el valor del parametro "withForecast" sea true, se entiende que el usuario quiere obtener un pronostico del clima para los proximos 5 días por lo que el Microservicio A redirecciona la petición al Microservicio B, este último la recibe y consulta a una API externa las coordenadas de la ciudad indicada y luego consulta a otra API el pronostico de los 5 días con estas coordenadas, y la informacion obtenida se retorna al microservico A para que la retorne al usuario.

## ¿Qué se implemento en la API?
- Framework Express para la construccion de las rutas y hacer uso de middlewares
- Librería axios para el consumo de APIs del clima y llamados por http
- Test unitarios con vitest, donde se implementaron mocks con la librería rewire para el llamado a las APIs
- Registro de logs en archivos para las peticiones de entrada a ambos microservicios y respuestas de errores. Para esto se hizo uso de la librería node-file-logger
- Serializers para estandarizar las respuestas de la API tanto para los errores como respuestas exitosas
- Se centralizaron los códigos de error en un solo módulo y se separaron por errores de negocio (BE) y errores técnicos (TE)
- se utilizo eslint para mejorar la escritura del código
- Generación de un tranId para identificar la request en ambos microservicios.

## Faltó por mejorar
- Crear contenedores para cada microservicio y crear un archivo docker-compose.yml para poder correr rapidamente todos los microservicios
- Implementación de un orquestador para centralizar las peticiones entrantes y poder escalar la infraestructura añadiendo mas instancias de microservicios. Para esto se puede considerar la alternativa de implementar un servidor de Netflix Eureka y Zuul donde se puedan conectar los microservicios y así establecer comunicación entre ellos
- Aumentar la covertura de tests
- Implementar Swagger

Y por último solo a manera de comentario, en el repositorio se dejó el archivo .env para que se pueda probar facilemente, pero sabemos que en un entorno real esto no es correcto
