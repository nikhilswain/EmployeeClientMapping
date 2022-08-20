# EmployeeClient Mapping

This is a backend system where employee and clients and a mapping system between them.

Things that this backend offers:

1. Employee CRUD
2. Client CRUD
3. Employee Timesheet
4. Mapping between Employee and Client

## Technologies used

Database used for this project : **Mysql**  
Backend language : **Nodejs**  
ORM: **Sequelize**

#### Sequelize?

_(without any effort, copying from docs...)_

> Sequelize is a modern TypeScript and Node.js ORM for Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.

Lear more about Sequelize from docs:

[Documentation](https://sequelize.org/)

## 1. Employee CRUD

Employee crud means basic create, read, update and delete process.

**API:** `/api/employees/`

### Routes of Employee CRUD:

```js
// Create a new employee
router.post("/", employees.create);

// Retrieve all employees
router.get("/", employees.findAll);

// Retrieve all employees who're active
router.get("/active", employees.findAllActive);

// Retrieve all employees who're inactive
router.get("/inactive", employees.findAllInactive);

// Retrieve a single employee with id
router.get("/:id", employees.findOne);

// Update a employee with id
router.put("/:id", employees.update);

// Delete a employee with id
router.delete("/:id", employees.delete);

// Delete all employees
router.delete("/", employees.deleteAll);

// find all working hours of a employee
router.get("/timesheet/:id", employees.timesheet);
```

## 2. Client CRUD

Same as employee crud, all operations of crud for client.

**API:** `/api/clients/`

### Routes of Client CRUD:

```javascript
// Create a new Client
router.post("/", clients.create);

// Retrieve all clients
router.get("/", clients.findAll);

// Retrieve all clients who're active
router.get("/active", clients.findAllActive);

// Retrieve all clients who're inactive
router.get("/inactive", clients.findAllInactive);

// Retrieve a single Client with id
router.get("/:id", clients.findOne);

// Retrieve a single client with clientId
router.get("/clientId/:clientId", clients.findbyClientId);

// Update a client with id
router.put("/:id", clients.update);

// Delete a client with id
router.delete("/:id", clients.delete);

// Delete all clients
router.delete("/", clients.deleteAll);
```

## 3. Employee Timesheet

Employee timesheet is a record of employee working hours for each day of week. Employee can edit their working hours of any day.

**API:** `/api/timesheet/`

### Routes of Timesheet

```javascript
// route to create timesheet
// @ employee id ( id of the table(primary key) not the employeeId) will be filled in this as a foriegn key
router.post("/", Timesheet.create);

// Retrieve all Timesheet
router.get("/", Timesheet.findAll);

// route to find timesheet of a particular week
// @API http://localhost:3000/api/timesheet/week?year=2022&month=august&week=1
router.get("/week", Timesheet.findAllByWeek);

// route to get all weeks of a employee
// @ done with employee id as parameter
router.get("/employee/:id", Timesheet.getEmployeeTimesheet);

// update timesheet by a pariticular id
router.put("/:id", Timesheet.update);

// Delete a particular id
router.delete("/:id", Timesheet.delete);
```

## 4. Mapping b/w employee and client

Here mapping refers to the association b/w the employee and client. Each employee can be associated with any no. of clients and each client can be under more than one employee.

**API:** `/api/map/`

Think of it as:

- Clients working under a Employee
- A single client can have mutliple employee (employee list for client that they may have associated with any previously)

### Routes of Mapping

```javascript
// api/map?empId=employeeId&clientIds=client1Id%20client2Id
router.get("/", mapping.mapClients);

// get all clients assocaited with a single employee,
router.get("/clients", mapping.findAllClients);
```

# Relations between tables

| Table Name              | Relation     |
| ----------------------- | ------------ |
| employees and clients   | many to many |
| employees and timesheet | one to many  |

# Getting Started

## Setup

After cloning this repo, install all the packages by running command:

`npm install` or `npm i`

Once all the packages are installed, configure mysql.

go to `configure>db.config.js` and replace everything with your mysql credentials and database name.

```javascript
module.exports = {
  HOST: "127.0.0.1", // your host
  USER: "root", // your mysql username
  PASSWORD: "zerotwo", // your mysql password
  DB: "zerotwo", // your mysql database name
  // PORT: 8080,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
```

**Note:** in `dialect` instead of mysql you can use any database (for example: Postgres) that Sequelize supports. You may also need to uncomment `PORT` if you're using xampp,lampp,wampp and set the port number of your development port number (for example: 8080).

## Run

If everything looks good, then it's time to run the application. Run the application by using command:

`npm run dev`

This will run the application using **_nodemon_**  
without nodemon: `npm start`

If you had done the configuration correctly, you will see _"synced db"_ in console. If not, then you've messed up something in configurations.

**Note:** For production you may need to drop all the tables in the database. You can do it by passing `{force: true}` in the **_sync_** method.

#### For local development

```javascript
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
```

#### For production

```javascript
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
```
