const data = require('../model/data');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage }).single('file')

exports.create = async (req, res) => {
    upload(req, res, next => {

        const Data = new data({
            title: req.body.title,
            dueDate: req.body.dueDate,
            file: req.file.path,
            user: req.body.user_id
        })

        Data.save().then((data) => {
            return res.send({ message: "Data created successfully", data: data })
        }).catch((err) => {
            return res.send({ message: err.message })
        })

    })
};

exports.getlist = (req, res) => {
    var id = req.body.id;
    if (id == null || id == undefined || id == '') {
        return res.send('Please enter objectId')
    }
    data.findById({ _id: id })
        .then((data) => {
            return res.send(data)
        }).catch((err) => {
            return res.send(err)
        })
}

exports.updateData = async (req, res, err) => {
    upload(req, res, err => {

        if (err) {
            console.log("err", err)
            return res.json(err);
        }
        else {
            var files = req.file;
            console.log('files', files);
            var id = req.body.id;
            if (id == null || id == undefined || id == '') {
                return res.json({
                    status: 400,
                    message: "Please enter data id"
                })
            }
            data.findById(err, datafind => {
                if (err) {
                    return res.json({
                        status: 400,
                        message: "Something went wrong"
                    })
                } else {
                    data.findOneAndUpdate({ _id: id }, { $set: req.body, files })
                        .then((data) => {
                            return res.status(200, 'Data Updated successfully!!')
                        }).catch((err) => {
                            console.log(err)
                            return res.status(400, err)
                        })
                }
            })
        }
    })
};

exports.removeData = (req, res) => {
    const id = req.body.id;
    data.findOneAndDelete({ _id: id })
    .then((data) => {
        console.log(data)
        return res.json({message:'Deleted successfully',data})
    }).catch((err) => {
        console.log()
        return res.json(err)
    })
}

