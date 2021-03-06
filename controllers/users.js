const User = require('../models/user');
const passport = require('passport');


module.exports.registerForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, err => {
            if (err)
                return next(err);
            else {
                req.flash('success', 'Welcome To YelpCamp');
                res.redirect('/campgrounds');
            }
        });

    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }

}

module.exports.loginForm = (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome Back!!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);

}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Good Bye!!');
    res.redirect('/campgrounds');
}