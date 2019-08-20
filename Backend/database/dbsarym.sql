--creating the datab
CREATE DATABASE sarym;

--using the database
use sarym;

-- USUARIO
    -- usuario
create table usuario (
    idUsuario INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    cuitUsuario INT(11) NOT NULL, 
    nombreUsuario VARCHAR(50) NOT NULL, 
    apellidoUsuario VARCHAR(50) NOT NULL, 
    contrasenaUsuario VARCHAR(50) NOT NULL,  
    dniUsuario INT NOT NULL, 
    domicilioUsuario VARCHAR(50) NOT NULL, 
    emailUsuario VARCHAR(50) NOT NULL, 
    idDepartamento INT, 
    nroCelularUsuario INT(11), 
    nroTelefonoUsuario INT);

    -- departamento
create table departamento(
    idDepartamento INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nombreDepartamento VARCHAR(50) NOT NULL)

    -- usuarioestado
create table usuarioestado(
    idUsuarioEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT(10) UNSIGNED NOT NULL,
    idEstadoUsuario INT(5) UNSIGNED NOT NULL,
    descripcionUsuarioEstado VARCHAR(50), 
    fechaYHoraAltaUsuarioEstado datetime NOT NULL,
    fechaYHoraBajaUsuarioEstado datetime)

    -- estadousuario
create table estadousuario(
    idEstadoUsuario INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreEstadoUsuario VARCHAR(50) NOT NULL)

    -- rolusuario
create table rolusuario(
    idRolUsuario INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT(10) UNSIGNED NOT NULL,
    idRol INT(5) UNSIGNED NOT NULL,
    fechaYHoraAltaUsuarioEstado datetime NOT NULL,
    fechaYHoraBajaUsuarioEstado datetime)

    -- rol
create table rol(
    idRol INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreRol VARCHAR(50) NOT NULL)

    -- comensal
create table comensal (
    idComensal INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idUsuario INT(10) UNSIGNED,
    idReserva INT(10) UNSIGNED,
    idEstadia INT(10) UNSIGNED,
    aliasComensal VARCHAR(50) NOT NULL, 
    edadComensal VARCHAR(50) NOT NULL);

-- MESA
    -- mesa
create table mesa (
    idMesa INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idSector INT(10) UNSIGNED NOT NULL,
    idUbicacion INT(10) UNSIGNED NOT NULL,
    nroMesa INT(10) UNSIGNED NOT NULL,
    capacidadMesa INT(10) UNSIGNED NOT NULL);

    -- sector
create table sector(
    idSector INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codSector VARCHAR(50) NOT NULL,
    nombreSector VARCHAR(50) NOT NULL,
    fechaYHoraBajaSector datetime)

    -- ubicacion
create table ubicacion(
    idUbicacion INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nroUbicacion INT(5) NOT NULL,
    descripcionUbicacion VARCHAR(50))

    -- mesaestado
create table mesaestado(
    idMesaEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idMesa INT(10) UNSIGNED NOT NULL,
    idEstadoMesa INT(5) UNSIGNED NOT NULL,
    fechaYHoraAltaMesaEstado datetime NOT NULL,
    fechaYHoraBajaMesaEstado datetime)

    -- estadomesa
create table estadomesa(
    idEstadoMesa INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoMesa VARCHAR(50) NOT NULL,
    nombreEstadoMesa VARCHAR(50) NOT NULL,
    colorEstadoMesa VARCHAR(50))

-- PRODUCTO
    -- producto
create table producto (
    idProducto INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idRubro INT(10) UNSIGNED NOT NULL,
    idUnidadMedida INT(10) UNSIGNED NOT NULL,
    codProducto VARCHAR(50) NOT NULL,
    nombreProducto VARCHAR(50) NOT NULL, 
    descripcionProducto VARCHAR(50) NOT NULL,
    pathImagenProducto VARCHAR(100));

    -- rubro
create table rubro (
    idRubro INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    codRubro VARCHAR(50) NOT NULL,
    nombreRubro VARCHAR(50) NOT NULL, 
    descripcionRubro VARCHAR(50));

    -- unidadmedida
create table unidadmedida (
    idUnidadMedida INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    codUnidadMedida VARCHAR(50) NOT NULL,
    nombreUnidadMedida VARCHAR(50) NOT NULL, 
    descripcionUnidadMedida VARCHAR(50),
    caracterUnidadMedida VARCHAR(10));

    -- productoestado
