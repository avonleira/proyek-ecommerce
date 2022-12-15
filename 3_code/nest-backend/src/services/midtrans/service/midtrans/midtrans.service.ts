import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import midtransClient from 'midtrans-client'
import { Cart } from 'src/typeorm/entities/Cart';
import { Product } from 'src/typeorm/entities/Product';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

interface IMidtransNotifResponse {
  order_id: string
  transaction_status: number
  status_code: 200|500
}
interface IMidtransCreateTransactionResponse {
  order_id: string
  payment_url: string
}

@Injectable()
export class MidtransService {

  constructor(
    @InjectRepository(ProductInventory) private readonly productInventoryRepository:Repository<ProductInventory>,
    @InjectRepository(Product) private readonly productRepository:Repository<Product>,
  ) {}

  async createTransaction(list_cart: Array<Cart>, user: User, id_order: string, total: number){
    let snap = new midtransClient.Snap({
      isProduction : false,
      serverKey : `${process.env.MIDTRANS_SERVER_KEY}`,
      clientKey : `${process.env.MIDTRANS_CLIENT_KEY}`
    });
    return new Promise<IMidtransCreateTransactionResponse>(async (resolve, reject) => {
      let transaction_details = {
        'order_id': id_order,
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
          return resolve({order_id: id_order, payment_url: redirectUrl}) 
        })
        .catch((error)=>{
          return reject({ message: error.message });
        })
    })
  }

  async statusCallback(request: Object){
    let apiClient = new midtransClient.Snap({
      isProduction : false,
      serverKey : `${process.env.MIDTRANS_SERVER_KEY}`,
      clientKey : `${process.env.MIDTRANS_CLIENT_KEY}`
    });
    
    return new Promise<IMidtransNotifResponse>(async (resolve, reject) => { 
      apiClient.transaction.notification(request)
        .then((statusResponse)=>{
          let orderId = statusResponse.order_id;
          let transactionStatus = statusResponse.transaction_status;
          let status = -1

          if (transactionStatus == 'settlement'){
              status = 1
          } else if (transactionStatus == 'expire'){
              status = 3
          } else if (transactionStatus == 'cancel'){
              status = 2
          } else if (transactionStatus == 'pending'){
              status = 0
          }
          return resolve({ order_id: orderId, transaction_status: status, status_code: 200});
        })
        .catch((error)=>{
          return reject({ message: error.message });
        })
    })
  }

  async cekStatusManual(transaction_id: number){
    let apiClient = new midtransClient.Snap({
      isProduction : false,
      serverKey : `${process.env.MIDTRANS_SERVER_KEY}`,
      clientKey : `${process.env.MIDTRANS_CLIENT_KEY}`
    });
    
    return new Promise<IMidtransNotifResponse>(async (resolve, reject) => { 
      apiClient.transaction.status(transaction_id)
        .then((statusResponse)=>{
          let orderId = statusResponse.order_id;
          let transactionStatus = statusResponse.transaction_status;
          let status = -1

          if (transactionStatus == 'settlement'){
              status = 1
          } else if (transactionStatus == 'expire'){
              status = 3
          } else if (transactionStatus == 'cancel'){
              status = 2
          } else if (transactionStatus == 'pending'){
              status = 0
          }
          return resolve({ order_id: orderId, transaction_status: status, status_code: 200});
        })
        .catch((error)=>{
          return reject({ message: error.message });
        })
    })
  }
}
