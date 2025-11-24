import { Router } from "express";
import { validatorJWT } from "../middlewares/validatorJWT";
import { collectionErrors } from "../middlewares/collectionErrors";
import { check } from "express-validator";



const router = Router();

router.get('/',
    [
        validatorJWT,
        collectionErrors
    ],

)

router.post('/',
    [
        validatorJWT,
        check("patientID", "El paciente es obligatorio").not().isEmpty(),
        check("professionalID", "El profesional es obligatorio").not().isEmpty(),
        check("date", "La fecha es obligatoria").not().isEmpty(),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        check("state", "El estado es obligatorio").not().isEmpty(),
        collectionErrors
    ],
    
)

router.patch('/',
    [
        validatorJWT,
        check("patientID", "El paciente es obligatorio").not().isEmpty(),
        check("professionalID", "El profesional es obligatorio").not().isEmpty(),
        check("date", "La fecha es obligatoria").not().isEmpty(),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        check("state", "El estado es obligatorio").not().isEmpty(),
        collectionErrors
    ],
    
)

export default router;