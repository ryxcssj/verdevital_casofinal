import { ProductoModel } from '../Models/Producto.js';

export const ProductoController = {
  async listar(req, res) {
    try {
      const productos = await ProductoModel.obtenerTodos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
  },

  async obtener(req, res) {
    try {
      const id = req.params.id;
      const producto = await ProductoModel.obtenerPorId(id);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener el producto', error });
    }
  },

  async crear(req, res) {
    try {
      const nuevoProducto = await ProductoModel.crear(req.body);
      res.status(201).json({ mensaje: 'Producto creado', id: nuevoProducto.id });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear producto', error });
    }
  },

  async actualizar(req, res) {
    try {
      const id = req.params.id;
      await ProductoModel.actualizar(id, req.body);
      res.json({ mensaje: 'Producto actualizado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar producto', error });
    }
  },

  async eliminar(req, res) {
    try {
      const id = req.params.id;
      await ProductoModel.eliminar(id);
      res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar producto', error });
    }
  }
};
