const express = require('express');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');

const app = express();
const port = 6000;

app.get('/api/hello', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || requestIp.getClientIp(req)|| '8.8.8.8';
    const visitorName = req.query.visitor_name || 'Guest';

    const geo = geoip.lookup(clientIp);
    let location = 'Unknown';
    if (geo) {
        location = `${geo.city}, ${geo.region}, ${geo.country}`;
    }

    const jsonResponse = {
        client_ip: clientIp,
        location: location,
        greeting: `Hello, ${visitorName}!`
    };

    res.json(jsonResponse);
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});