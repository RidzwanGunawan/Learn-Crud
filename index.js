const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "err", res);
    response(200, fields, "mahasiswa list", res);
  });
});

app.get("/mahasiswa/:npm", (req, res) => {
  const npm = req.params.npm;
  const sql = `SELECT * FROM mahasiswa WHERE npm = ${npm}`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "err", res);
    response(200, fields, "mahasiswa list", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { npm, namaLengkap, prodi, kelas } = req.body;
  const sql = `INSERT INTO mahasiswa (npm, nama_lengkap, prodi, kelas) Values (${npm}, '${namaLengkap}', '${prodi}', '${kelas}')`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "err", res);
    if (fields?.affectedRows) {
      const data = {
        isSucces: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Insert data succes added", res);
    } else {
      response(404, "User Not Found", "error", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { npm, namaLengkap, prodi, kelas } = req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', prodi = '${prodi}', kelas = '${kelas}', WHERE npm = ${npm}`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "err", res);
    if (fields?.affectedRows) {
      const data = {
        isSucces: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, "Insert data succes added", res);
    } else {
      response(404, "User Not Found", "error", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { npm } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE npm = ${npm}`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "err", res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, "Delete data succes added", res);
    } else {
      response(404, "User Not Found", "error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