create table productoestado(
	idProductoEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idProducto INT(10) UNSIGNED NOT NULL,
	idEstadoProducto INT(5) UNSIGNED NOT NULL,
	descripcionProductoEstado VARCHAR(50), 
	fechaYHoraAltaProductoEstado datetime NOT NULL,
	fechaYHoraBajaProductoEstado datetime)

    -- estadoproducto
create table estadoproducto(
    idEstadoProducto INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoProducto VARCHAR(50) NOT NULL,
    nombreEstadoProducto VARCHAR(50) NOT NULL)

    -- tipomoneda
create table tipomoneda(
    idTipoMoneda INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreTipoMoneda VARCHAR(50) NOT NULL,
    simboloTipoMoneda VARCHAR(10) NOT NULL)

    -- precioproducto
create table precioproducto(
	idPrecioProducto INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idProducto INT(10) UNSIGNED NOT NULL,
	idTipoMoneda INT(5) UNSIGNED NOT NULL,
	importePrecioProducto float NOT NULL, 
	fechaYHoraDesdePrecioProducto datetime NOT NULL,
	fechaYHoraHastaPrecioProducto datetime)

-- MENUPROMOCION
    -- menupromocion
create table menupromocion (
    idMenuPromocion INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idTipoMenuPromocion INT(5) NOT NULL,
    codMenuPromocion VARCHAR(50) NOT NULL,
    nombreMenuPromocion VARCHAR(50) NOT NULL, 
    descripcionMenuPromocion VARCHAR(50) NOT NULL,
    pathImagenMenuPromocion VARCHAR(100));

    -- tipomenupromocion
create table tipomenupromocion (
    idTipoMenuPromocion INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nombreTipoMenuPromocion VARCHAR(50) NOT NULL);

    -- detallemenupromocionproducto
create table detallemenupromocionproducto (
    idDetalleMenuPromocionProducto INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idProducto INT(10) UNSIGNED NOT NULL,
    idMenuPromocion INT(10) UNSIGNED NOT NULL,
    cantidadProductoMenuPromocion INT(10) NOT NULL);

    -- preciomenupromocion
create table preciomenupromocion(
	idPrecionMenuPromocion INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idMenuPromocion INT(10) UNSIGNED NOT NULL,
	idTipoMoneda INT(5) UNSIGNED NOT NULL,
	importePrecioMenuPromocion float NOT NULL, 
	fechaYHoraDesdePrecioMenuPromocion datetime NOT NULL,
	fechaYHoraHastaPrecioMenuPromocion datetime)

    -- menupromocionestado
create table menupromocionestado(
	idMenuPromocionEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idMenuPromocion INT(10) UNSIGNED NOT NULL,
	idEstadoMenuPromocion INT(5) UNSIGNED NOT NULL,
	descripcionMenuPromocionEstado VARCHAR(50), 
	fechaYHoraAltaMenuPromocionEstado datetime NOT NULL,
	fechaYHoraBajaMenuPromocionEstado datetime)

    -- estadomenupromocion
create table estadomenupromocion(
    idEstadoMenuPromocion INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoMenuPromocion VARCHAR(50) NOT NULL,
    nombreEstadoMenuPromocion VARCHAR(50) NOT NULL)

-- PEDIDO
    -- pedido
create table pedido(
	idPedido INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idComensal INT(12) UNSIGNED NOT NULL,
	idEstadia INT(12) UNSIGNED NOT NULL,
    idReserva INT(12) UNSIGNED NOT NULL,
    codPedido VARCHAR(50) NOT NULL,
	fechaYHoraInicioPedido datetime NOT NULL,
	fechaYHoraFinPedido datetime)

    -- detallepedidoproducto
create table detallepedidoproducto (
    idDetallePedidoProducto INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idPedido INT(12) UNSIGNED NOT NULL,
    idMenuPromocion INT(12) UNSIGNED NOT NULL,
    idProducto INT(12) UNSIGNED NOT NULL,
    cantidadPedidoProducto INT(5) NOT NULL,
    fechaYHoraInicioPedidoProducto datetime NOT NULL,
    fechaYHoraEntregaPedidoProducto datetime);

    -- pedidoestado
create table pedidoestado(
	idPedidoEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idPedido INT(12) UNSIGNED NOT NULL,
	idEstadoPedido INT(5) UNSIGNED NOT NULL,
	fechaYHoraAltaPedidoEstado datetime NOT NULL,
	fechaYHoraBajaPedidoEstado datetime)

    -- estadopedido
create table estadopedido(
    idEstadoPedido INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoPedido VARCHAR(50) NOT NULL,
    nombreEstadoPedido VARCHAR(50) NOT NULL)

