const userServices = require('../services/user')

async function getUsers(req, res) {
    const userData = await userServices.getUsers()
    res.json("Heyy there")
}

async function handleLogin(req, res) {

    try {
        const { email, password, name, mobile } = req.body;

        if (name) {

            const user = await userServices.addNewUser({ email, password, name, mobile });
            return res.status(200).json({
                message: 'Signed Up',
                user: {
                    id: user.user_id,
                    name: user.user_name,
                    email: user.user_email,
                    mobile: user.user_mobile_no
                }
            })

        } else {
            const user = await userServices.getUserUsingEmail(email)

            if (user && user.user_email) {
                if (user.user_password === password) {
                    return res.status(200).json({
                        message: 'Login successfull',
                        user: {
                            id: user.user_id,
                            name: user.user_name,
                            email: user.user_email,
                            mobile: user.user_mobile_no
                        }
                    })
                }

                return res.status(401).json({ error: 'Invalid credentials' })
            }
        }
    } catch (error) {
        return res.json({ error: `${error.message}` })
    }

}

async function getAllLinksData(req, res) {

    try {
        const user_id = req.headers.user_id

        const response = await userServices.getAllLinksData(user_id);

        if (response) {
            return res.status(200).json({
                message: 'Data fetched successfully',
                links: response
            })
        } else {
            return res.status(404).json({
                error: 'Data not found'
            })
        }
    } catch (error) {
        return res.json({
            error: 'Database error'
        })
    }

}

function generateShortCode(length = 8) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shortCode = ""
    for (let i = 0; i < length; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return shortCode;
}

async function createNewURL(req, res) {
    try {
        const { url, alias } = req.body
        const user_id = req.headers.user_id
        let shortCode
        if (!alias) {
            shortCode = generateShortCode();
        } else {
            shortCode = alias;
        }

        const response = await userServices.createNewURL(user_id, url, shortCode, alias)
        if (response) {
            return res.status(200).json({
                message: "Url added successfully",
                link: response
            })
        } else {
            return res.status(500).json({
                error: "Database error"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: "Database error"
        })
    }

}

async function redirectToUrl(req, res) {
    try {

        const shortCode = req.params.shortcode;
        const result = await userServices.getOriginalUrl(shortCode)
        
        if (result && result.original_url && result?.status === "active") {
            
            await userServices.incrementClicks(shortCode);
            const url = result.original_url.startsWith('http://') || result.original_url.startsWith('https://')
            ? result.original_url
            : `https://${result.original_url}`;
            
            return res.redirect(url);
        } else if (result?.status === "in-active") {
            return res.status(400).json({
                error: "The link you want to redirect is in-active"
            })
        } else {
            return res.status(404).json({
                error: "URL not found"
            })
        }
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            error: "Database error"
        })
    }
}

async function deleteUrl(req, res) {
    try {

        const url_id = req.params.id;

        if (url_id) {
            const response = await userServices.deleteUrl(url_id);
            return res.status(200).json({
                message: "Deleted successfully"
            })
        } else {
            return res.status(404).json({
                error: "Url id not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: "Database error"
        })
    }
}

async function changeStatus(req, res) {
    try {
        const url_id = req.params.id;
        if(url_id) {
            const response = await userServices.changeStatus(url_id);
            if(response) {
                return res.status(200).json({
                    message: "Updated successfully"
                })
            } else {
                return res.status(500).json({
                    message: "Database error"
                })
            }
        } else {
            return res.status(404).json({
                error: "Url id not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `DB error ${error.message}`
        })
    }
}

async function updateUrl(req, res) {
    try {
        const id = req.params.id
        const {newUrl, customAlias} = req.body

        const updatedUrl = await userServices.updateUrl({id, newUrl, customAlias})
        if(updatedUrl) {
            return res.status(200).json({
                message: "Updated successfully",
                link: updatedUrl
            })
        } else {
            return res.status(500).json({
                error: "DB error"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: `DB error: ${error.message}`
        })
    }
}

module.exports = {
    getUsers,
    handleLogin,
    getAllLinksData,
    createNewURL,
    redirectToUrl,
    deleteUrl,
    changeStatus,
    updateUrl
}
