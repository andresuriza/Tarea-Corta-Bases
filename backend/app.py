from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib

app = Flask(__name__)
CORS(app)

# Conectar a la base de datos
def connect_db():
    return sqlite3.connect('backend/nutritec.db')

# Ruta para registrar usuarios (ya existente en tu código)
@app.route('/api/register', methods=['POST'])
def register_user():
    try:
        data = request.json
        conn = connect_db()
        cursor = conn.cursor()

        # Si el rol es administrador, usar nombre_usuario para el campo nombre
        if data['rol'] == 'administrador':
            nombre = data['nombre_usuario']
        else:
            nombre = data['nombre']

        # Insertar el nombre (o nombre_usuario) junto con los datos comunes en la tabla "usuarios"
        cursor.execute('''
            INSERT INTO usuarios (nombre, email, password, rol)
            VALUES (?, ?, ?, ?)
        ''', (
            nombre, data['email'], data['password'], data['rol']
        ))

        # Obtener el ID del usuario recién insertado
        usuario_id = cursor.lastrowid

        # Dependiendo del rol, insertar en la tabla correspondiente
        if data['rol'] == 'nutricionista':
            cursor.execute('''
                INSERT INTO nutricionistas (usuario_id, cedula, nombre, apellido1, apellido2, codigo_nutricionista, edad, fecha_nacimiento, peso, imc, direccion, credit_card, cobro)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                usuario_id, data['cedula'], data['nombre'], data['apellido1'], data.get('apellido2', None), 
                data['codigo_nutricionista'], data['edad'], data['fecha_nacimiento'],
                data['peso'], data['imc'], data['direccion'], data['credit_card'], data['cobro']
            ))

        elif data['rol'] == 'administrador':
            cursor.execute('''
                INSERT INTO administradores (usuario_id, nombre_usuario)
                VALUES (?, ?)
            ''', (usuario_id, data['nombre_usuario']))

        elif data['rol'] == 'cliente':
            cursor.execute('''
                INSERT INTO clientes (usuario_id, nombre, apellido1, apellido2, edad, fecha_nacimiento, peso, imc, pais_residencia, peso_actual, medida_cintura, medida_cuello, medida_caderas, porcentaje_musculo, porcentaje_grasa, calorias_diarias_maximas)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                usuario_id, data['nombre'], data['apellido1'], data.get('apellido2', None),
                data['edad'], data['fecha_nacimiento'], data['peso'], data['imc'], 
                data['pais_residencia'], data['peso_actual'], data['medida_cintura'], 
                data['medida_cuello'], data['medida_caderas'], data['porcentaje_musculo'], 
                data['porcentaje_grasa'], data['calorias_diarias_maximas']
            ))

        conn.commit()
        conn.close()
        return jsonify({"message": f"{data['rol'].capitalize()} registrado exitosamente"}), 201
    except sqlite3.Error as e:
        print(f"Error en la base de datos: {e}")
        return jsonify({"error": "Hubo un error en la base de datos."}), 500
    except Exception as e:
        print(f"Error inesperado: {e}")
        return jsonify({"error": "Error inesperado."}), 500


# Ruta para iniciar sesión (login)
@app.route('/api/login', methods=['POST'])
def login_user():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        # Encriptar la contraseña para comparación (usando MD5)
        encrypted_password = hashlib.md5(password.encode()).hexdigest()

        conn = connect_db()
        cursor = conn.cursor()

        # Verificar si el usuario existe con las credenciales correctas
        cursor.execute('''
            SELECT * FROM usuarios WHERE email = ? AND password = ?
        ''', (email, encrypted_password))
        user = cursor.fetchone()
        conn.close()
        print()
        if user:
            # Devolver información básica del usuario si el login es exitoso
            return jsonify({
                "message": "Inicio de sesión exitoso",
                "user": {
                    "id": user[0],
                    "usuario": user[1],
                    "role": user[4]
                }
            }), 200
        else:
            return jsonify({"error": "Credenciales incorrectas"}), 401
    except Exception as e:
        print(f"Error en el inicio de sesión: {e}")
        return jsonify({"error": "Hubo un error al iniciar sesión."}), 500

