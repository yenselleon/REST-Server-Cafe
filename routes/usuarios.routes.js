const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPatch, usuariosPost } = require('../controllers/usuarios.controller');
const {validarCampos} = require('../middleware/validar-campos')

const Role = require('../models/role')

const router = Router();

router.get('/', usuariosGet)

router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contraseña debe ser mayor a 6 digitos').isLength({min: 6}),
    check('correo', 'el correo no es valido').isEmail(),
    check('role').custom((rol = '') => {
        const existeRol = Role.findOne({role});

        if(!existeRol){
            throw new Error(`El rol ${rol} no esta ingresado en la BD`)
        }
    }),
    validarCampos,
],usuariosPost);

router.delete('/', usuariosDelete);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

module.exports = router;