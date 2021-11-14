// API global Interface

// Controllers
import productsController from './controllers/product';
import userController from './controllers/user';
import orderController from './controllers/order';

// Global module export
export default {
    ...productsController,
    ...userController,
    ...orderController
}