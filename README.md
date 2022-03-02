## Application using Next.js, Prisma, and GraphQL

### How to start the application
`npm run dev`\
*This will launch the application to port :3000*

### How to interact with Prisma
`npx prisma studio`\
*This will launch another window with a connection to the database*

### How to interact with GraphQL
enter the url: `localhost:3000/api/graphql`

**Example queries**
```graphql
mutation CreateUser($data: createUserInput!) {
  createUser(data: $data) {
    id
  }
}
```
data:
```json
{
  "data": {
    "username": "jloesch30",
    "password": "test",
    "email": "jloesch30@gmail.com",
    "fname": "josh",
    "lname": "loesch",
    "role": "ADMIN",
    "tempVerifyCode": "TEST"
  }
}
```
