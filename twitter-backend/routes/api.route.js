const router = require('express').Router();
const Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

router.get('/user', async(req, res, next) => {
    try {
        const user_name = req.query.username
        const data = await client.get('statuses/user_timeline.json', {
            screen_name: user_name,
            count: 10
        })
        res.send(data);
    } catch (error) {
        res.send({ 'message': 'fail' })
    }

});

module.exports = router;