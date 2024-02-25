/**
 * @swagger
 * components:
 *  schemas:
 *      Cart:
 *          type: object
 *          properties:
 *              user_id:
 *                  type: integer
 *                  description: The id of the user whose cart it is and is used to query the cart
 *              item_id:
 *                  type: integer
 *                  description: The id of an item in the cart
 *              quantity:
 *                  type: integer
 *                  description: The amount of the item in the cart
 * tags:
 *  name: Cart
 *  description: The cart managing api
 * /cart:
 *  get:
 *      summary: Gets all items in users cart
 *      tags: [Cart]
 *      requestBody: 
 *          required: true
 *      responses:
 *          200:
 *              description: An array of items in the users cart
 *          500:
 *              description: A server error
 *  post:
 *      summary: Adds a new item to the users cart
 *      tags: [Cart]
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: Redirects user to cart causing a get request
 *          500:
 *              description: A server error
 *  put:
 *      summary: Updates an item in the cart
 *      tags: [Cart]
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: Redirects user to cart causing a get request
 *          500:
 *              description: A server error
 */ 