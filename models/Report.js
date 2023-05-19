module.exports = class Reprt {
    constructor(id, type, title, content, issuedate){
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.issuedate = issuedate;
    }

    getId(){return this.id}
    getType(){return this.type}
    getTitle(){return this.title}
    getContent(){return this.content}
    getIssueDate(){return this.issuedate}

    setId(id){this.id = id}
    setType(type){this.type = type}
    setTitle(title){this.title = title}
    setContent(content){this.content = content}
    setIssueDate(issuedate){this.issuedate = issuedate}


}