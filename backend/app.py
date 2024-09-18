from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas


def connect_db():
    return sqlite3.connect('backend/nutritec.db')

# Ruta para insertar nuevos usuarios en la base de datos
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    conn = connect_db()
    cursor = conn.cursor()

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

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

if __name__ == '__main__':
    app.run(debug=True)
