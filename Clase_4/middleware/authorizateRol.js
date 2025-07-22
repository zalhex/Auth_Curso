const authorizateRole = (requiredRol) => {
    return (req, res, next) => {
        if(!req.user || req.user.rol !== requiredRol){
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
};

module.exports = { authorizateRole };