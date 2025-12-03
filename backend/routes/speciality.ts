import { Router } from "express";
import { validatorJWT } from "../middlewares/validatorJWT";
import { collectionErrors } from "../middlewares/collectionErrors";
import { check } from "express-validator";
import { existNameSpeciality, existNameSpecialityById } from "../helpers/validationsDB";
import { isAdmin } from "../middlewares/validatorAdmin";
import { createSpeciality, getSpecialities, updateSpeciality } from "../controllers/speciality";



const router = Router();

router.get('/',
    [
        validatorJWT,
        collectionErrors
    ],
    getSpecialities
)

router.post('/',
    [
        validatorJWT,
        isAdmin,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("name").custom(existNameSpeciality),
        collectionErrors
    ],
    createSpeciality
)

router.patch('/:id',
    [
        validatorJWT,
        isAdmin,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("name").custom(existNameSpecialityById),
        check("state", "El estado es obligatorio").not().isEmpty(),
        collectionErrors
    ],
    updateSpeciality
)

export default router;