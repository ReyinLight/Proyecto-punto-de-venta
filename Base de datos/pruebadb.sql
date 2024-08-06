-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-08-2024 a las 12:57:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pruebadb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearCompra` (IN `idUsuario` INT, IN `idProducto` INT)   BEGIN
DECLARE v_existencias INT;
DECLARE v_subtotal INT;

    -- Obtener las existencias actuales del producto
    SELECT existencias INTO v_existencias
    FROM articulo
    WHERE id = idProducto;
    
    -- Obtiene el subtotal        
    SELECT precio INTO v_subtotal
    FROM articulo
    WHERE id = idProducto;

    -- Verificar si hay suficiente stock
    IF v_existencias >= 1 THEN
        -- Iniciar una transacción
        START TRANSACTION;
               
        -- Insertar la nueva compra
        INSERT INTO compra (idUsuario, idProducto, fecha, subtotal)
        VALUES (idUsuario, idProducto, NOW(), v_subtotal);
		                
        -- Reducir las existencias
        UPDATE articulo
        SET existencias = existencias - 1
        WHERE id = idProducto;

        -- Confirmar la transacción
        COMMIT;
    ELSE
        -- Si no hay suficiente stock, deshacer la transacción
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay suficiente stock para completar la compra.';
    END IF;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ValidarCliente` (IN `nombreEntrada` VARCHAR(255), IN `emailEntrada` VARCHAR(255), IN `phoneEntrada` VARCHAR(255), OUT `idCliente` INT(4))   BEGIN

	DECLARE v_clienteId INT;
	
    -- Buscar el cliente por correo electrónico
	SELECT id INTO v_clienteId
    FROM usuario
    WHERE email = emailEntrada;
    
    -- Si el cliente no existe, crear uno nuevo
    IF v_clienteId IS NULL THEN
        INSERT INTO usuario (nombre, email, phone)
        VALUES (nombreEntrada, emailEntrada, phoneEntrada);

        -- Obtener el ID del nuevo cliente
        SET v_clienteId = LAST_INSERT_ID();
    END IF;

    -- Asignar el ID del cliente a la variable de salida
    SET idCliente = v_clienteId;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `id` int(4) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` int(4) NOT NULL,
  `existencias` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`id`, `nombre`, `descripcion`, `precio`, `existencias`) VALUES
(1, 'Lámpara', 'Hermosa lámpara', 500, 8),
(2, 'Reloj de pared', 'Reloj antiguo', 1000, 3),
(3, 'Radio', 'Se escucha bien', 200, 2),
(4, 'Cuadro', 'Lindo para tu hogar', 500, 3),
(5, 'Globo terráqueo', 'Globo terráqueo, ideal para decorar tu oficina', 800, 4),
(6, 'Reloj dorado', 'Hermoso reloj dorado que da la hora', 900, 3),
(7, 'Juego de té', 'Hermoso juego de té con 3 tazas y una tetera', 1500, 2),
(8, 'Escultura de Navidad', 'Escultura de ceramica', 0, 0),
(9, 'Taza decorativa', 'Taza antigua con detalles en oro', 800, 4),
(10, 'Perritos', 'Par de perritos cachorros', 300, 6),
(11, 'Oso de peluche', 'Oso de regalo del amor y la amistad', 500, 4),
(12, 'Figure anime kawai', 'Figura de anime traída desde china', 2500, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(4) NOT NULL,
  `idProducto` int(4) NOT NULL,
  `comentario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `idProducto`, `comentario`) VALUES
(1, 1, 'Es una lámpara preciosa, la puse en mi escritorio'),
(2, 1, '¡Me encanta! compraré una para regalársela a mi mamá'),
(3, 3, 'Acabo de comprar mi primer radio y me encanta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `subtotal` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`id`, `idUsuario`, `idProducto`, `fecha`, `subtotal`) VALUES
(1, 1, 3, '2024-08-06', 200),
(2, 2, 3, '2024-08-06', 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `email`, `phone`) VALUES
(1, 'Dalila', 'Dalila@hot', '333'),
(2, 'Luis', 'Luis@hot', '19');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistahistorial`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistahistorial` (
`Id` int(11)
,`Cliente` varchar(255)
,`Correo` varchar(255)
,`Telefono` varchar(20)
,`Articulo comprado` varchar(255)
,`Subtotal` int(4)
,`Fecha de compra` date
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vistahistorial`
--
DROP TABLE IF EXISTS `vistahistorial`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistahistorial`  AS SELECT `c`.`id` AS `Id`, `u`.`nombre` AS `Cliente`, `u`.`email` AS `Correo`, `u`.`phone` AS `Telefono`, `a`.`nombre` AS `Articulo comprado`, `c`.`subtotal` AS `Subtotal`, `c`.`fecha` AS `Fecha de compra` FROM ((`compra` `c` join `usuario` `u` on(`c`.`idUsuario` = `u`.`id`)) join `articulo` `a` on(`c`.`idProducto` = `a`.`id`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
