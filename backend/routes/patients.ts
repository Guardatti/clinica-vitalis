import { Router } from "express";
import { validatorJWT } from "../middlewares/validatorJWT";
import { collectionErrors } from "../middlewares/collectionErrors";
import { check } from "express-validator";
import { existDNIPatient, existDNIPatientById } from "../helpers/validationsDB";
import { createPatient, getPatients, updatePatient } from "../controllers/patients";
import { isAdmin } from "../middlewares/validatorAdmin";



const router = Router();

router.get('/',
    [
        validatorJWT,
        collectionErrors
    ],
    getPatients
)

router.post('/',
    [
        validatorJWT,
        isAdmin,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("surname", "El apellido es obligatorio").not().isEmpty(),
        check("dni", "El DNI es obligatorio").not().isEmpty(),
        check("dni", "DNI no válido").isLength({min: 7}),
        check("dni").custom(existDNIPatient),  
        check("birthdate", "La fecha de nacimiento es obligatoria").not().isEmpty(),
        check("gender", "El genero es obligatorio").not().isEmpty(),
        check("address", "La dirección es obligatoria").not().isEmpty(),
        check("socialWork", "La obra social es obligatoria").not().isEmpty(),
        collectionErrors
    ],
    createPatient
)

router.patch('/:id',
    [
        validatorJWT,
        isAdmin,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("surname", "El apellido es obligatorio").not().isEmpty(),
        check("dni", "El DNI es obligatorio").not().isEmpty(),
        check("dni", "DNI no válido").isLength({min: 7}),
        check("dni").custom(existDNIPatientById),
        check("birthdate", "La fecha de nacimiento es obligatoria").not().isEmpty(),
        check("gender", "El genero es obligatorio").not().isEmpty(),
        check("address", "La dirección es obligatoria").not().isEmpty(),
        check("socialWork", "La obra social es obligatoria").not().isEmpty(),
        collectionErrors
    ],
    updatePatient
)

export default router;