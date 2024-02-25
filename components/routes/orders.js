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
 *  name: Orders
 *  description: The order managing api
 * /orders:
 *  get:
 *      summary: Gets all of the users orders
 *      tags: [Orders]
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: An array of all orders the user has made
 *          500:
 *              description: A server error
 * /orders/:id:
 *  get:
 *      summary: Gets all info for a specific order
 *      tags: [Orders]
 *      requestBody: 
 *          required: true
 *      responses:
 *          200: 
 *              description: An object consisting of all the order info
 *          500:
 *              description: A server error
 * 
 */