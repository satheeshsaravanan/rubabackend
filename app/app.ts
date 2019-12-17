    var fs = require("fs");
    var jwt = require('jsonwebtoken');
    var path = require("path");
    import express = require('express');
    import cors from 'cors';
    var express_graphql = require('express-graphql');
    var { buildSchema } = require('graphql');
    import { CourseHandler } from './coursehandler';
    import { coursesData } from './courseData';
    import { schema as appSchema } from './schema';
    var bodyParser= require('body-parser')
    var multer = require('multer');
    const app = express();

    var schema = buildSchema(appSchema);

    const getCourses = async (args: any) => {
        let courseHandler = new CourseHandler();
        return await courseHandler.getCourses(args);
    } 

    const getCourse = async (args: any) => {
        let courseHandler = new CourseHandler();
        return await courseHandler.getCourseById(args);
    }

    const updateCourseTopic = async ({id, topic} : { id: number, topic: string}) => {
        let courseHandler = new CourseHandler();
        return await courseHandler.updateCourseById(id, topic);
    }

    const createNewCourse = async ( {title, author, description, topic, url} : {title: string, author:string, description: string, topic: string, url: string}) => {
        console.log('#app', topic, author);
        let courseHandler = new CourseHandler();
        return await courseHandler.createNewCourseData(title, author, description, topic, url);
    }

    var root = {
        course: getCourse,
        courses: getCourses,
        updateCourseTopic: updateCourseTopic,
        createNewCourse: createNewCourse
    };

    app.use('/graphql', express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));

    // app.use(bodyParser.urlencoded({extended: true}));
   

    // var upload = multer({ dest: '/tmp/'});

    // app.post('/file_upload', upload.single('file'), function(req: any, res: any) {
    //     console.log('req.file.filename', req.file.originalname);
    //     var file = __dirname + '/' + req.file.filename;
    //     fs.rename(req.file.path, file, function(err: Error) {
    //     if (err) {
    //         console.log(err);
    //         res.send(500);
    //     } else {
    //         res.json({
    //             message: 'File uploaded successfully',
    //             filename: req.file.originalname
    //         });
    //     }
    //     });
    // });

    // // let's first add a /secret api endpoint that we will be protecting
    // app.get('/secret', isAuthorized, (req, res) => {
    //     res.json({ "message" : "THIS IS SUPER SECRET, DO NOT SHARE!" })
    // })

    // // and a /readme endpoint which will be open for the world to see 
    // app.get('/readme', (req, res) => {
    //     res.json({ "message" : "This is open to the world!" })
    // });


    // function isAuthorized(req: any, res: any, next: any) {
    //     if (typeof req.headers.authorization !== "undefined") {
    //         // retrieve the authorization header and parse out the
    //         // JWT using the split function
    //         console.log( 'req.headers.authorization',  req.headers.authorization);
    //         let token = req.headers.authorization.split(" ")[1];
    //         console.log('token---------', token);
    //         let privateKey = fs.readFileSync('./private.pem', 'utf8');
    //         console.log('private Key', privateKey);
    //         // Here we validate that the JSON Web Token is valid and has been 
    //         // created using the same private pass phrase
    //         jwt.verify(token, privateKey, { algorithm: "HS256" }, (err: Error, user: any) => {
                
    //             // if there has been an error...
    //             if (err) {  
    //                 // shut them out!
    //                 res.status(500).json({ error: "Not Authorized" });
    //                 throw new Error("Not Authorized");
    //             }
    //             // if the JWT is valid, allow them to hit
    //             // the intended endpoint
    //             return next();
    //         });
    //     } else {
    //         // No authorization header exists on the incoming
    //         // request, return not authorized and throw a new error 
    //         res.status(500).json({ error: "Not Authorized" });
    //         throw new Error("Not Authorized");
    //     }
    // }

    // app.get('/jwt', (req, res) => {
    //     let privateKey = fs.readFileSync('./private.pem', 'utf8');
    //     console.log('privateKey', privateKey);
    //     let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", { algorithm: 'HS256'});
    //     res.send(token);
    // })

    app.listen(3000, function () {
        console.log('GraphQL is connected');
    });