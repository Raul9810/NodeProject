const db = require('../config/database');
const express = require('express');
const employee = express.Router();

// pokemon.get("/", (req, res) => {
//     db.query("SELECT * FROM pokemon").then(rows => {
//         res.status(200);
//         res.json(rows);
//     }).catch(err => {
//         console.log(err);
//         res.status(500);
//         res.send("Ocurrió algo mal");
//     });
// });

employee.post("/", (req, res) => {
    query = "INSERT INTO employee (name, last_name, phone_number, email, address) ";
    query += `VALUES ('${req.body.name}', ${req.body.last_name}, ${req.body.phone_number}, ${req.body.email}, ${req.body.adress})`;
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

employee.delete("/:/id/([0 9]{1, 3})", (req, res) => {
    query = `DELETE FROM company WHERE employee_id=${req.params.id}`;
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

employee.put("/:id([0-9]{1,3})", (req, res) => {
    const columns = Object.keys(req.body)
    const values = Object.values(req.body)
    query = "UPDATE company SET";
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
    query += `WHERE employee_id = ${req.params.id}`;
    res.send(query);
});

employee.get("/:id([0-9]{1,3})", (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM company WHERE employee_id=${id}`;
    db.query(query).then(rows => {
        if (rows.length > 0) {
            res.status(200);
            res.json(rows);
        }
        res.status(404);
        res.send("No se encontró al empleado");
    }).catch(err => {
        console.log(err); 
        res.status(500);
        res.send("Ocurrió algo mal");
    });
});

module.exports = employee;