const  request = require('request')
const queryString = require('query-string')

request.post({
    url: 'https://api.twitter.com/oauth/request_token',
    oauth: {
        consumer_key: "Rr5pY03N3mbFOjnP4XXLd1EMH",
        consumer_secret:"zWTeeKcUsUORg6BF72gujrL35QJRGVLN1t7IekSfyPc9Lr48hv"
    }
}, function (err, r, response) {
    if (err) {
        console.log(err)
    }
    console.log(response)
    const parsedRes = queryString.parse(response);
    console.log(parsedRes)
});