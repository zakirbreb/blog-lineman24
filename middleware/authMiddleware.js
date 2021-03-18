const User = require('../models/User')

exports.bindeUserWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next()
        }

        try {
            let user = await User.findById(req.session.user._id)
            req.user = user
            next()
        } catch (e) {
            console.log(e);
            next(e)
        }
    }
}

exports.isAuthenticated = (req, res, next) => {

    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login')
    }
    next();
}

exports.isUnAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/dashboard')
    }
    next();
}

exports.isAdmin =  (req, res, next) => {
    
        const  email  = req.user.email
        const admin = 'test@test.com'
        const devloper = 'ariful4082@gmail.com'
        console.log(email, admin);
        if(email === devloper){
            next()

        } else if (email === admin ) {
            next()

        } else {
            req.flash('fail', 'Only admin can create post')
            res.redirect('/')
        }

        
    
}