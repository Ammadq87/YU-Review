import CourseModel from './CourseModel.js';


export default class User {
    studentId;
    name;
    email;
    bio;
    major;
    courseList;
    

    constructor(id, n, e, b, m) {
        const [studentId, name, email, bio, major] = [id, n, e, b, m];
        this.courseList = [];
    }

    
}