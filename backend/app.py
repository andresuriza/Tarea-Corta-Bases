from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Conectar a la base de datos
def connect_db():
    return sqlite3.connect('backend/nutritec.db')

# Ruta para registrar usuarios (ya existente)
@app.route('/api/register', methods=['POST'])
def register_user():
    try:
        data = request.json
        conn = connect_db()
        cursor = conn.cursor()

        # Insertar usuario en la base de datos
        cursor.execute('''
            INSERT INTO usuarios (cedula, nombre, apellido1, apellido2, nutri_id, edad, fecha_nacimiento, peso, imc, direccion, credit_card, cobro, email, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['cedula'], data['nombre'], data['apellido1'], data['apellido2'], data['nutri_id'],
            data['edad'], data['fecha_nacimiento'], data['peso'], data['imc'], data['direccion'],
            data['credit_card'], data['cobro'], data['email'], data['password']
        ))

        conn.commit()
        conn.close()
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    except Exception as e:
        print(f"Error al registrar el usuario: {e}")
        return jsonify({"error": "Hubo un error al registrar el usuario"}), 500

# Ruta para iniciar sesión
@app.route('/api/login', methods=['POST'])
def login_user():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        conn = connect_db()
        cursor = conn.cursor()

        # Verificar si el usuario existe con las credenciales correctas
        cursor.execute('''
            SELECT * FROM usuarios WHERE email = ? AND password = ?
        ''', (email, password))
        user = cursor.fetchone()
        conn.close()

        if user:
            return jsonify({"message": "Inicio de sesión exitoso", "user": user}), 200
        else:
            return jsonify({"error": "Credenciales incorrectas"}), 401
    except Exception as e:
        print(f"Error en el inicio de sesión: {e}")
        return jsonify({"error": "Hubo un error al iniciar sesión"}), 500

if __name__ == '__main__':
    app.run(debug=True)
