import { coursesData } from './courseData';
export class CourseHandler {
    public getCourses (args: any) {
        let courseDataDestructing = coursesData;
        if (args.topic) {
            var topic = args.topic;
            return Promise.resolve(courseDataDestructing.filter(course => course.topic === topic));
        } else {
            return Promise.resolve(courseDataDestructing);
        }
    }

    public getCourseById(args: any) {
        let courseDataDestructing = coursesData;
        if(args.id) {
            var id = args.id;
             let findIndex = courseDataDestructing.findIndex(course => {
                return course.id == id;
            });
            console.log('getCorseById', findIndex);
            return Promise.resolve(courseDataDestructing.filter(course => {
                return course.id == id;
            })[0]);
        } else {
            return courseDataDestructing
        }
    }

     public updateCourseById (id: any, topic: any) {
        let courseDataDestructing = coursesData;
         console.log('', id, topic);
         courseDataDestructing.map(course => {
            if (course.id === id) {
                course.topic = topic;
                return course;
            }
        });
        return Promise.resolve(courseDataDestructing.filter(course => course.id === id) [0]);
    }

    public createNewCourseData (title: any, author:string, description: string, topic: string, url: string) {
        let courseDataDestructing = coursesData;
         let newCourseData = {
             id: courseDataDestructing.length + 1,
             title: title,
             author: author,
             description: description,
             topic: topic,
             url: url
         }
         courseDataDestructing.push(newCourseData);

        return Promise.resolve(courseDataDestructing);
    }
}