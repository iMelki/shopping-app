import { Order } from '../../domain/entities/order.entity';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}
