const express = require("express");
const router = express.Router();
//  retorna jogadores
router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "usando GET dentro da rota de jogadores",
  });
});

// retorna os dados de um jogador
// router.post("/", (req, res, next) => {
//   res.status(201).send({
//     message: "usando POST dentro da rota de jogadores",
//   });
// });

router.post("/", (req, res, next) => {
  const payload = {
    name: req.body.name,
    age: req.body.age,
  };
  res.status(201).send({
    message: "jogador criado com sucesso",
    payload,
  });
});

// pretorna
router.get("/:player_id", (req, res, next) => {
  const { player_id } = req.params;
  res.status(200).send({
    message: "Usando o get de um usuário exclusivo",
    player_id,
  });
});

router.patch("/", (req, res, next) => {
  const id = req.params.player_id;
  res.status(200).send({
    message: "Usando o PATCH de um usuário exclusivo",
  });
});

router.delete("/", (req, res, next) => {
  const id = req.params.player_id;
  res.status(200).send({
    message: "Usando o DELETE de um usuário exclusivo",
  });
});

module.exports = router;
