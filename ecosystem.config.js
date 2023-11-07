module.exports = {
    deploy: {
        qa: {
            user: 'usrapli',
            host: 'novafianza_backend_qa',
            ref: 'origin/qa',
            repo: 'https://github.com/jesidpolo04/backend_novafianza',
            path: '/var/novafianza/backend',
            'post-deploy': 'npm install && npm run build && cp .env build/.env && cd build && npm ci && pm2 restart backend',
        },
        
        production: {
            user: 'usrapli',
            host: 'novafianza_backend_qa',
            ref: 'origin/qa',
            repo: 'https://github.com/jesidpolo04/backend_novafianza',
            path: '/var/novafianza/backend',
            'post-deploy': 'npm install && npm run build && cp .env build/.env && cd build && npm ci && pm2 restart backend',
        }
    }
};