-- RESERVA
    -- reserva
create table reserva(
	idReserva INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idUsuario INT(12) UNSIGNED NOT NULL,
    codReserva VARCHAR(50) NOT NULL,
    cantPersonas INT(5) UNSIGNED NOT NULL,
	fechaReserva date NOT NULL,
	horaEntradaReserva time NOT NULL,
    horaSalidaReserva time,
    tokenReserva VARCHAR(50) NOT NULL)

    -- reservaestado
create table reservaestado(
	idReservaEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idReserva INT(12) UNSIGNED NOT NULL,
	idEstadoReserva INT(5) UNSIGNED NOT NULL,
    descripcion VARCHAR(50),
	fechaYHoraAltaReservaEstado datetime NOT NULL,
	fechaYHoraBajaReservaEstado datetime)

    -- estadoreserva
create table estadoreserva(
    idEstadoReserva INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoReserva VARCHAR(50) NOT NULL,
    nombreEstadoReserva VARCHAR(50) NOT NULL)

    -- detallereservamesa
create table detallereservamesa (
    idDetalleReservaMesa INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idReserva INT(12) UNSIGNED NOT NULL,
    idMesa INT(12) UNSIGNED NOT NULL)

-- Estadia
    -- estadia
create table estadia (
	idEstadia INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idReserva INT(12) UNSIGNED NOT NULL,
    idMozoEstadia INT(12) UNSIGNED NOT NULL,
    cantPersonas INT(5) UNSIGNED NOT NULL,
	fechaYHoraInicioEstadia datetime NOT NULL,
    fechaYHoraFinEstadia datetime,
    tokenEstadia VARCHAR(50) NOT NULL)

    -- estadiaestado
create table estadiaestado(
	idEstadiaEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idEstadia INT(12) UNSIGNED NOT NULL,
	idEstadoEstadia INT(5) UNSIGNED NOT NULL,
    descripcionEstadiaEstado VARCHAR(100) NOT NULL,
	fechaYHoraAltaEstadiaEstado datetime NOT NULL,
	fechaYHoraBajaEstadiaEstado datetime)

    -- estadoestadia
create table estadoestadia(
    idEstadoEstadia INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoEstadia VARCHAR(50) NOT NULL,
    nombreEstadoEstadia VARCHAR(50) NOT NULL)

    -- detalleestadiamesa
create table detalleestadiamesa (
    idDetalleEstadiaMesa INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idEstadia INT(12) UNSIGNED NOT NULL,
    idMesa INT(12) UNSIGNED NOT NULL)

    -- mozoestadia
create table mozoestadia (
    idMozoEstadia INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idUsuario INT(12) UNSIGNED NOT NULL,
    fechaYHoraInicioMozoEstadia datetime NOT NULL,
	fechaYHoraFinMozoEstadia datetime)

    -- clienteestadia
create table clienteestadia (
    idClienteEstadia INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idUsuario INT(12) UNSIGNED NOT NULL,
    idEstadia INT(12) UNSIGNED NOT NULL)

-- CAJA
    --caja
create table caja(
    idCaja INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nroCaja INT(5) UNSIGNED NOT NULL)

    -- cajaestado
create table cajaestado (
	idCajaEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idCaja INT(12) UNSIGNED NOT NULL,
	idEstadoCaja INT(5) UNSIGNED NOT NULL,
    idUsuario INT(12) UNSIGNED NOT NULL,
    montoAperturaCajaEstado float NOT NULL,
    montoCierreCajaEstado float,
	fechaYHoraCajaEstado datetime NOT NULL)

    -- estadocaja
create table estadocaja (
    idEstadoCaja INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codestadocaja VARCHAR(50) NOT NULL,
    nombreestadocaja VARCHAR(50) NOT NULL)

    -- movimientocaja
create table movimientocaja (
	idMovimientoCaja INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idCaja INT(12) UNSIGNED NOT NULL,
	idTipoMovimientoCaja INT(5) UNSIGNED NOT NULL,
    idUsuario INT(12) UNSIGNED NOT NULL,
    montoMovimientoCaja float NOT NULL,
    descripcionMovimientoCaja VARCHAR(50) NOT NULL,
	fechaYHoraMovimientoCaja datetime NOT NULL)

    --tipomovimientocaja
create table tipomovimientocaja (
    idTipoMovimientoCaja INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nombreTipoMovimientoCaja VARCHAR(50) NOT NULL)

-- tp show all tables
SHOW TABLES;

--to describe the table
--describe usuario;


