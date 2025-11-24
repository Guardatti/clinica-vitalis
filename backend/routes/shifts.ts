import { Router } from "express";
import { validatorJWT } from "../middlewares/validatorJWT";
import { collectionErrors } from "../middlewares/collectionErrors";
import { check } from "express-validator";
import { createShift, getShifts, updateShift } from "../controllers/shifts";
import { isAdmin } from "../middlewares/validatorAdmin";



const router = Router();

router.get('/',
    [
        validatorJWT,
        collectionErrors
    ],
    getShifts
)

router.post('/',
    [
        validatorJWT,
        isAdmin,
        check("patientID", "El paciente es obligatorio").not().isEmpty(),
        check("professionalID", "El profesional es obligatorio").not().isEmpty(),
        check("date", "La fecha es obligatoria").not().isEmpty(),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        check("state", "El estado es obligatorio").not().isEmpty(),
        collectionErrors
    ],
    createShift
)

router.patch('/:id',
    [
        validatorJWT,
        isAdmin,
        check("patientID", "El paciente es obligatorio").not().isEmpty(),
        check("professionalID", "El profesional es obligatorio").not().isEmpty(),
        check("date", "La fecha es obligatoria").not().isEmpty(),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        check("state", "El estado es obligatorio").not().isEmpty(),
        collectionErrors
    ],
    updateShift
)

export default router;