const notFoundHandler = (req, res) => {
    res.status(404);
    res.json({ "404": "No existe la página" });
}

module.exports = notFoundHandler;