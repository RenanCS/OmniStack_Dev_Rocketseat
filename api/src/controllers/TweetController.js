const Tweet = require('../models/Tweet');


module.exports ={

    
    //Get tweets desc createdAt
    async index(req, res) {
        const tweet = await Tweet.find({}).sort('-createdAt');
        return res.json(tweet);
    },

    //Save and send broadcast new tweet
    async store(req, res){
        const tweet = await Tweet.create(req.body);
        req.io.emit('tweet', tweet);
        return res.json(tweet);
    }
    
}