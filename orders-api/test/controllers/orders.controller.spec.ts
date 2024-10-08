import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../src/controllers/orders.controller';
import { OrderService } from '../../src/application/services/order.service';
import { Order } from '../../src/domain/entities/order.entity';
import { OrderNotFoundException } from '../../src/domain/exceptions/order-not-found.exception';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrderService;

  beforeEach(async () => {
    const mockService = {
      createOrder: jest.fn(),
      getAllOrders: jest.fn(),
      getOrderById: jest.fn(),
      updateOrder: jest.fn(),
      deleteOrder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrderService, useValue: mockService }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const createOrderDto: Order = {
      fullName: 'Jane Doe',
      address: '456 Elm St',
      email: 'jane@example.com',
      products: ['Product3'],
    };

    jest
      .spyOn(service, 'createOrder')
      .mockResolvedValue({ ...createOrderDto, id: '2' });

    expect(await controller.createOrder(createOrderDto)).toEqual({
      ...createOrderDto,
      id: '2',
    });
  });

  it('should get all orders', async () => {
    const orders: Order[] = [
      {
        id: '1',
        fullName: 'John Doe',
        address: '123 Main St',
        email: 'john@example.com',
        products: ['Product1', 'Product2'],
      },
    ];

    jest.spyOn(service, 'getAllOrders').mockResolvedValue(orders);

    expect(await controller.getAllOrders()).toBe(orders);
  });

  it('should get an order by id', async () => {
    const order: Order = {
      id: '1',
      fullName: 'John Doe',
      address: '123 Main St',
      email: 'john@example.com',
      products: ['Product1', 'Product2'],
    };

    jest.spyOn(service, 'getOrderById').mockResolvedValue(order);

    expect(await controller.getOrderById('1')).toBe(order);
  });

  it('should throw NotFoundException when order not found', async () => {
    jest
      .spyOn(service, 'getOrderById')
      .mockRejectedValue(new OrderNotFoundException('nonexistent'));

    await expect(controller.getOrderById('nonexistent')).rejects.toThrow(
      OrderNotFoundException,
    );
  });

  // Additional tests for update and delete can be added similarly
});
