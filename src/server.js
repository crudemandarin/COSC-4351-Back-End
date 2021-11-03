/* Program Entrypoint */

const PORT = 3000;
const LAMBDA = !!process.env.LAMBDA_TASK_ROOT;

const app = require('./app');

if (LAMBDA) {
    const serverlessExpress = require('@vendia/serverless-express');
    const server = serverlessExpress.createServer(app);
    module.exports.handler = (event, context) => serverlessExpress.proxy(server, event, context);
} else {
    app.listen(PORT, () => {
        console.log('\n-- CougarCS API is NOT running on AWS Lambda');
        console.log(`-- CougarCS API is listening at http://localhost:${PORT}`);
    });
}