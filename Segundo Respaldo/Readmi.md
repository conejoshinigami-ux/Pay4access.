# Pay4Access

## 1️⃣ ¿Cuál es el problema?

Muchos creadores de contenido digital no tienen una manera rápida, simple y global de monetizar su trabajo mediante micro-pagos. Los métodos tradicionales requieren plataformas intermedias, wallets internas o procesos lentos que generan fricción y retrasan los ingresos. Esto limita la monetización de contenidos como artículos, videos o rutinas de gimnasio, especialmente a nivel internacional.


## 2️⃣ ¿Qué tecnología usarán?

- **Open Payments API**: para procesar micro-pagos en tiempo real de manera global.  
- **JavaScript Widget**: se integra fácilmente en cualquier sitio web o aplicación del creador.  
- **Backend ligero (Node.js o Python)**: maneja la creación de *Quotes*, pagos y desbloqueo de contenido.  
- **Base de datos (MongoDB, SQLite o Postgres)**: registro de transacciones y auditoría.  
- **JWT y bcrypt**: para autenticación y seguridad de usuarios.


## 3️⃣ ¿Cuál es la solución?

Pay4Access es una **API + widget** que permite a los creadores integrar un botón “Paga y accede” en su web o app:

1. El usuario selecciona contenido premium (artículo, video, rutina de gimnasio).  
2. El sistema genera un *Quote* contra el `wallet.interledger-test.dev` del creador.  
3. El usuario confirma → se crea un *Outgoing Payment* desde su cuenta.  
4. El creador recibe el pago y el contenido se desbloquea automáticamente.  

> No requiere wallets internas ni balances propios, cumpliendo el reto planteado.


## 4️⃣ ¿Cuáles son los beneficios?

- **Simplicidad**: cualquier creador copia un `<script>` y empieza a cobrar.  
- **Escalabilidad**: micro-pagos desde centavos hasta dólares.  
- **Interoperabilidad global**: funciona en cualquier país compatible con Open Payments.  
- **Rapidez**: fondos transferidos en tiempo real de punto A → B.  
- **Reducción de fricción**: elimina procesos complejos de pagos y permite monetización inmediata.


## 5️⃣ Arquitectura / Stack simple


- **Frontend**: widget que se integra en la web del creador, maneja el login y solicita pagos.  
- **Backend**: endpoints para crear *Quotes*, procesar pagos y validar usuarios.  
- **Open Payments**: procesamiento real de micro-pagos globales.  
- **Base de datos**: solo para auditoría y registro de usuarios/pagos.


## 6️⃣ Funciones indispensables y responsables
_________________________________________________________________________________________
| Función                                    | Responsable                              |
|--------------------------------------------|------------------------------------------|
| Integración del widget en sitios web       | Juan Eduardo Fuentes Cruz (Frontend)     |
| Creación de Quotes y Outgoing Payments     | Iván Posadas Reyes (Backend)             |
| Autenticación de usuarios (login/register) | Enrique Sánchez Ramírez (Backend)        |
| Registro y auditoría de pagos              | Luis Antonio Sánchez Sánchez (Líder)     |
| Pruebas de integración y funcionalidad     | Todos los miembros (QA compartido)       |
| Coordinación general y documentación       | Luis Antonio Sánchez Sánchez (Líder)     |
|____________________________________________|__________________________________________|