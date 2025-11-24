import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "../controllers/auth";
import { collectionErrors } from "../middlewares/collectionErrors";
import { existEmail } from "../helpers/validationsDB";




const router = Router();

router.post(
    '/register',
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("surname", "El apellido es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").not().isEmpty(),
        check("email", "El email no es válido").isEmail(),
        check("email").custom(existEmail),  
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({min: 6}),
        collectionErrors
    ],
    register
)

router.post(
    '/login',
    [
        check("email", "El email es obligatorio").not().isEmpty(),
        check("email", "El email no es válido").isEmail(),
        check("password", "La contraseña debe tener al menos 6 caracteres)").isLength({min: 6}),
        collectionErrors
    ],
    login
)

export default router;