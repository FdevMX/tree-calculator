# Calculadora Basica

Este proyecto es una calculadora básica que muestra una tabla donde se visualiza el token y su valor correspondiente, así como la función de poder ver el árbol (grafo) de la operación ingresada.

### Enlace a la Aplicación Desplegada
[tree-calculator-frontend.vercel.app](https://tree-calculator-frontend.vercel.app)

## Tabla de Contenidos

- [Calculadora Basica](#calculadora-basica)
    - [Enlace a la Aplicación Desplegada](#enlace-a-la-aplicación-desplegada)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Advertencia](#advertencia)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Configuración](#configuración)
  - [Código de Prueba](#código-de-prueba)
  - [Capturas de Pantalla](#capturas-de-pantalla)
  - [Licencia](#licencia)

## Advertencia
> [!WARNING]  
> Si ingresas a la versión desplegada, puede que el servidor backend este suspendido o este lento. En ese caso, intenta recargar varias veces la página o espera unos minutos antes de volver a intentarlo.


## Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/FdevMX/tree-calculator.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd tree-calculator
    ```
3. Instala las dependencias del frontend:
    ```bash
    cd frontend
    npm install
    ```
4. Instala las dependencias del backend, recuerda crear tu entorno virtual antes de esto:
    ```bash
    cd ../backend
    pip install -r requirements.txt
    ```

## Uso

Para ejecutar el proyecto localmente:

1. Inicia el backend (asumiendo que Flask está configurado para ejecutarse en el puerto 5000):
    ```bash
    cd backend
    flask run
    ```
2. Inicia el frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```

## Configuración

El archivo de configuración principal para el frontend es `next.config.mjs`. Aquí puedes ajustar las siguientes opciones:

- `reactStrictMode`: Activa el modo estricto de React.
- `rewrites`: Configura las rutas de reescritura para el backend.
- Asegúrate de comentar la opción `destination` que se ejecuta por servidor y descomentar la URL por localhost para que funcione correctamente.

Ejemplo de configuración en el archivo `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/analyze',
          destination: 'http://localhost:5000/analyze',
        },
      ]
    },
}
  
export default nextConfig;
```

## Código de Prueba

Puedes usar el siguiente código para probar el analizador:

```bash
12+5-42*(4-2)/2
```

Debera una tabla con las columnas `token` y `Tipo`:

## Capturas de Pantalla

Aquí hay algunas capturas de pantalla del proyecto en funcionamiento:

<table>
  <tr>
    <td><img src="./screenshots/1.png" width="300"/></td>
    <td><img src="./screenshots/2.png" width="300"/></td>
    <td><img src="./screenshots/3.png" width="300"/></td>
  </tr>
  <tr>
    <td><em>Imagen 1: Vista inicial.</em></td>
    <td><em>Imagen 2: Resuultado mas tabla de token.</em></td>
    <td><em>Imagen 3: Grafo de la operación.</em></td>
  </tr>
</table>


## Licencia

Este proyecto está licenciado bajo los términos de la licencia GPL-3.0. Consulte el archivo [LICENCE](LICENCE) para más detalles.

[GPL-3.0 license](https://choosealicense.com/licenses/gpl-3.0/)


