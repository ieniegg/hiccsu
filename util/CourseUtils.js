import Storage from  './Storage'
import ConfigUtils from './ConfigUtils'
export default class CourseUtils {

    static getYearWeek(date) {
        let date2 = new Date(date.getFullYear(), 0, 1)
        let day1 = date.getDay()
        if (day1 === 0) day1 = 7
        let day2 = date2.getDay()
        if (day2 === 0) day2 = 7
        d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000)
        return Math.ceil(d / 7) + 1
    }


    static getTomorrowCourse() {
        let date = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
        return this.getCourseByDate(date)
    }

    static getTodayCourse(date = new Date()) {
        return this.getCourseByDate(date)
    }

    static getNowNumber(next = false) {
        let nowNumber = ""
        let time = new Date().getHours() * 100 + new Date().getMinutes()
        if (time < 940) {
            if (next) {
                nowNumber = "0304"
            } else {
                nowNumber = "0102"
            }
        }
        if (time >= 940 && time < 1140) {
            if (next) {
                nowNumber = "0506"
            } else {
                nowNumber = "0304"
            }
        }
        if (time >= 1140 && time < 1540) {
            if (next) {
                nowNumber = "0708"
            } else {
                nowNumber = "0506"
            }
        }
        if (time >= 1540 && time < 1740) {
            if (next) {
                nowNumber = "0910"
            } else {
                nowNumber = "0708"
            }
        }
        if (time >= 1940 && time < 2040) {
            if (next) {
                nowNumber = "1111"
            } else {
                nowNumber = "0910"
            }
        }
        if (time >= 2040) {
            nowNumber = "1111"
        }
        return nowNumber
    }

    static getNowCourses(next = false) {
        let nowCourse = []
        let nowNumber = this.getNowNumber(false)
        return new Promise((resolve, reject) => {
            this.getTodayCourse().then(res => {
                for (i in res) {
                    let course = res[i]
                    if (course.Number >= nowNumber) {
                        if (course.Number > this.getNowNumber(false)) {
                            if (nowCourse.length > 0) {
                                resolve({'now': nowCourse, 'tomorrow': false})
                                return
                            }
                        }
                        nowCourse = nowCourse.concat(course)
                    }
                }
                if (nowCourse.length > 0) {
                    resolve({'now': nowCourse, 'tomorrow': false})
                } else {
                    //第二天课表
                    this.getTomorrowCourse().then(tres => {
                        if (tres.length > 0) {
                            if (tres.length > 2 && (tres[0].Number === tres[1].Number)) {
                                nowCourse = nowCourse.concat(tres[0])
                                nowCourse = nowCourse.concat(tres[1])
                                resolve({'now': nowCourse, 'tomorrow': true})
                            } else {
                                nowCourse = nowCourse.concat(tres[0])
                                resolve({'now': nowCourse, 'tomorrow': true})
                            }
                        } else {
                            resolve({'now': nowCourse, 'tomorrow': false})
                        }
                    }).catch((err) => {
                        resolve({'now': nowCourse, 'tomorrow': false})
                    })
                }
            }).catch(err => {
                reject(err)
            })
        })


    }

    static getCourseByDate(date: Date) {
        return new Promise((resolve, reject) => {
            Storage.load({key: 'course'}).then(res => {
                let day = date.getDay()
                let week
                switch (day) {
                    case 0:
                        week = '星期日';
                        break;
                    case 1:
                        week = '星期一';
                        break;
                    case 2:
                        week = '星期二';
                        break;
                    case 3:
                        week = '星期三';
                        break;
                    case 4:
                        week = '星期四';
                        break;
                    case 5:
                        week = '星期五';
                        break;
                    case 6:
                        week = '星期六';
                        break;
                    default:
                        week = '星期一'
                }
                //星期过滤
                let dayCourse = []

                for (i in res) {
                    course = res[i]
                    if (course.Week === week) {
                        dayCourse = dayCourse.concat(course)
                    }
                }

                //当前周数
                ConfigUtils.getConfig().then(res => {
                    let weeknum = this.getYearWeek(new Date()) - res.weektrim
                    let dailyCourse = []
                    for (i in dayCourse) {
                        let course = dayCourse[i]
                        if (course.WeekHave.indexOf(weeknum) > 0) {
                            dailyCourse = dailyCourse.concat(course)
                        }
                    }
                    resolve(dailyCourse)
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        })
    }

}