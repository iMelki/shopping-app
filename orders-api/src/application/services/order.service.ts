import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../interfaces/order.repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { OrderNotFoundException } from '../../domain/exceptions/order-not-found.exception';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(order: Order): Promise<Order> {
    return this.orderRepository.create(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new OrderNotFoundException(id);
    }
    return order;
  }

  async updateOrder(id: string, order: Order): Promise<Order> {
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new OrderNotFoundException(id);
    }
    return this.orderRepository.update(id, order);
  }

  async deleteOrder(id: string): Promise<void> {
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new OrderNotFoundException(id);
    }
    return this.orderRepository.delete(id);
  }
}
