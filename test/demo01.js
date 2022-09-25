//const { expect, assert } = require('chai')
const chai = require('chai')
assert = chai.assert
expect = chai.expect
should = chai.should()

const axios = require('axios').default;
const https = require('https');

describe('String ', function(){

    before(function(){
        //Runs once before the first test in this block
        console.log('before hook');
    });

    after(function(){
        //Runs once after the last test in this block
        console.log('after hook');
    });

    beforeEach(function(){
        //Runs once before each test in this block
        console.log('beforeEach hook');
    });

    afterEach(function(){
        //Runs after each test in this block
        console.log('afterEach hook');
    });

    this.beforeAll(function(){
        //Runs ????
        console.log('beforeAll hook');
    });

    this.afterAll(function(){
        //Runs ????
        console.log('afterAll hook');
    });

    it('1- test axios - APPROACH 1', async () => {
        console.log('Axios APPROACH 1 !!');

        axios.get('https://www.google.com').then(resp => {
            console.log('Axios APPROACH 1 - ON 200 SHOULD PRINT THIS');// NOT PRINTING THIS?
            console.log(resp.status);
           // console.log(resp.data);
        })

    })

    it('2- test axios - APPROACH 2', async () => {
        console.log('Axios APPROACH 2 !!');

        const instance = axios.create({
            baseURL: 'https://www.google.com',
            timeout: 5000,
            headers: {
                Accept: 'application/json',
                Cookie: 'token=instance'
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            })
        })

        const createResponse = await instance.get('/search?q=cuevana')
        console.log(createResponse.status);
        //console.log(createResponse.data);

    })

    it('3- test axios - Reusable Defaults', async () => {
        console.log('Axios Reusable Defaults!!');
        axios.defaults.headers.common['Cookie'] = 'token=1231231-123123-1231231'
        
        const response = await axios.get('https://www.google.com')

        console.log('Axios - Reusable Defaults - OUTISDE');
        console.log(response.status);
        //console.log(response.data);
    })

    it('4- test axios - THEN used - so cannot extract from constant - will give TypeError:Cannot read property status of undefined', async () => {
        console.log('Axios - THEN used!!');
        axios.defaults.headers.common['Cookie'] = 'token=1231231-123123-1231231'
        
        const response = await axios.get('https://www.google.com')
        .then(resp => {
            console.log('Axios - THEN used - ON 200 SHOULD PRINT THIS');// NOT PRINTING THIS?
            console.log(resp.status);
            //console.log(resp.data);
        })

        //console.log('Axios - THEN used - OUTISDE');
        //console.log(response.status);
        //console.log(response.data);
    })

    it('5- test axios - THEN NOT used - so CAN extract from constant', async () => {
        console.log('Axios - THEN NOT used!!');
        axios.defaults.headers.common['Cookie'] = 'token=1231231-123123-1231231'
        
        const response = await axios.get('https://www.google.com')
        // .then(resp => {
        //     console.log('Axios - THEN NOT used - ON 200 SHOULD PRINT THIS');// NOT PRINTING THIS?
        //     console.log(resp.status);
        //     //console.log(resp.data);
        // })

        console.log('Axios - THEN NOT used - OUTISDE');
        console.log(response.status);
        //console.log(response.data);
    })

    it('6- test axios - DEBUGGIN V1', async function(){
        console.log('Axios DEBUGGIN V1 !!');
        //axios.defaults.baseURL = 'https://api.themoviedb.org';
        
        const res = await axios.get('https://swapi.dev/api/planets/3') //WILL PASS
            //const res = await axios.get('https://swapi.dev/api/planets/3000010') //WITH ERROR  

        .catch (function (error) {
            if (error.response) {
                console.log('Inside error.response ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                console.log(error.response);
            } else if(error.request) {
                console.log('error.request ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                console.log(error.request);
            } else{
                console.log('error.else ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                console.log(error.message);
            }
            console.log('error.config ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log(error.config);
        });

        //NOTE THIS COULD ALSO BEE INSIDE THE 'THEN'
        console.log("TRY SUCCESS FULL====================================================");
        //console.log(res);

        console.log("TRY SUCCESS SMALL====================================================");
        console.log(res.status); 
        console.log(res.data);   

    })

    //NOTE TRY-CATCH IS DISCARDED VS THE V1 (THEN-CATCH)
    it('7- test axios - DEBUGGIN V2', async function(){
        console.log('Axios DEBUGGIN V2 !!');
        //axios.defaults.baseURL = 'https://api.themoviedb.org';
        try {
            const res = await axios.get('https://swapi.dev/api/planets/3'); //WILL PASS
            //const res = await axios.get('https://swapi.dev/api/planets/3000010'); //WITH ERROR

            console.log("TRY SUCCESS FULL====================================================");
            //console.log(res);
    
            console.log("TRY SUCCESS SMALL====================================================");
            console.log(res.status); 
            console.log(res.data);  

        } catch (error) {
            console.log("INSIDE ERROR ====================================================");
            //console.log(error);
            console.log(error.response.status);

            if (error.response) {
                console.log('Inside error.response ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                console.log(error.response);
            } else if(error.request) {
                console.log('error.request ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                console.log(error.request);
            } else{
                console.log('error.else ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                console.log(error.message);
            }
            console.log('error.config ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log(error.config);
        }

    })

})

