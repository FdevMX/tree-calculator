from flask import Flask, request, jsonify
from flask_cors import CORS
from lexico import get_all_tokens

app = Flask(__name__)
CORS(app)  # Permite CORS para todas las rutas

@app.route('/analyze', methods=['POST'])
def analyze():
    code = request.json['code']
    
    # Análisis léxico
    tokens = get_all_tokens(code)
    token_list = [
        {
            "lexeme": str(t[0]),
            "token": t[1]
        }
        for t in tokens
    ]
    
    return jsonify({
        "tokens": token_list
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')