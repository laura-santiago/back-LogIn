import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import bcript from 'bcrypt';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
    
    const { username, password } = req.body;

    // Validamos si el usuario ya existe en la BBDD
    const user = await User.findOne({ where: { username: username}});

    if (user){
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        //Guardamos usuario en la BBDD
        await User.create({
            username: username,
            password: hashedPassword
        });
        
        res.json({
            msg: `Usuario ${username} creado correctamente` 
        });        
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! ocurrió un error.',
            error
        })
    }
    
}

export const loginUser = async (req: Request, res: Response) => {
    
    const { username, password } = req.body;

    //1.- Validamos si el usuario existe en la BBDD
    const user: any = await User.findOne({ where: { username: username } });

    if (!user){
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la BBDD`
        })
    }

    //2.- Validamos password
    const passwordValid = await bcript.compare(password, user.password)
    if (!passwordValid){
        return res.status(400).json({
            msg:`Password Incorrecta`
        })
    }

    //3.- Generamos Token
    const token = jwt.sign({
        username: username
    }, process.env.JWT_SECRET || 'alTernaTiva,123'
    // ,{
    //    expiresIn: '10000'
    // }
    );

    res.json(token);
    
}