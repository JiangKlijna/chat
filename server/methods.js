// service
// mongo Schema methods

let {User, Message} = require('./mongo');

// user service
const UserService = {
    /**
     * 验证用户密码
     * @param userid
     * @param password
     * @returns {Promise<User>}
     */
    verification: (userid, password) => new Promise((resolve, reject) => {
        User.findOne({userid}, (err, u) => {
            if(err) return reject(err);
            resolve(u.password === password ? u : null);
        })
    }),
    /**
     * 注册
     * @param username
     * @param password
     * @returns {Promise<User>}
     */
    regist: (username, password) => new Promise((resolve, reject) => {
        let u = new User({username, password, add_time:new Date()});
        u.save(function (err) {
            if(err) reject(err);
            else resolve({username, userid: u.userid});
        })
    }),
    /**
     * 搜索用户
     * @param userobj
     * @returns {Promise<User>}
     */
    search: (userobj) => new Promise((resolve, reject) => {
        User.find(userobj, '-__v -_id -add_time -password', (err, u) => {
            if(err) reject(err);
            else resolve(u);
        })
    }),
    /**
     * 修改用户信息
     * @param userobj
     * @returns {Promise<User>}
     */
    update: (userid, userobj) => new Promise((resolve, reject) => {
        User.update({userid}, userobj, (err, u) => {
            if(err) reject(err);
            else resolve(u);
        });
    }),
    /**
     * 获得用户数，通过最大的userid
     * @returns {Promise<Number>}
     */
    getMaxId: () => new Promise((resolve, reject) => {
        User.find().sort({'_id': -1}).limit(1).exec((err, u) => {
            if(err) reject(err);
            else resolve(u[0].userid);
        })
    })
};

// chat service
const ChatService = {
    /**
     * 记录一条聊天信息
     * @param fromUserid
     * @param toUserid
     * @param content
     * @returns {Promise<Message>}
     */
    record: (fromUserid, toUserid, content) => new Promise((resolve, reject) => {
        let data = {fromUserid, toUserid, content, time:new Date()};
        let m = new Message(data);
        m.save(function (err) {
            if (err) reject(err);
            else  {
                data.time = data.time.getTime();
                resolve(data);
            }
        })
    }),
    /**
     * 获得聊天列表
     * @param toUser
     * @returns {Promise<List<Message>>}
     * {$or: [{toUserid: userid}, {fromUserid: userid}]}
     */
    list: (userid) => new Promise(async (resolve, reject) => {
        try {
            let map = new Map();
            let list1 = await Message.aggregate().match({toUserid: userid}).sort({'_id': -1}).lookup({
                from: 'users',
                localField: 'fromUserid',
                foreignField: 'userid',
                as: 'u'
            }).group({
                _id: {fromUserid: "$fromUserid"},
                toUserid: {$push: "$toUserid"},
                fromUserid: {$push: "$fromUserid"},
                time: {$push: "$time"},
                content: {$push: "$content"},
                username: {$push: "$u.username"}
            }).exec();
            let list2 = await Message.aggregate().match({fromUserid: userid}).sort({'_id': -1}).lookup({
                from: 'users',
                localField: 'toUserid',
                foreignField: 'userid',
                as: 'u'
            }).group({
                _id: {toUserid: "$toUserid"},
                toUserid: {$push: "$toUserid"},
                fromUserid: {$push: "$fromUserid"},
                time: {$push: "$time"},
                content: {$push: "$content"},
                username: {$push: "$u.username"}
            }).exec();
            let each = e => {
                delete e._id;
                e.fromUserid = e.fromUserid[0];
                e.toUserid = e.toUserid[0];
                e.time = e.time[0].getTime();
                e.content = e.content[0];
                e.username = e.username[0][0];
                // 遍历过程中
                let tagUserid = (e.fromUserid === userid) ? e.toUserid : e.fromUserid;
                if (map.hasOwnProperty(tagUserid)) { // 已存在
                    let tag = map[tagUserid];
                    // 比较时间
                    if (e.time > tag.time) map[tagUserid] = e;
                } else { // 不存在
                    map[tagUserid] = e;
                }
            };
            list1.forEach(each);
            list2.forEach(each);
            let result = [];
            for (let v in map) result.push(map[v]);
            result.sort((a, b) => b.time - a.time);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    }),
    /**
     * 删除两个人之间的聊天记录
     * @returns {Promise<Boolean>}
     */
    delete: (userid0, userid1) => new Promise(async (resolve, reject) => {
        Message.find({$or: [
            {toUserid: userid0, fromUserid: userid1},
            {toUserid: userid1, fromUserid: userid0}
        ]}).remove(function (err) {
            if(err) reject(err);
            else resolve(true);
        });
    }),
    /**
     * 获得两个人的聊天记录(分页)
     * pageSize默认为10
     * pageNum从0开始
     * @returns {Promise<List<Message>>}
     */
    history: (userid0, userid1, pageNum, pageSize) => new Promise((resolve, reject) => {
        Message.find({$or: [
            {toUserid: userid0, fromUserid: userid1},
            {toUserid: userid1, fromUserid: userid0}
        ]}).sort({'_id': -1}).skip(pageNum*pageSize).limit(pageSize).exec(function (err, list) {
            if(err) reject(err);
            else
                resolve(list.map(it => ({
                    fromUserid: it.fromUserid,
                    toUserid: it.toUserid,
                    time: it.time.getTime(),
                    content: it.content
                })));
        });
    })
};

module.exports = {
    us: UserService,
    cs: ChatService,
};

// test
if(module === require.main) {
    (async () => {
        try {
            let u = await UserService.verification('1', 'test');
            console.log("verification", u);
            let r = await UserService.update(1, {username: 'test', password: 'test'});
            console.log("update", r);

            let m = await ChatService.record(6, 8, "test");
            console.log("record", m);
            let l = await ChatService.list(8);
            console.log("list", l);
            let d = await ChatService.delete(6, 8);
            console.log("delete", d);
            let h = await ChatService.history(1, 8, 0, 10);
            console.log("history", h);
            let g = await UserService.getMaxId();
            console.log("getMaxId", g)
        }catch (e) {
            console.log(e)
        }
    })()
}
