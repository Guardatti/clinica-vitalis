import { Router } from "express";
import { check } from "express-validator";
import { createWorkSchedule, getWorkScheduleById, getWorkSchedules, updateWorkSchedule } from "../controllers/workSchedule";
import { collectionErrors } from "../middlewares/collectionErrors";
import { validatorJWT } from "../middlewares/validatorJWT";
import { isAdmin } from "../middlewares/validatorAdmin";
import { checkTimeRange, existProfessionalById, isValidTimeFormat } from "../helpers/validationsDB";



const router = Router();

router.get('/',
    [
        validatorJWT,
        collectionErrors
    ],
    getWorkSchedules
);

router.get('/:id',
    [
        validatorJWT,
        collectionErrors
    ],
    getWorkScheduleById
);

router.post('/',
    [
        validatorJWT,
        isAdmin,
        check('professionalID', 'El ID del profesional es obligatorio').not().isEmpty(),
        check('professionalID').custom(existProfessionalById),
        check('dayOfWeek', 'El día es obligatorio').not().isEmpty(),
        check('dayOfWeek', 'El día debe ser un número entre 0 (Domingo) y 6 (Sábado)').isInt({ min: 0, max: 6 }),
        check('startTime', 'La hora de inicio es obligatoria').not().isEmpty(),
        check('startTime').custom(isValidTimeFormat),
        check('endTime', 'La hora de fin es obligatoria').not().isEmpty(),
        check('endTime').custom(isValidTimeFormat),
        check('endTime').custom(checkTimeRange),
        collectionErrors
    ],
    createWorkSchedule
);

router.patch('/:id',
    [
        validatorJWT,
        isAdmin,
        check('id', 'ID inválido').isInt(),
        check('dayOfWeek', 'El día es obligatorio').not().isEmpty(),
        check('dayOfWeek').optional().isInt({ min: 0, max: 6 }).withMessage('Día inválido (0-6)'),
        check('startTime', 'La hora de inicio es obligatoria').not().isEmpty(),
        check('startTime').optional().custom(isValidTimeFormat),
        check('endTime', 'La hora de fin es obligatoria').not().isEmpty(),
        check('endTime').optional().custom(isValidTimeFormat),
        check('endTime').optional().custom(checkTimeRange),
        collectionErrors
    ],
    updateWorkSchedule
);

export default router;