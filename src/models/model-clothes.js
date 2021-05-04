'use strict';

class Clothes {
    constructor(name) {
        this.dbName = name;
        this.id = 0;
        this.data = [];
    }
    create(content) {
        this.id++;
        this.data.push({
            id: this.id,
            content: {...content}
        })
        return this.data;
    }
    get(id) {
        if (this.data.length > 0) {

            if (id) {
                for (let elem of this.data) {
                    if (elem.id === id) {
                        return elem;
                    }
                }
                return false;
            } else {
                return this.data;
            }
        } else {
            return false;
        }
    }
    update(id, data) {
        if (this.data.length > 0) {
            for (let elem of this.data) {
                if (elem.id == id) {
                    elem.content == data;
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }
    delete(id) {
        if (this.data.length > 0) {
            let flag = false;
            this.data = this.data.filter(elem => {
                if (elem.id === id) {
                    flag = true;
                    return false;
                } else {
                    return true;
                }
            });
            return flag;
        } else {
            return false;
        }
    }
}

module.exports = Clothes;