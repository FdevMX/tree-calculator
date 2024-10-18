import ply.lex as lex

# Lista de nombres de tokens
tokens = [
    'PARIZQ', 'PARDER', 'MODULO', 'DIVISION', 'MULTIPLICACION', 'RESTA', 'SUMA', 'PUNTO', 'NUMERO'
]

# Reglas para tokens simples
t_PARIZQ = r'\('
t_PARDER = r'\)'
t_MODULO = r'%'
t_DIVISION = r'/'
t_MULTIPLICACION = r'\*'
t_RESTA = r'-'
t_SUMA = r'\+'
t_PUNTO = r'\.'

# Reglas para tokens más complejos
def t_NUMERO(t):
    r'\d+'
    t.value = int(t.value)
    return t

# Ignorar espacios y tabulaciones
t_ignore = ' \t'

# Contador de líneas
def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

# Manejo de errores
def t_error(t):
    print(f"Carácter ilegal '{t.value[0]}' en la línea {t.lexer.lineno}")
    t.lexer.skip(1)

# Construir el lexer
lexer = lex.lex()

# Función para obtener todos los tokens
def get_all_tokens(code):
    # Inicializar el número de línea en 1
    lexer.lineno = 1
    lexer.input(code)
    tokens = []
    while True:
        tok = lexer.token()
        if not tok:
            break
        tokens.append((tok.value, tok.type))
    return tokens

# Código de prueba
code = "5*6+(4-2)"

# Obtener todos los tokens
tokens = get_all_tokens(code)

# Imprimir los resultados
for token in tokens:
    print(f"Valor: {token[0]}, Token: {token[1]}")