import { Request, Response} from 'express';
import { Product } from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
    const listProduct = await Product.findAll();

    res.json (listProduct)
}