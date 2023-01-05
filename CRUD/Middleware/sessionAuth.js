function sessionAuth ( req , res , next ){
res.locals.User = req.session.User;
next();

};
module.exports = sessionAuth;