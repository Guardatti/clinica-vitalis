import { Router } from "express";
import { validatorJWT } from "../middlewares/validatorJWT";
import { collectionErrors } from "../middlewares/collectionErrors";
import { check } from "express-validator";
import { existNameSocialWork, existNameSocialWorkById } from "../helpers/validationsDB";
import { isAdmin } from "../middlewares/validatorAdmin";
import { createSocialWork, getSocialsWorks, getSocialWorkById, updateSocialWork } from "../controllers/socialsWorks";



const router = Router();

router.get('/',
    [
        validatorJWT,
        collectionErrors
    ],
    getSocialsWorks
)

router.get('/:id',
    [
        validatorJWT,
        collectionErrors
    ],
    getSocialWorkById
)

router.post('/',
    [
        validatorJWT,
        isAdmin,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("name").custom(existNameSocialWork),
        check("address", "La dirección es obligatoria").not().isEmpty(),
        check("phone", "El teléfono es obligatorio")
            .not().isEmpty()
            .isLength({ min: 10, max: 20 }).withMessage("El teléfono debe tener entre 10 y 20 caracteres")
            .matches(/^[0-9\s\-\+]*$/).withMessage("El teléfono solo puede contener números, guiones o espacios"),
        check("webpage", "La dirección es obligatoria").not().isEmpty(),
        collectionErrors
    ],
    createSocialWork
)

router.patch('/:id',
    [
        validatorJWT,
        isAdmin,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("name").custom(existNameSocialWorkById),
        check("state", "El estado es obligatorio").not().isEmpty(),
        check("address", "La dirección es obligatoria").not().isEmpty(),
        check("phone", "El teléfono es obligatorio")
            .not().isEmpty()
            .isLength({ min: 10, max: 20 }).withMessage("El teléfono debe tener entre 10 y 20 caracteres")
            .matches(/^[0-9\s\-\+]*$/).withMessage("El teléfono solo puede contener números, guiones o espacios"),
        check("webpage", "La dirección es obligatoria").not().isEmpty(),
        collectionErrors
    ],
    updateSocialWork
)

export default router;