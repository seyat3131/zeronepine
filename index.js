const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            isLoggedIn: true,
            isAdmin: req.user.isAdmin,
            displayName: req.user.displayName,
            email: req.user.email,
        });
    } else {
        res.json({ isLoggedIn: false });
    }
});
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
module.exports = router;
