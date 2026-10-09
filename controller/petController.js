const endpoints = require("express");
const router = endpoints.Router();

const pets = require("../data/pets");

// Listar pets
router.get("/", (req, res) => {
    res.send(pets);
});

// Buscar pet
router.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    const pet = pets.find(
        animal => animal.id === id
    );

    if (!pet) {
        return res.status(404).send({
            mensagem: "Pet não encontrado"
        });
    }

    res.send(pet);
});

// Cadastrar pet
router.post("/", (req, res) => {

    const novoPet = {
        id: pets.length + 1,
        ...req.body
    };

    pets.push(novoPet);

    res.status(201).send(novoPet);
});

module.exports = router;