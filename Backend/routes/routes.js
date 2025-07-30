const userController = require('../controller/user_controller');
const express = require('express')
const router = express.Router();

router.get('/', userController.getUsers);

router.post('/login', userController.handleLogin)

router.get('/all-links-data', userController.getAllLinksData)

router.post('/create-new-url', userController.createNewURL)

router.get('/:shortcode', userController.redirectToUrl)

router.delete('/url/:id', userController.deleteUrl)

router.post('/change-url-status/:id', userController.changeStatus)

router.put('/update-url/:id', userController.updateUrl)

module.exports = router


/*
    Next Steps:
                             /
    1. set up Links tab,   \/                              /
    2. Make the analytics cards on the dashboard dynamic \/

    3. Make sure all the functionalities from the links tab work.
    4. Add tooltips wherever necessary
    5. Set up analytics tab
    
*/