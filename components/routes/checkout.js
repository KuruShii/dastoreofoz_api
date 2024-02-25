/**
 * @swagger
 * components:
 *  schema:
 *      Orders:
 *          type: object
 *          properties:
 *              order_id:
 *                  type: integer
 *                  description: An identifier for the order used to find all products in said order
 *              user_id:
 *                  type: integer
 *                  description: The id of the user who placed the order
 *              item_id:
 *                  type: integer
 *                  description: The id of a product in the order
 *              quantity:
 *                  type: integer
 *                  description: The amount of said product user order
 * tags:
 *  name: Checkout
 *  description: Checkout managing api
 * /checkout:
 *  post:
 *      summary: Checks out the users cart
 *      tags: [Checkout, Orders]
 *      requestBody:
 *          required: true
 *      responses: 
 *          200:
 *              description: A redirect to /orders
 *          500:
 *              description: A server error
 */