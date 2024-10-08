import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersApiInfrastructureModule } from './infrastructure/orders-api.infrastructure.module';
import { OrderService } from './application/services/order.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    OrdersApiInfrastructureModule,
  ],
  controllers: [OrdersController],
  providers: [OrderService],
})
export class OrdersApiModule {}
