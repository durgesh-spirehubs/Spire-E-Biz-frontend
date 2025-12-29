module.exports = {
    apps: [
        {
            name: 'ebiz-client.devshs.com',
            script: './node_modules/.bin/next',
            args: 'start',
            env: {
                NODE_ENV: 'development',
                PORT: 4051    
            }
        }
    ]
};
