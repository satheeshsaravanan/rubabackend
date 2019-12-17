describe('GraphQL', () => {
    let url = 'http://localhost:3000';
    let request = require('supertest')(url);
    let expectedResult = [
        {
            id: 1,
            title: 'The Complete Node.js Developer Course',
            author: 'Andrew Mead, Rob Percival',
            description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
            topic: 'Node.js',
            url: 'https://codingthesmartway.com/courses/nodejs/'
        },
        {
            id: 2,
            title: 'Node.js, Express & MongoDB Dev to Deployment',
            author: 'Brad Traversy',
            description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
            topic: 'Node.js',
            url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
        },
        {
            id: 3,
            title: 'JavaScript: Understanding The Weird Parts',
            author: 'Anthony Alicea',
            description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
            topic: 'JavaScript',
            url: 'https://codingthesmartway.com/courses/understand-javascript/'
        }
    ];

    beforeEach(()=> {
        expectedResult = [
            {
                id: 1,
                title: 'The Complete Node.js Developer Course',
                author: 'Andrew Mead, Rob Percival',
                description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
                topic: 'Node.js',
                url: 'https://codingthesmartway.com/courses/nodejs/'
            },
            {
                id: 2,
                title: 'Node.js, Express & MongoDB Dev to Deployment',
                author: 'Brad Traversy',
                description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
                topic: 'Node.js',
                url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
            },
            {
                id: 3,
                title: 'JavaScript: Understanding The Weird Parts',
                author: 'Anthony Alicea',
                description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
                topic: 'JavaScript',
                url: 'https://codingthesmartway.com/courses/understand-javascript/'
            }
        ];
    });

    afterEach(()=> {
        expectedResult = [
            {
                id: 1,
                title: 'The Complete Node.js Developer Course',
                author: 'Andrew Mead, Rob Percival',
                description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
                topic: 'Node.js',
                url: 'https://codingthesmartway.com/courses/nodejs/'
            },
            {
                id: 2,
                title: 'Node.js, Express & MongoDB Dev to Deployment',
                author: 'Brad Traversy',
                description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
                topic: 'Node.js',
                url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
            },
            {
                id: 3,
                title: 'JavaScript: Understanding The Weird Parts',
                author: 'Anthony Alicea',
                description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
                topic: 'JavaScript',
                url: 'https://codingthesmartway.com/courses/understand-javascript/'
            }
        ];
    });
    

    it('Returns all courses with expected data from response such as id, topic and author', (done) => {
        request.post('/graphql')
        .send({ query: "{courses{id, topic, author}}"})
        .expect(200)
        .end((error,response) => {

            console.log('res-----------', response.body.data.courses);
            console.log('err----------', error);
            
            expect(response.body.data.courses[0].id).toBeTruthy();
            expect(response.body.data.courses[0].topic).toBeTruthy();
            expect(response.body.data.courses[0].author).toBeTruthy();
            expect(response.body.data.courses.length).toEqual(expectedResult.length);
            
            if (error) return done(error);

            done();
        });
    });

    it('Returns all courses , should not have response such as title, description, url', (done) => {
        request.post('/graphql')
        .send({ query: "{courses{id, topic, author}}"})
        .expect(200)
        .end((error,response) => {

            console.log('res-----------', response.body.data.courses);
            console.log('err----------', error);

            expect(response.body.data.courses[0].title).toBeFalsy();
            expect(response.body.data.courses[0].description).toBeFalsy();
            expect(response.body.data.courses[0].url).toBeFalsy();
            
            if (error) return done(error);

            done();
        });
    });

    it('Returns course with id = 2', (done) => {
        request.post('/graphql')
        .send({ query: "query getSingleCourse($id: Int!){course(id: $id) { id, topic , description, title } } ", variables: { id: 2 }, operationName: "getSingleCourse" })
        .expect(200)
        .end((error,response) => {
            console.log('res-----------', response.body.data.course);
            console.log('err----------', error)

            expect(response.body.data.course.id).toBeTruthy();
            expect(response.body.data.course.topic).toBeTruthy();
            expect(response.body.data.course.description).toBeTruthy();
            expect(response.body.data.course.title).toBeTruthy();
            expect(response.body.data.course.url).toBeFalsy();

            let expectedResult = {
                id: 2,
                title: 'Node.js, Express & MongoDB Dev to Deployment',
                description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
                topic: 'RubaMockTest'
            };

            expect(response.body.data.course).toEqual(expectedResult);
            
            if (error) return done(error);

            done();
        })
    });

    it('After reset fuynction checking', () => {
        console.log(expectedResult[1]);
    });

    it('Update course with id = 2 for topic RubaMockTest', (done) => {
        let expectedResult = {
            id: 2,
            title: 'Node.js, Express & MongoDB Dev to Deployment',
            author: 'Brad Traversy',
            description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
            topic: 'RubaMockTest',
            url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
        };
        let requstBody = {
            query: "mutation updateCourseTopic($id: Int!, $topic: String!) { updateCourseTopic(id: $id, topic: $topic) { ...courseFields } } fragment courseFields on Course { id, title, author, description, topic, url } ",
            variables: { id: 2, topic: "RubaMockTest" },
            operationName: "updateCourseTopic"
        };
        request.post('/graphql')
        .send(requstBody)
        .expect(200)
        .end((error,response) => {
            console.log('res-----------', response.body.data.updateCourseTopic, expectedResult);
            console.log('err----------', error)

            expect(response.body.data.updateCourseTopic.id).toBeTruthy();
            expect(response.body.data.updateCourseTopic.title).toBeTruthy();
            expect(response.body.data.updateCourseTopic.author).toBeTruthy();
            expect(response.body.data.updateCourseTopic.description).toBeTruthy();
            expect(response.body.data.updateCourseTopic.topic).toBeTruthy();
            expect(response.body.data.updateCourseTopic.url).toBeTruthy();
            
            expect(response.body.data.updateCourseTopic).toEqual(expectedResult);
            
            if (error) return done(error);

            done();
        })
    });

});