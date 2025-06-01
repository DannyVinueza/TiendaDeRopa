import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerAuth from './routes/auth.routes.js';
import routerProductos from './routes/producto.routes.js';
import routerCategoria from './routes/categoria.routes.js';
import routerSubCategoria from './routes/subcategoria.routes.js';
import routerCliente from './routes/cliente.route.js';
import routerPedido from './routes/pedido.routes.js';
import routerUsuario from './routes/usuario.routes.js';
import routerVendedor from './routes/vendedor.routes.js';

const app = express()
dotenv.config()


app.set('port', process.env.port || 3000)
app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ bienvenida: "Bienvenido a la API para una tienda de ropa" })
});

app.use('/api', routerAuth);
app.use('/api/productos', routerProductos);
app.use('/api/categorias', routerCategoria);
app.use('/api/subcategorias', routerSubCategoria);
app.use('/api/cliente', routerCliente);
app.use('/api/pedidos', routerPedido);
app.use('/api/usuarios', routerUsuario);
app.use('/api/vendedor', routerVendedor);

app.use((req, res) => res.status(404).json({ msg: "Endpoint no encontrado - 404" }))

export default app;