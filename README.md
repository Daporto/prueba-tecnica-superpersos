
# prueba-tecnica-superpersos
## Instrucciones de ejecución

Una vez se ha clonado el proyecto, ubicarse en la carpeta raíz del proyecto y correr el comando `docker-compose up` y esperar a que los contenedores se ejecuten y queden listos para recibir peticiones.

Una vez los contenedores se encuentran arriba, se puede empezar a realizar las pruebas con los endpoint que se muestran a continuación:

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
La aplicacion consta de 2 microservicios que se desarrollaron (MicroservicioA y microservicioB) y adicionalmente se tiene un servidor de consul que actua como un service registry para nuestros microservicios. Cada uno de estos, tanto nuestros dos microservicios como el servidor de consul corren en un contenedor de Docker independiente. 

### ¿Que funcion cumple el servidor de Consul?
El Servidor de consul actua como un descubridor de servicios para nuestros microservicios, es decir cada uno de nuestros microservicio al momento de iniciarse se registra como una instancia al servicio que corresponde y así un microservicio cuando se quiere comunicar con otro, acude al servidor de Consul y le pregunta que instancias hay disponibles para el servicio a consultar y el servidor le devuelve una lista de las ip disponibles para dicho servicio.

En esta imagen podemos ver el dashboard de consul con los servicios que se encuentran registrados en el servidor y si seleccionamos uno de ellos, podemos ver las instancias disponibles. A esta interfaz grafica podemos acceder ingresando a http://localhost:8500/ui/dc1/services, cuando esten arriba los contenedores.

![](https://firebasestorage.googleapis.com/v0/b/images-40d1f.appspot.com/o/consul-dashboard.png?alt=media&token=8eaa78bd-dd93-4e11-a360-78e1a91bb927)


### ¿Como se orquestan los microservicios?
Para orquestar los microservicios se hizo uso de docker-compose, creando un archivo `docker-compose.yml` en la raíz de nuestro proyecto y un archivo `dockefile` en cada carpeta de nuestros microservicios. En este archivo de docker-compose se indican los servicios que se quieren crear que en este caso fueron 3, los 2 microservicios y el servidor de consul. Para cada de estos servicios se especifican unas configuraciones especificas como variables de entorno, ubicacion del archivo dockerfile, puertos a exponer entre otras.

Para que nuestros microservicios se comuniquen se creó una red virtual, y se le asigno a cada uno de nuestros servicios una ip y puerto específico con la cual se van a registrar en el servidor de consul. 

El servidor de Consul tambien nos ayuda a orquestar nuestros microservicios pues así centralizamos la comunicación entre estos, y podemos monitorear también los microservicios que tenemos activos.

### ¿Que lógica se implementó en los microservicios? 
Primero se realiza una petición al Microservicio A, quien debe recibir las peticiones entrantes y dependiendo del parametro "withForecast", en caso de que sea false, quiere decir que el usuario solo quiere obtener el clima actual, por lo que el Microservicio A continua el flujo consultando a una API externa para obtener las coordenadas en latitud y longitud de la ciudad que se quiere consultar. Una vez tenga estas coordenadas procede a consumir otra API para obtener el clima a partir de dichas coordenadas.

En caso de que el valor del parametro "withForecast" sea true, se entiende que el usuario quiere obtener un pronostico del clima para los proximos 5 días por lo que el Microservicio A redirecciona la petición a un Microservicio B que este disponible preguntando al servidor de consul, el Microservicio B la recibe y consulta a una API externa las coordenadas de la ciudad indicada y luego consulta a otra API el pronostico de los 5 días con estas coordenadas, y la informacion obtenida se retorna al microservico A para que la retorne al usuario.

## ¿Qué se implemento en este projecto?
- Framework Express para la construccion de las rutas y hacer uso de middlewares
- Librería axios para el consumo de APIs del clima y llamados por http
- Test unitarios con Jest, donde se implementaron mocks para el llamado a las APIs
- Registro de logs en archivos para las peticiones de entrada a los microservicios y respuestas de errores. Para esto se hizo uso de la librería node-file-logger
- Serializers para estandarizar las respuestas de la API tanto para los errores como respuestas exitosas
- Se centralizaron los códigos de error en un solo módulo y se separaron por errores de negocio (BE) y errores técnicos (TE)
- se utilizo eslint para mejorar la escritura del código
- Generación de un tranId para identificar la request en ambos microservicios.
- Servidor de Consul para la comunicación entre los microservicios.
- Docker-compose para la orquestación de los microservicios.

Y por último solo a manera de comentario, en el repositorio se dejó el archivo .env para que se pueda probar facilemente, pero sabemos que en un entorno real no es una buena practica.
