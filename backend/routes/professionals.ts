import { Router } from "express";
import { validatorJWT } from "../middlewares/validatorJWT";
import { collectionErrors } from "../middlewares/collectionErrors";
import { check } from "express-validator";
import { existDNIProfessional, existDNIProfessionalById } from "../helpers/validationsDB";
import { createProfessional, getProfessionals, updateProfessional } from "../controllers/professionals";
import { isAdmin } from "../middlewares/validatorAdmin";



const router = Router();

router.get('/',
    [
        validatorJWT,
        collectionErrors
    ],
    getProfessionals
)

router.post('/',
    [
        validatorJWT,
        isAdmin,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("surname", "El apellido es obligatorio").not().isEmpty(),
        check("dni", "El DNI es obligatorio").not().isEmpty(),
        check("dni", "DNI no válido").isLength({min: 7}),
        check("dni").custom(existDNIProfessional),
        check("birthdate", "La fecha de nacimiento es obligatoria").not().isEmpty(),
        check("gender", "El genero es obligatorio").not().isEmpty(),
        check("address", "La dirección es obligatoria").not().isEmpty(),
        check("phone", "El teléfono es obligatorio")
            .not().isEmpty()
            .isLength({ min: 10, max: 20 }).withMessage("El teléfono debe tener entre 10 y 20 caracteres")
            .matches(/^[0-9\s\-\+]*$/).withMessage("El teléfono solo puede contener números, guiones o espacios"),
        check("email", "El email es obligatorio").not().isEmpty(), 
        check("email", "El email no es válido").isEmail(), 
        check("speciality", "La especialidad es obligatoria").not().isEmpty(),
        collectionErrors
    ],
    createProfessional
)

router.patch('/:id',
    [
        validatorJWT,
        isAdmin,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("surname", "El apellido es obligatorio").not().isEmpty(),
        check("dni", "El DNI es obligatorio").not().isEmpty(),
        check("dni", "DNI no válido").isLength({min: 7}),
        check("dni").custom(existDNIProfessionalById),
        check("birthdate", "La fecha de nacimiento es obligatoria").not().isEmpty(),
        check("gender", "El genero es obligatorio").not().isEmpty(),
        check("address", "La dirección es obligatoria").not().isEmpty(),
        check("phone", "El teléfono es obligatorio")
            .not().isEmpty()
            .isLength({ min: 10, max: 20 }).withMessage("El teléfono debe tener entre 10 y 20 caracteres")
            .matches(/^[0-9\s\-\+]*$/).withMessage("El teléfono solo puede contener números, guiones o espacios"),
        check("email", "El email es obligatorio").not().isEmpty(), 
        check("email", "El email no es válido").isEmail(), 
        check("speciality", "La especialidad es obligatoria").not().isEmpty(),
        check("state", "El estado es obligatorio").not().isEmpty(),
        collectionErrors
    ],
    updateProfessional
)

export default router;