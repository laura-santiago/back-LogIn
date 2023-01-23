import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if(headerToken != undefined && headerToken.startsWith('Bearer')) {

        // Tiene Token
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.JWT_SECRET || 'alTernaTiva,123');            
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Token no válido'
            })
        }


       
    } else {
       res.status(401).json({
        msg: 'Acceso denegado'
       })
    }
    
}

export default validateToken;