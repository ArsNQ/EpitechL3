function checkAuthenticationAdmin(req,res,next) {
    if (req.user.role === 'admin')
        next ();
    else
        res.status(401).json();
}

module.exports = {checkAuthenticationAdmin};