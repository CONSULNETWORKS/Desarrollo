const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No se ha recibido un token!"
    });
  }
  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Sin Autorización!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "administrador") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "No tienes permisos para acceder a esta pagina!"
      });
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderador") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "No tienes permisos de Moderador!"
      });
    });
  });
};

isAdminCNW = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "administrador-CNW") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "No tienes permisos de Administrador CNW!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderador") {
          next();
          return;
        }
        if (roles[i].name === "administrador") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Requiere permisos de Moderador o Administrador!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isAdminCNW: isAdminCNW,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
