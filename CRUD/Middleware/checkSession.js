function checkSession ( req , res , next ){
   if (req.session.User) next();
   else return res.redirect("/login");

};
module.exports = checkSession;