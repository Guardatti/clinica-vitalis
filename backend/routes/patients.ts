import { Router } from "express";
import { validatorJWT } from "../middlewares/validatorJWT";
import { collectionErrors } from "../middlewares/collectionErrors";



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
        collectionErrors
    ],
    
)

router.patch('/',
    [
        validatorJWT,
        collectionErrors
    ],
    
)

router.delete('/',
    [
        validatorJWT,
        collectionErrors
    ],
    
)


export default router;