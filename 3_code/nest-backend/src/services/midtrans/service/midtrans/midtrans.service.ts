import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import midtransClient from 'midtrans-client'
import { Cart } from 'src/typeorm/entities/Cart';
import { Product } from 'src/typeorm/entities/Product';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class MidtransService {

    constructor(
        @InjectRepository(ProductInventory) private readonly productInventoryRepository:Repository<ProductInventory>,
        @InjectRepository(Product) private readonly productRepository:Repository<Product>,
      ) {}

    async createTransaction(list_cart: Array<Cart>, user: User, id_transaction: string, total: number){
        let snap = new midtransClient.Snap({
            isProduction : false,
            serverKey : `${process.env.MIDTRANS_SERVER_KEY}`,
            clientKey : `${process.env.MIDTRANS_CLIENT_KEY}`
        });
        let transaction_details = {
            'order_id': id_transaction,
            'gross_amount': total
        }
        let item_details = []

        for (let i = 0; i < list_cart.length; i++) {
            const tempProductInv = await this.productInventoryRepository.findOneBy({id: list_cart[i].product_inventory.id})
            item_details.push({
                id: tempProductInv.product.id,
                price: tempProductInv.price,
                quantity: list_cart[i].qty,
                name: tempProductInv.product.title,
                brand: "Duta Tech"
            })
        }
        const customer_details = {
            first_name: user.first_name, 
            last_name: user.last_name,
            email: user.email,
            phone: user.phone_number
        }

        snap.createTransaction({ transaction_details, item_details, customer_details })
            .then((transaction)=>{
                let redirectUrl = transaction.redirect_url;
                return {payment_url: redirectUrl}
            })
            .catch((error)=>{
                throw new Error(error);
            })
    }

}
