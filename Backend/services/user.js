const e = require('express')
const db = require('../config/db')

function getUsers () {
    const res = db.execute("SELECT * FROM users")
    return res
}

async function getUserUsingEmail (email) {
    const res = await db.execute(`SELECT * FROM users WHERE user_email = "${email}"`)
    return res[0][0];
}

async function addNewUser ({name, email, password, mobile}) {
    try {
        await db.execute(`INSERT INTO users (user_email, user_name, user_password, user_mobile_no) VALUES ("${email}", "${name}", "${password}", ${mobile})`)
        const res = await db.execute(`SELECT * FROM users WHERE user_email = "${email}"`)
        return res[0][0];      
    } catch (error) {
        console.error("DB Error: ", error);
        return null;
    }
}

async function createNewURL(user_id, url, shortCode, alias = null) {
    try {
        if(alias) {
            await db.execute(`INSERT INTO short_urls (user_id, original_url, short_code, custom_alias, status) VALUES (${user_id}, "${url}", "${shortCode}", "${alias}", "active")`)
        } else {
            await db.execute(`INSERT INTO short_urls (user_id, original_url, short_code, status) VALUES (${user_id}, "${url}", "${shortCode}", "active")`)
        }
        const [res] = await db.execute(`SELECT * FROM short_urls WHERE short_code="${shortCode}"`)
        return res[0];
    } catch (error) {
        console.error("DB error: ", error.message);
        return null
    }    
}

async function getAllLinksData(user_id) {
    try {
        if(user_id) {
            const [res] = await db.execute(`SELECT * FROM short_urls WHERE user_id = ${user_id}`)
            return res;
        } else {
            console.error("User id not given")
            return null
        }
    } catch (error) {
        console.error("DB error: ", error.message)
        return null
    }
}

async function getOriginalUrl(shortCode) {
    try {
        const [rows] = await db.execute(
            `SELECT * FROM short_urls WHERE short_code = ?`,
            [shortCode]
        );

        if (rows.length > 0) {
            return rows[0]; // return single object
        } else {
            return null;
        }
    } catch (error) {
        console.error("DB error: ", error.message);
    }
}

async function deleteUrl(id) {
    try {
        await db.execute(`DELETE FROM short_urls WHERE url_id = ${id}`)
        return
    } catch (error) {
        console.error("DB error: ", error.message)
    }
}

async function incrementClicks(short_code) {
    try {
        await db.execute(`UPDATE short_urls SET click_count = click_count + 1 WHERE short_code = ?`, [short_code])
        return 
    } catch (error) {
        console.error("DB error: ", error.message)
    }
}

async function changeStatus(id) {
    try {
        const [url] = await db.execute(`SELECT status FROM short_urls WHERE url_id = ?`, [id]);
        if(url[0].status === "active") {
            await db.execute(`UPDATE short_urls SET status = "in-active" WHERE url_id = ?`, [id]);
            return 1
        } else if (url[0].status === "in-active") {
            await db.execute(`UPDATE short_urls SET status = "active" WHERE url_id = ?`, [id]);
            return 1
        } else {
            console.log("error")
            return null
        }
    } catch (error) {
        console.error("DB error: ", error.message)
    }
}

async function updateUrl(linkData) {
    try {
        const {id, newUrl, customAlias} = linkData;
        let data;

        if(!newUrl || !id) {
            return "Missing data";
        }

        if(id && newUrl && customAlias) {
            await db.execute(`UPDATE short_urls SET original_url = "${newUrl}", custom_alias = "${customAlias}" WHERE url_id = ${id}`)
        } else if (id && newUrl) {
            await db.execute(`UPDATE short_urls SET original_url = "${newUrl}" WHERE url_id = ${id}`)
        }

        [data] = await db.execute(`SELECT * FROM short_urls WHERE url_id = ${id}`)

        return data[0];
    } catch (error) {
        console.error("DB error- ", error.message)
    }
}

module.exports = {
    getUsers,
    getUserUsingEmail,
    addNewUser,
    createNewURL,
    getAllLinksData,
    getOriginalUrl,
    deleteUrl,
    incrementClicks,
    changeStatus,
    updateUrl
}