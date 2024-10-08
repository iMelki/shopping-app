import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { OrderRepository } from './repositories/order.repository';
import { IOrderRepository } from '../application/interfaces/order.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  providers: [
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
  ],
  exports: ['IOrderRepository'],
})
export class OrdersApiInfrastructureModule {}
