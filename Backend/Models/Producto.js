import sqlite from 'sqlite3';
import {open} from 'sqlite';

//Abrir la base de datos 
const openDb = async () => {
    return open({
        filename: './Backend/DB/base.sqlite',
        driver:sqlite.Database
    });
};

export const Producto = {
    async obtenerTodos() {
        const db = await openDb();
        const productos =await db.all('SELECT * FROM productos');
        return productos;
    },
    async crear(producto) {
        const db = await openDb();
        const {nombre, descripcion, precio, stock, categoria_id} = producto;
        const resultado = await db.run(
            'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, categoria_id]
        );
        return resultado.lastID; // Retorna el ID del nuevo producto
    },
    async obtenerPorID(id){
        const db = await openDb();
        const producto = await db.get('SELECT * FROM productos WHERE id = ?', [id]);
        return producto;
    },
    async actualizar(id, datos) {
        const db = await openDb();
        const {nombre, descripcion, precio, stock, categoria_id}= datos;
        await db.run(
            'update productos set nombre =?, descripcion=?, precio=?, stock=?, categoria_id=? where id=?',
            [nombre, descripcion, precio, stock, categoria_id, id]
        );
    },
    async eliminar(id) {
        const db = await openDb();
        await db.run('DELETE FROM productos WHERE id = ?', [id]);
    },
}