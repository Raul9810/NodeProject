const db = require('../config/database');
const express = require('express');
const employee = express.Router();

employee.get("/", (req, res) => {
    db.query("SELECT * FROM employee").then(rows => {
        res.status(200);
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal");
    });
});

employee.post("/", (req, res) => {
    console.log(req)
    query = "INSERT INTO employee (name, last_name, phone_number, email, address) ";
    query += `VALUES ('${req.body.name}', '${req.body.last_name}', '${req.body.phone_number}', '${req.body.email}', '${req.body.address}')`;
    console.log(query)
    db.query(query).then(rows => {
        if(rows.affectedRows > 0) {
            res.status(201);
            res.send("Empleado añadido con éxito");
        }
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió un error al añadir el empleado");
    });
});

employee.delete("/:name([A-Za-z]+)", (req, res) => {
    query = `DELETE FROM employee WHERE name='${req.params.name}'`;
    db.query(query).then(rows => {
        res.status(404);
        console.log("rows");
        res.send("Empleado eliminado correctamente");
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Algo ocurrió mal");
    });
});

employee.put("/:name([A-Za-z]+)", (req, res) => {
    const columns = Object.keys(req.body.data)
    const values = Object.values(req.body.data)
    query = "UPDATE employee SET ";
    for(let i = 0; i < columns.length; i++){
        query += `${columns[i]} = `;
        query += isNaN(values[i]) ? `'${values[i]}'` : `${values[i]}`;
        if(i + 1 < columns.length){
            query += ", ";
        }
        else{
            query += " ";
        }
    }
    query += `WHERE name = '${req.params.name}'`;
    db.query(query).then(rows =>{
        res.status(200)
        res.send(rows)
    }).catch(err =>{
        console.log(err)
        res.status(500)
        res.send("Algo salio mal")
    })
});

employee.get('/:name([A-Za-z]+)', (req, res) => {
    const name = req.params.name;
    const query = "SELECT * FROM employee WHERE name = '" + name + "'";
    db.query(query).then(rows => {
        if (rows.length > 0) {
            res.status(200);
            res.json(rows);
        }
        else {
            res.status(404);
            res.send("No se encontró el empleado");
        }
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Algo salió mal");
    });
})


module.exports = employee;