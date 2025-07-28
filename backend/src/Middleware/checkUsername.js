import {client } from '../Config/RedisCache.js'
async function getUsername(req, res, next) {
    const userid = req.params.userid;
    if (!userid) {
        return res.status(400).json({
            message: "no username entered"
        })
    }

    const response =  await client.get(`${userid}`);

    if (!response) {
      res.status(400).json({
        message : "incorrect userid"
      })
    }else{
        next();
    }
}

export default getUsername;


