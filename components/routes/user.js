/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              user_id: 
 *                  type: integer
 *                  description: A unique identifier automatically generated for each user
 *              username:
 *                  type: varchar(20)
 *                  description: A unique username set by the user
 *              email: 
 *                  type: varchar(50)
 *                  description: The users email
 *              delivery_id:
 *                  type: integer
 *                  description: An integer referencing the users address in the address table
 *              billing_id:
 *                  type: integer
 *                  description: An integer referencing the users billing address in the address table
 * tags:
 *  name: User
 *  description: The user managing api
 * /user:
 *  get:
 *      summary: Gets the user info
 *      tags: [User]
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: An object containing the user info
 *          404: 
 *              description: No user found
 *          500: 
 *              description: A server error
 *  put:
 *      summary: Updates user info
 *      tags: [User]
 *      requestBody: 
 *          required: true
 *      responses:
 *          200:
 *              description: A redirect to /user causing a get request
 *          400:
 *              description: The request failed
 *          500: 
 *              description: A server error
 */