# Nueva ruta para agregar productos
@app.route('/api/products', methods=['POST'])
def add_product():
    try:
        data = request.json
        conn = connect_db()
        cursor = conn.cursor()

        # Valor por defecto del estado: "en espera"
        estado ='en-espera'

        # Insertar el producto en la base de datos
        cursor.execute('''
            INSERT INTO productos (codigo_barras, descripcion, tamano_porcion, energia_kcal, grasa, sodio, carbohidratos, proteina, vitaminas, calcio, hierro, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['codigoBarras'], data['descripcion'], data['porcion'], data['energia'], 
            data['grasa'], data['sodio'], data['carbohidratos'], data['proteina'], 
            data['vitaminas'], data['calcio'], data['hierro'], estado
        ))

        conn.commit()
        conn.close()
        return jsonify({"message": "Producto enviado para revisión."}), 201
    except sqlite3.Error as e:
        print(f"Error en la base de datos: {e}")
        return jsonify({"error": "Hubo un error en la base de datos."}), 500
    except Exception as e:
        print(f"Error inesperado: {e}")
        return jsonify({"error": "Error inesperado."}), 500

# Nueva ruta para buscar clientes por email
@app.route('/api/clients', methods=['GET'])
def search_clients():
    query = request.args.get('query', '')
    try:
        conn = connect_db()
        cursor = conn.cursor()

        # Realizar búsqueda de clientes por email
        cursor.execute('''
            SELECT id, nombre, email FROM usuarios WHERE email LIKE ? AND rol='cliente'
        ''', (f'%{query}%',))
        clients = cursor.fetchall()

        # Formatear la lista de clientes
        client_list = [{"id": client[0], "nombre": client[1], "email": client[2]} for client in clients]

        conn.close()
        return jsonify({"clients": client_list}), 200
    except sqlite3.Error as e:
        print(f"Error en la base de datos: {e}")
        return jsonify({"error": "Hubo un error en la base de datos."}), 500



@app.route('/api/nutricionistas', methods=['GET'])
def get_nutricionistas():
    try:
        conn = connect_db()
        cursor = conn.cursor()

        # Obtener nutricionistas, sus clientes asociados y el tipo de cobro
        cursor.execute('''
            SELECT n.id, n.nombre, n.credit_card, u.email, COUNT(c.id) as clientes_asociados, n.cobro
            FROM nutricionistas n
            LEFT JOIN usuarios u ON u.id = n.usuario_id
            LEFT JOIN clientes c ON n.codigo_nutricionista = c.codigo_nutricionista
            GROUP BY n.id
        ''')
        nutricionistas = cursor.fetchall()

        # Formatear los datos
        nutricionistas_list = [{
            "id": nut[0],
            "nombre": nut[1],  # Puedes ajustar esto si deseas incluir apellidos
            "numeroTarjeta": nut[2],
            "email": nut[3],
            "clientesAsociados": nut[4],
            "cobro": nut[5]  # Agregado para incluir el tipo de cobro
        } for nut in nutricionistas]

        conn.close()
        return jsonify(nutricionistas_list), 200
    except sqlite3.Error as e:
        print(f"Error en la base de datos: {e}")
        return jsonify({"error": "Hubo un error en la base de datos."}), 500
    except Exception as e:
        print(f"Error inesperado: {e}")
        return jsonify({"error": "Error inesperado."}), 500

# Nueva ruta para asociar clientes a un nutricionista

@app.route('/api/associate-client', methods=['POST'])
def associate_client():
    try:
        data = request.json

        client_email = data['clientEmail']
        nutricionista_id = data['nutricionistaId']

        print(f"Client Email: {client_email}")
        print(f"Nutricionista ID: {nutricionista_id}")

        conn = connect_db()
        cursor = conn.cursor()

        # 1. Verificar que el nutricionista existe en la tabla nutricionistas
        cursor.execute('''SELECT codigo_nutricionista FROM nutricionistas WHERE usuario_id = ?''', (nutricionista_id,))
        nutricionista = cursor.fetchone()

        if not nutricionista:
            print("Nutricionista no encontrado.")
            return jsonify({"error": "Nutricionista no encontrado."}), 404

        codigo_nutricionista = nutricionista[0]
        print(f"Código Nutricionista: {codigo_nutricionista}")

        # 2. Buscar el cliente por el email en la tabla usuarios y verificar su rol
        cursor.execute('''SELECT id, rol FROM usuarios WHERE email = ? AND rol='cliente' ''', (client_email,))
        user = cursor.fetchone()

        if not user:
            print("Cliente no encontrado.")
            return jsonify({"error": "Cliente no encontrado."}), 404
        if user[1] != 'cliente':
            print(f"El usuario no es un cliente. Rol encontrado: {user[1]}")
            return jsonify({"error": "El usuario no es un cliente."}), 400

        user_id = user[0]
        print(f"User ID: {user_id}")

        # 3. Verificar que el cliente existe en la tabla clientes
        cursor.execute('''SELECT id FROM clientes WHERE usuario_id = ?''', (user_id,))
        client = cursor.fetchone()

        if not client:
            print("Cliente no encontrado en la tabla de clientes.")
            return jsonify({"error": "Cliente no encontrado en la tabla de clientes."}), 404

        # 4. Actualizar el código del nutricionista en la tabla clientes
        cursor.execute('''UPDATE clientes SET codigo_nutricionista = ? WHERE usuario_id = ?''', (codigo_nutricionista, user_id))
        print(f"Actualizando cliente con User ID: {user_id} y Código Nutricionista: {codigo_nutricionista}")

        conn.commit()
        return jsonify({"message": "Cliente asociado exitosamente al nutricionista."}), 200

    except sqlite3.Error as e:
        print(f"Error en la base de datos: {e}")
        return jsonify({"error": "Hubo un error en la base de datos."}), 500
    except Exception as e:
        print(f"Error inesperado: {e}")
        return jsonify({"error": "Error inesperado."}), 500
    finally:
        # Asegurarse de cerrar la conexión a la base de datos
        if conn:
            conn.close()
if __name__ == '__main__':
    app.run(debug=True)
