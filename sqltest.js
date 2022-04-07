const { Connection, Request } = require("tedious");

// Create request to database
const config = {
  authentication: {
    options: {
      userName: "elton_upepo@baharidbsvr.database.windows.net", // update me
      password: "3lt0n@321*" // update me
    },
    type: "default"
  },
  server:"baharidbsvr.database.windows.net", // update me
  options: {
    database: "BahariDB2", //update me
    encrypt: true
  }
};

/* 
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        authentication: {
            type: 'azure-active-directory-msi-vm',
        },
        options: {
            database: process.env["db_database"],
            encrypt: true,
            port: 1433
        }
    };

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        authentication: {
            type: 'azure-active-directory-msi-app-service',
        },
        options: {
            database: process.env["db_database"],
            encrypt: true,
            port: 1433
        }
    });

*/

const request = new Connection(config);

// Attempt to connect and execute queries if request goes through
request.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

request.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT * from Meters`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  request.execSql(request);
}