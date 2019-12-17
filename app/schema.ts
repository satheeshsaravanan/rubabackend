export const schema = ` 
type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
},
type Mutation {
    updateCourseTopic(id: Int!, topic: String!): Course,
    createNewCourse(title: String!, author:String!, description: String!, topic: String!, url: String!): [Course]
}
type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
}
`;

export interface Course {
    id: number,
    title: String
    author: String
    description: String
    topic: String
    url: String
}
