const db = require('../DB/base.sqlite');
const bcrypt = require('bcrypt');

module.exports = {
    registrarUsuario: async (usuario, contraseña) => {
        const hash = await bcrypt.hash(contraseña, 10);
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)',
                [usuario, hash],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, usuario });
                }
            );
        });
    },

    iniciarSesion: async (usuario, contraseña) => {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM usuarios WHERE usuario = ?',
                [usuario],
                async (err, row) => {
                    if (err) return reject(err);
                    if (!row) return resolve(null);
                    const match = await bcrypt.compare(contraseña, row.contraseña);
                    if (match) {
                        resolve(row);
                    } else {
                        resolve(null);
                    }
                }
            );
        });
    }
};