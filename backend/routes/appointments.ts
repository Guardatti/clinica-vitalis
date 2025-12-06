import { Router } from "express";
import { validatorJWT } from "../middlewares/validatorJWT";
import { collectionErrors } from "../middlewares/collectionErrors";
import { check } from "express-validator";
import { createAppointment, getAppointements, updateAppointment } from "../controllers/appointments";
import { isAdmin } from "../middlewares/validatorAdmin";
import { checkAppointmentAvailability } from "../helpers/validationsDB";



const router = Router();

router.get('/',
    [
        validatorJWT,
        collectionErrors
    ],
    getAppointements
)

router.post('/',
    [
        validatorJWT,
        isAdmin,
        check("patientID", "El paciente es obligatorio").not().isEmpty(),
        check("professionalID", "El profesional es obligatorio").not().isEmpty(),
        check("date", "La fecha es obligatoria").not().isEmpty(),
        check("date").custom(checkAppointmentAvailability),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        collectionErrors
    ],
    createAppointment
)

router.patch('/:id',
    [
        validatorJWT,
        isAdmin,
        check("patientID", "El paciente es obligatorio").not().isEmpty(),
        check("professionalID", "El profesional es obligatorio").not().isEmpty(),
        check("date", "La fecha es obligatoria").not().isEmpty(),
        check("date").custom(checkAppointmentAvailability),
        check("description", "La descripción es obligatoria").not().isEmpty(),
        check("state", "El estado es obligatorio").not().isEmpty(),
        collectionErrors
    ],
    updateAppointment
)

export default router;