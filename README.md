# Proyecto de Análisis Léxico

Este proyecto implementa un backend en Flask para realizar análisis léxico de una expresion matematica. El backend expone una API que recibe la expresion y devuelve una lista de tokens léxicos.

## Archivos

- `app.py`: Implementa el servidor Flask y la API para el análisis léxico.
- `lexico.py`: Define el analizador léxico utilizando `ply.lex`.

## Requisitos

- Python 3.x
- Flask
- Flask-CORS
- PLY (Python Lex-Yacc)

## Instalación

1. Clona el repositorio.
2. Instala las dependencias con el siguiente comando:

    ```sh
    pip install -r requirements.txt
    ```

## Uso

1. Ejecuta el servidor Flask:

    ```sh
    python app.py
    ```

2. Envía una solicitud POST a `http://localhost:5000/analyze` con un JSON que contenga la expresión a analizar. Ejemplo:

    ```json
    {
        "code": "5*6+(4-2)"
    }
    ```

3. La respuesta será un JSON con la lista de tokens léxicos. Ejemplo:

    ```json
    {
        "tokens": [
            {"lexeme": "5", "token": "NUMERO"},
            {"lexeme": "*", "token": "MULTIPLICACION"},
            {"lexeme": "6", "token": "NUMERO"},
            {"lexeme": "+", "token": "SUMA"},
            {"lexeme": "(", "token": "PARIZQ"},
            {"lexeme": "4", "token": "NUMERO"},
            {"lexeme": "-", "token": "RESTA"},
            {"lexeme": "2", "token": "NUMERO"},
            {"lexeme": ")", "token": "PARDER"}
        ]
    }
    ```

## Descripción de Archivos

### `app.py`

Este archivo configura el servidor Flask y define una ruta `/analyze` que recibe solicitudes POST con código fuente en formato JSON. Utiliza la función [`get_all_tokens`](lexico.py) de [`lexico.py`](lexico.py) para realizar el análisis léxico y devolver los tokens en formato JSON.

### `lexico.py`

Este archivo define el analizador léxico utilizando `ply.lex`. Contiene las reglas para identificar diferentes tipos de tokens como paréntesis, operadores y números. La función [`get_all_tokens`](lexico.py) toma un string de código fuente y devuelve una lista de tokens.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Consulte el archivo [LICENCE](LICENCE) para más detalles.