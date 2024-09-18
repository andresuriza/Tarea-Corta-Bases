import sqlite3

# Conectar a la base de datos (si no existe, SQLite la creará automáticamente)
conn = sqlite3.connect('backend/nutritec.db')

# Crear un cursor para ejecutar comandos SQL
cursor = conn.cursor()

# Crear tabla para el registro de usuarios
cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cedula TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido1 TEXT NOT NULL,
    apellido2 TEXT NOT NULL,
    nutri_id TEXT,
    edad INTEGER,
    fecha_nacimiento TEXT,
    peso REAL,
    imc REAL,
    direccion TEXT,
    credit_card TEXT,
    cobro TEXT,
    email TEXT,
    password TEXT
)
''')

# Guardar cambios y cerrar conexión
conn.commit()
conn.close()
