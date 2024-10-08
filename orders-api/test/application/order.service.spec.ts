import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/application/services/order.service';
import { IOrderRepository } from '../../src/application/interfaces/order.repository.interface';
import { Order } from '../../src/domain/entities/order.entity';
import { OrderNotFoundException } from '../../src/domain/exceptions/order-not-found.exception';

describe('OrderService', () => {
  let service: OrderService;
  let repository: IOrderRepository;

  beforeEach(async () => {
    const mockRepository: Partial<IOrderRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: 'IOrderRepository', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<IOrderRepository>('IOrderRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const order: Order = {
      fullName: 'John Doe',
      address: '123 Main St',
      email: 'john@example.com',
      products: ['Product1', 'Product2'],
    };

    jest.spyOn(repository, 'create').mockResolvedValue({ ...order, id: '1' });

    expect(await service.createOrder(order)).toEqual({ ...order, id: '1' });
  });

  it('should return all orders', async () => {
    const orders: Order[] = [
      {
        id: '1',
        fullName: 'John Doe',
        address: '123 Main St',
        email: 'john@example.com',
        products: ['Product1', 'Product2'],
      },
    ];

    jest.spyOn(repository, 'findAll').mockResolvedValue(orders);

    expect(await service.getAllOrders()).toBe(orders);
  });

  it('should throw NotFoundException when order not found', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(service.getOrderById('nonexistent')).rejects.toThrow(
      OrderNotFoundException,
    );
  });

  // Additional tests for update and delete can be added similarly
});
