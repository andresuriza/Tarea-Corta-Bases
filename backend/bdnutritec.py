import sqlite3

# Conectar a la base de datos (si no existe, SQLite la creará automáticamente)
def connect_db():
    return sqlite3.connect('backend/nutritec.db')

# Crear las tablas de la base de datos
def create_tables():
    conn = connect_db()
    cursor = conn.cursor()

    # Crear tabla para el registro general de usuarios (con nombre)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,  -- Nombre del usuario
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL, -- Encriptado con MD5 o cualquier otro algoritmo
        rol TEXT CHECK(rol IN ('nutricionista', 'cliente', 'administrador')) NOT NULL
    )
    ''')

    # Crear tabla para nutricionistas
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS nutricionistas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        cedula TEXT UNIQUE NOT NULL,
        nombre TEXT NOT NULL,
        apellido1 TEXT NOT NULL,
        apellido2 TEXT,
        codigo_nutricionista TEXT UNIQUE NOT NULL CHECK(codigo_nutricionista LIKE 'NUT:%'),
        edad INTEGER,  -- Permitir que sea NULL inicialmente
        fecha_nacimiento TEXT NOT NULL,
        peso REAL NOT NULL,
        imc REAL NOT NULL,
        direccion TEXT NOT NULL,
        credit_card TEXT NOT NULL,
        cobro TEXT CHECK(cobro IN ('semanal', 'mensual', 'anual')) NOT NULL,
        foto BLOB,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
    ''')

    # Crear trigger para calcular la edad de nutricionistas
    cursor.execute('''
    CREATE TRIGGER calcular_edad_nutricionista
    AFTER INSERT ON nutricionistas
    FOR EACH ROW
    BEGIN
        UPDATE nutricionistas
        SET edad = (strftime('%Y', 'now') - strftime('%Y', NEW.fecha_nacimiento))
        WHERE id = NEW.id;
    END;
    ''')

    # Crear tabla para administradores (sin cédula ni otros datos innecesarios)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS administradores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        nombre_usuario TEXT NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
    ''')

    # Crear tabla para clientes
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        apellido1 TEXT NOT NULL,
        apellido2 TEXT,
        edad INTEGER,  -- Permitir que sea NULL inicialmente
        fecha_nacimiento TEXT NOT NULL,
        peso REAL NOT NULL,
        imc REAL NOT NULL,
        pais_residencia TEXT NOT NULL,
        peso_actual REAL NOT NULL,
        medida_cintura REAL NOT NULL,
        medida_cuello REAL NOT NULL,
        medida_caderas REAL NOT NULL,
        porcentaje_musculo REAL NOT NULL,
        porcentaje_grasa REAL NOT NULL,
        calorias_diarias_maximas INTEGER NOT NULL,
        codigo_nutricionista TEXT DEFAULT 'NUT:' NOT NULL,  -- Código de nutricionista asignado más tarde
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
    ''')

    # Crear trigger para calcular la edad de clientes
    cursor.execute('''
    CREATE TRIGGER calcular_edad_cliente
    AFTER INSERT ON clientes
    FOR EACH ROW
    BEGIN
        UPDATE clientes
        SET edad = (strftime('%Y', 'now') - strftime('%Y', NEW.fecha_nacimiento))
        WHERE id = NEW.id;
    END;
    ''')

    # Crear tabla para productos
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_barras TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        tamano_porcion REAL NOT NULL, -- Tamaño de la porción (g/ml)
        energia_kcal REAL NOT NULL, -- Energía (Kcal)
        grasa REAL NOT NULL, -- Grasa (g)
        sodio REAL NOT NULL, -- Sodio (mg)
        carbohidratos REAL NOT NULL, -- Carbohidratos (g)
        proteina REAL NOT NULL, -- Proteína (g)
        vitaminas TEXT, -- Vitaminas
        calcio REAL, -- Calcio (mg)
        hierro REAL, -- Hierro (mg)
        estado TEXT CHECK(estado IN ('aceptado', 'en-espera', 'denegado')) NOT NULL
    )
    ''')

    # Guardar cambios y cerrar conexión
    conn.commit()
    conn.close()

# Llamar la función para crear las tablas
create_tables()
