/**
 * @swagger
 * components:
 *  schemas:
 *      Products:
 *          type: Object
 *          properties:
 *              item_id:
 *                  type: integer
 *                  description: An auto assigned id unique to each product
 *              item_name:
 *                  type: varchar(20)
 *                  description: The name of said product
 *              item_description:
 *                  type: text
 *                  description: The description of said product
 *              item_price:
 *                  type: money
 *                  description: The amount of money the product will cost
 *              item_quantity:
 *                  type: integer
 *                  description: The amount of the product we have in stock
 * tags:
 *      name: Product
 *      description: The product managing api
 * /product:
 *  get:
 *      summary: Gets all the products sold
 *      tags: [Product]
 *      requestBody:
 *          required: false
 *      response: 
 *          200:
 *              description: An array of all products sold 
 *          500:
 *              description: A server error
 * /product/category:
 *  get:
 *      summary: Gets all products in a certain category
 *      tags: [Product]
 *      requestBody:
 *          required: false
 *      response:
 *          200:
 *              description: An array of all products in that category
 *          500:
 *              description: A server error
 * /product/:id:
 *  get:
 *      summary: Info of a singular product
 *      tags: [Product]
 *      requestBody:
 *          required: false
 *      response:
 *          200:
 *              description: An object of all the information about the product
 *          404:
 *              description: No product found
 *          500:
 *              description: A server error
 */